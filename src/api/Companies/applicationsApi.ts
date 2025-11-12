import { httpClient } from "../axiosClient";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university?: string;
  major?: string;
  graduationYear?: number;
  xp?: number;
  level?: string;
}

export interface Application {
  id: string;
  studentId: string;
  jobId: string;
  status:
    | "APPLIED"
    | "REVIEWING"
    | "SHORTLISTED"
    | "INTERVIEWING"
    | "OFFERED"
    | "HIRED"
    | "REJECTED";
  resumeUrl?: string;
  coverLetter?: string;
  createdAt: string;
  student: Student;
}

export interface ApplicationWithJob extends Application {
  job: {
    id: string;
    title: string;
    location?: string;
    remote: boolean;
  };
}

/**
 * Get all applications for a specific job
 * @param jobId - Job ID
 * @returns Array of applications with student details
 */
export async function getJobApplications(
  jobId: string
): Promise<Application[]> {
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

/**
 * Get all applications across all company jobs
 * This fetches all jobs first, then gets applications for each
 * @returns Array of applications with job details
 */
export async function getAllApplications(): Promise<ApplicationWithJob[]> {
  try {
    // First get all company jobs
    const jobsResponse = await httpClient.get("/companies/jobs/my-jobs");

    if (jobsResponse.status !== 200 || !jobsResponse.data?.data) {
      return [];
    }

    const jobs = jobsResponse.data.data;
    const allApplications: ApplicationWithJob[] = [];

    // Fetch applications for each job
    for (const job of jobs) {
      const applications = await getJobApplications(job.id);

      // Add job details to each application
      const applicationsWithJob = applications.map((app) => ({
        ...app,
        job: {
          id: job.id,
          title: job.title,
          location: job.location,
          remote: job.remote,
        },
      }));

      allApplications.push(...applicationsWithJob);
    }

    // Sort by createdAt descending
    return allApplications.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error: any) {
    console.error("Failed to fetch all applications:", error);
    return [];
  }
}

/**
 * Update application status
 * @param applicationId - Application ID
 * @param status - New status
 */
export async function updateApplicationStatus(
  applicationId: string,
  status: Application["status"]
): Promise<Application | null> {
  try {
    const response = await httpClient.patch(
      `/companies/applications/${applicationId}`,
      { status }
    );

    if (response.status === 200 && response.data?.data) {
      return response.data.data;
    }

    return null;
  } catch (error: any) {
    console.error("Failed to update application status:", error);
    return null;
  }
}
