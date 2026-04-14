// src/services/jobsService.js
import api from "./api";

// Search jobs using query & location
const searchJobs = async (query, location) => {
  try {
    const res = await api.post("/api/jobs/search", { query, location });
    return res.data.jobs || [];
  } catch (error) {
    console.error("Search Jobs Error:", error);
    return [];
  }
};

// Save a job to user's library
const saveJob = async (jobData) => {
  try {
    const res = await api.post("/api/jobs/save", { jobData });
    return res.data;
  } catch (error) {
    console.error("Save Job Error:", error);
    return null;
  }
};

// Get saved jobs for the current user
const getSavedJobs = async () => {
  try {
    const res = await api.get("/api/jobs/saved");
    return res.data || [];
  } catch (error) {
    console.error("Get Saved Jobs Error:", error);
    return [];
  }
};

export default { searchJobs, saveJob, getSavedJobs };
