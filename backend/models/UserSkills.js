// backend/models/UserSkills.js
const mongoose = require("mongoose");

const userSkillsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // Store skills as { skillName: proficiencyLevel }
    skills: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSkills", userSkillsSchema);
