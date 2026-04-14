const mongoose = require("mongoose");


const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
});

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  email: String,
  skills: { type: [SkillSchema], default: [] },
  interests: [String],
  education: String,
  bio: { type: String },
  experience: { type: String }, 
  careerGoal: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
