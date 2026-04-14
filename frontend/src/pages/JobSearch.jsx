// // src/pages/JobSearch.jsx FINAL CODE 
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import JobCard from "../components/JobCard";
// import jobsService from "../services/jobsService";

// const JobSearch = () => {
//   const [query, setQuery] = useState("");
//   const [location, setLocation] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🔍 Search jobs
//   const handleSearch = async () => {
//     if (!query.trim()) return;
//     setLoading(true);
//     setError("");
//     try {
//       const results = await jobsService.searchJobs(query, location);
//       setJobs(results);
//       if (results.length === 0) setError("No jobs found for this query.");
//     } catch (err) {
//       setError(err.message || "Failed to fetch jobs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 💾 Save a job
//   const handleSave = async (job) => {
//     try {
//       const res = await jobsService.saveJob(job);
//       if (!res) throw new Error("Failed to save job");
//       alert("✅ Job saved successfully!");
//     } catch (err) {
//       alert("❌ " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="p-6 max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Job Search</h2>
//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             placeholder="Job title, skill or keyword..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="flex-1 border p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Location (optional)"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="flex-1 border p-2 rounded"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         <div className="space-y-4">
//           {jobs.length === 0 && !loading && (
//             <p className="text-slate-500">No jobs found. Try another search!</p>
//           )}
//           {jobs.map((job, i) => (
//             <JobCard key={i} job={job} onSave={handleSave} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobSearch;

//================--------FINAL CODE WITH UI------==========-
// src/pages/JobSearch.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import jobsService from "../services/jobsService";

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const results = await jobsService.searchJobs(query, location);
      setJobs(results);
      if (results.length === 0) setError("No jobs found for this query.");
    } catch (err) {
      setError(err.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (job) => {
    try {
      const res = await jobsService.saveJob(job);
      if (!res) throw new Error("Failed to save job");
      alert("✅ Job saved successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-50 to-purple-50 overflow-hidden">
      <Navbar />

      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-[-10%] w-80 h-80 bg-pink-300 rounded-full opacity-25 blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob"></div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 text-purple-400 text-4xl animate-float">💼</div>
      <div className="absolute top-1/2 right-20 text-pink-400 text-3xl animate-float animation-delay-2000">📈</div>
      <div className="absolute bottom-32 left-1/2 text-blue-400 text-5xl animate-float animation-delay-4000">🧑‍💻</div>

      <div className="p-6 max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6 animate-fadeIn">Job Search</h2>

        {/* Search Inputs */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Job title, skill or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition"
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-600 mb-4 animate-fadeIn">{error}</p>}

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.length === 0 && !loading && (
            <p className="text-slate-500 text-center">No jobs found. Try another search!</p>
          )}
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} onSave={handleSave} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
