import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Download,
  Star,
  MapPin,
  Clock,
  Briefcase,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  getAllApplications,
  updateApplicationStatus,
  type Application,
} from "../../api/Companies/applicationsApi";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  position: string;
  experience: string;
  education: string;
  skills: string[];
  rating: number;
  salary: string;
  availability: string;
  appliedDate: string;
  lastActivity: string;
  status:
    | "New"
    | "Reviewing"
    | "Shortlisted"
    | "Interviewing"
    | "Offered"
    | "Hired"
    | "Rejected";
  jobTitle: string;
  resumeUrl: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  notes: string[];
  interviewScheduled?: string;
  applicationId: string; // Add this to track the application ID
}

const CandidatesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterExperience, setFilterExperience] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [viewType, setViewType] = useState<"list" | "cards">("list");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch candidates from backend
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      const applications = await getAllApplications();

      // Transform applications to candidates
      const transformedCandidates: Candidate[] = applications.map((app) => {
        const student = app.student;
        const fullName = `${student.firstName} ${student.lastName}`;

        return {
          id: app.id,
          applicationId: app.id,
          name: fullName,
          email: student.email,
          phone: "N/A", // Not in backend
          location: student.university || "Not specified",
          avatar: `${student.firstName[0]}${student.lastName[0]}`.toUpperCase(),
          position: app.job.title,
          experience: student.xp
            ? `${student.xp} year${student.xp > 1 ? "s" : ""}`
            : "Not specified",
          education: student.major
            ? `${student.major}, ${student.university || ""}`
            : student.university || "Not specified",
          skills: [], // Not in backend
          rating: student.level ? getLevelRating(student.level) : 4.0,
          salary: "Negotiable", // Not in backend
          availability: "Not specified", // Not in backend
          appliedDate: app.createdAt,
          lastActivity: formatTimeAgo(app.createdAt),
          status: mapBackendStatus(app.status),
          jobTitle: app.job.title,
          resumeUrl: app.resumeUrl || "",
          portfolioUrl: undefined,
          linkedinUrl: undefined,
          notes: app.coverLetter ? [app.coverLetter] : [],
          interviewScheduled: undefined,
        };
      });

      setCandidates(transformedCandidates);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelRating = (level: string): number => {
    const levelMap: { [key: string]: number } = {
      BEGINNER: 3.5,
      INTERMEDIATE: 4.0,
      ADVANCED: 4.5,
      EXPERT: 5.0,
    };
    return levelMap[level.toUpperCase()] || 4.0;
  };

  const mapBackendStatus = (
    backendStatus: Application["status"]
  ): Candidate["status"] => {
    const statusMap: { [key: string]: Candidate["status"] } = {
      APPLIED: "New",
      REVIEWING: "Reviewing",
      SHORTLISTED: "Shortlisted",
      INTERVIEWING: "Interviewing",
      OFFERED: "Offered",
      HIRED: "Hired",
      REJECTED: "Rejected",
    };
    return statusMap[backendStatus] || "New";
  };

  const mapFrontendToBackendStatus = (
    frontendStatus: Candidate["status"]
  ): Application["status"] => {
    const statusMap: { [key: string]: Application["status"] } = {
      New: "APPLIED",
      Reviewing: "REVIEWING",
      Shortlisted: "SHORTLISTED",
      Interviewing: "INTERVIEWING",
      Offered: "OFFERED",
      Hired: "HIRED",
      Rejected: "REJECTED",
    };
    return statusMap[frontendStatus] || "APPLIED";
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} week${
      Math.floor(diffInDays / 7) > 1 ? "s" : ""
    } ago`;
  };

  // Calculate stats
  const totalCandidates = candidates.length;
  const newCandidates = candidates.filter((c) => c.status === "New").length;
  const inInterviews = candidates.filter(
    (c) => c.status === "Interviewing"
  ).length;
  const shortlisted = candidates.filter(
    (c) => c.status === "Shortlisted"
  ).length;

  // Filter and sort candidates
  const filteredCandidates = candidates
    .filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesStatus =
        filterStatus === "All" || candidate.status === filterStatus;
      const matchesLocation =
        filterLocation === "All" || candidate.location.includes(filterLocation);
      const matchesExperience =
        filterExperience === "All" ||
        candidate.experience.includes(filterExperience);

      return (
        matchesSearch && matchesStatus && matchesLocation && matchesExperience
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.appliedDate).getTime() -
            new Date(a.appliedDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.appliedDate).getTime() -
            new Date(b.appliedDate).getTime()
          );
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "Shortlisted":
        return "bg-purple-100 text-purple-800";
      case "Interviewing":
        return "bg-orange-100 text-orange-800";
      case "Offered":
        return "bg-green-100 text-green-800";
      case "Hired":
        return "bg-emerald-100 text-emerald-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <AlertCircle size={14} className="text-blue-600" />;
      case "Reviewing":
        return <Eye size={14} className="text-yellow-600" />;
      case "Shortlisted":
        return <Star size={14} className="text-purple-600" />;
      case "Interviewing":
        return <MessageSquare size={14} className="text-orange-600" />;
      case "Offered":
        return <CheckCircle size={14} className="text-green-600" />;
      case "Hired":
        return <CheckCircle size={14} className="text-emerald-600" />;
      case "Rejected":
        return <XCircle size={14} className="text-red-600" />;
      default:
        return null;
    }
  };

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map((c) => c.id));
    }
  };

  const handleStatusChange = async (
    candidateId: string,
    newStatus: Candidate["status"]
  ) => {
    try {
      const backendStatus = mapFrontendToBackendStatus(newStatus);
      await updateApplicationStatus(candidateId, backendStatus);

      // Update local state
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate.id === candidateId
            ? { ...candidate, status: newStatus }
            : candidate
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedCandidates.length === 0) return;

    switch (action) {
      case "shortlist":
        selectedCandidates.forEach((id) =>
          handleStatusChange(id, "Shortlisted")
        );
        break;
      case "reject":
        selectedCandidates.forEach((id) => handleStatusChange(id, "Rejected"));
        break;
      case "interview":
        selectedCandidates.forEach((id) =>
          handleStatusChange(id, "Interviewing")
        );
        break;
    }
    setSelectedCandidates([]);
  };

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mb-4"></div>
            <p className="text-gray-600">Loading candidates...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-1">
                    Total Candidates
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] truncate">
                    {totalCandidates}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl shrink-0">
                  <Users size={16} className="text-white md:w-5 md:h-5" />
                </div>
              </div>
              <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm">
                <TrendingUp
                  size={12}
                  className="text-green-500 mr-1 md:w-[14px] md:h-[14px]"
                />
                <span className="text-green-600 truncate">+15% this month</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-1">
                    New Applications
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] truncate">
                    {newCandidates}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-linear-to-br from-[var(--color-accent)] to-[var(--color-slate)] rounded-xl shrink-0">
                  <FileText size={16} className="text-white md:w-5 md:h-5" />
                </div>
              </div>
              <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm">
                <span className="text-gray-600 truncate">In last 7 days</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-1">
                    In Interviews
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] truncate">
                    {inInterviews}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-linear-to-br from-[var(--color-slate)] to-[var(--color-primary)] rounded-xl shrink-0">
                  <MessageSquare
                    size={16}
                    className="text-white md:w-5 md:h-5"
                  />
                </div>
              </div>
              <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm">
                <Calendar
                  size={12}
                  className="text-blue-500 mr-1 md:w-[14px] md:h-[14px]"
                />
                <span className="text-blue-600 truncate">
                  3 scheduled today
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-1">
                    Shortlisted
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] truncate">
                    {shortlisted}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-slate)] rounded-xl shrink-0">
                  <Star size={16} className="text-white md:w-5 md:h-5" />
                </div>
              </div>
              <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm">
                <Award
                  size={12}
                  className="text-purple-500 mr-1 md:w-[14px] md:h-[14px]"
                />
                <span className="text-purple-600 truncate">Top performers</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
                <div className="relative flex-1 min-w-0">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search candidates by name, position, or skills..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    showFilters
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Filter size={16} />
                  Filters
                </button>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm bg-white min-w-0 flex-1 sm:flex-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>

                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewType === "list"
                        ? "bg-white text-[var(--color-primary)] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FileText size={16} />
                  </button>
                  <button
                    onClick={() => setViewType("cards")}
                    className={`p-2 rounded-lg transition-all ${
                      viewType === "cards"
                        ? "bg-white text-[var(--color-primary)] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Users size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Row */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offered">Offered</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm bg-white"
                >
                  <option value="All">All Locations</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Morocco">Morocco</option>
                </select>

                <select
                  value={filterExperience}
                  onChange={(e) => setFilterExperience(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm bg-white"
                >
                  <option value="All">All Experience</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedCandidates.length > 0 && (
            <div className="bg-[var(--color-primary)] text-white rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm md:text-base font-medium">
                    {selectedCandidates.length} candidate
                    {selectedCandidates.length > 1 ? "s" : ""} selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkAction("shortlist")}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => handleBulkAction("interview")}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    Schedule Interview
                  </button>
                  <button
                    onClick={() => handleBulkAction("reject")}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => setSelectedCandidates([])}
                    className="p-1.5 md:p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Candidates List */}
          <div className="bg-white rounded-2xl border border-[var(--color-slate)]/20 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="bg-[var(--color-light)] px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={
                    selectedCandidates.length === filteredCandidates.length &&
                    filteredCandidates.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-[var(--color-primary)] bg-white border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Candidate ({filteredCandidates.length})
                </span>
              </div>
            </div>

            {/* Candidates List */}
            <div className="divide-y divide-gray-100">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="px-4 md:px-6 py-4 md:py-6 hover:bg-[var(--color-light)]/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => handleSelectCandidate(candidate.id)}
                      className="mt-1 w-4 h-4 text-[var(--color-primary)] bg-white border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        {/* Candidate Info */}
                        <div className="flex items-start gap-4 min-w-0 flex-1">
                          <div className="w-12 h-12 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center text-white font-semibold text-sm shrink-0">
                            {candidate.avatar}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="min-w-0">
                                <h3 className="font-semibold text-[var(--color-text)] text-sm md:text-base truncate">
                                  {candidate.name}
                                </h3>
                                <p className="text-sm text-[var(--color-primary)] font-medium truncate">
                                  {candidate.position}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <div className="flex items-center gap-1">
                                  <Star
                                    size={14}
                                    className="text-yellow-500 fill-current"
                                  />
                                  <span className="text-sm font-medium text-gray-700">
                                    {candidate.rating}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3 text-xs md:text-sm text-gray-600">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <MapPin
                                  size={12}
                                  className="text-gray-400 shrink-0"
                                />
                                <span className="truncate">
                                  {candidate.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Briefcase
                                  size={12}
                                  className="text-gray-400 shrink-0"
                                />
                                <span className="truncate">
                                  {candidate.experience}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Clock
                                  size={12}
                                  className="text-gray-400 shrink-0"
                                />
                                <span className="truncate">
                                  Applied{" "}
                                  {new Date(
                                    candidate.appliedDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Mail
                                  size={12}
                                  className="text-gray-400 shrink-0"
                                />
                                <span className="truncate">
                                  {candidate.email}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills
                                  .slice(0, 4)
                                  .map((skill, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-[var(--color-light)] text-[var(--color-text)] text-xs rounded-lg"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                {candidate.skills.length > 4 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                                    +{candidate.skills.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(
                                    candidate.status
                                  )}`}
                                >
                                  {getStatusIcon(candidate.status)}
                                  <span>{candidate.status}</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  Last activity: {candidate.lastActivity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button className="p-2 text-gray-500 hover:text-[var(--color-primary)] hover:bg-[var(--color-light)] rounded-lg transition-all">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-[var(--color-primary)] hover:bg-[var(--color-light)] rounded-lg transition-all">
                            <MessageSquare size={16} />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-[var(--color-primary)] hover:bg-[var(--color-light)] rounded-lg transition-all">
                            <Download size={16} />
                          </button>

                          <select
                            value={candidate.status}
                            onChange={(e) =>
                              handleStatusChange(
                                candidate.id,
                                e.target.value as Candidate["status"]
                              )
                            }
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 bg-white"
                          >
                            <option value="New">New</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offered">Offered</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12 px-4">
                <Users size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No candidates found
                </h3>
                <p className="text-gray-600">
                  {searchQuery ||
                  filterStatus !== "All" ||
                  filterLocation !== "All" ||
                  filterExperience !== "All"
                    ? "Try adjusting your search or filters"
                    : "Candidates will appear here once they apply to your job postings"}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidatesPage;
