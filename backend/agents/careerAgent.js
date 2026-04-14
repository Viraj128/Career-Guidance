// // backend/agents/careerAgent.js
// const { ChatOpenAI } = require("@langchain/openai"); // Updated import
// const { initializeAgentExecutorWithOptions } = require("langchain/agents");
// const jobSearchTool = require("./tools/jobSearchTool");
// const skillGapTool = require("./tools/skillGapTool");
// const resumeTool = require("./tools/resumeTool");
// const coverLetterTool = require("./tools/coverLetterTool");

// // Agent setup function
// async function createCareerAgent() {
//   // Initialize the LLM
//   const model = new ChatOpenAI({
//     openAIApiKey: process.env.OPENAI_API_KEY,
//     modelName: "gpt-4", // you can change to "gpt-3.5-turbo" if needed
//     temperature: 0.3,
//   });

//   // All tools the agent can use
//   const tools = [jobSearchTool, skillGapTool, resumeTool, coverLetterTool];

//   // Create the agent executor
//   const executor = await initializeAgentExecutorWithOptions(tools, model, {
//     agentType: "chat-conversational-react-description",
//     verbose: true,
//   });

//   console.log("✅ Career Agent ready with job search, skill gap, resume, and cover letter tools.");
//   return executor;
// }

// module.exports = createCareerAgent;


// backend/agents/careerAgent.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const jobSearchTool = require("./tools/jobSearchTool");
const skillGapTool = require("./tools/skillGapTool");
const resumeTool = require("./tools/resumeTool");
const coverLetterTool = require("./tools/coverLetterTool");

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create Gemini model instance
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Agent setup function
async function createCareerAgent() {
  // Instead of LangChain executor, we’ll build a simple wrapper
  async function runAgent(input, userProfile) {
  const contextPrompt = `
    You are a career assistant. Here is the user's profile:
    ${JSON.stringify(userProfile, null, 2)}

    Always use this context when answering.
  `;

  // Tool routing
  if (input.includes("job")) return await jobSearchTool(input);
  if (input.includes("skill gap")) return await skillGapTool(input);
  if (input.includes("resume")) return await resumeTool(input);
  if (input.includes("cover letter")) return await coverLetterTool(input);

  // Default: ask Gemini directly, but include context
  const result = await model.generateContent([contextPrompt, input]);
  return result.response.text();
}


  console.log("✅ Career Agent ready with Gemini + tools.");
  return { runAgent };
}

module.exports = createCareerAgent;
