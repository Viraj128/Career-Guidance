//NEW CODE FOR PROFILE REFRESHING:(ABOVE CODE WAS WORKING WELL)
const User = require("../models/User");
const roadmapService = require("../services/roadmapService");

exports.getUserProfile = async (req, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(400).json({ error: "UID is required" });

    const user = await User.findOne({ uid });
    if (!user) {
      // Return empty profile if not found
      return res.json({
        uid,
        email: req.user.email,
        name: "",
        bio: "",
        skills: [],
        experience: "",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// exports.updateUserProfile = async (req, res) => {
//   try {
//     const uid = req.user?.uid;
//     if (!uid) return res.status(400).json({ error: "UID is required" });

//     const { name, bio, skills, experience, interests, education, careerGoals } = req.body;

//     const updatedUser = await User.findOneAndUpdate(
//       { uid },
//       {
//         uid,
//         email: req.user.email, // always trust Firebase
//         name,
//         bio,
//         skills,
//         experience,
//         interests,
//         education,
//         careerGoals,
//       },
//       { new: true, upsert: true }
//     );

//     res.json(updatedUser);
//   } catch (error) {
//     console.error("Update Profile Error:", error);
//     res.status(500).json({ error: "Failed to update profile" });
//   }
// };

// Example inside updateUserProfile
exports.updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.user; // from Firebase middleware
    let { name, bio, careerGoal, experience, skills } = req.body;

    // Clean up skills
    if (Array.isArray(skills)) {
      skills = skills
        .filter((s) => s && s.name && s.name.trim() !== "")
        .map((s) =>
          typeof s === "string"
            ? { name: s.trim(), level: "Beginner" }
            : { name: s.name.trim(), level: s.level || "Beginner" }
        );
    } else {
      skills = [];
    }

    const updateData = {
      ...(name && { name }),
      ...(bio && { bio }),
      ...(careerGoal && { careerGoal }), // ✅ ensure careerGoal is saved
      ...(experience && { experience }),
      skills,
    };

    const user = await User.findOneAndUpdate(
      { uid },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.json(user);
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};



exports.generateRoadmap = async (req, res) => {
  try {
    const { careerGoal } = req.body;
    if (!careerGoal) return res.status(400).json({ error: "Career goal is required" });

    const roadmap = await roadmapService.generateRoadmap(careerGoal);
    res.json({ roadmap });
  } catch (error) {
    console.error("Generate Roadmap Error:", error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
};
