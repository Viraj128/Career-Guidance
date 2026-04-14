const mongoose = require("mongoose");

const ArtifactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["resume", "coverLetter"] },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Artifact", ArtifactSchema);
