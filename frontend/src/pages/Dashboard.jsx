// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import SkillChart from "../components/SkillChart";
// import JobCard from "../components/JobCard";
// import Chatbot from "../components/Chatbot";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const Dashboard = () => {
//   const [user, setUser] = useState(null); 
//   const [jobs, setJobs] = useState([]);

//   // Dummy skill data for chart
//   const userSkills = { React: 6, Node: 4, MongoDB: 2, Communication: 7 };
//   const roleSkills = { React: 9, Node: 8, MongoDB: 7, Communication: 9 };

//   useEffect(() => {
//     // 🔑 Listen to Firebase auth state
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         // firebaseUser.displayName might be null if not set → fallback to email
//         setUser({
//           name: firebaseUser.displayName || firebaseUser.email,
//           email: firebaseUser.email,
//         });
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     // fetch jobs (dummy for now)
//     setJobs([
//       { id: 1, title: "Software Engineer", company: "Google", location: "Remote" },
//       { id: 2, title: "Data Scientist", company: "Microsoft", location: "Bangalore" },
//     ]);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Greeting Section */}
//       <div className="p-6">
//         <h1 className="text-2xl font-bold">
//           {user ? `Welcome back, ${user.name} 👋` : "Welcome 👋"}
//         </h1>
//         <p className="text-gray-600">
//           Ready to take the next step in your career?
//         </p>
//       </div>

//       {/* Main Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//         {/* Skill Gap Chart */}
//         <div className="bg-white p-4 rounded-xl shadow-md col-span-1">
//           <h2 className="text-lg font-semibold mb-2">Skill Gap Analysis</h2>
//           <SkillChart userSkills={userSkills} roleSkills={roleSkills} />
//         </div>

//         {/* Career Roadmap / Progress */}
//         <div className="bg-white p-4 rounded-xl shadow-md col-span-2">
//           <h2 className="text-lg font-semibold mb-2">Career Roadmap</h2>
//           <ul className="list-disc ml-5 space-y-2 text-gray-700">
//             <li>Complete AWS Certification</li>
//             <li>Work on ML deployment project</li>
//             <li>Update resume with new skills</li>
//           </ul>
//         </div>

//         {/* Job Recommendations */}
//         <div className="bg-white p-4 rounded-xl shadow-md col-span-3">
//           <h2 className="text-lg font-semibold mb-4">Job Recommendations</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {jobs.map((job) => (
//               <JobCard key={job.id} job={job} />
//             ))}
//           </div>
//         </div>

//         {/* Resume / Cover Letter */}
//         <div className="bg-white p-4 rounded-xl shadow-md col-span-3 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Application Tools</h2>
//           <div className="space-x-4">
//             <a
//               href="/resume-builder"
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
//             >
//               Build Resume
//             </a>
//             <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
//               Generate Cover Letter
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Floating Chatbot */}
//       <Chatbot />
//     </div>
//   );
// };

// export default Dashboard;



//-----------------------------------------------------
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import SkillChart from "../components/SkillChart";
// import JobCard from "../components/JobCard";
// import Chatbot from "../components/Chatbot";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // import axios from "axios";
// import api from "../services/api";// ✅ use your api.js

// const Dashboard = () => {
//   const [user, setUser] = useState(null); 
//   // const [analysis, setAnalysis] = useState(null);
//   const [userSkills, setUserSkills] = useState({});
//   const [roleSkills, setRoleSkills] = useState({});
//   const [roadmap, setRoadmap] = useState([]);
// //  const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/api/dashboard");
//         setUser(res.data.profile);
//         setUserSkills(res.data.userSkills);
//         setRoleSkills(res.data.roleSkills);
//         setRoadmap(res.data.roadmap || []);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="p-6">
//         <h1 className="text-2xl font-bold">
//           {user ? `Welcome back, ${user.name} 👋` : "Welcome 👋"}
//         </h1>
//         <p className="text-gray-600">Ready to take the next step in your career?</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//         {/* Skill Gap Chart */}
//         <div className="bg-white p-4 rounded-xl shadow-md col-span-1">
//           <h2 className="text-lg font-semibold mb-2">Skill Gap Analysis</h2>
//           {Object.keys(userSkills).length > 0 ? (
//             <SkillChart userSkills={userSkills} roleSkills={roleSkills} />
//           ) : (
//             <p className="text-gray-500">No skills data available</p>
//           )}
//         </div>

