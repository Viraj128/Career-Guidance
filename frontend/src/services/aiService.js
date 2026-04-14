// // src/services/aiService.js
// import api from "./api";

// const chatAgent = (message, chatHistory = []) =>
//   api.post("/api/career-agent", { message, chatHistory });

// const ask = (question, context) =>
//   api.post("/api/ai/ask", { question, context });

// const uploadContext = (content) =>
//   api.post("/api/ai/uploadContext", { content });

// export default { chatAgent, ask, uploadContext };


// src/services/aiService.js
import api from "./api";

// 🧠 Chat with Gemini AI
const chat = (message, chatHistory = []) =>
  api.post("/api/ai/chat", { message, chatHistory });

// ✅ define and export functions
export const chatAgent = (message, chatHistory = []) => {
  return api.post("/api/career-agent", { message, chatHistory });
};

// ❓ Simple Q&A (ask Gemini)
const ask = (question, context) =>
  api.post("/api/ai/ask", { question, context });

// 📂 Upload extra context for AI
const uploadContext = (content) =>
  api.post("/api/ai/uploadContext", { content });

export default { chatAgent, chat,  ask, uploadContext };
