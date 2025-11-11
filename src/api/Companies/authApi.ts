import type { login, CompanyData } from "../../types/auth";
import { httpClient } from "../axiosClient";
import toast from "react-hot-toast";

/**
 * Sends signup request to backend
 * @param formData - Signup form data
 * @returns response body with created user data
 * @throws {statusCode, message} if response's status code is not in the 200s
 */
export async function signUp(formData: CompanyData) {
  try {
    // Prepare payload and remove empty string values to avoid backend validation issues
    const payload: any = {
      companyName: formData.companyName,
      email: formData.email,
      password: formData.password,
    };

    // Add optional fields only if they have values
    if (formData.contactPersonName?.trim())
      payload.contactPersonName = formData.contactPersonName;
    if (formData.phone?.trim()) payload.phone = formData.phone;
    if (formData.industry?.trim()) payload.industry = formData.industry;
    if (formData.website?.trim()) payload.website = formData.website;
    if (formData.companySize?.trim())
      payload.companySize = formData.companySize;
    if (formData.description?.trim())
      payload.description = formData.description;
    if (formData.confirmPassword)
      payload.confirmPassword = formData.confirmPassword;

    const response = await httpClient.post("/companies/signup", payload);

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
    const res = await httpClient.get("/companies/profile");

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
    // Send login credentials - backend sets cookie AND returns profile in same response
    const response = await httpClient.post("/companies/login", data);

    if (response.status !== 200 || !response.data?.data) {
      throw new Error("Login failed - invalid response");
    }

    // Extract user profile directly from login response (no need for separate getProfile call)
    const userProfile = response.data.data;

    toast.success("Login successful! Welcome back.");
    return userProfile;
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
    await httpClient.post("/companies/logout");
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
export async function updateProfile(payload: Partial<CompanyData>) {
  try {
    const res = await httpClient.patch("/companies/profile", payload);
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
