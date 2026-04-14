// import React from "react";
// import { Link } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// export default function Navbar() {
//   const { user, loginWithGoogle, logout } = useAuth();

//   return (
//     <nav className="bg-white border-b shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="text-xl font-semibold text-slate-800">
//             CareerAI
//           </Link>
//           <Link to="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
//             Dashboard
//           </Link>
//           <Link to="/job-search" className="text-sm text-slate-600 hover:text-slate-900">
//             Jobs
//           </Link>
//           <Link to="/resume" className="text-sm text-slate-600 hover:text-slate-900">
//             Resume
//           </Link>
//           <Link to="/profile" className="text-sm text-slate-600 hover:text-slate-900">
//             Profile
//           </Link>
//           <Link to="/resume-builder" className="text-sm text-slate-600 hover:text-slate-900">
//             Resume Builder
//           </Link>
//           {/* <Link to="/job-search" className="text-sm text-slate-600 hover:text-slate-900">
//             Job Search
//           </Link> */}
//           <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900">
//             Login
//           </Link>
//         </div>

//         <div className="flex items-center space-x-4">
//           {user ? (
//             <>
//               <img src={user.photo} alt="profile" className="w-8 h-8 rounded-full" />
//               <span className="text-sm text-slate-700">Hi, {user.name || user.email}</span>
//               <button
//                 onClick={logout}
//                 className="bg-slate-800 text-white text-sm px-3 py-1 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={loginWithGoogle}
//               className="bg-slate-800 text-white text-sm px-3 py-1 rounded"
//             >
//               Login with Google
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

//--------- FINAL CODE WAS ABOVE BELWO IS FINAL CODE WITH UI----------------------------
// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Jobs", path: "/job-search" },
    { name: "Resume", path: "/resume" },
    { name: "Profile", path: "/profile" },
    { name: "Resume Builder", path: "/resume-builder" },
    { name: "Test Yourself", path: "/test-yourself" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-purple-700 hover:text-purple-900 transition transform hover:scale-105"
        >
          CareerAI
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-300 hover:text-purple-700 ${
                location.pathname === link.path
                  ? "text-purple-600 underline decoration-purple-400"
                  : "text-gray-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <img
                src={user.photo}
                alt="profile"
                className="w-9 h-9 rounded-full border-2 border-purple-500 shadow-sm"
              />
              <span className="text-sm font-medium text-gray-700">
                Hi, {user.name || user.email}
              </span>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm px-4 py-1 rounded-xl shadow-lg hover:scale-105 transform transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-purple-700 transition"
              >
                Login
              </Link>
              <button
                onClick={loginWithGoogle}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm px-4 py-1 rounded-xl shadow-lg hover:scale-105 transform transition"
              >
                Login with Google
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          {/* You can add hamburger menu for mobile here */}
        </div>
      </div>
    </nav>
  );
}
