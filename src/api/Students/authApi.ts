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
      response,
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

export async function getProfile() {
  try {
    console.log("Getting profile");
    const res = await httpClient.get("/students/profile");
    // Log the full response and the parsed data so it's easy to inspect in the browser console
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Could not resolve profile");
    }
    return res.data;
  } catch (error: any) {
    // Log error details to help debug why the request failed (network / 401 / CORS / cookie issues)
    console.error("getProfile error:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
    console.log(error)
    // If unauthorized, return null so callers can treat as unauthenticated.
    const status =
      error?.response?.status ||
      error?.status ||
      error?.response?.data?.statusCode;
    if (status === 401 || status === 403) {
      return null;
    }
    const actualError = error?.response?.data || {};
    throw {
      statusCode: actualError.statusCode || 500,
      message: actualError.message || "Failed to fetch profile",
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
    console.log("login response:", response.status, response.data);
    // After login, the server sets an HttpOnly cookie. Fetch the profile
    // so the frontend immediately has the authenticated user data.
    const profile = await getProfile();
    console.log("ddddd", profile);

    return {
      data: profile,
      message: response.data?.message || "Login successful,i think",
    };
  } catch (error: any) {
    console.error("Login error:", error);
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
