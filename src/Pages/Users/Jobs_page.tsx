import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building,
  Star,
  ChevronRight,
  Calendar,
  Send,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
  FileText,
  MoreHorizontal,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "interview" | "rejected" | "accepted";
  salary: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  interviewDate?: string;
  nextStep?: string;
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary: string;
  postedDate: string;
  description: string;
  requirements: string[];
  isBookmarked: boolean;
  applicants: number;
  match: number;
}

export const JobsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"applications" | "discover">(
    "applications"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Mock data for job applications - empty for new user
  const applications: JobApplication[] = [];

  // Mock data for job listings
  const jobListings: JobListing[] = [
    {
      id: "1",
      title: "Senior Python Developer",
      company: "DataTech Solutions",
      companyLogo: "/api/placeholder/40/40",
      location: "Remote",
      type: "Full-time",
      salary: "$95,000 - $140,000",
      postedDate: "2024-10-03",
      description:
        "Join our team to build scalable data processing systems using Python and modern frameworks.",
      requirements: [
        "5+ years Python experience",
        "Django/Flask",
        "PostgreSQL",
        "AWS/Azure",
      ],
      isBookmarked: false,
      applicants: 45,
      match: 92,
    },
    {
      id: "2",
      title: "React Native Developer",
      company: "MobileFirst Corp",
      companyLogo: "/api/placeholder/40/40",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$85,000 - $115,000",
      postedDate: "2024-10-02",
      description:
        "Build amazing mobile experiences with React Native for iOS and Android platforms.",
      requirements: [
        "3+ years React Native",
        "TypeScript",
        "Redux",
        "Mobile UI/UX",
      ],
      isBookmarked: true,
      applicants: 62,
      match: 88,
    },
    {
      id: "3",
      title: "DevOps Engineer",
      company: "CloudScale Inc",
      companyLogo: "/api/placeholder/40/40",
      location: "Denver, CO",
      type: "Full-time",
      salary: "$100,000 - $150,000",
      postedDate: "2024-10-01",
      description:
        "Help us scale our infrastructure with modern DevOps practices and cloud technologies.",
      requirements: ["Docker/Kubernetes", "AWS/GCP", "CI/CD", "Terraform"],
      isBookmarked: false,
      applicants: 38,
      match: 85,
    },
    {
      id: "4",
      title: "Junior Frontend Developer",
      company: "WebDev Agency",
      companyLogo: "/api/placeholder/40/40",
      location: "Remote",
      type: "Full-time",
      salary: "$50,000 - $70,000",
      postedDate: "2024-09-30",
      description:
        "Perfect opportunity for a junior developer to grow with modern web technologies.",
      requirements: [
        "HTML/CSS/JavaScript",
        "React basics",
        "Git",
        "Responsive design",
      ],
      isBookmarked: true,
      applicants: 89,
      match: 78,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "interview":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={16} className="text-green-600" />;
      case "interview":
        return <Calendar size={16} className="text-blue-600" />;
      case "reviewing":
        return <Eye size={16} className="text-yellow-600" />;
      case "rejected":
        return <XCircle size={16} className="text-red-600" />;
      case "pending":
        return <AlertCircle size={16} className="text-gray-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || app.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocation === "all" ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesType = selectedType === "all" || job.type === selectedType;
    return matchesSearch && matchesLocation && matchesType;
  });

  const applicationStats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    interview: applications.filter((app) => app.status === "interview").length,
    accepted: applications.filter((app) => app.status === "accepted").length,
  };

  const topNavActions = (
    <div className="flex items-center gap-3">
      <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors rounded-lg hover:bg-gray-100">
        <Filter size={18} />
      </button>
      <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors rounded-lg hover:bg-gray-100">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );

  return (
    <DashboardLayout
      title="Find Your Dream Job"
      subtitle="Discover amazing opportunities and start your career journey today"
      icon={<Briefcase size={18} className="text-white" />}
      actions={topNavActions}
      className="space-y-6"
      removeTopPadding={true}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-10">
        {/* Total Applications */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/25 group-hover:shadow-[var(--color-primary)]/40 transition-all duration-300 group-hover:scale-110">
                <Briefcase size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-light)] px-3 py-1.5 rounded-full border border-[var(--color-slate)]/20">
                  Active
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {applicationStats.total}
              </h3>
              <p className="text-sm font-medium text-[var(--color-slate)]">
                Ready to Apply
              </p>
            </div>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-[var(--color-accent)]/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[var(--color-accent)]/10 to-[var(--color-slate)]/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-linear-to-br from-[var(--color-accent)] to-[var(--color-slate)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/25 group-hover:shadow-[var(--color-accent)]/40 transition-all duration-300 group-hover:scale-110">
                <Clock size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-[var(--color-accent)] bg-[var(--color-light)] px-3 py-1.5 rounded-full border border-[var(--color-accent)]/20">
                  Pending
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {applicationStats.pending}
              </h3>
              <p className="text-sm font-medium text-[var(--color-slate)]">
                Start Exploring
              </p>
            </div>
          </div>
        </div>

        {/* Interviews Scheduled */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/25 group-hover:shadow-[var(--color-primary)]/40 transition-all duration-300 group-hover:scale-110">
                <Calendar size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-light)] px-3 py-1.5 rounded-full border border-[var(--color-primary)]/20">
                  Upcoming
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {applicationStats.interview}
              </h3>
              <p className="text-sm font-medium text-[var(--color-slate)]">
                Future Success
              </p>
            </div>
          </div>
        </div>

        {/* Offers Received */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-green-400/10 to-green-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-110">
                <Target size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-full border border-green-200">
                  Success
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-[var(--color-text)] group-hover:text-green-600 transition-colors duration-300">
                {applicationStats.accepted}
              </h3>
              <p className="text-sm font-medium text-[var(--color-slate)]">
                Your Goal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex relative bg-linear-to-r from-gray-50 to-white p-2">
          <div className="flex w-full relative bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("applications")}
              className={`relative flex-1 px-6 py-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "applications"
                  ? "bg-white text-[var(--color-primary)] shadow-md border border-gray-200 transform scale-[1.02]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText size={18} />
                <span>My Applications</span>
                <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 py-1 rounded-full text-xs font-bold">
                  {applicationStats.total}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("discover")}
              className={`relative flex-1 px-6 py-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "discover"
                  ? "bg-white text-[var(--color-primary)] shadow-md border border-gray-200 transform scale-[1.02]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Search size={18} />
                <span>Discover Jobs</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                  New
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-linear-to-br from-white to-[var(--color-light)] rounded-2xl shadow-lg border border-[var(--color-slate)]/20 p-6 lg:p-8">
        <div className="space-y-6">
          {/* Search Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                {activeTab === "applications"
                  ? "Search Applications"
                  : "Find Your Next Opportunity"}
              </h3>
              <p className="text-sm text-[var(--color-slate)] mt-1">
                {activeTab === "applications"
                  ? "Track and manage your job application status"
                  : "Discover jobs that match your skills and preferences"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--color-slate)]">
                {activeTab === "applications"
                  ? `${filteredApplications.length} applications`
                  : `${filteredJobs.length} jobs available`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Enhanced Search Input */}
            <div className="lg:col-span-2 relative group">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors"
              />
              <input
                type="text"
                placeholder={
                  activeTab === "applications"
                    ? "Search by job title, company, or role..."
                    : "Search jobs, companies, locations, or skills..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Enhanced Filter Dropdown */}
            <div className="relative">
              {activeTab === "applications" ? (
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 appearance-none cursor-pointer shadow-sm hover:shadow-md font-medium"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending Review</option>
                  <option value="reviewing">Under Review</option>
                  <option value="interview">Interview Stage</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              ) : (
                <div className="flex gap-2">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="flex-1 px-3 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 appearance-none cursor-pointer shadow-sm hover:shadow-md font-medium text-sm"
                  >
                    <option value="all">All Locations</option>
                    <option value="remote">Remote</option>
                    <option value="california">California</option>
                    <option value="new york">New York</option>
                    <option value="texas">Texas</option>
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="flex-1 px-3 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 appearance-none cursor-pointer shadow-sm hover:shadow-md font-medium text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              )}
              <ChevronRight
                className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          {/* Quick Filter Tags */}
          {activeTab === "discover" && (
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-sm font-medium text-gray-600 mr-2">
                Popular:
              </span>
              {["Remote", "Full-time", "Senior", "Frontend", "Backend"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Welcome Banner for New Users */}
      {activeTab === "applications" && applications.length === 0 && (
        <div className="relative bg-linear-to-br from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-slate)] rounded-2xl shadow-2xl border border-[var(--color-slate)]/20 p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[var(--color-accent)]/40 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[var(--color-accent)]/50 rounded-full animate-pulse delay-300"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm ring-2 ring-[var(--color-accent)]/30">
                <Briefcase size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Welcome to Your Job Journey!
                </h2>
                <p className="text-white/80">
                  Ready to find your dream career?
                </p>
              </div>
            </div>
            <p className="text-white/90 mb-6 leading-relaxed">
              Start exploring thousands of opportunities that match your skills
              and interests. Your next career move is just a click away!
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("discover")}
                className="bg-white text-[var(--color-primary)] px-6 py-3 rounded-xl font-semibold hover:bg-[var(--color-light)] transition-colors shadow-lg"
              >
                Explore Jobs
              </button>
              <button
                onClick={() => navigate("/dashboard/build-profile")}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                Build Profile
              </button>
              <button
                onClick={() => navigate("/dashboard/job-profile")}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Content Area */}
      {activeTab === "applications" ? (
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="group relative bg-linear-to-r from-white to-[var(--color-light)]/50 rounded-2xl shadow-lg border border-[var(--color-slate)]/20 p-8 hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[var(--color-primary)]/5 to-transparent rounded-bl-full"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Building size={24} className="text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white border-2 border-[var(--color-slate)]/20 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="md:text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                        {application.jobTitle}
                      </h3>
                      <p className="text-[var(--color-slate)] font-medium">
                        {application.company}
                      </p>
                      <p className="text-sm text-[var(--color-slate)]">
                        Applied{" "}
                        {new Date(application.appliedDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 shadow-sm ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {getStatusIcon(application.status)}
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>

                {/* Enhanced Info Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white/70 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Salary
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {application.salary}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/70 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Location
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {application.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/70 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Type
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {application.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/70 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Status
                      </p>
                      <p className="font-semibold text-gray-900 text-sm capitalize">
                        {application.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Next Step */}
                {application.nextStep && (
                  <div className="relative bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/50 rounded-bl-full"></div>
                    <div className="relative z-10 flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <TrendingUp size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Next Step
                        </p>
                        <p className="text-sm text-blue-800">
                          {application.nextStep}
                        </p>
                        {application.interviewDate && (
                          <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                            <Calendar size={12} />
                            Interview scheduled for{" "}
                            {new Date(
                              application.interviewDate
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    {application.interviewDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} className="text-blue-500" />
                        <span className="font-medium">
                          Interview:{" "}
                          {new Date(
                            application.interviewDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[var(--color-primary)] border border-gray-300 hover:border-[var(--color-primary)] rounded-xl transition-all duration-300 hover:shadow-md">
                      <Eye size={16} />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <FileText size={16} />
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group relative bg-linear-to-r from-white to-[var(--color-light)]/30 rounded-2xl shadow-lg border border-[var(--color-slate)]/20 p-8 hover:shadow-2xl hover:border-[var(--color-primary)]/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[var(--color-primary)]/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[var(--color-accent)]/10 to-transparent rounded-tr-full"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-6 flex-1">
                    <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-start w-full">
                      {/* Logo */}
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Building size={24} className="text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-[var(--color-primary)]/20 rounded-full flex items-center justify-center">
                          <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse"></span>
                        </div>
                      </div>
                      {/* Main Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                            {job.title}
                          </h3>
                          <span className="bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            {job.match}% Match
                          </span>
                          {job.match > 90 && (
                            <span className="bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-2 py-1 rounded-full text-xs font-medium">
                              Perfect Fit!
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[var(--color-slate)] font-semibold">
                            {job.company}
                          </p>
                          <span className="text-[var(--color-slate)]/50">
                            •
                          </span>
                          <p className="text-sm text-[var(--color-slate)]">
                            Posted{" "}
                            {new Date(job.postedDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <p className="text-[var(--color-text)] leading-relaxed text-sm sm:text-base">
                          {job.description}
                        </p>
                        {/* Enhanced Skills Tags */}
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 4).map((req, index) => (
                            <span
                              key={index}
                              className="bg-white border border-[var(--color-slate)]/20 text-[var(--color-text)] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                            >
                              {req}
                            </span>
                          ))}
                          {job.requirements.length > 4 && (
                            <button className="text-[var(--color-primary)] text-xs sm:text-sm font-medium hover:underline">
                              +{job.requirements.length - 4} more skills
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 ml-6">
                    <button
                      className="group/bookmark p-3 text-gray-400 hover:text-yellow-500 bg-white border border-gray-200 rounded-xl hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300 hover:scale-110"
                      title="Bookmark job"
                    >
                      {job.isBookmarked ? (
                        <BookmarkCheck size={20} className="text-yellow-500" />
                      ) : (
                        <Bookmark
                          size={20}
                          className="group-hover/bookmark:text-yellow-500"
                        />
                      )}
                    </button>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Applicants
                      </p>
                      <p className="font-bold text-gray-900">
                        {job.applicants}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-[var(--color-slate)]/10 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-slate)] uppercase tracking-wide font-medium">
                        Salary Range
                      </p>
                      <p className="font-bold text-[var(--color-text)]">
                        {job.salary}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-[var(--color-slate)]/10 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center">
                      <MapPin
                        size={18}
                        className="text-[var(--color-primary)]"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-slate)] uppercase tracking-wide font-medium">
                        Location
                      </p>
                      <p className="font-bold text-[var(--color-text)]">
                        {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-[var(--color-slate)]/10 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center">
                      <Clock size={18} className="text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-slate)] uppercase tracking-wide font-medium">
                        Job Type
                      </p>
                      <p className="font-bold text-[var(--color-text)]">
                        {job.type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-[var(--color-slate)]/20">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[var(--color-accent)] fill-current" />
                      <span className="text-sm text-[var(--color-slate)] font-medium">
                        Great match for your profile
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 text-[var(--color-text)] hover:text-[var(--color-primary)] bg-white border-2 border-[var(--color-slate)]/20 hover:border-[var(--color-primary)] rounded-xl transition-all duration-300 hover:shadow-md font-medium">
                      <ExternalLink size={16} />
                      <span className="hidden xs:inline">View Details</span>
                      <span className="inline xs:hidden">Details</span>
                    </button>
                    <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                      <Send size={16} />
                      <span className="hidden xs:inline">Apply Now</span>
                      <span className="inline xs:hidden">Apply</span>
                    </button>
                  </div>
                </div>

                {/* Quick Apply Preview */}
                {job.match > 85 && (
                  <div className="mt-4 p-4 bg-linear-to-r from-[var(--color-light)] to-white border border-[var(--color-primary)]/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                        <Target size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-text)]">
                          Quick Apply Available
                        </p>
                        <p className="text-xs text-[var(--color-slate)]">
                          Your profile matches this role perfectly. Apply with
                          one click!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === "applications" && filteredApplications.length === 0) ||
        (activeTab === "discover" && filteredJobs.length === 0)) && (
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-slate)]/20 p-12 text-center">
          <div className="w-16 h-16 bg-[var(--color-light)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase size={32} className="text-[var(--color-slate)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">
            {activeTab === "applications"
              ? "No applications found"
              : "No jobs found"}
          </h3>
          <p className="text-[var(--color-slate)] mb-4">
            {activeTab === "applications"
              ? "Try adjusting your search or status filter to find applications."
              : "Try adjusting your search criteria to discover more opportunities."}
          </p>
          {activeTab === "discover" && (
            <button className="px-4 py-2 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg hover:shadow-md transition-all duration-300">
              Browse All Jobs
            </button>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};
