// // src/components/JobCard.jsx
// import React from "react";

// export default function JobCard({ job, onSave }) {
//   if (!job) return null;

//   // Adzuna API fields
//   const title = job.title || "Untitled Job";
//   const company = job.company?.display_name || "Unknown Company";
//   const location = job.location?.display_name || "N/A";
//   const link = job.redirect_url || "#";

//   return (
//     <div className="border rounded p-4 bg-white shadow-sm hover:shadow-md transition">
//       {/* Job Info */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//           <p className="text-sm text-slate-600">
//             {company} • {location}
//           </p>
//         </div>
//         <div className="text-right">
//           <a
//             href={link}
//             target="_blank"
//             rel="noreferrer"
//             className="text-sm text-indigo-600 hover:underline"
//           >
//             View
//           </a>
//         </div>
//       </div>

//       {/* Save / Apply Buttons */}
//       <div className="mt-4 flex gap-2">
//         <button
//           onClick={() => onSave?.(job)}
//           className="text-sm bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-700"
//         >
//           Save
//         </button>
//         <a
//           href={link}
//           target="_blank"
//           rel="noreferrer"
//           className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
//         >
//           Apply
//         </a>
//       </div>
//     </div>
//   );
// }

// src/components/JobCard.jsx
import React from "react";

export default function JobCard({ job, onSave }) {
  if (!job) return null;

  const title = job.title || "Untitled";
  const company = job.company || "Unknown Company";
  const location = job.location || "Not specified";
  const link = job.url || "#";
  const category = job.category || "General";
  const salary = job.salary || "Not disclosed";
  const description = job.description
    ? job.description.slice(0, 200) + (job.description.length > 200 ? "..." : "")
    : "No description available.";

  return (
    <div className="border rounded p-4 bg-white shadow-sm hover:shadow-md transition">
      {/* Job Info */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-slate-600">
            {company} • {location} • {category}
          </p>
          <p className="text-sm text-slate-500 mt-1">{salary}</p>
          <p className="text-sm text-gray-700 mt-2">{description}</p>
        </div>
        <div className="text-right">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo-600 hover:underline"
          >
            View
          </a>
        </div>
      </div>

      {/* Save / Apply Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onSave?.(job)}
          className="text-sm bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-700"
        >
          Save
        </button>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
        >
          Apply
        </a>
      </div>
    </div>
  );
}
