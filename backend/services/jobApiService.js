// // backend/services/jobApiService.js
// const axios = require("axios");

// const APP_ID = process.env.ADZUNA_APP_ID;
// const APP_KEY = process.env.ADZUNA_APP_KEY;

// async function searchJobs(query, location = "india", results = 10) {
//   try {
//     const url = `https://api.adzuna.com/v1/api/jobs/in/search/1`;

//     console.log("🔑 Using Adzuna:", { APP_ID, APP_KEY: APP_KEY?.slice(0, 4) + "..." });

//     const response = await axios.get(url, {
//       params: {
//         app_id: APP_ID,
//         app_key: APP_KEY,
//         what: query|| "developer",
//         where: location,
//         results_per_page: results,
//         contentType: "application/json",
//       },
//       headers: {
//         "Accept": "application/json",
//       },
//     });

//     return response.data.results.map((job) => ({
//       id: job.id,
//       title: job.title,
//       company: job.company.display_name || "Unknown",
//       location: job.location.display_name || "Not specified",
//       url: job.redirect_url,
//       description: job.description,
//     }));
//   } catch (error) {
//     if (error.response) {
//     console.error("Adzuna API Error:", error.response.data); // show Adzuna message
//   } else {
//     console.error("Adzuna API Error:", error.message);
//   }
//     throw new Error("Failed to fetch jobs");
//   }
// }

// module.exports = { searchJobs };


//-------------------------------------------
// const axios = require("axios");

// const APP_ID = process.env.ADZUNA_APP_ID;
// const APP_KEY = process.env.ADZUNA_APP_KEY;

// exports.searchJobs = async (query, location) => {
//   try {
//     const url = `https://api.adzuna.com/v1/api/jobs/in/search/1`;

//     console.log("Fetching from Adzuna:", url, {
//       app_id: APP_ID,
//       app_key: APP_KEY,
//       what: query || "developer",
//       where: location || "mumbai",
//     });

//     const response = await axios.get(url, {
//       params: {
//         app_id: APP_ID,
//         app_key: APP_KEY,
//         what: query || "developer",   // default search
//         where: location || "mumbai", // default location
//         results_per_page: 10,
//         contentType: "json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error("Adzuna API Error:", error.response.status, error.response.data);
//     } else {
//       console.error("Adzuna API Error:", error.message);
//     }
//     throw new Error("Failed to fetch jobs");
//   }
// };


// backend/services/jobApiService.js
// backend/services/jobApiService.js
// backend/services/jobApiService.js
const axios = require("axios");

const JSR_API_KEY = process.env.JSR_API_KEY;
const JSR_API_HOST = process.env.JSR_API_HOST || "jsearch.p.rapidapi.com";

// 🔍 Search jobs using JSearch API
exports.searchJobs = async (query, location = "", page = 1) => {
  if (!JSR_API_KEY) {
    throw new Error("JSearch API key is missing in .env");
  }

  try {
    const options = {
      method: "GET",
      url: `https://${JSR_API_HOST}/search`,
      params: {
        query,
        location,
        page,
      },
      headers: {
        "X-RapidAPI-Key": JSR_API_KEY,
        "X-RapidAPI-Host": JSR_API_HOST,
      },
    };

    const response = await axios.request(options);

    // Normalize JSearch response to match your frontend
    return (response.data.data || []).map((job) => ({
      id: job.job_id,
      title: job.job_title,
      company: job.employer_name || "Unknown",
      location: job.job_city || "Not specified",
      description: job.job_description || "",
      url: job.job_apply_link || "#",
      category: job.job_employment_type || "General",
      salary: job.salary ? `${job.salary}` : "Not disclosed",
      created: job.job_posted_at || null,
    }));
  } catch (error) {
    console.error("JSearch API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch jobs");
  }
};



