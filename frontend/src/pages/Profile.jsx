// // frontend/pages/Profile.jsx
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import profileService from "../services/profileService";

// const Profile = () => {
//   const [user, setUser] = useState(null); // Profile data from backend
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   // Fetch user profile on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await profileService.getProfile();

//         const profileData= {
//           ...res.data,
//           skills: Array.isArray(res.data.skills)
//           ? res.data.skills.join(", ")
//           : res.data.skills || "",
//         };
//         setUser(profileData); // Axios → data is inside res.data
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };


  

//   // Save profile updates (excluding email)
//   const handleSave = async () => {
//      console.log("Saving user:", user);
//     try {
//       // const { name, bio, skills, experience } = user;
//       const updatedData = {
//         ...user,
//         skills: user.skills
//           ? user.skills.split(",").map((s) => s.trim())
//           : [],
//       };

//       const res = await profileService.updateProfile(updatedData);
//       setUser({
//         ...res.data,
//         skills: Array.isArray(res.data.skills)
//           ? res.data.skills.join(", ")
//           : res.data.skills || "",
//       }); 
//       // backend returns the full user (with email, uid, etc.)
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-6">Loading...</p>;
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
//           <p>Please login to view profile details.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
//         <h2 className="text-2xl font-bold mb-4">Profile</h2>

//         {editMode ? (
//           <>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={user.name || ""}
//               onChange={handleChange}
//               className="w-full mb-3 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="bio"
//               placeholder="Short Bio"
//               value={user.bio || ""}
//               onChange={handleChange}
//               className="w-full mb-3 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="skills"
//               placeholder="Skills (comma separated)"
//               value={user.skills || ""}
//               onChange={handleChange}
//               className="w-full mb-3 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="experience"
//               placeholder="Experience"
//               value={user.experience || ""}
//               onChange={handleChange}
//               className="w-full mb-3 p-2 border rounded"
//             />

//             <button
//               onClick={handleSave}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//             >
//               Save
//             </button>
//           </>
//         ) : (
//           <>
//             <p>
//               <strong>Email:</strong> {user.email}
//             </p>
//             <p>
//               <strong>Name:</strong> {user.name || "Not set"}
//             </p>
//             <p>
//               <strong>Bio:</strong> {user.bio || "Not set"}
//             </p>
//             <p>
//               <strong>Skills:</strong> {user.skills || "Not set"}
//             </p>
//             <p>
//               <strong>Experience:</strong> {user.experience || "Not set"}
//             </p>

//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg"
//             >
//               Edit Profile
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;



//-------------FINAL CODE BELOW-------------------------

// // frontend/pages/Profile.jsx
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import profileService from "../services/profileService";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   // Fetch user profile on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await profileService.getProfile();

//         const profileData = {
//           ...res.data,
//           // Ensure skills is always an array of objects
//           skills: Array.isArray(res.data.skills)
//             ? res.data.skills.map((s) =>
//                 typeof s === "string" ? { name: s, level: "Beginner" } : s
//               )
//             : [],
//         };
//         setUser(profileData);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   // Handle skill name change
//   const handleSkillChange = (index, value) => {
//     const updatedSkills = [...user.skills];
//     updatedSkills[index].name = value;
//     setUser({ ...user, skills: updatedSkills });
//   };

//   // Handle skill level change
//   const handleLevelChange = (index, value) => {
//     const updatedSkills = [...user.skills];
//     updatedSkills[index].level = value;
//     setUser({ ...user, skills: updatedSkills });
//   };

//   // Add new empty skill
//   const addSkill = () => {
//     setUser({
//       ...user,
//       skills: [...user.skills, { name: "", level: "Beginner" }],
//     });
//   };

//   // Save profile
//   const handleSave = async () => {
//     try {
//       const res = await profileService.updateProfile(user);
//       setUser(res.data);
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   if (loading) return <p className="text-center mt-6">Loading...</p>;
//   if (!user)
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
//           <p>Please login to view profile details.</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
//         <h2 className="text-2xl font-bold mb-4">Profile</h2>

//         {editMode ? (
//           <>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={user.name || ""}
//               onChange={handleChange}
//               className="w-full mb-3 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="bio"
//               placeholder="Short Bio"
//               value={user.bio || ""}
//               onChange={handleChange}
//               className="w-full mb-3 p-2 border rounded"
//             />

//             {/* Career Goal */}
//             <input
//               type="text"
//               name="careerGoal"
//               placeholder="Career Goal"
//               value={user.careerGoal || ""}
//               onChange={handleChange}
//               className="w-full mb-3 p-2 border rounded"
//             />

