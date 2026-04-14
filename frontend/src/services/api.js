// src/services/api.js
import axios from "axios";

// const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// const baseURL = import.meta.env.VITE_API_URL || "/"; // proxy will handle /api/*
const baseURL = "/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// optionally add interceptor to attach auth token
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token"); // if you use JWT
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
