// // Calculate skill gaps
// const Gap = require("../models/Gap");

// // services/roadmapService.js

// function generateRoadmap(skills) {
//   // simple dummy roadmap logic
//   if (!skills || skills.length === 0) {
//     return [
//       { step: 1, title: "Learn programming fundamentals" },
//       { step: 2, title: "Explore different domains" },
//     ];
//   }

//   return [
//     { step: 1, title: "Strengthen existing skills: " + skills.join(", ") },
//     { step: 2, title: "Build projects with these skills" },
//     { step: 3, title: "Apply for internships or entry-level jobs" },
//     { step: 4, title: "Target advanced roles in your career path" },
//   ];
// } // <-- this closing brace was missing ✅

// const saveGapAnalysis = async (userId, roleId, missingSkills) => {
//   const gap = new Gap({
//     userId,
//     roleId,
//     missingSkills,
//     totalMissing: missingSkills.length,
//   });
//   await gap.save();
//   return gap;
// };

// module.exports = { saveGapAnalysis, generateRoadmap };



//============---------------------==============

// // services/roadmapService.js
// const Gap = require("../models/Gap");

// /**
//  * Generate roadmap based on user's skills vs target role skills
//  * @param {Object} userSkills - { skillName: number }
//  * @param {Object} roleSkills - { skillName: number }
//  * @returns {Array} roadmap steps
//  */

// // Generate roadmap based on skill gaps
// function generateRoadmap(userSkills = {}, roleSkills = {}) {
//   const roadmap = [];

//   // If no roleSkills, fallback to generic roadmap
//   if (!roleSkills || Object.keys(roleSkills).length === 0) {
//     return [
//       { step: 1, title: "Learn programming fundamentals" },
//       { step: 2, title: "Explore different domains" },
//     ];
//   }

//   // Compare userSkills vs roleSkills
//   Object.entries(roleSkills).forEach(([skill, targetLevel], index) => {
//     const userLevel = userSkills[skill] ?? 0;
//     if (userLevel < targetLevel) {
//       roadmap.push({
//         step: index + 1,
//         title: `Improve ${skill} from ${userLevel} → ${targetLevel}`,
//       });
//     } else {
//       roadmap.push({
//         step: index + 1,
//         title: `${skill} is on track (current: ${userLevel}, target: ${targetLevel})`,
//       });
//     }
//   });

//   return roadmap;
// };

// // Save skill gap analysis to DB
// const saveGapAnalysis = async (userId, roleId, missingSkills) => {
//   const gap = new Gap({
//     userId,
//     roleId,
//     missingSkills,
//     totalMissing: missingSkills.length,
//   });
//   await gap.save();
//   return gap;
// };

// module.exports = { saveGapAnalysis, generateRoadmap };



//================-------------=============----------
// services/roadmapService.js
const Gap = require("../models/Gap");

/**
 * Generate roadmap based on user's skills vs target role skills
 * @param {Object} userSkills - { skillName: number }
 * @param {Object} roleSkills - { skillName: number }
 * @returns {Array} roadmap steps
 */
function generateRoadmap(userSkills = {}, roleSkills = {}) {
  const roadmap = [];

  // If no roleSkills, fallback to generic roadmap
  if (!roleSkills || Object.keys(roleSkills).length === 0) {
    return [
      { step: 1, title: "Learn programming fundamentals" },
      { step: 2, title: "Explore different domains" },
    ];
  }

  // Compare userSkills vs roleSkills (new updated logic)
  const allSkills = Object.keys(roleSkills);

  allSkills.forEach((skill, idx) => {
    const userLevel = userSkills[skill] ?? 0;
    const targetLevel = roleSkills[skill];

    if (userLevel >= targetLevel) {
      roadmap.push({
        step: idx + 1,
        title: `${skill} is on track (current: ${userLevel}, target: ${targetLevel})`,
      });
    } else {
      roadmap.push({
        step: idx + 1,
        title: `${skill} needs improvement (current: ${userLevel}, target: ${targetLevel})`,
      });
    }
  });

  return roadmap;
}

/**
 * Save skill gap analysis to DB
 * @param {String} userId
 * @param {String} roleId
 * @param {Array} missingSkills
 * @returns {Object} saved gap document
 */
const saveGapAnalysis = async (userId, roleId, missingSkills) => {
  const gap = new Gap({
    userId,
    roleId,
    missingSkills,
    totalMissing: missingSkills.length,
  });
  await gap.save();
  return gap;
};

module.exports = { saveGapAnalysis, generateRoadmap };
