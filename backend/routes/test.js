const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/", async (req, res) => {
  try {
    const { careerGoal } = req.body;

    // Example prompt to AI: generate multiple-choice questions for user's career goal
    const prompt = `
      Generate 5 multiple-choice questions for someone aiming to become a ${careerGoal}.
      Each question should have 4 options labeled A, B, C, D.
      Return JSON like this:
      [
        { "question": "...", "options": ["A", "B", "C", "D"] },
        ...
      ]
    `;

    const aiResponse = await aiModel.generateContent(prompt);
    let text = await aiResponse.response.text();

    //remove any ````json` or ``` at start or end of text
    text = text.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(text);

    res.json({ success: true, questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
});

module.exports = router;
