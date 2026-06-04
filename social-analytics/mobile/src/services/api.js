import axios from "axios";

const api = axios.create({
  baseURL: "https://social-analytics-api-enx0.onrender.com", // coloque seu IP local
});

export default api;