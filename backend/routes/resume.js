const express = require("express");
const router = express.Router();
const verifyFirebase = require("../middleware/verifyFirebase");
const {
  generateResume,
  generateCoverLetter,
  generateResumePreview, // <-- add this
} = require("../controllers/resumeController");

// Generate resume
router.post("/generate", verifyFirebase, generateResume);

// Generate cover letter
router.post("/cover-letter", verifyFirebase, generateCoverLetter);

// Generate AI resume preview (no artifact save)
router.post("/preview", generateResumePreview);

module.exports = router;
