const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  requiredSkills: [String],
  description: String,
});

module.exports = mongoose.model("Role", RoleSchema);
