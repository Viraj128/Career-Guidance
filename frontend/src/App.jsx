// // src/App.jsx
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import Jobs from "./pages/JobSearch";
// import ResumeBuilder from "./pages/ResumeBuilder";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <div className="max-w-7xl mx-auto p-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/jobs" element={<Jobs />} />
//           <Route path="/resume" element={<ResumeBuilder />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResumeBuilder from "./pages/ResumeBuilder";
import JobSearch from "./pages/JobSearch";
import PrivateRoute from "./components/PrivateRoute";
import TestYourself from "./pages/TestYourself";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/resume-builder"
          element={
            <PrivateRoute>
              <ResumeBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/job-search"
          element={
            <PrivateRoute>
              <JobSearch />
            </PrivateRoute>
          }
        />
        <Route
          path="/test-yourself"
          element={
            <PrivateRoute>
              <TestYourself />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

