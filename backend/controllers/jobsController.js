// // backend/controllers/jobsController.js
// const Job = require("../models/Job");
// const jobApiService = require("../services/jobApiService");

// // GET /jobs/search?query=...&location=...&page=1
// exports.searchJobs = async (req, res, next) => {
//   try {
//     const { query = "", location = "", page = 1 } = req.query;
//     const results = await jobApiService.searchJobs({ query, location, page: Number(page) || 1 });
//     res.json({ results });
//   } catch (err) {
//     next(err);
//   }
// };

// // POST /jobs/save
// // Body: { jobId, title, company, location, url }
// exports.saveJob = async (req, res, next) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     if (!uid) return res.status(401).json({ error: "Unauthorized: uid missing" });

//     const { jobId, title, company, location, url } = req.body;
//     if (!jobId || !title) return res.status(400).json({ error: "jobId and title are required" });

//     const doc = await Job.findOneAndUpdate(
//       { firebaseUid: uid, jobId },
//       { $set: { title, company, location, url } },
//       { new: true, upsert: true }
//     );

//     res.json({ saved: true, job: doc });
//   } catch (err) {
//     next(err);
//   }
// };

// // GET /jobs/saved
// exports.getSavedJobs = async (req, res, next) => {
//   try {
//     const uid = req.user?.uid || req.query.uid;
//     if (!uid) return res.status(401).json({ error: "Unauthorized: uid missing" });

//     const docs = await Job.find({ firebaseUid: uid }).sort({ updatedAt: -1 });
//     res.json({ jobs: docs });
//   } catch (err) {
//     next(err);
//   }
// };

// // DELETE /jobs/saved/:jobId
// exports.deleteSavedJob = async (req, res, next) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     const { jobId } = req.params;
//     if (!uid) return res.status(401).json({ error: "Unauthorized: uid missing" });

//     await Job.deleteOne({ firebaseUid: uid, jobId });
//     res.json({ deleted: true });
//   } catch (err) {
//     next(err);
//   }
// };




// backend/controllers/jobsController.js
// const Job = require("../models/Job");
// const jobApiService = require("../services/jobApiService");

// // exports.searchJobs = async (req, res) => {
// //   try {
// //     const { query, location } = req.body;
// //     if (!query) return res.status(400).json({ error: "Job query is required" });

// //     const jobs = await jobApiService.searchJobs(query, location);
// //     res.json(jobs);
// //   } catch (error) {
// //     console.error("Search Jobs Error:", error);
// //     res.status(500).json({ error: "Failed to search jobs" });
// //   }
// // };
// exports.searchJobs = async (req, res) => {
//   try {
//     const { query, location } = req.body;
//     if (!query) return res.status(400).json({ error: "Job query is required" });

//     const jobs = await jobApiService.searchJobs(query, location);
    
//     // 👇 wrap in object so frontend sees { jobs: [...] }
//     res.json({ jobs });
//   } catch (error) {
//     console.error("Search Jobs Error:", error);
//     res.status(500).json({ error: "Failed to search jobs" });
//   }
// };


// exports.saveJob = async (req, res) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     const { jobData } = req.body;

//     if (!jobData) return res.status(400).json({ error: "Job data is required" });

//     const job = new Job({ uid, ...jobData });
//     await job.save();

//     res.json(job);
//   } catch (error) {
//     console.error("Save Job Error:", error);
//     res.status(500).json({ error: "Failed to save job" });
//   }
// };

// exports.getSavedJobs = async (req, res) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     const jobs = await Job.find({ uid });
//     res.json(jobs);
//   } catch (error) {
//     console.error("Get Saved Jobs Error:", error);
//     res.status(500).json({ error: "Failed to fetch saved jobs" });
//   }
// };



//-----------------------------------------
// const Job = require("../models/Job");
// const jobApiService = require("../services/jobApiService");

// // 🔎 Search jobs using JSearch API
// exports.searchJobs = async (req, res) => {
//   try {
//     const { query, location, page } = req.body;

//     if (!query) return res.status(400).json({ error: "Job query is required" });

//     const apiResponse = await jobApiService.searchJobs(query, location, page);

//     // ✅ Normalize JSearch results to match your frontend
// const jobs = apiResponse.data.map(job => ({
//   title: job.job_title || "Untitled",
//   company: job.employer_name || "Unknown",
//   location: job.job_city && job.job_country 
//               ? `${job.job_city}, ${job.job_country}` 
//               : "Not specified",
//   type: job.job_employment_type || "General",
//   salary: job.job_min_salary && job.job_max_salary
//             ? `${job.job_min_salary} - ${job.job_max_salary}`
//             : "Not disclosed",
//   description: job.job_description || "No description available.",
//   url: job.job_apply_link || "#",
//   logo: job.employer_logo || null
// }));


//     res.json({ jobs });
//   } catch (error) {
//     console.error("Search Jobs Error:", error);
//     res.status(500).json({ error: "Failed to search jobs" });
//   }
// };

// // 💾 Save a job to MongoDB
// exports.saveJob = async (req, res) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     const { jobData } = req.body;

//     if (!jobData) return res.status(400).json({ error: "Job data is required" });

//     const job = new Job({ uid, ...jobData });
//     await job.save();

//     res.json(job);
//   } catch (error) {
//     console.error("Save Job Error:", error);
//     res.status(500).json({ error: "Failed to save job" });
//   }
// };

// // 📂 Get saved jobs for a user
// exports.getSavedJobs = async (req, res) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     const jobs = await Job.find({ uid });
//     res.json(jobs);
//   } catch (error) {
//     console.error("Get Saved Jobs Error:", error);
//     res.status(500).json({ error: "Failed to fetch saved jobs" });
//   }
// };

//-----------------------------------------------------------
const Job = require("../models/Job");
const jobApiService = require("../services/jobApiService");

// 🔎 Search jobs using JSearch API
exports.searchJobs = async (req, res) => {
  try {
    const { query, location, page } = req.body;

    if (!query) return res.status(400).json({ error: "Job query is required" });

    // jobApiService already normalizes the data
    const jobs = await jobApiService.searchJobs(query, location, page);

    res.json({ jobs });
  } catch (error) {
    console.error("Search Jobs Error:", error);
    res.status(500).json({ error: "Failed to search jobs" });
  }
};

// 💾 Save a job to MongoDB
exports.saveJob = async (req, res) => {
  try {
    const uid = req.user?.uid || req.body.uid;
    const { jobData } = req.body;

    if (!jobData) return res.status(400).json({ error: "Job data is required" });

    const job = new Job({ uid, ...jobData });
    await job.save();

    res.json(job);
  } catch (error) {
    console.error("Save Job Error:", error);
    res.status(500).json({ error: "Failed to save job" });
  }
};

// 📂 Get saved jobs for a user
exports.getSavedJobs = async (req, res) => {
  try {
    const uid = req.user?.uid || req.body.uid;
    const jobs = await Job.find({ uid });
    res.json(jobs);
  } catch (error) {
    console.error("Get Saved Jobs Error:", error);
    res.status(500).json({ error: "Failed to fetch saved jobs" });
  }
};
