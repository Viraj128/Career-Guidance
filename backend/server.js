//server running without db connection:
// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Career Platform Backend Running 🚀");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// CommonJS syntax:
// const express = require('express');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Career Platform Backend Running 🚀");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//new server.js file to test ai agent:
// const express = require("express");
// require("dotenv").config();

// const { getCareerAdvice } = require("./agents/careerAdvisor");

// const app = express();
// app.use(express.json());

// // Test route
// app.post("/api/career-advice", async (req, res) => {
//   try {
//     const advice = await getCareerAdvice(req.body);
//     res.json(advice);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to get career advice" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



//updated server.js to test all the agents and tools:
// backend/server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const careerAgent = require('./agents/careerAgent');
// const resumeTool = require('./agents/tools/resumeTool');
// const coverLetterTool = require('./agents/tools/coverLetterTool');

// const app = express();
// app.use(bodyParser.json());

// // Health check
// app.get('/', (req, res) => {
//   res.send({ status: 'Career Guidance API running' });
// });

// // Endpoint: Job search
// app.post('/job-search', async (req, res) => {
//   try {
//     const { query } = req.body;
//     const jobs = await careerAgent.findJobs(query);
//     res.json({ jobs });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Endpoint: Skill gap analysis
// app.post('/skill-gap', async (req, res) => {
//   try {
//     const { profile, targetRole } = req.body;
//     const gaps = await careerAgent.analyzeSkills(profile, targetRole);
//     res.json({ gaps });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Endpoint: Resume generation
// app.post('/resume', async (req, res) => {
//   try {
//     const { profile, jobTarget } = req.body;
//     const filePath = await resumeTool.execute(profile, jobTarget);
//     res.json({ message: 'Resume generated', filePath });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Endpoint: Cover letter generation
// app.post('/cover-letter', async (req, res) => {
//   try {
//     const { profile, jobTarget, companyName } = req.body;
//     const filePath = await coverLetterTool.execute(profile, jobTarget, companyName);
//     res.json({ message: 'Cover letter generated', filePath });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// backend/server.js
// server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const cors = require("cors");

// // LangChain / OpenAI imports
// const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai");
// const { RetrievalQAChain } = require("langchain/chains");
// const { MemoryVectorStore } = require("langchain/vectorstores/memory");

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;

// // Create model instance
// const llm = new ChatOpenAI({
//   temperature: 0.7,
//   modelName: "gpt-4o-mini", // or gpt-3.5-turbo
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// // Simple in-memory store for demo purposes
// const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings({
//   openAIApiKey: process.env.OPENAI_API_KEY,
// }));

// // Example route
// app.post("/api/ask", async (req, res) => {
//   try {
//     const { question, context } = req.body;

//     // Store context (optional)
//     if (context) {
//       await vectorStore.addDocuments([{ pageContent: context }]);
//     }

//     const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
//     const response = await chain.call({ query: question });

//     res.json({ answer: response.text || response.output_text || "No answer found." });
//   } catch (error) {
//     console.error("Error in /api/ask:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });



//new server.js file to test ai agent along with mongodb connection::
// backend/server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const cors = require("cors");

// // Config & DB
// const connectDB = require("./config/db");
// dotenv.config();

// // LangChain / OpenAI imports
// const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai");
// const { RetrievalQAChain } = require("langchain/chains");
// const { MemoryVectorStore } = require("langchain/vectorstores/memory");

// // Career Agent
// const createCareerAgent = require("./agents/careerAgent");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// // Create model instance
// const llm = new ChatOpenAI({
//   temperature: 0.7,
//   modelName: "gpt-4o-mini",
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// // Simple in-memory store for demo purposes
// const vectorStore = new MemoryVectorStore(
//   new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
// );

// // Initialize Career Agent once
// let agentExecutor;
// (async () => {
//   agentExecutor = await createCareerAgent();
// })();

// // Example AI QA route
// app.post("/api/ask", async (req, res) => {
//   try {
//     const { question, context } = req.body;

//     if (context) {
//       await vectorStore.addDocuments([{ pageContent: context }]);
//     }

//     const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
//     const response = await chain.call({ query: question });

//     res.json({ answer: response.text || response.output_text || "No answer found." });
//   } catch (error) {
//     console.error("Error in /api/ask:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Career Agent route
// app.post("/career-agent", async (req, res) => {
//   try {
//     if (!agentExecutor) {
//       return res.status(503).json({ error: "Career Agent not initialized yet." });
//     }

//     const { message, chatHistory } = req.body;
//     const result = await agentExecutor.call({ input: message, chatHistory: chatHistory || [] });

//     res.json({ output: result.output });
//   } catch (error) {
//     console.error("Error in /career-agent:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Connect to MongoDB, then start server
// connectDB().then(() => {
//   console.log("✅ Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`✅ Server running on port ${PORT}`);
//   });
// });



//here is server.js code with backend ai agent and its controller handling:
// backend/server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const cors = require("cors");

// // Config & DB
// const connectDB = require("./config/db");
// dotenv.config();

// // LangChain / OpenAI imports
// const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai");
// const { RetrievalQAChain } = require("langchain/chains");
// const { MemoryVectorStore } = require("langchain/vectorstores/memory");

// // Career Agent
// const createCareerAgent = require("./agents/careerAgent");

