import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Target,
  Download,
  BarChart3,
  Activity,
  Briefcase,
  UserCheck,
  Building2,
} from "lucide-react";
import { getMyJobs } from "../../api/Companies/jobsApi";
import { getAllApplications } from "../../api/Companies/applicationsApi";
import type { Job } from "../../api/Companies/jobsApi";
import type { ApplicationWithJob } from "../../api/Companies/applicationsApi";

interface AnalyticsData {
  totalApplications: number;
  totalJobs: number;
  activeJobs: number;
  applicationsByStatus: {
    [key: string]: number;
  };
  applicationsByJob: {
    jobTitle: string;
    count: number;
    jobId: string;
  }[];
  applicationTrends: {
    date: string;
    count: number;
  }[];
  topUniversities: {
    name: string;
    count: number;
  }[];
  experienceLevels: {
    level: string;
    count: number;
  }[];
}

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Fetch jobs and applications
      const [jobsData, applicationsData] = await Promise.all([
        getMyJobs(),
        getAllApplications(),
      ]);

      // Filter applications by time range
      const filteredApplications = filterByTimeRange(applicationsData, timeRange);

      // Calculate analytics
      const analytics = calculateAnalytics(jobsData, filteredApplications);
      setAnalyticsData(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterByTimeRange = (apps: ApplicationWithJob[], range: string): ApplicationWithJob[] => {
    const now = new Date();
    const cutoffDate = new Date();

    switch (range) {
      case "7d":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case "1y":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        cutoffDate.setDate(now.getDate() - 30);
    }

    return apps.filter(app => new Date(app.createdAt) >= cutoffDate);
  };

  const calculateAnalytics = (jobsData: Job[], applicationsData: ApplicationWithJob[]): AnalyticsData => {
    // Count applications by status
    const applicationsByStatus: { [key: string]: number } = {};
    applicationsData.forEach(app => {
      applicationsByStatus[app.status] = (applicationsByStatus[app.status] || 0) + 1;
    });

    // Count applications by job
    const applicationsByJobMap: { [key: string]: { title: string; count: number } } = {};
    applicationsData.forEach(app => {
      if (!applicationsByJobMap[app.jobId]) {
        applicationsByJobMap[app.jobId] = {
          title: app.job.title,
          count: 0,
        };
      }
      applicationsByJobMap[app.jobId].count++;
    });

    const applicationsByJob = Object.entries(applicationsByJobMap)
      .map(([jobId, data]) => ({
        jobId,
        jobTitle: data.title,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate application trends (group by date)
    const trendsByDate: { [key: string]: number } = {};
    applicationsData.forEach(app => {
      const date = new Date(app.createdAt).toISOString().split('T')[0];
      trendsByDate[date] = (trendsByDate[date] || 0) + 1;
    });

    const applicationTrends = Object.entries(trendsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14); // Last 14 days

    // Top universities
    const universityMap: { [key: string]: number } = {};
    applicationsData.forEach(app => {
      const university = app.student.university || "Not specified";
      universityMap[university] = (universityMap[university] || 0) + 1;
    });

    const topUniversities = Object.entries(universityMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Experience levels
    const experienceMap: { [key: string]: number } = {};
    applicationsData.forEach(app => {
      const level = app.student.level || "Not specified";
      experienceMap[level] = (experienceMap[level] || 0) + 1;
    });

    const experienceLevels = Object.entries(experienceMap)
      .map(([level, count]) => ({ level, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalApplications: applicationsData.length,
      totalJobs: jobsData.length,
      activeJobs: jobsData.filter(job => job.status === "OPEN").length,
      applicationsByStatus,
      applicationsByJob,
      applicationTrends,
      topUniversities,
      experienceLevels,
    };
  };

  const getStatusLabel = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      "APPLIED": "New",
      "REVIEWING": "Reviewing",
      "SHORTLISTED": "Shortlisted",
      "INTERVIEWING": "Interviewing",
      "OFFERED": "Offered",
      "HIRED": "Hired",
      "REJECTED": "Rejected",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string): string => {
    const colorMap: { [key: string]: string } = {
      "APPLIED": "bg-blue-100 text-blue-800",
      "REVIEWING": "bg-yellow-100 text-yellow-800",
      "SHORTLISTED": "bg-purple-100 text-purple-800",
      "INTERVIEWING": "bg-orange-100 text-orange-800",
      "OFFERED": "bg-green-100 text-green-800",
      "HIRED": "bg-emerald-100 text-emerald-800",
      "REJECTED": "bg-red-100 text-red-800",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
  };

  // Empty State Component
  const renderEmptyState = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="relative mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 rounded-full flex items-center justify-center">
              <BarChart3
                size={40}
                className="text-[var(--color-primary)] md:w-14 md:h-14"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
          No Analytics Data Yet
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Start posting jobs and receiving applications to see your recruitment analytics and insights here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-[var(--color-slate)]/20 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Briefcase size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-[var(--color-text)] mb-2">
              Post Jobs
            </h3>
            <p className="text-sm text-gray-600">
              Create job postings to attract qualified candidates
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[var(--color-slate)]/20 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-[var(--color-text)] mb-2">
              Review Applications
            </h3>
            <p className="text-sm text-gray-600">
              Manage and track candidate applications
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[var(--color-slate)]/20 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-[var(--color-text)] mb-2">
              View Analytics
            </h3>
            <p className="text-sm text-gray-600">
              Track metrics and optimize your hiring process
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!analyticsData || analyticsData.totalApplications === 0) {
    return renderEmptyState();
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[var(--color-text)] mb-1">
              Hiring Analytics
            </h2>
            <p className="text-sm text-gray-600">
              Track your recruitment performance and insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary)]/90 transition-colors text-sm font-medium flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Users size={16} className="text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              Total Applications
            </p>
            <p className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
              {analyticsData.totalApplications}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Briefcase size={16} className="text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              Total Jobs
            </p>
            <p className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
              {analyticsData.totalJobs}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <TrendingUp size={16} className="text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              Active Jobs
            </p>
            <p className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
              {analyticsData.activeJobs}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-100 rounded-xl">
              <UserCheck size={16} className="text-orange-600" />
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              Hired
            </p>
            <p className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
              {analyticsData.applicationsByStatus["HIRED"] || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Application Trends */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)] mb-1">
                Application Trends
              </h3>
              <p className="text-sm text-gray-600">
                Daily application submissions over the last 14 days
              </p>
            </div>
          </div>

          {/* Simple Chart Representation */}
          <div className="h-64 flex items-end justify-between gap-2 mb-4">
            {analyticsData.applicationTrends.length > 0 ? (
              analyticsData.applicationTrends.map((data, index) => {
                const maxValue = Math.max(
                  ...analyticsData.applicationTrends.map((d) => d.count)
                );
                const height = maxValue > 0 ? (data.count / maxValue) * 100 : 0;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="text-xs text-gray-600 font-medium">
                      {data.count}
                    </div>
                    <div
                      className="w-full bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] rounded-t-lg min-h-[8px] transition-all duration-300"
                      style={{ height: `${Math.max(height, 8)}%` }}
                    />
                    <div className="text-xs text-gray-500">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No trend data available
              </div>
            )}
          </div>
        </div>

        {/* Top Universities */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
              Top Universities
            </h3>
            <Building2 size={20} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            {analyticsData.topUniversities.length > 0 ? (
              analyticsData.topUniversities.map((uni, index) => {
                const total = analyticsData.totalApplications;
                const percentage = total > 0 ? Math.round((uni.count / total) * 100) : 0;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold"
                      >
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[var(--color-text)] truncate">
                          {uni.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {uni.count} applications
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-[var(--color-text)]">
                        {percentage}%
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No university data available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
              Application Status Distribution
            </h3>
            <Activity size={20} className="text-gray-400" />
          </div>

          <div className="space-y-3">
            {Object.entries(analyticsData.applicationsByStatus)
              .filter(([_, count]) => count > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([status, count], index) => {
                const percentage = analyticsData.totalApplications > 0
                  ? Math.round((count / analyticsData.totalApplications) * 100)
                  : 0;

                return (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(
                            status
                          )}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{count}</span>
                        <span className="text-xs text-gray-500">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Top Performing Jobs */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
              Top Performing Jobs
            </h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            {analyticsData.applicationsByJob.length > 0 ? (
              analyticsData.applicationsByJob.map((job, index) => (
                <div
                  key={index}
                  className="p-3 bg-[var(--color-light)] rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-[var(--color-text)] truncate flex-1">
                      {job.jobTitle}
                    </h4>
                    <div className="flex items-center gap-1 ml-2">
                      <Users size={12} className="text-[var(--color-primary)]" />
                      <span className="text-xs font-medium">
                        {job.count}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="text-gray-500">Applications received</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No job data available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Experience Level Distribution */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
            Experience Level Distribution
          </h3>
          <Target size={20} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {analyticsData.experienceLevels.length > 0 ? (
            analyticsData.experienceLevels.map((level, index) => {
              const percentage = analyticsData.totalApplications > 0
                ? Math.round((level.count / analyticsData.totalApplications) * 100)
                : 0;
              
              const colors = [
                "from-blue-500 to-blue-600",
                "from-purple-500 to-purple-600",
                "from-green-500 to-green-600",
                "from-orange-500 to-orange-600",
                "from-red-500 to-red-600",
              ];

              return (
                <div
                  key={index}
                  className="text-center p-4 bg-[var(--color-light)] rounded-xl"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${colors[index % colors.length]} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Users size={20} className="text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-[var(--color-text)] mb-1 truncate">
                    {level.level || 'Not Specified'}
                  </h4>
                  <p className="text-lg font-bold text-[var(--color-primary)] mb-1">
                    {level.count}
                  </p>
                  <p className="text-xs text-gray-600">{percentage}%</p>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No experience level data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
