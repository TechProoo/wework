import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Users,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Building,
  Calendar,
} from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid";
  salary: string;
  applicants: number;
  posted: string;
  deadline: string;
  status: "Active" | "Paused" | "Closed" | "Draft";
  description: string;
  requirements: string[];
  benefits: string[];
}

const JobPostingsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  // Sample job data - replace with API calls
  const [jobs, setJobs] = useState<JobPosting[]>([
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      applicants: 42,
      posted: "2 days ago",
      deadline: "2024-11-15",
      status: "Active",
      description:
        "We're looking for an experienced Frontend Developer to join our team...",
      requirements: ["React", "TypeScript", "Node.js", "5+ years experience"],
      benefits: ["Health Insurance", "Remote Work", "Professional Development"],
    },
    {
      id: "2",
      title: "UX/UI Designer",
      department: "Design",
      location: "Lagos, Nigeria",
      type: "Full-time",
      salary: "$60,000 - $90,000",
      applicants: 28,
      posted: "5 days ago",
      deadline: "2024-11-20",
      status: "Active",
      description:
        "Join our design team to create beautiful user experiences...",
      requirements: ["Figma", "Design Systems", "3+ years experience"],
      benefits: ["Health Insurance", "Flexible Hours", "Design Budget"],
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
      deadline: "2024-11-10",
      status: "Paused",
      description: "Lead our product strategy and drive innovation...",
      requirements: ["Product Management", "Analytics", "7+ years experience"],
      benefits: ["Equity", "Health Insurance", "Learning Budget"],
    },
    {
      id: "4",
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Contract",
      salary: "$70 - $100/hour",
      applicants: 15,
      posted: "3 days ago",
      deadline: "2024-12-01",
      status: "Active",
      description: "Build scalable backend systems for our growing platform...",
      requirements: [
        "Node.js",
        "Python",
        "Database Design",
        "4+ years experience",
      ],
      benefits: ["Flexible Schedule", "High Hourly Rate", "Remote Work"],
    },
    {
      id: "5",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Cape Town, SA",
      type: "Part-time",
      salary: "$40,000 - $60,000",
      applicants: 8,
      posted: "6 days ago",
      deadline: "2024-11-25",
      status: "Draft",
      description: "Drive our marketing campaigns and brand awareness...",
      requirements: [
        "Digital Marketing",
        "Content Creation",
        "2+ years experience",
      ],
      benefits: [
        "Flexible Hours",
        "Creative Freedom",
        "Marketing Tools Access",
      ],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 text-blue-800";
      case "Part-time":
        return "bg-purple-100 text-purple-800";
      case "Contract":
        return "bg-orange-100 text-orange-800";
      case "Remote":
        return "bg-green-100 text-green-800";
      case "Hybrid":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || job.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.posted).getTime() - new Date(a.posted).getTime();
        case "oldest":
          return new Date(a.posted).getTime() - new Date(b.posted).getTime();
        case "applicants":
          return b.applicants - a.applicants;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    setSelectedJobs(
      selectedJobs.length === filteredJobs.length
        ? []
        : filteredJobs.map((job) => job.id)
    );
  };

  const handleStatusChange = (
    jobId: string,
    newStatus: JobPosting["status"]
  ) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    setSelectedJobs((prev) => prev.filter((id) => id !== jobId));
  };

  const stats = {
    total: jobs.length,
    active: jobs.filter((job) => job.status === "Active").length,
    paused: jobs.filter((job) => job.status === "Paused").length,
    draft: jobs.filter((job) => job.status === "Draft").length,
    totalApplicants: jobs.reduce((sum, job) => sum + job.applicants, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
            Job Postings
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage your job postings and track applications
          </p>
        </div>
        <button className="px-4 py-2 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
          <Plus size={16} />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[var(--color-slate)]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Total Jobs</p>
              <p className="text-lg font-bold text-[var(--color-text)]">
                {stats.total}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[var(--color-slate)]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Active</p>
              <p className="text-lg font-bold text-[var(--color-text)]">
                {stats.active}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[var(--color-slate)]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock size={16} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Paused</p>
              <p className="text-lg font-bold text-[var(--color-text)]">
                {stats.paused}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[var(--color-slate)]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Edit size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Draft</p>
              <p className="text-lg font-bold text-[var(--color-text)]">
                {stats.draft}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[var(--color-slate)]/20 col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Total Applicants</p>
              <p className="text-lg font-bold text-[var(--color-text)]">
                {stats.totalApplicants}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 md:p-6 border border-[var(--color-slate)]/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="applicants">Most Applicants</option>
              <option value="title">Title A-Z</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-primary)]">
              {selectedJobs.length} job{selectedJobs.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors">
                Pause Selected
              </button>
              <button className="px-3 py-1.5 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border border-[var(--color-slate)]/20 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  selectedJobs.length === filteredJobs.length &&
                  filteredJobs.length > 0
                }
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <span className="text-sm font-medium text-gray-700">
                Job Title & Details
              </span>
            </label>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <label className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => handleSelectJob(job.id)}
                    className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                </label>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    {/* Job Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--color-text)] text-sm md:text-base line-clamp-1">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs md:text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Building size={14} />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                            job.type
                          )}`}
                        >
                          {job.type}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Users size={12} />
                          <span>{job.applicants} applicants</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 md:ml-4">
                      <button
                        onClick={() => {
                          /* View job */
                        }}
                        className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          /* Edit job */
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* Status Toggle */}
                      <select
                        value={job.status}
                        onChange={(e) =>
                          handleStatusChange(
                            job.id,
                            e.target.value as JobPosting["status"]
                          )
                        }
                        className="ml-2 text-xs border border-gray-200 rounded px-2 py-1 focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No jobs found" : "No job postings yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Create your first job posting to start hiring"}
            </p>
            {!searchQuery && (
              <button className="px-4 py-2 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto">
                <Plus size={16} />
                <span>Post New Job</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-[var(--color-slate)]/20">
          <span className="text-sm text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-[var(--color-primary)] text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostingsPage;
