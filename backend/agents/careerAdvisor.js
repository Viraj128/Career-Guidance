// // agents/careerAdvisor.js
// const axios = require("axios");
// require("dotenv").config();

// async function getCareerAdvice(userProfile) {
//   try {
//     // Example payload — later we’ll replace this with OpenAI call
//     const prompt = `
//       You are an AI career guidance expert. 
//       Based on the following user profile, provide career advice:
//       ${JSON.stringify(userProfile)}
//     `;

//     // Dummy AI simulation (replace with API)
//     return {
//       advice: `Based on your skills in ${userProfile.skills.join(", ")}, 
//       you could explore careers in Full Stack Development or Data Science.`,
//       confidence: 0.9
//     };
//   } catch (error) {
//     console.error("Error in careerAdvisor agent:", error);
//     throw error;
//   }
// }

// module.exports = { getCareerAdvice };



// backend/agents/careerAdvisor.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getCareerAdvice(userProfile) {
  try {
    const prompt = `
      You are an AI career guidance expert. 
      Based on the following user profile, provide career advice in 3-5 sentences:
      ${JSON.stringify(userProfile)}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      advice: text,
      confidence: 0.9, // keep for now, later can compute from model response
    };
  } catch (error) {
    console.error("Error in careerAdvisor agent:", error);
    throw error;
  }
}

module.exports = { getCareerAdvice };
