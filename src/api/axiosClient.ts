import axios from "axios";

// Prefer explicit VITE_API_BASE_URL or VITE_API_URL; otherwise default to localhost:3000 for local dev
const API_BASE =
  (import.meta.env as any).VITE_API_BASE_URL ||
  (import.meta.env as any).VITE_API_URL ||
  "http://localhost:3000";

export const httpClient = axios.create({
  baseURL: API_BASE || undefined,
  withCredentials: true, // Required for cookie-based authentication
  timeout: 15000, // 15 second timeout
});

// Request interceptor - log requests in development
httpClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error("[API] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error(
        "[API] Response error:",
        error.response?.status,
        error.message
      );
    }

    // Handle network errors
    if (!error.response) {
      console.error("[API] Network error - check if backend is running");
    }

    // Handle 401 Unauthorized - but don't redirect during login/profile checks
    if (error.response?.status === 401) {
      const url = error.config?.url || "";

      // Don't redirect if we're already on login/profile endpoints
      if (
        !url.includes("/login") &&
        !url.includes("/profile") &&
        !url.includes("/signup")
      ) {
        // User session expired, redirect to login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

console.log("[API] httpClient initialized with baseURL:", API_BASE);
