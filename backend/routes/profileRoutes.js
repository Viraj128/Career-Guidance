// // backend/routes/profileRoutes.js
// const express = require("express");
// const router = express.Router();
// const verifyFirebase = require("../middleware/verifyFirebase");
// const User = require("../models/User");


// router.get("/", verifyFirebase, async (req, res) => {
//   try {
//     // req.user is set by verifyFirebase
//     res.json({
//       uid: req.user.uid,
//       email: req.user.email,
//       name: req.user.name || "No name yet",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// router.put("/", verifyFirebase, async (req, res) => {
//   try {
//     const { name, bio, skills, experience } = req.body;

//     const user = await User.findOne({ uid: req.user.uid });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // ✅ Only update editable fields
//     user.name = name ?? user.name;
//     user.bio = bio ?? user.bio;
//     user.skills = skills ?? user.skills;
//     user.experience = experience ?? user.experience;

//     // 🚫 Don’t touch user.email here
//     await user.save();

//     res.json(user);
//   } catch (error) {
//     console.error("Update profile error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// module.exports = router;



//_--------NEW CODE WITH PROFILE REFRESH WORKING:
// backend/routes/profileRoutes.js
// const express = require("express");
// const router = express.Router();
// const verifyFirebase = require("../middleware/verifyFirebase");
// const User = require("../models/User");

// router.get("/", verifyToken, getProfile);
// router.put("/", verifyToken, updateProfile);

// // GET profile by UID (from Firebase token)
// router.get("/", verifyFirebase, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.user.uid });

//     if (!user) {
//       // If not found, return empty profile
//       return res.json({
//         uid: req.user.uid,
//         email: req.user.email,
//         name: "",
//         bio: "",
//         skills: [],
//         experience: "",
//       });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Get profile error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // PUT profile (create or update)
// router.put("/", verifyFirebase, async (req, res) => {
//   try {
//     const { name, bio, skills, experience, interests, education, careerGoals } =
//       req.body;

//     // ✅ Upsert (create if not exists, update if exists)
//     const user = await User.findOneAndUpdate(
//       { uid: req.user.uid },
//       {
//         uid: req.user.uid,
//         email: req.user.email, // always keep email from Firebase
//         name,
//         bio,
//         skills,
//         experience,
//         interests,
//         education,
//         careerGoals,
//       },
//       { new: true, upsert: true } // <--- important
//     );

//     res.json(user);
//   } catch (error) {
//     console.error("Update profile error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;



//AGAIN THE NEW CODE FOR PROFILE REFRESHING:
const express = require("express");
const router = express.Router();
const verifyFirebase = require("../middleware/verifyFirebase");
const profileController = require("../controllers/profileController");

// GET profile (protected)
router.get("/", verifyFirebase, profileController.getUserProfile);

// PUT profile (create or update)
router.put("/", verifyFirebase, profileController.updateUserProfile);

// POST generate roadmap
router.post("/roadmap", verifyFirebase, profileController.generateRoadmap);

// GET /api/profile/me (protected)
router.get("/me", verifyFirebase, async (req, res) => {
  try {
    const uid = req.user.uid; // verifyFirebase sets req.user
    const User = require("../models/User");
    const user = await User.findOne({ uid });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      skills: user.skills,
      interests: user.interests,
      education: user.education,
      bio: user.bio,
      experience: user.experience,
      careerGoal: user.careerGoal || "",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
