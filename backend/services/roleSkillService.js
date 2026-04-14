// const axios = require("axios");
// const RoleSkills = require("../models/RoleSkills");

// async function fetchRoleSkills(careerGoal) {
//   try {
//     if (!careerGoal) return {};

//     // 1️⃣ Check MongoDB cache
//     const cached = await RoleSkills.findOne({ role: careerGoal });
//     if (cached) {
//       return cached.skills;
//     }

//     // 2️⃣ If not cached → Call Gemini
//     const res = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: `List the top 8 essential skills with required proficiency levels (scale 1-10) for someone aiming to become a ${careerGoal}. 
// Return in JSON format: { "skill": number }`,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         params: { key: process.env.GEMINI_API_KEY },
//       }
//     );

//     const textResponse =
//       res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

//     console.log("🔎 Gemini raw response:", textResponse);  

//         // 🧹 Clean JSON (remove ```json and ``` fences)
//     let cleaned = textResponse
//       .replace(/```json/gi, "")
//       .replace(/```/g, "")
//       .trim();
    
    
    
//     let parsed;
//     try {
//       parsed = JSON.parse(cleaned);
//     } catch {
//       parsed = {};
//     }

//     // 3️⃣ Save into MongoDB for future use
//     if (Object.keys(parsed).length > 0) {
//       await RoleSkills.findOneAndUpdate(
//         { role: careerGoal },
//         { role: careerGoal, skills: parsed, lastUpdated: new Date() },
//         { upsert: true, new: true }
//       );
//     }

//     return parsed;
//   } catch (err) {
//     console.error("Gemini role skills error:", err.response?.data || err.message);
//     return {};
//   }
// }

// module.exports = { fetchRoleSkills };




// backend/services/roleSkillService.js
const axios = require("axios");
const RoleSkills = require("../models/RoleSkills");

// 🔧 Cleaner for MongoDB keys
function cleanKey(key) {
  // Replace "." and "$" with "_"
  return key.replace(/[.$]/g, "_");
}

async function fetchRoleSkills(careerGoal) {
  try {
    if (!careerGoal) return {};

    // 1️⃣ Check MongoDB cache
    const cached = await RoleSkills.findOne({ role: careerGoal });
    if (cached && cached.skills && Object.keys(cached.skills).length > 0) {
      console.log("✅ Returning cached skills for role:", careerGoal);
      return cached.skills;

    }

    console.log("🌐 Fetching role skills for:", careerGoal);

    // 2️⃣ Prompt
    const prompt = `List the top 8 essential skills with required proficiency levels (1-10)
for someone aiming to become a ${careerGoal}.
Return only valid JSON in this format:
{ "Skill Name": number, "Another Skill": number }`;

    // 3️⃣ Call Gemini 1.5 Flash
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    let textResponse = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // 4️⃣ Clean response → strip markdown/code fences
    textResponse = textResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(textResponse);
    } catch (e) {
      console.error("❌ Still could not parse Gemini response:", textResponse);
      parsed = {};
    }

    // 5️⃣ Clean keys before saving to MongoDB
    const cleanedSkills = {};
    for (const [key, value] of Object.entries(parsed)) {
      cleanedSkills[cleanKey(key)] = value;
    }

    // 6️⃣ Cache in MongoDB
    if (Object.keys(cleanedSkills).length > 0) {
      await RoleSkills.findOneAndUpdate(
        { role: careerGoal },
        { role: careerGoal, skills: cleanedSkills, lastUpdated: new Date() },
        { upsert: true, new: true }
      );
    }

    return cleanedSkills;
  } catch (err) {
    console.error("❌ Error in fetchRoleSkills:", err.response?.data || err.message);
    return {};
  }
}

module.exports = { fetchRoleSkills };




