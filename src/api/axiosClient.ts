import axios from "axios";

// Prefer explicit VITE_API_BASE_URL or VITE_API_URL; otherwise default to localhost:3000 for local dev
const API_BASE =
  (import.meta.env as any).VITE_API_BASE_URL ||
  (import.meta.env as any).VITE_API_URL ||
  "http://localhost:3000";

export const httpClient = axios.create({
  baseURL: API_BASE || undefined,
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => config);

console.debug("wework httpClient baseURL:", API_BASE);