//         {/* Career Roadmap */}
//         <div className="bg-white p-4 rounded-xl shadow-md col-span-2">
//           <h2 className="text-lg font-semibold mb-2">Career Roadmap</h2>
//           {roadmap && roadmap.length > 0 ? (
//             <ul className="list-disc ml-5 space-y-2 text-gray-700">
//               {roadmap.map((step, i) => (
//                 <li key={i}>{step.step ? `Step ${step.step}: ` : ""}{step.title}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No roadmap generated</p>
//           )}
//         </div>
//       </div>

//       <Chatbot />
//     </div>
//   );
// };

// export default Dashboard;
//=--------=-=--------=-===========FINAL CODE========------------------==============

// import React, { useEffect, useState, useRef } from "react";
// import Navbar from "../components/Navbar";
// import SkillChart from "../components/SkillChart";
// import Chatbot from "../components/Chatbot";
// import api from "../services/api";
// import JobCard from "../components/JobCard";


// const handleSave = async (job) => {
//   try {
//     await api.post("/api/jobs/save", { jobData: job });
//     alert("Job saved successfully!");
//   } catch (err) {
//     console.error("Error saving job:", err);
//   }
// };


// const Dashboard = () => {
//   const [user, setUser] = useState(null); 
//   const [userSkills, setUserSkills] = useState({});
//   const [roleSkills, setRoleSkills] = useState({});
//   const [roadmap, setRoadmap] = useState([]);
//   const [recommendedJobs, setRecommendedJobs] = useState([]);


//   // Ref to the chatbot section
//   const chatbotRef = useRef();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/api/dashboard");
//         setUser(res.data.profile);
//         setUserSkills(res.data.userSkills);
//         setRoleSkills(res.data.roleSkills);
//         setRoadmap(res.data.roadmap || []);

//         //fetch recommended jobs:
//         if(res.data.profile?.careerGoal){
//           const jobsRes = await api.post("/api/jobs/search", {
//             query: res.data.profile.careerGoal,
//             page: 1
//           });
//           setRecommendedJobs(jobsRes.data.jobs || []);
//         }
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   // Scroll to chatbot when icon is clicked
//   const scrollToChat = () => {
//     chatbotRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 relative">
//       <Navbar />

//       <div className="p-6">
//         <h1 className="text-2xl font-bold">
//           {user ? `Welcome back, ${user.name} 👋` : "Welcome 👋"}
//         </h1>
//         <p className="text-gray-600">Ready to take the next step in your career?</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//         {/* Skill Gap Chart */}
//         <div className="bg-white p-4 rounded-xl shadow-md col-span-1">
//           <h2 className="text-lg font-semibold mb-2">Skill Gap Analysis</h2>
//           {Object.keys(userSkills).length > 0 ? (
//             <SkillChart userSkills={userSkills} roleSkills={roleSkills} />
//           ) : (
//             <p className="text-gray-500">No skills data available</p>
//           )}
//         </div>

//         {/* Career Roadmap */}
//         <div className="bg-white p-4 rounded-xl shadow-md col-span-2">
//           <h2 className="text-lg font-semibold mb-2">Career Roadmap</h2>
//           {roadmap && roadmap.length > 0 ? (
//             <ul className="list-disc ml-5 space-y-2 text-gray-700">
//               {roadmap.map((step, i) => (
//                 <li key={i}>{step.step ? `Step ${step.step}: ` : ""}{step.title}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No roadmap generated</p>
//           )}
//         </div>
//       </div>


