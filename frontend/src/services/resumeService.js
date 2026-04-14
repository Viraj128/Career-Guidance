// src/services/resumeService.js
import api from "./api";

const generateResume = (profileData) => api.post("/api/resume/generate", { profileData });
const generateCoverLetter = (params) => api.post("/api/resume/cover-letter", params);
const getResumes = () => api.get("/api/resume");

export default { generateResume, generateCoverLetter, getResumes };
