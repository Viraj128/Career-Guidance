// // backend/config/gemini.js
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Returns a Gemini chat model instance
// const getLLM = () => genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// module.exports = { getLLM };


// backend/config/gemini.js
const { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
console.log("Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "YES" : "NO");
require("dotenv").config();

// Returns a Gemini chat model instance
const getLLM = () =>
  new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash",   // Chat model
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
  });

// Returns a Gemini embedding model instance
const getEmbeddings = () =>
  new GoogleGenerativeAIEmbeddings({
    modelName: "embedding-001",   // Embedding model
    apiKey: process.env.GEMINI_API_KEY,
  });

module.exports = { getLLM, getEmbeddings };
