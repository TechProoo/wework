// src/services/httpService.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", // Use environment variable for base URL
  timeout: 15000, // Request timeout
  headers: {
    "Content-Type": "application/json",
    // Add other default headers if needed
  },
});

// Request Interceptors (e.g., adding authorization token)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Or wherever your token is stored
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptors (e.g., global error handling, refreshing tokens)
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes (e.g., 401 for unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
      console.log("Unauthorized request");
    }
    return Promise.reject(error);
  }
);

export default instance;
