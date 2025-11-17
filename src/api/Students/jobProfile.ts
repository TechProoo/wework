import { httpClient } from "../axiosClient";

export interface JobProfile {
  id: string;
  studentId: string;
  headline: string | null;
  bio: string | null;
  resumeUrl: string | null;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    university: string;
    major: string;
    graduationYear: string;
  };
}

export interface JobProfileData {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  skills?: string[];
}

export const jobProfileAPI = {
  // Create or update job profile
  createOrUpdate: async (data: JobProfileData) => {
    const response = await httpClient.post("/students/job-profile", data);
    // Unwrap backend wrapper and return the actual profile (or null)
    return response.data?.data;
  },

  // Get current user's job profile
  get: async () => {
    const response = await httpClient.get("/students/job-profile");
    // response.data is { statusCode, message, data }
    // Return the inner `data` (profile object) so callers receive JobProfile | null
    return response.data?.data;
  },

  // Delete job profile
  delete: async () => {
    const response = await httpClient.delete("/students/job-profile");
    return response.data; // keep wrapper for delete (no profile data)
  },
};
