// import React from "react";
// import Navbar from "../components/Navbar";
// import Chatbot from "../components/Chatbot";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <section className="text-center py-20">
//         <h1 className="text-4xl font-bold mb-4">Career Navigator</h1>
//         <p className="text-lg text-gray-600">
//           Your AI-powered career assistant — explore jobs, skill gaps, resumes, and more.
//         </p>
//       </section>
//       <Chatbot />
//     </div>
//   );
// };

// export default Home;




// src/pages/Home.jsx
// import React from "react";
// import Navbar from "../components/Navbar";
// import Chatbot from "../components/Chatbot";

// const features = [
//   {
//     title: "Explore Careers",
//     description: "Discover career paths and role requirements tailored to you.",
//     emoji: "🚀",
//   },
//   {
//     title: "Skill Gap Analysis",
//     description: "Identify your strengths and areas to improve for your dream job.",
//     emoji: "📊",
//   },
//   {
//     title: "AI Resume Builder",
//     description: "Generate a professional resume instantly using AI.",
//     emoji: "📝",
//   },
//   {
//     title: "Job Recommendations",
//     description: "Get personalized job suggestions matching your profile and skills.",
//     emoji: "💼",
//   },
// ];

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
//       <Navbar />

//       {/* Main Header */}
//       <section className="text-center py-20 relative z-10">
//         <h1 className="text-5xl font-bold mb-4 text-purple-700 animate-fadeIn">
//           Career Navigator
//         </h1>
//         <p className="text-lg text-gray-700 mb-8 animate-fadeIn delay-500">
//           Your AI-powered career assistant — explore jobs, skill gaps, resumes, and more.
//         </p>
//         <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition animate-fadeIn delay-700">
//           Get Started
//         </button>
//       </section>

//       {/* Feature Section */}
//       <section className="py-16 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
//         {features.map((f, i) => (
//           <div
//             key={i}
//             className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition duration-500"
//           >
//             <div className="text-4xl mb-4">{f.emoji}</div>
//             <h3 className="text-xl font-bold mb-2 text-purple-700">{f.title}</h3>
//             <p className="text-gray-600">{f.description}</p>
//           </div>
//         ))}
//       </section>

//       {/* Floating animated blobs */}
//       <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
//       <div className="absolute top-1/3 right-[-10%] w-80 h-80 bg-pink-300 rounded-full opacity-25 blur-3xl animate-blob animation-delay-4000"></div>
//       <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob"></div>

//       {/* Chatbot Section */}
//       <div className="relative z-10">
//         <Chatbot />
//       </div>
//     </div>
//   );
// };

// export default Home;


// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";

const features = [
  { title: "Explore Careers", description: "Discover career paths and role requirements tailored to you.", emoji: "🚀" },
  { title: "Skill Gap Analysis", description: "Identify your strengths and areas to improve for your dream job.", emoji: "📊" },
  { title: "AI Resume Builder", description: "Generate a professional resume instantly using AI.", emoji: "📝" },
  { title: "Job Recommendations", description: "Get personalized job suggestions matching your profile and skills.", emoji: "💼" },
];

const Home = () => {
  const scrollToChat = () => {
    document.getElementById("chatbot-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
      <Navbar />

      {/* Main Header */}
      <section className="text-center py-20 relative z-10">
        <h1 className="text-5xl font-bold mb-4 text-purple-700 animate-fadeIn">
          Career Navigator
        </h1>
        <p className="text-lg text-gray-700 mb-8 animate-fadeIn delay-500">
          Your AI-powered career assistant — explore jobs, skill gaps, resumes, and more.
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition animate-fadeIn delay-700">
          Get Started
        </button>
      </section>

      {/* Feature Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {features.map((f, i) => (
          <div
            key={i}
             className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition duration-500 animate-fadeInOnScroll"
          >
            <div className="text-4xl mb-4">{f.emoji}</div>
            <h3 className="text-xl font-bold mb-2 text-purple-700">{f.title}</h3>
            <p className="text-gray-600">{f.description}</p>
          </div>
        ))}
      </section>

      {/* SVG Waves to fill space */}
    {/* SVG Waves to fill space */}
<div className="relative w-full z-0">
  <svg
    className="w-full h-40 md:h-56"
    viewBox="0 0 1440 320"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#e0e7ff" // lighter purple to contrast bg-gradient
      d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,138.7C672,160,768,224,864,224C960,224,1056,160,1152,154.7C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    />
  </svg>
</div>


      {/* Chatbot Section */}
      <div id="chatbot-section" className="relative z-10">
        <Chatbot />
      </div>

      {/* Floating Chat Prompt */}
      <button
        onClick={scrollToChat}
        className="fixed bottom-6 right-6 flex flex-col items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-xl hover:scale-110 transform transition animate-bounce-slow z-[9999] pointer-events-auto"
        title="Chat with agent"
      >
        <span className="text-2xl animate-pulse">💬</span>
        <span className="font-medium text-sm animate-pulse">Chat with me!</span>
        <span className="text-xs mt-1 animate-bounce">⬇ Scroll down</span>
      </button>

      {/* Floating animated blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-[-10%] w-80 h-80 bg-pink-300 rounded-full opacity-25 blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob"></div>
    </div>
  );
};

export default Home;