// // Import routes
// const aiRoutes = require("./routes/ai");
// const profileRoutes = require("./routes/profile");
// const jobsRoutes = require("./routes/jobs");
// const resumeRoutes = require("./routes/resume");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// // Create model instance
// const llm = new ChatOpenAI({
//   temperature: 0.7,
//   modelName: "gpt-4o-mini",
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// // Simple in-memory store for demo purposes
// const vectorStore = new MemoryVectorStore(
//   new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
// );

// // Initialize Career Agent once
// let agentExecutor;
// (async () => {
//   agentExecutor = await createCareerAgent();
// })();

// // Use routes
// app.use("/api/ai", aiRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/jobs", jobsRoutes);
// app.use("/api/resume", resumeRoutes);

// // Example AI QA route
// app.post("/api/ask", async (req, res) => {
//   try {
//     const { question, context } = req.body;

//     if (context) {
//       await vectorStore.addDocuments([{ pageContent: context }]);
//     }

//     const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
//     const response = await chain.call({ query: question });

//     res.json({ answer: response.text || response.output_text || "No answer found." });
//   } catch (error) {
//     console.error("Error in /api/ask:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Career Agent route
// app.post("/career-agent", async (req, res) => {
//   try {
//     if (!agentExecutor) {
//       return res.status(503).json({ error: "Career Agent not initialized yet." });
//     }

//     const { message, chatHistory } = req.body;
//     const result = await agentExecutor.call({ input: message, chatHistory: chatHistory || [] });

//     res.json({ output: result.output });
//   } catch (error) {
//     console.error("Error in /career-agent:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Connect to MongoDB, then start server
// connectDB().then(() => {
//   console.log("✅ Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`✅ Server running on port ${PORT}`);
//   });
// });


//NEW CODE WITH GEMINI INTEGRTRATION:
// server.js
require("dotenv").config();

console.log("Adzuna Env:", {
  APP_ID: process.env.ADZUNA_APP_ID,
  APP_KEY: process.env.ADZUNA_APP_KEY ? "loaded" : "missing",
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


// ======================
// Load environment variables first
// ======================
dotenv.config();

console.log("Attempting to load GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

// ======================
// Config & DB
// ======================
const connectDB = require("./config/db");

// ======================
// Gemini Setup
// ======================
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { Document } = require("langchain/document");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Models
const chatModel = genAI.getGenerativeModel({ model: "gemini-pro" });
const embedModel = genAI.getGenerativeModel({ model: "embedding-001" });

// Helper - embed text
async function embedText(text) {
  const result = await embedModel.embedContent(text);
  return result.embedding.values;
}

// Simple in-memory vector store for QA
let vectorStore = new MemoryVectorStore();

// ======================
// Career Agent
// ======================
const createCareerAgent = require("./agents/careerAgent");

// ======================
// Import routes
// ======================
const dashboardRoutes = require("./routes/dashboard");
const aiRoutes = require("./routes/ai");
const profileRoutes = require("./routes/profileRoutes");
const jobsRoutes = require("./routes/jobs");
const resumeRoutes = require("./routes/resume");
const testRouter = require("./routes/test");

// ======================
// Express Setup
// ======================
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// ======================
// Initialize Career Agent once
// ======================
let agentExecutor;
(async () => {
  agentExecutor = await createCareerAgent();
})();

// ======================
// Use routes
// ======================
app.use("/api/dashboard",  dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/test", testRouter);


// ======================
// Example AI QA route
// ======================
app.post("/api/ask", async (req, res) => {
  try {
    const { question, context } = req.body;

    if (context) {
      const embedding = await embedText(context);
      await vectorStore.addDocuments(
        [new Document({ pageContent: context })],
        [embedding]
      );
    }

    const results = await vectorStore.similaritySearch(question, 2);
    const contextText = results.map((r) => r.pageContent).join("\n");

    const prompt = `
      You are a helpful career assistant.
      Use the following context to answer the question:
      ${contextText}
      Question: ${question}
    `;

    const result = await chatModel.generateContent(prompt);

    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error("Error in /api/ask:", error);
    res.status(500).json({ error: error.message });
  }
});

// ======================
// Career Agent route
// ======================
app.post("/api/career-agent", async (req, res) => {
  try {
    if (!agentExecutor) {
      return res.status(503).json({ error: "Career Agent not initialized yet." });
    }

    const { message, chatHistory } = req.body;
    // const result = await agentExecutor.call({
    //   input: message,
    //   chatHistory: chatHistory || [],
    // });

    // fetch user profile:
    let userProfile = {};
    if (req.user?.uid) {
      const user = await User.findOne({ uid: req.user.uid });
      if (user) {
        userProfile = {
          name: user.name,
          bio: user.bio,
          skills: user.skills,
          experience: user.experience,
          interests: user.interests,
          education: user.education,
          careerGoals: user.careerGoals,
        };
      }
    }

    // ✅ Inject profile into prompt
    const context = `
      User Profile:
      Name: ${userProfile.name || "Not provided"}
      Bio: ${userProfile.bio || "Not provided"}
      Skills: ${(userProfile.skills || []).join(", ")}
      Experience: ${userProfile.experience || "Not provided"}
      Education: ${userProfile.education || "Not provided"}
      Career Goals: ${userProfile.careerGoals || "Not provided"}

      Answer the user based on this profile. 
      If skills are missing for their career goal, highlight them and generate a skill gap analysis.
    `;
    const output = await agentExecutor.runAgent(message);

    res.json({ output });
    

//    res.json({ output: result.output });
  } catch (error) {
    console.error("Error in /career-agent:", error);
    res.status(500).json({ error: error.message });
  }
});

// ======================
// Connect to MongoDB, then start server
// ======================
connectDB().then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});

