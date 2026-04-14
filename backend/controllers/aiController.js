// controllers/aiController.js
// const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai");
// const { RetrievalQAChain } = require("langchain/chains");
// const { MemoryVectorStore } = require("langchain/vectorstores/memory");
// const User = require('../models/User');
// const Artifact = require('../models/Artifact');
// const roadmapService = require('../services/roadmapService');
// const interviewService = require('../services/interviewService');
// const careerAgent = require('../agents/careerAgent');

// // In-memory vector store for QA context
// const vectorStore = new MemoryVectorStore(
//   new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
// );

// // Chat with AI career agent
// exports.chatWithAI = async (req, res) => {
//   try {
//     const { message, chatHistory = [] } = req.body;
//     const executor = await careerAgent();
//     const response = await executor.call({ input: message, chatHistory });

//     res.json({ success: true, response: response.output });
//   } catch (error) {
//     console.error('AI chat error:', error);
//     res.status(500).json({ success: false, error: 'Error communicating with AI agent' });
//   }
// };

// // Ask AI (LangChain QA style)
// exports.askAI = async (req, res) => {
//   try {
//     const { question, context } = req.body;

//     if (context) {
//       await vectorStore.addDocuments([{ pageContent: context }]);
//     }

//     const llm = new ChatOpenAI({
//       temperature: 0.7,
//       modelName: "gpt-4o-mini",
//       openAIApiKey: process.env.OPENAI_API_KEY,
//     });

//     const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
//     const response = await chain.call({ query: question });

//     res.json({ answer: response.text || response.output_text || "No answer found." });
//   } catch (error) {
//     console.error('askAI error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Generate career roadmap and save as artifact
// exports.generateRoadmap = async (req, res) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     const { targetRole } = req.body;

//     const user = await User.findOne({ uid });
//     if (!user) return res.status(404).json({ success: false, error: 'User not found' });

//     const roadmap = await roadmapService.generate(targetRole, user.skills);

//     // Save roadmap as artifact
//     const artifact = await Artifact.create({
//       uid,
//       type: 'roadmap',
//       title: `Career Roadmap for ${targetRole}`,
//       content: roadmap
//     });

//     res.json({ success: true, roadmap, artifactId: artifact._id });
//   } catch (error) {
//     console.error('Roadmap generation error:', error);
//     res.status(500).json({ success: false, error: 'Error generating roadmap' });
//   }
// };

// // Conduct interview simulation
// exports.conductInterview = async (req, res) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     const { role } = req.body;

//     const user = await User.findOne({ uid });
//     if (!user) return res.status(404).json({ success: false, error: 'User not found' });

//     const interview = await interviewService.start(role, user.skills);

//     res.json({ success: true, interview });
//   } catch (error) {
//     console.error('Interview error:', error);
//     res.status(500).json({ success: false, error: 'Error starting interview simulation' });
//   }
// };


//NEW CODE WITH GEMINI INTEGRATION:
// backend/controllers/aiController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { Document } = require("langchain/document");

// Models & Services
const User = require("../models/User");
const Artifact = require("../models/Artifact");
const roadmapService = require("../services/roadmapService");
const interviewService = require("../services/interviewService");
const careerAgent = require("../agents/careerAgent");

// ======================
// Gemini Setup
// ======================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Models
const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const embedModel = genAI.getGenerativeModel({ model: "embedding-001" });

// ======================
// Helper - Embedding
// ======================
async function embedText(text) {
  const result = await embedModel.embedContent(text);
  return result.embedding.values;
}

// In-memory vector store for QA
let vectorStore = new MemoryVectorStore();

// ======================
// 1. Simple Chat with AI
// ======================
exports.chatWithAI = async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;

    const history = chatHistory.map((h) => ({
      role: h.role || "user",
      parts: [{ text: h.content }],
    }));

    const chat = chatModel.startChat({ history });
    const result = await chat.sendMessage(message);

    res.json({ success: true, response: result.response.text() });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ success: false, error: "Error communicating with Gemini" });
  }
};

// ======================
// 2. Upload Context Docs
// ======================
exports.uploadContext = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "No content provided" });

    const embedding = await embedText(content);
    await vectorStore.addDocuments(
      [new Document({ pageContent: content, metadata: { source: "upload" } })],
      [embedding]
    );

    res.json({ success: true, message: "Document added to store." });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Error uploading document" });
  }
};

// ======================
// 3. Ask AI with RAG
// ======================
exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    const results = await vectorStore.similaritySearch(question, 2);
    const context = results.map((r) => r.pageContent).join("\n");

    const prompt = `
      You are a helpful career assistant.
      Use the following context to answer the question:
      ${context}
      Question: ${question}
    `;

    const result = await chatModel.generateContent(prompt);

    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error("askAI error:", error);
    res.status(500).json({ error: "Error answering question" });
  }
};

// ======================
// 4. Chat with Career Agent
// ======================
exports.chatWithCareerAgent = async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;
    const uid = req.user?.uid || req.body.uid;

    // Load the user profile from MongoDB
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Create the agent
    const agent = await careerAgent();

    // Call runAgent with the message + user profile
    const response = await agent.runAgent(message, {
      uid: user.uid,
      email: user.email,
      name: user.name,
      skills: user.skills,
      bio: user.bio,
      experience: user.experience,
    });

    res.json({ success: true, response });
  } catch (error) {
    console.error("Career agent error:", error);
    res.status(500).json({ success: false, error: "Error with career agent" });
  }
};


// ======================
// 5. Generate Roadmap
// ======================
exports.generateRoadmap = async (req, res) => {
  try {
    const uid = req.user?.uid || req.body.uid;
    const { targetRole } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    const roadmap = await roadmapService.generate(targetRole, user.skills);

    const artifact = await Artifact.create({
      uid,
      type: "roadmap",
      title: `Career Roadmap for ${targetRole}`,
      content: roadmap,
    });

    res.json({ success: true, roadmap, artifactId: artifact._id });
  } catch (error) {
    console.error("Roadmap generation error:", error);
    res.status(500).json({ success: false, error: "Error generating roadmap" });
  }
};

// ======================
// 6. Conduct Interview
// ======================
exports.conductInterview = async (req, res) => {
  try {
    const uid = req.user?.uid || req.body.uid;
    const { role } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    const interview = await interviewService.start(role, user.skills);

    res.json({ success: true, interview });
  } catch (error) {
    console.error("Interview error:", error);
    res.status(500).json({ success: false, error: "Error starting interview simulation" });
  }
};
