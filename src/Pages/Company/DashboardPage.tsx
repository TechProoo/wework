import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  TrendingUp,
  Calendar,
  MessageSquare,
  Plus,
  BarChart3,
  Target,
  Clock,
  Star,
  Briefcase,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import JobPostingsPage from "./JobPostingsPage";
import CandidatesPage from "./CandidatesPage";
import AnalyticsPage from "./AnalyticsPage";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  applicants: number;
  posted: string;
  status: "Active" | "Paused" | "Closed";
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: string;
  location: string;
  avatar: string;
  rating: number;
  status: "New" | "Reviewing" | "Interviewing" | "Hired" | "Rejected";
}

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Apply company dashboard layout class to body
  useEffect(() => {
    document.body.classList.add("company-dashboard-layout");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("company-dashboard-layout");
    };
  }, []);

  // Sample data - replace with real API calls
  const stats = {
    totalJobs: 12,
    activeJobs: 8,
    totalApplicants: 156,
    interviewsScheduled: 24,
  };

  const recentJobs: JobPosting[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      applicants: 42,
      posted: "2 days ago",
      status: "Active",
    },
    {
      id: "2",
      title: "UX Designer",
      department: "Design",
      location: "Lagos, Nigeria",
      type: "Full-time",
      salary: "$60,000 - $90,000",
      applicants: 28,
      posted: "5 days ago",
      status: "Active",
    },
    {
      id: "3",
      title: "Product Manager",
      department: "Product",
      location: "Hybrid",
      type: "Full-time",
      salary: "$90,000 - $130,000",
      applicants: 33,
      posted: "1 week ago",
      status: "Paused",
    },
  ];

  const topCandidates: Candidate[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      skills: ["React", "TypeScript", "Node.js"],
      experience: "5+ years",
      location: "Lagos, Nigeria",
      avatar: "SJ",
      rating: 4.8,
      status: "New",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@example.com",
      skills: ["UI/UX", "Figma", "Design Systems"],
      experience: "3+ years",
      location: "Accra, Ghana",
      avatar: "MC",
      rating: 4.9,
      status: "Reviewing",
    },
    {
      id: "3",
      name: "Amara Okafor",
      email: "amara@example.com",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      experience: "7+ years",
      location: "Cape Town, SA",
      avatar: "AO",
      rating: 4.7,
      status: "Interviewing",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "New":
        return "bg-green-100 text-green-800";
      case "Paused":
      case "Reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Interviewing":
        return "bg-blue-100 text-blue-800";
      case "Hired":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Total Jobs
              </p>
              <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] truncate">
                {stats.totalJobs}
              </p>
            </div>
            <div className="p-2 md:p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex-shrink-0">
              <Briefcase size={16} className="text-white md:w-5 md:h-5" />
            </div>
          </div>
          <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm">
            <TrendingUp
              size={12}
              className="text-green-500 mr-1 md:w-[14px] md:h-[14px]"
            />
            <span className="text-green-600 truncate">
              +12% from last month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Active Jobs
              </p>
              <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] truncate">
                {stats.activeJobs}
              </p>
            </div>
            <div className="p-2 md:p-3 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-slate)] rounded-xl flex-shrink-0">
              <Target size={16} className="text-white md:w-5 md:h-5" />
            </div>
          </div>
          <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm">
            <span className="text-gray-600 truncate">
              {stats.activeJobs} of {stats.totalJobs} jobs active
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Total Applicants
              </p>
              <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] truncate">
                {stats.totalApplicants}
              </p>
            </div>
            <div className="p-2 md:p-3 bg-gradient-to-br from-[var(--color-slate)] to-[var(--color-primary)] rounded-xl flex-shrink-0">
              <Users size={16} className="text-white md:w-5 md:h-5" />
            </div>
          </div>
          <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm">
            <TrendingUp
              size={12}
              className="text-green-500 mr-1 md:w-[14px] md:h-[14px]"
            />
            <span className="text-green-600 truncate">+8% this week</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Interviews
              </p>
              <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] truncate">
                {stats.interviewsScheduled}
              </p>
            </div>
            <div className="p-2 md:p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-slate)] rounded-xl flex-shrink-0">
              <Calendar size={16} className="text-white md:w-5 md:h-5" />
            </div>
          </div>
          <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm">
            <Clock
              size={12}
              className="text-blue-500 mr-1 md:w-[14px] md:h-[14px]"
            />
            <span className="text-blue-600 truncate">6 this week</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
              Recent Job Postings
            </h3>
            <button className="text-[var(--color-primary)] text-xs md:text-sm font-medium hover:text-[var(--color-primary)]/80">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentJobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="p-3 md:p-4 bg-[var(--color-light)] rounded-xl"
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h4 className="font-medium text-[var(--color-text)] text-xs md:text-sm line-clamp-2">
                    {job.title}
                  </h4>
                  <span
                    className={`px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2 truncate">
                  {job.department} • {job.location}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="truncate">{job.applicants} applicants</span>
                  <span className="flex-shrink-0">{job.posted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Candidates */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
              Top Candidates
            </h3>
            <button className="text-[var(--color-primary)] text-xs md:text-sm font-medium hover:text-[var(--color-primary)]/80">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topCandidates.slice(0, 3).map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[var(--color-light)] rounded-xl"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm flex-shrink-0">
                  {candidate.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[var(--color-text)] text-xs md:text-sm truncate">
                    {candidate.name}
                  </h4>
                  <p className="text-xs text-gray-600 truncate">
                    {candidate.experience} • {candidate.location}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star
                      size={10}
                      className="text-yellow-500 fill-current md:w-3 md:h-3"
                    />
                    <span className="text-xs text-gray-600">
                      {candidate.rating}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(
                    candidate.status
                  )}`}
                >
                  {candidate.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-light)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-slate)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <div className="p-2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex-shrink-0">
                <Building2 size={20} className="text-white md:w-6 md:h-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg md:text-xl font-bold text-[var(--color-text)] truncate">
                  WEWORK Dashboard
                </h1>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  Welcome back, {user?.companyName || user?.contactPersonName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 ml-4">
              <button className="p-2 bg-[var(--color-light)] rounded-xl hover:bg-gray-100 transition-colors">
                <MessageSquare
                  size={18}
                  className="text-[var(--color-text)] md:w-5 md:h-5"
                />
              </button>
              <button className="px-3 py-2 md:px-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <Plus size={14} className="md:w-4 md:h-4" />
                <span className="hidden sm:inline text-sm md:text-base">
                  Post Job
                </span>
              </button>
              <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-4 pl-2 md:pl-4 border-l border-gray-200">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] rounded-full flex items-center justify-center">
                  <User size={14} className="text-white md:w-4 md:h-4" />
                </div>
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/company/login");
                  }}
                  className="p-1.5 md:p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                  title="Logout"
                >
                  <LogOut size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-[var(--color-slate)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "jobs", label: "Job Postings", icon: Briefcase },
              { id: "candidates", label: "Candidates", icon: Users },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 md:py-4 px-2 md:px-4 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                      : "border-transparent text-gray-500 hover:text-[var(--color-text)] hover:border-gray-300"
                  }`}
                >
                  <Icon size={14} className="md:w-4 md:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {activeTab === "overview" && renderOverviewTab()}
        {activeTab === "jobs" && <JobPostingsPage />}
        {activeTab === "candidates" && <CandidatesPage />}
        {activeTab === "analytics" && <AnalyticsPage />}
      </div>
    </div>
  );
};

export default CompanyDashboard;
