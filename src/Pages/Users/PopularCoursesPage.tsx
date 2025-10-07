import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Search,
  Star,
  Clock,
  Users,
  Play,
  Grid,
  List,
  TrendingUp,
  Heart,
  Share2,
  Bookmark,
  ArrowRight,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  description: string;
  tags: string[];
  isPopular: boolean;
  enrollmentCount: number;
  lastUpdated: string;
  tutorial: {
    id: string;
    stepCount: number;
    estimatedTime: string;
    difficulty: "Easy" | "Medium" | "Hard";
    topics: string[];
  };
}

const PopularCoursesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock popular courses data
  const [courses] = useState<Course[]>([
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      instructor: "WEWORK Team",
      instructorAvatar: "/api/placeholder/40/40",
      category: "Web Development",
      level: "Beginner",
      rating: 4.9,
      students: 250000,
      duration: "52 hours",
      lessons: 350,
      price: 89.99,
      originalPrice: 199.99,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Learn HTML, CSS, JavaScript, Node.js, React, and more in this comprehensive bootcamp.",
      tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      isPopular: true,
      enrollmentCount: 250000,
      lastUpdated: "2024-10-01",
      tutorial: {
        id: "web-dev-bootcamp-tutorial-1",
        stepCount: 15,
        estimatedTime: "90 minutes",
        difficulty: "Easy",
        topics: [
          "HTML Basics",
          "CSS Styling",
          "JavaScript Fundamentals",
          "DOM Manipulation",
          "Responsive Design",
        ],
      },
    },
    {
      id: "2",
      title: "Python for Data Science and Machine Learning",
      instructor: "WEWORK Team",
      instructorAvatar: "/api/placeholder/40/40",
      category: "Data Science",
      level: "Intermediate",
      rating: 4.8,
      students: 180000,
      duration: "25 hours",
      lessons: 165,
      price: 79.99,
      originalPrice: 149.99,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Master Python for data analysis, visualization, and machine learning algorithms.",
      tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
      isPopular: true,
      enrollmentCount: 180000,
      lastUpdated: "2024-09-15",
      tutorial: {
        id: "python-ds-ml-tutorial-2",
        stepCount: 12,
        estimatedTime: "70 minutes",
        difficulty: "Medium",
        topics: [
          "Python Syntax",
          "Data Manipulation",
          "Data Visualization",
          "Statistical Analysis",
          "ML Algorithms",
        ],
      },
    },
    {
      id: "3",
      title: "UI/UX Design Complete Course",
      instructor: "WEWORK Team",
      instructorAvatar: "/api/placeholder/40/40",
      category: "Design",
      level: "Beginner",
      rating: 4.7,
      students: 120000,
      duration: "18 hours",
      lessons: 120,
      price: 69.99,
      originalPrice: 129.99,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Learn modern UI/UX design principles, tools, and create stunning user interfaces.",
      tags: ["Figma", "Adobe XD", "Design Thinking", "Prototyping"],
      isPopular: true,
      enrollmentCount: 120000,
      lastUpdated: "2024-09-20",
      tutorial: {
        id: "uiux-design-tutorial-3",
        stepCount: 8,
        estimatedTime: "50 minutes",
        difficulty: "Easy",
        topics: [
          "Design Principles",
          "Color Theory",
          "Typography",
          "User Research",
          "Prototyping",
        ],
      },
    },
    {
      id: "4",
      title: "React - The Complete Guide",
      instructor: "WEWORK Team",
      instructorAvatar: "/api/placeholder/40/40",
      category: "Web Development",
      level: "Intermediate",
      rating: 4.9,
      students: 200000,
      duration: "42 hours",
      lessons: 280,
      price: 94.99,
      originalPrice: 179.99,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Dive deep into React.js and build modern web applications with hooks, context, and more.",
      tags: ["React", "JavaScript", "Hooks", "Redux", "Context API"],
      isPopular: true,
      enrollmentCount: 200000,
      lastUpdated: "2024-10-05",
      tutorial: {
        id: "react-complete-tutorial-4",
        stepCount: 10,
        estimatedTime: "65 minutes",
        difficulty: "Medium",
        topics: [
          "JSX Basics",
          "Components",
          "Props & State",
          "Hooks",
          "Context API",
          "Redux",
        ],
      },
    },
    {
      id: "5",
      title: "Mobile App Development with Flutter",
      instructor: "WEWORK Team",
      instructorAvatar: "/api/placeholder/40/40",
      category: "Mobile Development",
      level: "Intermediate",
      rating: 4.6,
      students: 95000,
      duration: "32 hours",
      lessons: 200,
      price: 84.99,
      originalPrice: 159.99,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Build beautiful cross-platform mobile apps with Flutter and Dart programming language.",
      tags: ["Flutter", "Dart", "Mobile", "Cross-platform", "Firebase"],
      isPopular: true,
      enrollmentCount: 95000,
      lastUpdated: "2024-09-10",
      tutorial: {
        id: "flutter-mobile-tutorial-5",
        stepCount: 11,
        estimatedTime: "75 minutes",
        difficulty: "Medium",
        topics: [
          "Dart Language",
          "Flutter Widgets",
          "State Management",
          "Navigation",
          "API Integration",
        ],
      },
    },
    {
      id: "6",
      title: "Cybersecurity Fundamentals",
      instructor: "WEWORK Team",
      instructorAvatar: "/api/placeholder/40/40",
      category: "Cybersecurity",
      level: "Beginner",
      rating: 4.8,
      students: 75000,
      duration: "22 hours",
      lessons: 145,
      price: 74.99,
      originalPrice: 139.99,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Learn ethical hacking, penetration testing, and cybersecurity best practices.",
      tags: ["Ethical Hacking", "Network Security", "Penetration Testing"],
      isPopular: true,
      enrollmentCount: 75000,
      lastUpdated: "2024-08-25",
      tutorial: {
        id: "cybersecurity-tutorial-6",
        stepCount: 9,
        estimatedTime: "60 minutes",
        difficulty: "Easy",
        topics: [
          "Security Basics",
          "Network Fundamentals",
          "Vulnerability Assessment",
          "Ethical Hacking",
          "Security Tools",
        ],
      },
    },
  ]);

  const categories = [
    "All",
    "Web Development",
    "Data Science",
    "Design",
    "Mobile Development",
    "Cybersecurity",
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "students", label: "Most Students" },
  ];

  const filteredAndSortedCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.enrollmentCount - a.enrollmentCount;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
          );
        case "students":
          return b.students - a.students;
        default:
          return 0;
      }
    });

  const handleEnroll = (courseId: string) => {
    navigate(`/dashboard/tutorial/${courseId}`);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num.toString();
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <TrendingUp size={12} />
            Popular
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
            <Heart size={16} />
          </button>
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors">
            <Bookmark size={16} />
          </button>
        </div>
        <div className="absolute bottom-4 right-4">
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 hover:bg-white transition-colors group/play">
            <Play
              size={20}
              className="ml-0.5 group-hover/play:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {course.category}
          </span>
          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            {course.level}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">TP</span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            Created by WEWORK
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="font-semibold">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{formatNumber(course.students)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{course.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <BookOpen size={14} />
                <span>{course.tutorial.stepCount} steps</span>
              </div>
              <div className="flex items-center gap-1">
                <Play size={14} />
                <span>{course.tutorial.estimatedTime}</span>
              </div>
            </div>
            <button
              onClick={() => handleEnroll(course.id)}
              className=" bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-sm text-white hover:shadow-lg flex items-center gap-2 px-5 py-2 rounded-xl"
            >
              Start Tutorial
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CourseListItem = ({ course }: { course: Course }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex gap-6">
        <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp size={10} />
              Popular
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {course.level}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                <Heart size={16} />
              </button>
              <button className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-3 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">TP</span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              Created by WEWORK
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="font-semibold">{course.rating}</span>
                <span>({formatNumber(course.students)} students)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={14} />
                <span>{course.lessons} lessons</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <BookOpen size={14} />
                  <span>{course.tutorial.stepCount} steps</span>
                </div>
                <div className="flex items-center gap-1">
                  <Play size={14} />
                  <span>{course.tutorial.estimatedTime}</span>
                </div>
              </div>
              <button
                onClick={() => handleEnroll(course.id)}
                className="comic-button bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white hover:shadow-lg flex items-center gap-2"
              >
                Start Tutorial
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout
      title="Popular Courses"
      subtitle="Explore our most popular tutorials - expertly crafted by the WEWORK team"
      icon={<TrendingUp size={18} className="text-white" />}
      className="space-y-6"
      removeTopPadding={true}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10">
        {/* Popular Courses Stats */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-orange-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-110">
                <TrendingUp size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200">
                  Trending
                </span>
                <span className="text-xs text-gray-500 mt-1">Most loved</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                {filteredAndSortedCourses.length}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Popular Courses
              </p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Students */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-blue-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
                <Users size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full border border-blue-200">
                  Active
                </span>
                <span className="text-xs text-gray-500 mt-1">Learning now</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {formatNumber(
                  courses.reduce((total, course) => total + course.students, 0)
                )}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Total Students
              </p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Average Rating */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-yellow-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/25 group-hover:shadow-yellow-500/40 transition-all duration-300 group-hover:scale-110">
                <Star size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-3 py-1.5 rounded-full border border-yellow-200">
                  Quality
                </span>
                <span className="text-xs text-gray-500 mt-1">Highly rated</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                {(
                  courses.reduce((total, course) => total + course.rating, 0) /
                  courses.length
                ).toFixed(1)}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Average Rating
              </p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-6 lg:p-8 text-white">
        <div className="max-w-4xl">
          <h2
            className="text-xl lg:text-2xl font-bold mb-3"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            🌟 Most Popular Tutorials - Created by WEWORK!
          </h2>
          <p className="text-white/90 mb-6 text-sm lg:text-base">
            Our expert team crafts each tutorial with hands-on exercises and
            real-world projects. Join thousands of learners mastering tech
            skills through our interactive learning platform.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Users size={16} />
              </div>
              <span>
                {formatNumber(
                  courses.reduce((total, course) => total + course.students, 0)
                )}
                + Students
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Star size={16} />
              </div>
              <span>
                {(
                  courses.reduce((total, course) => total + course.rating, 0) /
                  courses.length
                ).toFixed(1)}{" "}
                Average Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search popular courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-600"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list" ? "bg-white shadow-sm" : "text-gray-600"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Popular Courses
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </h3>
            <p className="text-gray-600 text-sm">
              Showing {filteredAndSortedCourses.length} courses
              {selectedLevel !== "All" && ` for ${selectedLevel} level`}
            </p>
          </div>
        </div>

        {/* Courses Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedCourses.map((course) => (
              <CourseListItem key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find more courses.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedLevel("All");
              }}
              className="comic-button bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white hover:shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PopularCoursesPage;
