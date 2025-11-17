import { httpClient } from "../axiosClient";
import toast from "react-hot-toast";

export interface CreateJobPayload {
  title: string;
  location?: string;
  remote?: boolean;
  description: string;
  requirements: string[];
  salaryRange?: string;
  status?: "OPEN" | "CLOSED" | "FILLED";
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  location?: string;
  remote: boolean;
  description: string;
  requirements: string[];
  salaryRange?: string;
  status: "OPEN" | "CLOSED" | "FILLED";
  createdAt: string;
  updatedAt: string;
}

/**
 * Create a new job posting
 * @param jobData - Job details
 * @returns Created job object
 */
export async function createJob(jobData: CreateJobPayload): Promise<Job> {
  try {
    const response = await httpClient.post("/companies/jobs", jobData);

    if (response.status === 201 && response.data?.data) {
      toast.success("Job posted successfully!");
      return response.data.data;
    }

    throw new Error("Failed to create job");
  } catch (error: any) {
    const actualError = error?.response?.data || error?.data || {};
    const errorMessage =
      actualError.message || "Failed to post job. Please try again.";
    toast.error(errorMessage);
    throw {
      statusCode: actualError.statusCode || 500,
      message: errorMessage,
    };
  }
}

/**
 * Get all jobs posted by the authenticated company
 * @returns Array of jobs
 */
export async function getMyJobs(): Promise<Job[]> {
  try {
    const response = await httpClient.get("/companies/jobs/my-jobs");

    if (response.status === 200 && response.data?.data) {
      return response.data.data;
    }

    return [];
  } catch (error: any) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}

/**
 * Get all public jobs (discoverable by students)
 * Supports optional filters via query params on the server
 */
export async function getAllJobs(filters?: {
  companyId?: string;
  status?: string;
  remote?: boolean;
}): Promise<Job[]> {
  try {
    const params: any = {};
    if (filters?.companyId) params.companyId = filters.companyId;
    if (filters?.status) params.status = filters.status;
    if (filters?.remote !== undefined) params.remote = String(filters.remote);

    const response = await httpClient.get('/companies/jobs/all', { params });

    if (response.status === 200 && response.data?.data) {
      return response.data.data;
    }

    return [];
  } catch (error: any) {
    console.error('Failed to fetch all jobs:', error);
    return [];
  }
}

/**
 * Get a single job by ID
 * @param jobId - Job ID
 * @returns Job object
 */
export async function getJobById(jobId: string): Promise<Job | null> {
  try {
    const response = await httpClient.get(`/companies/jobs/${jobId}`);

    if (response.status === 200 && response.data?.data) {
      return response.data.data;
    }

    return null;
  } catch (error: any) {
    console.error("Failed to fetch job:", error);
    return null;
  }
}

/**
 * Update an existing job
 * @param jobId - Job ID
 * @param jobData - Updated job details
 * @returns Updated job object
 */
export async function updateJob(
  jobId: string,
  jobData: Partial<CreateJobPayload>
): Promise<Job> {
  try {
    const response = await httpClient.patch(
      `/companies/jobs/${jobId}`,
      jobData
    );

    if (response.status === 200 && response.data?.data) {
      toast.success("Job updated successfully!");
      return response.data.data;
    }

    throw new Error("Failed to update job");
  } catch (error: any) {
    const actualError = error?.response?.data || error?.data || {};
    const errorMessage =
      actualError.message || "Failed to update job. Please try again.";
    toast.error(errorMessage);
    throw {
      statusCode: actualError.statusCode || 500,
      message: errorMessage,
    };
  }
}

/**
 * Delete a job posting
 * @param jobId - Job ID
 */
export async function deleteJob(jobId: string): Promise<void> {
  try {
    const response = await httpClient.delete(`/companies/jobs/${jobId}`);

    if (response.status === 200) {
      toast.success("Job deleted successfully!");
      return;
    }

    throw new Error("Failed to delete job");
  } catch (error: any) {
    const actualError = error?.response?.data || error?.data || {};
    const errorMessage =
      actualError.message || "Failed to delete job. Please try again.";
    toast.error(errorMessage);
    throw {
      statusCode: actualError.statusCode || 500,
      message: errorMessage,
    };
  }
}

/**
 * Get all applications for a specific job
 * @param jobId - Job ID
 * @returns Array of applications
 */
export async function getJobApplications(jobId: string): Promise<any[]> {
  try {
    const response = await httpClient.get(
      `/companies/jobs/${jobId}/applications`
    );

    if (response.status === 200 && response.data?.data) {
      return response.data.data;
    }

    return [];
  } catch (error: any) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
}
