// // backend/routes/jobs.js
// const express = require("express");
// const router = express.Router();
// const verifyFirebase = require("../middleware/verifyFirebase");
// const {
//   searchJobs,
//   saveJob,
//   getSavedJobs,
// } = require("../controllers/jobsController");

// // Search jobs (optional authentication)
// // router.post("/search", verifyFirebase, searchJobs);
// router.post("/search", searchJobs);

// // Save a job
// // router.post("/save", verifyFirebase, saveJob);
// router.post("/save", saveJob);

// // Get saved jobs
// // router.get("/saved", verifyFirebase, getSavedJobs);
// router.get("/saved",  getSavedJobs);

// module.exports = router;


const express = require("express");
const router = express.Router();
const verifyFirebase = require("../middleware/verifyFirebase");
const { searchJobs, saveJob, getSavedJobs } = require("../controllers/jobsController");

// Search jobs
router.post("/search", searchJobs);

// Save a job
router.post("/save", saveJob);

// Get saved jobs
router.get("/saved", getSavedJobs);

module.exports = router;

