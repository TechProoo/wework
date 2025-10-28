import type { login, StudentData } from "../../types/auth";
import { httpClient } from "../axiosClient";

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
    return {
      ...response.data,
    };
  } catch (error: any) {
    const actualError = error?.response?.data || error?.data || {};
    throw {
      statusCode: actualError.statusCode || 500,
      message:
        actualError.message ||
        actualError.cause ||
        "Signup failed. Please try again.",
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
    const response = await httpClient.post("/students/login", data);
    // Server sets an HttpOnly cookie with the access token. We can't read that in JS.
    // Return the login response and also fetch the current profile so the frontend
    // immediately has authenticated user data.
    const profile = await getProfile();
    return {
      data: profile,
      message: response.data?.message || "Login successful",
    };
  } catch (error: any) {
    const actualError = error?.response?.data || error?.data || {};
    throw {
      statusCode: actualError.statusCode || 500,
      message:
        actualError.message ||
        actualError.cause ||
        "Login failed. Please try again.",
    };
  }
}

export async function logout() {
  try {
    await httpClient.post("/students/logout");
  } catch (e) {
    // ignore logout errors
  }
  // Server clears the cookie. No client-side token stored when using HttpOnly cookies.
}

export async function getProfile() {
  try {
    const res = await httpClient.get("/students/profile");
    return res.data;
  } catch (error: any) {
    const actualError = error?.response?.data || {};
    throw {
      statusCode: actualError.statusCode || 500,
      message: actualError.message || "Failed to fetch profile",
    };
  }
}

export async function updateProfile(payload: Partial<StudentData>) {
  try {
    const res = await httpClient.patch("/students/profile", payload);
    return res.data;
  } catch (error: any) {
    const actualError = error?.response?.data || {};
    throw {
      statusCode: actualError.statusCode || 500,
      message: actualError.message || "Failed to update profile",
    };
  }
}
