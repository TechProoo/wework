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
    return response.data; // Returns { statusCode, message, data: profile }
  },

  // Get current user's job profile
  get: async () => {
    const response = await httpClient.get("/students/job-profile");
    return response.data; // Returns { statusCode, message, data: profile }
  },

  // Delete job profile
  delete: async () => {
    const response = await httpClient.delete("/students/job-profile");
    return response.data; // Returns { statusCode, message }
  },
};
