const mongoose = require("mongoose");

const GapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  missingSkills: [String],
  totalMissing: Number,
});

module.exports = mongoose.model("Gap", GapSchema);
