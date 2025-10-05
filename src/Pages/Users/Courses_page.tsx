import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  Award,
  TrendingUp,
  User,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  progress?: number;
  isEnrolled: boolean;
  lessons: number;
  description: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Mock data - replace with API calls
  const categories: Category[] = [
    {
      id: "all",
      name: "All Courses",
      icon: "📚",
      count: 156,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "web-dev",
      name: "Web Development",
      icon: "💻",
      count: 42,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "design",
      name: "UI/UX Design",
      icon: "🎨",
      count: 28,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "data-science",
      name: "Data Science",
      icon: "📊",
      count: 35,
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: "mobile",
      name: "Mobile Development",
      icon: "📱",
      count: 22,
      color: "bg-pink-100 text-pink-700",
    },
    {
      id: "business",
      name: "Business",
      icon: "💼",
      count: 29,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  const courses: Course[] = [
    {
      id: "1",
      title: "Complete React Developer Course 2024",
      instructor: "Sarah Johnson",
      instructorAvatar: "/api/placeholder/40/40",
      category: "web-dev",
      level: "Intermediate",
      duration: "12 hours",
      students: 15420,
      rating: 4.8,
      reviews: 2340,
      price: 89.99,
      originalPrice: 199.99,
      thumbnail: "/api/placeholder/400/300",
      progress: 65,
      isEnrolled: true,
      lessons: 45,
      description:
        "Master React from basics to advanced concepts with real-world projects",
      tags: ["React", "JavaScript", "Frontend"],
    },
    {
      id: "2",
      title: "UI/UX Design Fundamentals",
      instructor: "Michael Chen",
      instructorAvatar: "/api/placeholder/40/40",
      category: "design",
      level: "Beginner",
      duration: "8 hours",
      students: 8920,
      rating: 4.9,
      reviews: 1540,
      price: 69.99,
      originalPrice: 149.99,
      thumbnail: "/api/placeholder/400/300",
      progress: 0,
      isEnrolled: false,
      lessons: 32,
      description: "Learn the principles of great design and user experience",
      tags: ["UI/UX", "Design", "Figma"],
    },
    {
      id: "3",
      title: "Python for Data Science",
      instructor: "Dr. Amanda Rodriguez",
      instructorAvatar: "/api/placeholder/40/40",
      category: "data-science",
      level: "Intermediate",
      duration: "16 hours",
      students: 12100,
      rating: 4.7,
      reviews: 1890,
      price: 99.99,
      originalPrice: 249.99,
      thumbnail: "/api/placeholder/400/300",
      progress: 25,
      isEnrolled: true,
      lessons: 58,
      description:
        "Complete guide to Python programming for data analysis and machine learning",
      tags: ["Python", "Data Science", "Machine Learning"],
    },
    {
      id: "4",
      title: "Flutter Mobile App Development",
      instructor: "James Wilson",
      instructorAvatar: "/api/placeholder/40/40",
      category: "mobile",
      level: "Advanced",
      duration: "20 hours",
      students: 6780,
      rating: 4.6,
      reviews: 890,
      price: 129.99,
      originalPrice: 299.99,
      thumbnail: "/api/placeholder/400/300",
      progress: 0,
      isEnrolled: false,
      lessons: 67,
      description: "Build cross-platform mobile apps with Flutter and Dart",
      tags: ["Flutter", "Dart", "Mobile"],
    },
    {
      id: "5",
      title: "Digital Marketing Mastery",
      instructor: "Emma Thompson",
      instructorAvatar: "/api/placeholder/40/40",
      category: "business",
      level: "Beginner",
      duration: "10 hours",
      students: 9850,
      rating: 4.5,
      reviews: 1230,
      price: 79.99,
      originalPrice: 179.99,
      thumbnail: "/api/placeholder/400/300",
      progress: 0,
      isEnrolled: false,
      lessons: 38,
      description:
        "Complete digital marketing course covering SEO, social media, and advertising",
      tags: ["Marketing", "SEO", "Social Media"],
    },
    {
      id: "6",
      title: "Node.js Backend Development",
      instructor: "Alex Kumar",
      instructorAvatar: "/api/placeholder/40/40",
      category: "web-dev",
      level: "Advanced",
      duration: "18 hours",
      students: 7340,
      rating: 4.8,
      reviews: 1450,
      price: 119.99,
      originalPrice: 279.99,
      thumbnail: "/api/placeholder/400/300",
      progress: 80,
      isEnrolled: true,
      lessons: 52,
      description:
        "Build scalable backend applications with Node.js and Express",
      tags: ["Node.js", "Backend", "API"],
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const enrolledCourses = courses.filter((course) => course.isEnrolled);
  const completedCourses = enrolledCourses.filter(
    (course) => (course.progress || 0) === 100
  );
  const inProgressCourses = enrolledCourses.filter(
    (course) => (course.progress || 0) > 0 && (course.progress || 0) < 100
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
      title="My Courses"
      subtitle="Continue learning and explore new skills"
      icon={<BookOpen size={18} className="text-white" />}
      actions={topNavActions}
      className="space-y-6"
      removeTopPadding={true}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-10">
        {/* Enrolled Courses Card */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-blue-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
                <BookOpen size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-full border border-green-200">
                  +12%
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  vs last month
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {enrolledCourses.length}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Enrolled Courses
              </p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Courses Card */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/10 to-green-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-110">
                <CheckCircle size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200">
                  +8%
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  vs last month
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                {completedCourses.length}
              </h3>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress Card */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-orange-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-110">
                <TrendingUp size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1.5 rounded-full border border-purple-200">
                  +15%
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  vs last month
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                {inProgressCourses.length}
              </h3>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates Card */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-purple-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110">
                <Award size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200">
                  +5%
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  vs last month
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                24
              </h3>
              <p className="text-sm font-medium text-gray-600">Certificates</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      {inProgressCourses.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Continue Learning
            </h2>
            <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {inProgressCourses.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      by {course.instructor}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                  <button className="p-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
                    <Play size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
                <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            All Courses ({filteredCourses.length})
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                  <BookOpen size={48} className="text-white opacity-80" />
                </div>
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      course.level
                    )}`}
                  >
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  {course.isEnrolled ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      Enrolled
                    </span>
                  ) : (
                    <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      ${course.price}
                    </span>
                  )}
                </div>
                {course.isEnrolled &&
                  course.progress !== undefined &&
                  course.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-white bg-opacity-30 rounded-full h-1">
                        <div
                          className="bg-white h-1 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {course.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {course.instructor}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span>({course.reviews})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {course.isEnrolled ? (
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors flex-1">
                      <Play size={16} />
                      {course.progress === 0 ? "Start Course" : "Continue"}
                    </button>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
                        Enroll Now
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoursesPage;
