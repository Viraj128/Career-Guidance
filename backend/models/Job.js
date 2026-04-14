// const mongoose = require("mongoose");

// const JobSchema = new mongoose.Schema({
//   title: String,
//   company: String,
//   location: String,
//   skillsRequired: [String],
//   link: String,
// });

// module.exports = mongoose.model("Job", JobSchema);




// backend/models/Job.js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  uid: { type: String, required: true }, // user ID
  title: { type: String, required: true },
  company: { type: String, default: "Unknown" },
  location: { type: String, default: "Not specified" },
  category: { type: String, default: "General" },
  salary: { type: String, default: "Not disclosed" },
  description: { type: String, default: "No description available." },
  url: { type: String, default: "#" },
  logo: { type: String, default: null },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
