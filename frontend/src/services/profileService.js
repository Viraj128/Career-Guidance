// // src/services/profileService.js
// import api from "./api";

// const getProfile = (uid) => api.get("/api/profile");
// const updateProfile = (data) => api.put("/api/profile", data);

// export default { getProfile, updateProfile };


// import { generateRoadmap } from "../../../backend/controllers/profileController";
// import api from "./api";
// import { getAuth } from "firebase/auth";

// // helper to get token
// const getAuthHeader = async () => {
//   const auth = getAuth();
//   const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const getProfile = async () => {
//   const headers = await getAuthHeader();
//   return api.get("/api/profile/", { headers });
// };


// const updateProfile = async (data) => {
//   const headers = await getAuthHeader();
//   return api.put("/api/profile/", data, { headers });
// };

// const generateRoadmap = async (careerGoal) => {
//   return axios.post("/api/profile/roadmap", { careerGoal });
// };


// export default { getProfile, updateProfile, generateRoadmap };




//===============================================
import api from "./api"; // your axios instance
import { getAuth } from "firebase/auth";

// helper to get token
const getAuthHeader = async () => {
  const auth = getAuth();
  const token = auth.currentUser ? await auth.currentUser.getIdToken(true) : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getProfile = async () => {
  const headers = await getAuthHeader();
  return api.get("/api/profile", { headers });
};

const updateProfile = async (data) => {
  const headers = await getAuthHeader();
  return api.put("/api/profile", data, { headers });
};

const generateRoadmap = async (careerGoal) => {
  const headers = await getAuthHeader();
  return api.post("/api/profile/roadmap", { careerGoal }, { headers });
};

export default { getProfile, updateProfile, generateRoadmap };
