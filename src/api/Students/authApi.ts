import type { login, StudentData } from "../../types/auth";
import { httpClient } from "../axiosClient";
import toast from "react-hot-toast";

/**
 * Sends signup request to backend
 * @param formData - Signup form data
 * @returns response body with created user data
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

    toast.success("Account created successfully!");
    return response.data;
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

/**
 * Fetches the authenticated user's profile
 * @returns User profile data or null if unauthorized
 */
export async function getProfile() {
  try {
    const res = await httpClient.get("/students/profile");

    // Backend returns { statusCode, message, data: userProfile }
    if (res.status >= 200 && res.status < 300 && res.data?.data) {
      return res.data.data; // Return the user profile directly
    }

    throw new Error("Invalid profile response");
  } catch (error: any) {
    const status = error?.response?.status || error?.status;

    // Don't show toast for unauthorized - this is expected during auth checks
    if (status === 401 || status === 403) {
      return null;
    }

    // For other errors, show toast and return null
    const actualError = error?.response?.data || {};
    const errorMessage = actualError.message || "Failed to fetch profile";
    toast.error(errorMessage);
    return null;
  }
}

/**
 * Sends login request to backend
 * @param data - Login credentials
 * @returns User profile data
 * @throws {statusCode, message} if login fails
 */
export async function login(data: login) {
  try {
    // Step 1: Send login credentials
    const response = await httpClient.post("/students/login", data);

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    // Step 2: Fetch profile after successful login (cookie is now set)
    const profile = await getProfile();

    if (!profile) {
      throw new Error("Failed to fetch profile after login");
    }

    toast.success("Login successful! Welcome back.");
    return profile;
  } catch (error: any) {
    const actualError = error?.response?.data || error?.data || {};
    const errorMessage =
      actualError.message ||
      actualError.cause ||
      error.message ||
      "Login failed. Please try again.";

    toast.error(errorMessage);
    throw {
      statusCode: actualError.statusCode || 500,
      message: errorMessage,
    };
  }
}

/**
 * Logs out the current user
 */
export async function logout() {
  try {
    await httpClient.post("/students/logout");
    toast.success("Logged out successfully");
  } catch (e) {
    // Ignore logout errors but log them
    console.warn("Logout request failed:", e);
  }
}

/**
 * Updates the user's profile
 * @param payload - Profile update data
 * @returns Updated user profile
 */
export async function updateProfile(payload: Partial<StudentData>) {
  try {
    const res = await httpClient.patch("/students/profile", payload);
    toast.success("Profile updated successfully!");

    // Backend returns { statusCode, message, data: updatedProfile }
    return res.data?.data || res.data;
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