//             {/* Skills */}
//             <div className="mb-3">
//               <strong>Skills:</strong>
//               {user.skills.map((skill, index) => (
//                 <div key={index} className="flex gap-2 mt-2">
//                   <input
//                     type="text"
//                     placeholder="Skill name"
//                     value={skill.name}
//                     onChange={(e) => handleSkillChange(index, e.target.value)}
//                     className="flex-1 p-2 border rounded"
//                   />
//                   <select
//                     value={skill.level}
//                     onChange={(e) => handleLevelChange(index, e.target.value)}
//                     className="p-2 border rounded"
//                   >
//                     <option value="Beginner">Beginner</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Advanced">Advanced</option>
//                   </select>
//                 </div>
//               ))}
//               <button
//                 onClick={addSkill}
//                 className="bg-gray-200 px-3 py-1 mt-2 rounded"
//               >
//                 + Add Skill
//               </button>
//             </div>

//             <input
//               type="text"
//               name="experience"
//               placeholder="Experience"
//               value={user.experience || ""}
//               onChange={handleChange}
//               className="w-full mb-3 p-2 border rounded"
//             />

//             <button
//               onClick={handleSave}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//             >
//               Save
//             </button>
//           </>
//         ) : (
//           <>
//             <p>
//               <strong>Email:</strong> {user.email}
//             </p>
//             <p>
//               <strong>Name:</strong> {user.name || "Not set"}
//             </p>
//             <p>
//               <strong>Bio:</strong> {user.bio || "Not set"}
//             </p>
//             <p>
//               <strong>Career Goal:</strong> {user.careerGoal || "Not set"}
//             </p>
//             <p>
//               <strong>Skills:</strong>{" "}
//               {user.skills.length > 0
//                 ? user.skills
//                     .map((s) => `${s.name} (${s.level})`)
//                     .join(", ")
//                 : "Not set"}
//             </p>
//             <p>
//               <strong>Experience:</strong> {user.experience || "Not set"}
//             </p>

//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-gray-800 text-white px-4 py-2 mt-4 rounded-lg"
//             >
//               Edit Profile
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

//------FINAL CODE WITH UI IMPROVEMENTS BELOW-------:
// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import profileService from "../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileService.getProfile();
        const profileData = {
          ...res.data,
          skills: Array.isArray(res.data.skills)
            ? res.data.skills.map((s) =>
                typeof s === "string" ? { name: s, level: "Beginner" } : s
              )
            : [],
        };
        setUser(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...user.skills];
    updatedSkills[index].name = value;
    setUser({ ...user, skills: updatedSkills });
  };
  const handleLevelChange = (index, value) => {
    const updatedSkills = [...user.skills];
    updatedSkills[index].level = value;
    setUser({ ...user, skills: updatedSkills });
  };
  const addSkill = () =>
    setUser({ ...user, skills: [...user.skills, { name: "", level: "Beginner" }] });
  const handleSave = async () => {
    try {
      const res = await profileService.updateProfile(user);
      setUser(res.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading)
    return <p className="text-center mt-6 text-gray-600">Loading...</p>;

  if (!user)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6 text-center">
          <p>Please login to view profile details.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Animated blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-[-10%] w-80 h-80 bg-pink-300 rounded-full opacity-25 blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob"></div>

      <Navbar />

      <div className="relative z-10 max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-6 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
          Profile
        </h2>

        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={user.name || ""}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="text"
              name="bio"
              placeholder="Short Bio"
              value={user.bio || ""}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="text"
              name="careerGoal"
              placeholder="Career Goal"
              value={user.careerGoal || ""}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
            />

            {/* Skills */}
            <div className="mb-4">
              <strong className="text-lg">Skills:</strong>
              {user.skills.map((skill, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => handleLevelChange(index, e.target.value)}
                    className="p-2 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              ))}
              <button
                onClick={addSkill}
                className="bg-purple-100 px-3 py-1 mt-2 rounded-xl hover:bg-purple-200 transition"
              >
                + Add Skill
              </button>
            </div>

            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={user.experience || ""}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 transition"
            />

            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transform transition"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-2"><strong>Name:</strong> {user.name || "Not set"}</p>
            <p className="mb-2"><strong>Bio:</strong> {user.bio || "Not set"}</p>
            <p className="mb-2"><strong>Career Goal:</strong> {user.careerGoal || "Not set"}</p>
            <p className="mb-2"><strong>Skills:</strong>{" "}
              {user.skills.length > 0
                ? user.skills.map((s) => `${s.name} (${s.level})`).join(", ")
                : "Not set"}
            </p>
            <p className="mb-2"><strong>Experience:</strong> {user.experience || "Not set"}</p>

            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-purple-700 text-white py-3 rounded-xl shadow hover:scale-105 transform transition mt-4"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
