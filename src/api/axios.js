import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "https://your-backend-api.com/api", // replace with actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: attach token to requests if logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // pull from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: global error handling
    if (error.response?.status === 401) {
      // Example: auto-logout if token expired
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
