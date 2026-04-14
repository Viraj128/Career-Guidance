// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import ResumePreview from "../components/ResumePreview";

// const ResumeBuilder = () => {
//   const [resumeData, setResumeData] = useState({
//     name: "",
//     education: "",
//     skills: "",
//     experience: "",
//   });

//   const handleChange = (e) => {
//     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//         {/* Form */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-xl font-bold mb-4">Build Your Resume</h2>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={resumeData.name}
//             onChange={handleChange}
//             className="w-full border p-2 mb-3 rounded"
//           />
//           <textarea
//             name="education"
//             placeholder="Education"
//             value={resumeData.education}
//             onChange={handleChange}
//             className="w-full border p-2 mb-3 rounded"
//           />
//           <textarea
//             name="skills"
//             placeholder="Skills (comma separated)"
//             value={resumeData.skills}
//             onChange={handleChange}
//             className="w-full border p-2 mb-3 rounded"
//           />
//           <textarea
//             name="experience"
//             placeholder="Experience"
//             value={resumeData.experience}
//             onChange={handleChange}
//             className="w-full border p-2 mb-3 rounded"
//           />
//         </div>

//         {/* Preview */}
//         <ResumePreview data={resumeData} />
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;

//----------------FINAL CODE BELOW -------------------------

// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import ResumePreview from "../components/ResumePreview";
// import axios from "axios";
// import { getAuth } from "firebase/auth";

// const ResumeBuilder = () => {
//   const [resumeData, setResumeData] = useState({
//     name: "",
//     education: "",
//     skills: "",
//     experience: "",
//   });
//   const [generatedResume, setGeneratedResume] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//   };

//   // const handleGenerate = async () => {
//   //  try {
//   //  setLoading(true);
//   //  const res = await axios.post("/api/resume/generate", resumeData);
//   //  setGeneratedResume(res.data.resume);
//   //  } catch (err) {
//   //  console.error("Error generating resume:", err);
//   //  setGeneratedResume("❌ Failed to generate resume. Please try again.");
//   //  } finally {
//   // setLoading(false);
//   //  }
//   // };

//   const handleGenerate = async () => {
//     try {
//       setLoading(true);

//       // Get Firebase auth token
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) {
//         throw new Error("No user logged in");
//       }
//       const token = await user.getIdToken();

//       // Send token in Authorization header
//       const res = await axios.post(
//         "/api/resume/generate",
//         {profileData: resumeData},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setGeneratedResume(res.data.resume|| "✅ Resume generated successfully.");
//     } catch (err) {
//       console.error("Error generating resume:", err);
//       setGeneratedResume("❌ Failed to generate resume. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//         {/* Form */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-xl font-bold mb-4">Build Your Resume</h2>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={resumeData.name}
//             onChange={handleChange}
//             className="w-full border p-2 mb-3 rounded"
//           />
//           <textarea
//             name="education"
//             placeholder="Education"
//             value={resumeData.education}
//             onChange={handleChange}
//             className="w-full border p-2 mb-3 rounded"
//           />
//           <textarea
//             name="skills"
//             placeholder="Skills (comma separated)"
//             value={resumeData.skills}
//             onChange={handleChange}
//             className="w-full border p-2 mb-3 rounded"
//           />
//           <textarea
//             name="experience"
//             placeholder="Experience"
//             value={resumeData.experience}
//             onChange={handleChange}
//             className="w-full border p-2 mb-3 rounded"
//           />

//           <button
//             onClick={handleGenerate}
//             disabled={loading}
//             className="mt-4 bg-slate-800 text-white px-4 py-2 rounded w-full"
//           >
//             {loading ? "Generating..." : "Generate Resume with AI"}
//           </button>
//         </div>

//         {/* Preview */}
//         <ResumePreview content={generatedResume} />
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;

 //------- FINAL CODE WITH UI IMPROVEMENTS -----------
 // src/pages/ResumeBuilder.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ResumePreview from "../components/ResumePreview";
import axios from "axios";
import { getAuth } from "firebase/auth";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    education: "",
    skills: "",
    experience: "",
  });
  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setResumeData({ ...resumeData, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");
      const token = await user.getIdToken();

      const res = await axios.post(
        "/api/resume/generate",
        { profileData: resumeData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGeneratedResume(res.data.resume || "✅ Resume generated successfully.");
    } catch (err) {
      console.error("Error generating resume:", err);
      setGeneratedResume("❌ Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Animated blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-[-10%] w-80 h-80 bg-pink-300 rounded-full opacity-25 blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob"></div>

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl animate-fadeIn">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
            Build Your Resume
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={resumeData.name}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
          />
          <textarea
            name="education"
            placeholder="Education"
            value={resumeData.education}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
          />
          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            value={resumeData.skills}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
          />
          <textarea
            name="experience"
            placeholder="Experience"
            value={resumeData.experience}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transform transition"
          >
            {loading ? "Generating..." : "Generate Resume with AI"}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl animate-fadeIn">
          <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">
            Preview
          </h2>
          <ResumePreview content={generatedResume} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
