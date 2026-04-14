// // backend/routes/dashboard.js
// const express = require("express");
// const router = express.Router();
// const verifyFirebase = require("../middleware/verifyFirebase");
// const User = require("../models/User");
// const roadmapService = require("../services/roadmapService");

// // GET Dashboard Data
// router.get("/", verifyFirebase, async (req, res) => {
//   try {
//     const uid = req.user?.uid || req.query.uid;
//     const user = await User.findOne({ uid });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 🎯 Hardcoded role skills (later we can map based on user's career goals)
//     const roleSkills = { React: 9, Node: 8, MongoDB: 7, Communication: 9 };

//     // 🧑‍💻 Convert user.skills into object with random scores (demo purpose)
//     const userSkills = {};
//     if (Array.isArray(user.skills)) {
//       user.skills.forEach((s) => {
//         userSkills[s.trim()] = Math.floor(Math.random() * 10);
//       });
//     } else if (typeof user.skills === "string") {
//       user.skills.split(",").forEach((s) => {
//         userSkills[s.trim()] = Math.floor(Math.random() * 10);
//       });
//     } else {
//       console.warn("⚠️ No skills found for user:", user.uid);
//     }

//     // 🛤 Generate roadmap using roadmapService
//     const roadmap = roadmapService.generateRoadmap(
//       Array.isArray(user.skills)
//         ? user.skills
//         : typeof user.skills === "string"
//         ? user.skills.split(",").map((s) => s.trim())
//         : []
//     );

//     res.json({
//       profile: {
//         name: user.name,
//         email: user.email,
//         bio: user.bio,
//         skills: user.skills,
//         experience: user.experience,
//       },
//       userSkills,
//       roleSkills,
//       roadmap,
//     });
//   } catch (err) {
//     console.error("Dashboard error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;



// backend/routes/dashboard.js
const express = require("express");
const router = express.Router();
const verifyFirebase = require("../middleware/verifyFirebase");
const User = require("../models/User");
const roadmapService = require("../services/roadmapService");
const { fetchRoleSkills } = require("../services/roleSkillService");
const UserSkills = require("../models/UserSkills");
const jobApiService = require("../services/jobApiService");


// GET Dashboard Data
router.get("/", verifyFirebase, async (req, res) => {
  try {
    const uid = req.user?.uid || req.query.uid;
    console.log("UID from request:", uid); 
    const user = await User.findOne({ uid });

    console.log("Firebase UID:", uid);
    console.log("MongoDB UID:", user?.uid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

     // 1️⃣ Get self-assessed skills
    const skillsDoc = await UserSkills.findOne({ userId: user._id });
 //   const userSkills = skillsDoc ? skillsDoc.skills : {};


    if (!user.careerGoal) {
  console.warn("⚠️ No careerGoal set for user:", user.uid);
}


    // 🎯 Role skills → (TODO: later fetch via AI based on careerGoal)
    const roleSkills = await fetchRoleSkills(user.careerGoal);
    console.log("Fetched role skills for", user.careerGoal, ":", roleSkills);

    

    // 🧑‍💻 Build userSkills object
    const userSkills = {};
    if (Array.isArray(user.skills)) {
      user.skills.forEach((s) => {
        if (typeof s === "string") {
          userSkills[s.trim()] = Math.floor(Math.random() * 10);
        } else if (s && s.name) {
          // Map level → number
          const levelMap = { Beginner: 3, Intermediate: 6, Advanced: 9 };
          userSkills[s.name.trim()] = Math.floor(Math.random() * 10); // demo score
        }
      });
    } else if (typeof user.skills === "string") {
      user.skills.split(",").forEach((s) => {
        userSkills[s.trim()] = Math.floor(Math.random() * 10);
      });
    } else {
      console.warn("⚠️ No skills found for user:", user.uid);
    }


    // Convert roleSkills Map (from MongoDB) to plain object
// const cleanedRoleSkills = {};
// if (roleSkills instanceof Map) {
//   for (const [key, value] of roleSkills.entries()) {
//     cleanedRoleSkills[key] = value;
//   }
// } else {
//   Object.assign(cleanedRoleSkills, roleSkills);
// }
    // const roleSkills = await fetchRoleSkills(user.careerGoal);
    let cleanedRoleSkills = {};
    if (roleSkills instanceof Map) {
      for (const [key, value] of roleSkills.entries()) {
        cleanedRoleSkills[key] = value;
      }
    } else if(roleSkills.skills) {
      if(roleSkills.skills instanceof Map){
        for (const [key, value] of roleSkills.skills.entries()) {
          cleanedRoleSkills[key] = value;
        }
      } else {
        cleanedRoleSkills = roleSkills.skills;
      }
    }
  // 🛤 Generate roadmap using roadmapService
    // const roadmap = roadmapService.generateRoadmap(
    //   Array.isArray(user.skills)
    //     ? user.skills.map((s) => (typeof s === "string" ? s : s.name))
    //     : typeof user.skills === "string"
    //     ? user.skills.split(",").map((s) => s.trim())
    //     : []
    // );
    const roadmap = roadmapService.generateRoadmap(userSkills, cleanedRoleSkills);

    let recommendedJobs = [];
if (user.careerGoal) {
  try {
    recommendedJobs = await jobApiService.searchJobs(user.careerGoal, "", 1);
  } catch (err) {
    console.error("Error fetching recommended jobs:", err);
  }
}


    res.json({
      profile: {
        name: user.name,
        email: user.email,
        bio: user.bio,
        careerGoal: user.careerGoal || "Not set",
        skills: user.skills,
        experience: user.experience,
      },
      userSkills,
      roleSkills: cleanedRoleSkills,
      roadmap,
      recommendedJobs, // New field for recommended jobs
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;
