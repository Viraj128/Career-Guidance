// // backend/routes/profile.js
// const express = require("express");
// const router = express.Router();
// const verifyFirebase = require("../middleware/verifyFirebase");
// const {
//   getUserProfile,
//   updateUserProfile,
//   generateRoadmap,
// } = require("../controllers/profileController");

// // Get user profile
// // router.get("/api/profile", verifyFirebase, getUserProfile);
// router.get("/", verifyFirebase, getUserProfile);

// // Update user profile
// // router.put("/api/profile", verifyFirebase, updateUserProfile);
// router.put("/", verifyFirebase, updateUserProfile);
// // Generate career roadmap
// // router.post("/api/profile/roadmap", verifyFirebase, generateRoadmap);
// router.post("/roadmap", verifyFirebase, generateRoadmap);

// module.exports = router;
