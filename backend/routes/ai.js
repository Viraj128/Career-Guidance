// const express = require("express");
// const router = express.Router();
// const { careerAgent } = require("../agents/careerAgent");

// router.post("/career", async (req, res) => {
//   const { profile } = req.body;
//   if (!profile) return res.status(400).json({ error: "Profile is required" });

//   const result = await careerAgent(profile);
//   res.json(result);
// });

// module.exports = router;


// backend/routes/ai.js
const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../controllers/aiController");
const verifyFirebase = require("../middleware/verifyFirebase");
const { askAI } = require("../controllers/aiController");

// AI chat route (requires authentication)
// router.post("/chat", verifyFirebase, chatWithAI);
router.post("/chat", chatWithAI);
// router.post("/chat",chatWithAI);
router.post("/ask", askAI);

// Career Agent route
router.post("/career-agent", async (req, res) => {
  try {
    if (!agentExecutor) {
      return res.status(503).json({ error: "Career Agent not initialized yet." });
    }

    const { message, chatHistory } = req.body;
    const output = await agentExecutor.runAgent(message);

    res.json({ output });
  } catch (error) {
    console.error("Error in /career-agent:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