//       {/* Recommended Jobs Section */}
//       <div className="bg-white p-4 rounded-xl shadow-md mt-6">
//        <h2 className="text-lg font-semibold mb-2">Recommended Jobs for You</h2>
//       {recommendedJobs && recommendedJobs.length > 0 ? (
//     <div className="space-y-4">
//       {recommendedJobs.map((job, i) => (
//         <JobCard key={i} job={job} onSave={handleSave} />
//       ))}
//     </div>
//   ) : (
//     <p className="text-gray-500">No job recommendations found. Update your career goal!</p>
//   )}
// </div>

//      {/* Sticky Chat Icon with Text */}
// <button
//   onClick={scrollToChat}
//   className="fixed bottom-6 right-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
//   title="Chat with agent"
// >
//   <span className="text-xl">💬</span>
//   <span className="font-medium">Chat with me</span>
// </button>


//       {/* Chatbot section */}
//       <div ref={chatbotRef}>
//         <Chatbot />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//---------------============= FINAL CODE WITH NICE UI++++++++++++++++_____________

// src/pages/Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import SkillChart from "../components/SkillChart";
import Chatbot from "../components/Chatbot";
import api from "../services/api";
import JobCard from "../components/JobCard";

const handleSave = async (job) => {
  try {
    await api.post("/api/jobs/save", { jobData: job });
    alert("Job saved successfully!");
  } catch (err) {
    console.error("Error saving job:", err);
  }
};

const Dashboard = () => {
  const [user, setUser] = useState(null); 
  const [userSkills, setUserSkills] = useState({});
  const [roleSkills, setRoleSkills] = useState({});
  const [roadmap, setRoadmap] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const chatbotRef = useRef();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/api/dashboard");
        setUser(res.data.profile);
        setUserSkills(res.data.userSkills);
        setRoleSkills(res.data.roleSkills);
        setRoadmap(res.data.roadmap || []);

        if(res.data.profile?.careerGoal){
          const jobsRes = await api.post("/api/jobs/search", {
            query: res.data.profile.careerGoal,
            page: 1
          });
          setRecommendedJobs(jobsRes.data.jobs || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchDashboard();
  }, []);

  const scrollToChat = () => {
    chatbotRef.current?.scrollIntoView({ behavior: "smooth" });
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

      {/* Welcome Section */}
      <div className="p-6 text-center md:text-left relative z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-2 animate-fadeIn">
          {user ? `Welcome back, ${user.name} 👋` : "Welcome 👋"}
        </h1>
        <p className="text-gray-700 text-lg animate-fadeIn delay-200">
          Ready to take the next step in your career?
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 relative z-10">
        {/* Skill Gap Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Skill Gap Analysis</h2>
          {Object.keys(userSkills).length > 0 ? (
            <SkillChart userSkills={userSkills} roleSkills={roleSkills} />
          ) : (
            <p className="text-gray-500">No skills data available</p>
          )}
        </div>

        {/* Career Roadmap */}
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Career Roadmap</h2>
          {roadmap && roadmap.length > 0 ? (
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              {roadmap.map((step, i) => (
                <li key={i}>
                  {step.step ? `Step ${step.step}: ` : ""}{step.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No roadmap generated</p>
          )}
        </div>
      </div>

      {/* Recommended Jobs Section */}
      <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 mx-6 mb-6 relative z-10">
        <h2 className="text-xl font-semibold text-purple-600 mb-4">Recommended Jobs for You</h2>
        {recommendedJobs && recommendedJobs.length > 0 ? (
          <div className="space-y-4">
            {recommendedJobs.map((job, i) => (
              <JobCard key={i} job={job} onSave={handleSave} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No job recommendations found. Update your career goal!</p>
        )}
      </div>

      {/* Sticky Chat Icon */}
      <button
        onClick={scrollToChat}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-purple-700 transition transform hover:scale-105 z-10"
        title="Chat with agent"
      >
        <span className="text-xl">💬</span>
        <span className="font-medium">Chat with me</span>
      </button>

      {/* Chatbot section */}
      <div ref={chatbotRef} className="relative z-10">
        <Chatbot />
      </div>
    </div>
  );
};

export default Dashboard;
