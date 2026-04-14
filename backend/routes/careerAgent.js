const express = require("express");
const router = express.Router();
const verifyFirebase = require("../middleware/verifyFirebase");
const { chatWithCareerAgent } = require("../controllers/aiController");

// Protect this route with Firebase auth middleware if needed
router.post("/", verifyFirebase, chatWithCareerAgent);

module.exports = router;