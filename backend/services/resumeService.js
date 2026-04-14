// const Artifact = require("../models/Artifact");

// const createResume = async (userId, content) => {
//   const resume = new Artifact({ userId, type: "resume", content });
//   await resume.save();
//   return resume;
// };

// const getResumes = async (userId) => {
//   return Artifact.find({ userId, type: "resume" });
// };

// module.exports = { createResume, getResumes };




// NEW CODE WITH AI GENERATED OUTPUT:
// backend/services/resumeService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateResumeText(profileData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct a prompt from form fields
    const prompt = `
    Create a professional resume text with proper headlines , sections , fonts based on the following details:

    Name: ${profileData.name || "Not provided"}
    Title: ${profileData.title || "Not provided"}
    Bio: ${profileData.bio || "Not provided"}
    Experience: ${profileData.experience || "Not provided"}
    Education: ${profileData.education || "Not provided"}
    Skills: ${profileData.skills || "Not provided"}

    Please format the output in clean resume style with sections.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating resume with Gemini:", error);
    throw new Error("Failed to generate resume text");
  }
}

module.exports = {
  generateResumeText,
};
