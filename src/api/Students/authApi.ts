import type { login, StudentData } from "../../types/auth";
import { httpClient } from "../axiosClient";
import toast from "react-hot-toast";

/**
 * Sends signup request to backend
 * @param formData - Signup form data
 * @returns response body with token and user data
 * @throws {statusCode, message} if response's status code is not in the 200s
 */
export async function signUp(formData: StudentData) {
  try {
    const response = await httpClient.post("/students/signup", {
      password: formData.password,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      university: formData.university,
      major: formData.major,
      graduationYear: formData.graduationYear,
    });
    // Signup returns created user in response.data. We do not set any client-side token here.
    toast.success("Account created successfully!");
    return {
      response,
    };
  } catch (error: any) {
    const actualError = error?.response?.data || error?.data || {};
    const errorMessage =
      actualError.message ||
      actualError.cause ||
      "Signup failed. Please try again.";
    toast.error(errorMessage);
    throw {
      statusCode: actualError.statusCode || 500,
      message: errorMessage,
    };
  }
}

export async function getProfile() {
  try {
    console.log("Getting profile from:", httpClient.defaults.baseURL);
    console.log("withCredentials:", httpClient.defaults.withCredentials);
    const res = await httpClient.get("/students/profile");
    console.log("Profile response:", res.status, res.data);
    // Log the full response and the parsed data so it's easy to inspect in the browser console
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Could not resolve profile");
    }
    return res;
  } catch (error: any) {
    // Log error details to help debug why the request failed (network / 401 / CORS / cookie issues)
    console.error("getProfile error:");
    console.log(error);
    console.log("Error response headers:", error?.response?.headers);
    console.log("Error config:", error?.config);
    // If unauthorized, return null so callers can treat as unauthenticated.
    const status =
      error?.response?.status ||
      error?.status ||
      error?.response?.data?.statusCode;
    if (status === 401 || status === 403) {
      // Don't show toast for unauthorized during initial auth check
      return null;
    }
    const actualError = error?.response?.data || {};
    const errorMessage = actualError.message || "Failed to fetch profile";
    toast.error(errorMessage);
    throw {
      statusCode: actualError.statusCode || 500,
      message: errorMessage,
    };
  }
}

/**
 * Sends login request to backend
 * @param data - Login credentials
 * @returns response body with token and user data
 * @throws {statusCode, message} if response's status code is not in the 200s
 */
export async function login(data: login) {
  try {
    console.log("Attempting login to:", httpClient.defaults.baseURL);
    const response = await httpClient.post("/students/login", data);

    console.log("login response:", response.status, response.data);
    console.log("login response headers:", response.headers);
    console.log("Set-Cookie header:", response.headers['set-cookie']);
    
    // After login, the server sets an HttpOnly cookie. Fetch the profile
    // so the frontend immediately has the authenticated user data.
    const profile = await getProfile();
    console.log("ddddd", profile);

    if (profile) {
      toast.success("Login successful! Welcome back.");
    }

    return {
      data: profile,
      message: response.data?.message || "Login successful,i think",
    };
  } catch (error: any) {
    console.error("Login error:", error);
    const actualError = error?.response?.data || error?.data || {};
    const errorMessage =
      actualError.message ||
      actualError.cause ||
      "Login failed. Please try again.";
    toast.error(errorMessage);
    throw {
      statusCode: actualError.statusCode || 500,
      message: errorMessage,
    };
  }
}

export async function logout() {
  try {
    await httpClient.post("/students/logout");
    toast.success("Logged out successfully");
  } catch (e) {
    // ignore logout errors but log them
    console.warn("Logout request failed:", e);
  }
  // Server clears the cookie. No client-side token stored when using HttpOnly cookies.
}

export async function updateProfile(payload: Partial<StudentData>) {
  try {
    const res = await httpClient.patch("/students/profile", payload);
    toast.success("Profile updated successfully!");
    return res.data;
  } catch (error: any) {
    const actualError = error?.response?.data || {};
    const errorMessage = actualError.message || "Failed to update profile";
    toast.error(errorMessage);
    throw {
      statusCode: actualError.statusCode || 500,
      message: errorMessage,
    };
  }
}
