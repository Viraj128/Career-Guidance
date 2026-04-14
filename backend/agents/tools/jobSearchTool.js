// Mock job search tool (later integrate real API)
// async function searchJobs(role) {
//   // Example static data
//   const jobs = [
//     { title: `${role} - Junior`, company: "TechCorp", location: "Remote" },
//     { title: `${role} - Mid`, company: "InnovateX", location: "Bangalore" },
//     { title: `${role} - Senior`, company: "NextGen AI", location: "Mumbai" },
//   ];
//   return jobs;
// }

// module.exports = { searchJobs };
const { searchJobs } = require("../../services/jobApiService");

module.exports = {
  name: "jobSearchTool",
  description: "Search for job opportunities based on user queries.",
  execute: async (query) => {
    try {
      const jobs = await searchJobs(query);
      return jobs;
    } catch (error) {
      console.error("Job search error:", error);
      return [];
    }
  },
};
