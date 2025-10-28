import { httpClient } from "../api/axiosClient";

export const TOKEN_KEY = "wework_token";

export function setToken(token?: string | null) {
  if (token) {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      // ignore storage errors
    }
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (e) {}
    delete httpClient.defaults.headers.common["Authorization"];
  }
}

export function getTokenFromStorage() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || null;
  } catch (e) {
    return null;
  }
}

export function initSession() {
  const t = getTokenFromStorage();
  if (t) setToken(t);
}
