import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../Components/DashboardLayout";
import { Briefcase, ExternalLink } from "lucide-react";
import { getAllJobs } from "../../api/Companies/jobsApi";
import { dummyCourses } from "../../Components/Styles/dummy_courses";
import { List_card } from "../../Components/Styles/List_card";
import { useAuth } from "../../contexts/AuthContext";
import * as bookmarksApi from "../../api/Students/bookmarksApi";

export const Bookmarks: React.FC = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<any[]>([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<any[]>([]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (isAuthenticated) {
        // Fetch bookmarks from backend and then fetch job/course details
        try {
          const bms = await bookmarksApi.getBookmarks();
          const jobIds = bms
            .filter((b) => b.type === "JOB")
            .map((b) => b.targetId);
          const courseIds = bms
            .filter((b) => b.type === "COURSE")
            .map((b) => Number(b.targetId))
            .filter((n) => !Number.isNaN(n));

          // fetch all jobs once and filter
          const jobs = await getAllJobs();
          const filteredJobs = jobs.filter((j) => jobIds.includes(j.id));
          setBookmarkedJobs(filteredJobs);

          // filter courses from dummy data (client-only for now)
          const courses = dummyCourses.filter((c) => courseIds.includes(c.id));
          setBookmarkedCourses(courses);
        } catch (e) {
          console.error("Failed to load bookmarks from backend", e);
          setBookmarkedJobs([]);
          setBookmarkedCourses([]);
        }
      } else {
        // unauthenticated: fallback to localStorage (existing behavior)
        let jobIds: string[] = [];
        try {
          jobIds = JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]");
        } catch (e) {
          jobIds = [];
        }

        if (jobIds.length > 0) {
          try {
            const jobs = await getAllJobs();
            const filtered = jobs.filter((j) => jobIds.includes(j.id));
            setBookmarkedJobs(filtered);
          } catch (e) {
            console.error("Failed to fetch bookmarked jobs", e);
          }
        } else {
          setBookmarkedJobs([]);
        }

        // bookmarked courses stored as numeric ids in localStorage
        let courseIds: number[] = [];
        try {
          courseIds = JSON.parse(
            localStorage.getItem("bookmarkedCourses") || "[]"
          );
        } catch (e) {
          courseIds = [];
        }

        const courses = dummyCourses.filter((c) => courseIds.includes(c.id));
        setBookmarkedCourses(courses);
      }
    };

    load();
  }, [isAuthenticated]);

  return (
    <DashboardLayout
      title="Bookmarks"
      subtitle="Your saved courses and job postings"
      icon={<Briefcase size={18} className="text-white" />}
      removeTopPadding
    >
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4">Bookmarked Jobs</h3>
          {bookmarkedJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-sm text-[var(--color-slate)]">
                No saved jobs yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold">{job.title}</h4>
                    <p className="text-sm text-[var(--color-slate)]">
                      {job.company?.companyName || job.companyId} •{" "}
                      {job.remote ? "Remote" : job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`/companies/jobs/${job.id}`}
                      className="text-[var(--color-primary)] hover:underline flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">Bookmarked Courses</h3>
          {bookmarkedCourses.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-sm text-[var(--color-slate)]">
                No saved courses yet.
              </p>
            </div>
          ) : (
            <List_card courses={bookmarkedCourses} />
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Bookmarks;
