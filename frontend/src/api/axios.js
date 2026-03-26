import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://https-github-com-sundar-soren-task.onrender.com/api/v1",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
