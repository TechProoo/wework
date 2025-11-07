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
    console.log("[authApi] getProfile: fetching profile from backend");
    const res = await httpClient.get("/students/profile");

    console.log("[authApi] getProfile: response status", res.status);
    console.log("[authApi] getProfile: response data", res.data);

    // Backend returns { statusCode, message, data: userProfile }
    if (res.status >= 200 && res.status < 300 && res.data?.data) {
      console.log("[authApi] getProfile: profile fetched successfully");
      return res.data.data; // Return the user profile directly
    }

    console.warn("[authApi] getProfile: invalid response format");
    throw new Error("Invalid profile response");
  } catch (error: any) {
    const status = error?.response?.status || error?.status;

    console.log("[authApi] getProfile: error status", status);
    console.log("[authApi] getProfile: error details", error.response?.data);

    // Don't show toast for unauthorized - this is expected during auth checks
    if (status === 401 || status === 403) {
      console.log("[authApi] getProfile: unauthorized - user not logged in");
      return null;
    }

    console.error("[authApi] getProfile: unexpected error", error);
    return null;
  }
}

/**
 * Sends login request to backend
 * @param data - Login credentials
 * @returns User profile data directly from login response
 * @throws {statusCode, message} if login fails
 */
export async function login(data: login) {
  try {
    console.log("[authApi] login: attempting login for", data.email);

    // Send login credentials - backend sets cookie AND returns profile in same response
    const response = await httpClient.post("/students/login", data);

    console.log("[authApi] login: response status", response.status);
    console.log(
      "[authApi] login: X-Auth-Cookie header",
      response.headers["x-auth-cookie"] || "NOT PRESENT"
    );
    console.log("[authApi] login: response headers", response.headers);

    if (response.status !== 200 || !response.data?.data) {
      throw new Error("Login failed - invalid response");
    }

    // Extract user profile directly from login response (no need for separate getProfile call)
    const userProfile = response.data.data;

    console.log("[authApi] login: profile extracted from response");
    console.log(
      "[authApi] login: Cookie should now be set by browser (check DevTools > Application > Cookies)"
    );

    toast.success("Login successful! Welcome back.");
    return userProfile;
  } catch (error: any) {
    console.error("[authApi] login: error", error);

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
