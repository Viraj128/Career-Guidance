// backend/models/RoleSkills.js
const mongoose = require("mongoose");

const RoleSkillsSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, unique: true }, // e.g. "Full Stack Developer"
    skills: { type: Map, of: Number }, // { "React": 8, "Node.js": 7 }
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoleSkills", RoleSkillsSchema);
