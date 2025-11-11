import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  Filter,
  SatelliteDish,
} from "lucide-react";
import { useState, useMemo } from "react";

export const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: "All",
    salaryRange: "All",
    location: "All",
    experience: "All",
  });

  const jobCategories = [
    "All Jobs",
    "Frontend",
    "Backend",
    "Full Stack",
    "Mobile",
    "DevOps",
    "UI/UX",
    "Data Science",
  ];

  const filterOptions = {
    jobType: ["All", "Full-time", "Contract", "Part-time", "Internship"],
    salaryRange: ["All", "$0-$3000", "$3000-$5000", "$5000-$8000", "$8000+"],
    location: ["All", "Remote", "Hybrid", "On-site"],
    experience: [
      "All",
      "Entry Level",
      "Mid Level",
      "Senior Level",
      "Executive",
    ],
  };

  const allJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Global",
      location: "Remote",
      type: "Full-time",
      salary: "$4,000 - $6,000",
      salaryMin: 4000,
      salaryMax: 6000,
      posted: "2 days ago",
      description:
        "Looking for an experienced React developer to join our dynamic team and build cutting-edge web applications.",
      requirements: [
        "3+ years React experience",
        "TypeScript",
        "Node.js",
        "AWS",
      ],
      category: "Frontend",
      experience: "Senior Level",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignHub Inc",
      location: "Remote",
      type: "Contract",
      salary: "$3,500 - $5,000",
      salaryMin: 3500,
      salaryMax: 5000,
      posted: "1 day ago",
      description:
        "Creative UI/UX designer needed to craft beautiful and intuitive user experiences for our products.",
      requirements: [
        "Figma expertise",
        "Design systems",
        "User research",
        "Prototyping",
      ],
      category: "UI/UX",
      experience: "Mid Level",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataFlow Systems",
      location: "Remote",
      type: "Full-time",
      salary: "$4,500 - $7,000",
      salaryMin: 4500,
      salaryMax: 7000,
      posted: "3 days ago",
      description:
        "Backend engineer to build scalable APIs and microservices for our growing platform.",
      requirements: [
        "Python/Django",
        "PostgreSQL",
        "Docker",
        "API development",
      ],
      category: "Backend",
      experience: "Senior Level",
    },
    {
      id: 4,
      title: "Mobile App Developer",
      company: "AppVenture Ltd",
      location: "Remote",
      type: "Full-time",
      salary: "$3,800 - $5,500",
      salaryMin: 3800,
      salaryMax: 5500,
      posted: "1 week ago",
      description:
        "Mobile developer to create cross-platform applications using React Native or Flutter.",
      requirements: [
        "React Native/Flutter",
        "iOS/Android",
        "App Store deployment",
        "REST APIs",
      ],
      category: "Mobile",
      experience: "Mid Level",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Remote",
      type: "Full-time",
      salary: "$5,000 - $8,000",
      salaryMin: 5000,
      salaryMax: 8000,
      posted: "5 days ago",
      description:
        "DevOps engineer to manage cloud infrastructure and implement CI/CD pipelines.",
      requirements: [
        "AWS/Azure",
        "Kubernetes",
        "CI/CD",
        "Infrastructure as Code",
      ],
      category: "DevOps",
      experience: "Senior Level",
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Remote",
      type: "Contract",
      salary: "$4,200 - $6,500",
      salaryMin: 4200,
      salaryMax: 6500,
      posted: "4 days ago",
      description:
        "Data scientist to analyze complex datasets and build machine learning models.",
      requirements: [
        "Python/R",
        "Machine Learning",
        "SQL",
        "Data visualization",
      ],
      category: "Data Science",
      experience: "Senior Level",
    },
    {
      id: 7,
      title: "Junior Frontend Developer",
      company: "StartupTech",
      location: "Hybrid",
      type: "Full-time",
      salary: "$2,500 - $3,500",
      salaryMin: 2500,
      salaryMax: 3500,
      posted: "6 days ago",
      description:
        "Entry-level frontend developer position for recent graduates or career changers.",
      requirements: ["HTML/CSS", "JavaScript", "React basics", "Git"],
      category: "Frontend",
      experience: "Entry Level",
    },
    {
      id: 8,
      title: "Full Stack Developer",
      company: "WebSolutions Inc",
      location: "Remote",
      type: "Contract",
      salary: "$6,000 - $8,500",
      salaryMin: 6000,
      salaryMax: 8500,
      posted: "1 day ago",
      description:
        "Experienced full-stack developer to work on multiple client projects.",
      requirements: ["React/Vue", "Node.js", "MongoDB", "AWS"],
      category: "Full Stack",
      experience: "Senior Level",
    },
  ];

  // Filter and search logic
  const filteredJobs = useMemo(() => {
    let filtered = allJobs;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.requirements.some((req) => req.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== "All Jobs") {
      filtered = filtered.filter((job) => job.category === selectedCategory);
    }

    // Job type filter
    if (filters.jobType !== "All") {
      filtered = filtered.filter((job) => job.type === filters.jobType);
    }

    // Salary range filter
    if (filters.salaryRange !== "All") {
      const [min, max] = getSalaryRange(filters.salaryRange);
      filtered = filtered.filter((job) => {
        if (max === Infinity) {
          return job.salaryMin >= min;
        }
        return job.salaryMin >= min && job.salaryMax <= max;
      });
    }

    // Location filter
    if (filters.location !== "All") {
      filtered = filtered.filter((job) => job.location === filters.location);
    }

    // Experience filter
    if (filters.experience !== "All") {
      filtered = filtered.filter(
        (job) => job.experience === filters.experience
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, filters]);

  const getSalaryRange = (range: string): [number, number] => {
    switch (range) {
      case "$0-$3000":
        return [0, 3000];
      case "$3000-$5000":
        return [3000, 5000];
      case "$5000-$8000":
        return [5000, 8000];
      case "$8000+":
        return [8000, Infinity];
      default:
        return [0, Infinity];
    }
  };

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Jobs");
    setFilters({
      jobType: "All",
      salaryRange: "All",
      location: "All",
      experience: "All",
    });
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="jobs-hero-section text-center py-20 px-4 bg-linear-to-br from-[var(--color-bg)] to-[var(--color-light)]">
        <div className="max-w-4xl mx-auto">
          <span className="w-auto flex items-center justify-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-full font-semibold text-sm mb-6">
            <SatelliteDish />
            {filteredJobs.length} Live Opportunities
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[var(--color-text)]">
            Remote Jobs for <br className="hidden md:block" />
            <span className="text-[var(--color-primary)]">African Talent</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text)] max-w-2xl mx-auto mb-8">
            Connect with global companies seeking skilled professionals. Work
            from anywhere, earn competitive salaries, and build your career.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("job-listings")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="comic-button"
            >
              Browse All Jobs
            </button>
            <button className="cta flex items-center justify-center gap-2">
              <span className="hover-underline-animation">Upload Resume</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-10 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)]"
                size={20}
              />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-[var(--color-text)] rounded-xl font-medium focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-4 border-2 rounded-xl transition-colors ${
                showFilters
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "border-[var(--color-text)] hover:bg-[var(--color-light)]"
              }`}
            >
              <Filter size={20} />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Job Categories */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {jobCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-300 font-medium ${
                  selectedCategory === category
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "border-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-8 p-6 bg-[var(--color-light)] rounded-xl border-2 border-[var(--color-text)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[var(--color-text)]">
                  Advanced Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) =>
                      handleFilterChange("jobType", e.target.value)
                    }
                    className="w-full p-3 border-2 border-[var(--color-text)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white"
                  >
                    {filterOptions.jobType.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                    Salary Range
                  </label>
                  <select
                    value={filters.salaryRange}
                    onChange={(e) =>
                      handleFilterChange("salaryRange", e.target.value)
                    }
                    className="w-full p-3 border-2 border-[var(--color-text)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white"
                  >
                    {filterOptions.salaryRange.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="w-full p-3 border-2 border-[var(--color-text)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white"
                  >
                    {filterOptions.location.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                    Experience Level
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) =>
                      handleFilterChange("experience", e.target.value)
                    }
                    className="w-full p-3 border-2 border-[var(--color-text)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white"
                  >
                    {filterOptions.experience.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery ||
                selectedCategory !== "All Jobs" ||
                Object.values(filters).some((f) => f !== "All")) && (
                <div className="mt-6 pt-6 border-t border-[var(--color-text)]">
                  <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3">
                    Active Filters:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm">
                        Search: "{searchQuery}"
                      </span>
                    )}
                    {selectedCategory !== "All Jobs" && (
                      <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm">
                        Category: {selectedCategory}
                      </span>
                    )}
                    {Object.entries(filters).map(
                      ([key, value]) =>
                        value !== "All" && (
                          <span
                            key={key}
                            className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm"
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                            {value}
                          </span>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Jobs Grid */}
      <div id="job-listings" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4 md:mb-0">
              Latest Opportunities
            </h2>
            <div className="text-[var(--color-secondary)] font-medium">
              Showing {filteredJobs.length} of {allJobs.length} jobs
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                No jobs found
              </h3>
              <p className="text-[var(--color-secondary)] mb-6">
                Try adjusting your search criteria or clearing some filters
              </p>
              <button onClick={clearAllFilters} className="comic-button">
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="job-card cursor-pointer">
                    <div className="p-6">
                      {/* Job Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[var(--color-text)] mb-2 line-clamp-1">
                            {job.title}
                          </h3>
                          <p className="text-[var(--color-secondary)] font-medium">
                            {job.company}
                          </p>
                        </div>
                        <span className="job-type-badge">{job.type}</span>
                      </div>

                      {/* Job Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                          <MapPin size={16} />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                          <DollarSign size={16} />
                          <span className="text-sm font-medium">
                            {job.salary}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                          <Calendar size={16} />
                          <span className="text-sm">Posted {job.posted}</span>
                        </div>
                      </div>

                      {/* Job Description */}
                      <p className="text-[var(--color-text)] text-sm mb-4 line-clamp-3">
                        {job.description}
                      </p>

                      {/* Requirements */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <span key={index} className="skill-tag">
                              {req}
                            </span>
                          ))}
                          {job.requirements.length > 3 && (
                            <span className="skill-tag">
                              +{job.requirements.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <button className="w-full comic-button">Apply Now</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="comic-button">Load More Jobs</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Users size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Remote Career?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of African professionals working remotely for top
            global companies. Create your profile and get matched with your
            dream job.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-light)] transition-colors text-center"
            >
              Create Profile
            </Link>
            <Link
              to="/about"
              className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[var(--color-primary)] transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
