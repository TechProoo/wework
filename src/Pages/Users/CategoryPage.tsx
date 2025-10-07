import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Search,
  Star,
  Clock,
  Users,
  Play,
  Award,
  ArrowLeft,
  Grid,
  List,
  Target,
  Palette,
  Code,
  Megaphone,
  Heart,
  Share2,
  Bookmark,
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
  description: string;
  tags: string[];
  isBestseller?: boolean;
  isNew?: boolean;
}

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  gradient: string;
  totalCourses: number;
  totalStudents: number;
  skills: string[];
  careerPaths: string[];
}

export const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Category configurations
  const categoryConfigs: Record<string, CategoryInfo> = {
    "ui-ux-design": {
      id: "ui-ux-design",
      name: "UI/UX Design",
      description:
        "Master the art of creating beautiful, user-friendly interfaces and exceptional user experiences. Learn design thinking, prototyping, and modern design tools.",
      icon: <Palette size={24} className="text-white" />,
      color: "bg-purple-500",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      totalCourses: 42,
      totalStudents: 15420,
      skills: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Prototyping",
        "User Research",
        "Wireframing",
      ],
      careerPaths: [
        "UI Designer",
        "UX Designer",
        "Product Designer",
        "Design Lead",
      ],
    },
    branding: {
      id: "branding",
      name: "Branding",
      description:
        "Build powerful brand identities that resonate with audiences. Learn logo design, brand strategy, and visual identity systems.",
      icon: <Target size={24} className="text-white" />,
      color: "bg-blue-500",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      totalCourses: 28,
      totalStudents: 8730,
      skills: [
        "Logo Design",
        "Brand Strategy",
        "Visual Identity",
        "Color Theory",
        "Typography",
      ],
      careerPaths: [
        "Brand Designer",
        "Creative Director",
        "Marketing Designer",
        "Brand Strategist",
      ],
    },
    "front-end": {
      id: "front-end",
      name: "Front End Development",
      description:
        "Create stunning, responsive websites and web applications. Master HTML, CSS, JavaScript, and modern frameworks like React and Vue.",
      icon: <Code size={24} className="text-white" />,
      color: "bg-green-500",
      gradient: "from-green-600 via-teal-600 to-blue-600",
      totalCourses: 67,
      totalStudents: 23150,
      skills: [
        "HTML/CSS",
        "JavaScript",
        "React",
        "Vue.js",
        "TypeScript",
        "Responsive Design",
      ],
      careerPaths: [
        "Frontend Developer",
        "React Developer",
        "Web Developer",
        "Full Stack Developer",
      ],
    },
    marketing: {
      id: "marketing",
      name: "Digital Marketing",
      description:
        "Drive growth through strategic digital marketing. Learn SEO, social media marketing, content strategy, and data analytics.",
      icon: <Megaphone size={24} className="text-white" />,
      color: "bg-orange-500",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      totalCourses: 35,
      totalStudents: 12840,
      skills: [
        "SEO",
        "Social Media",
        "Content Marketing",
        "Google Ads",
        "Analytics",
        "Email Marketing",
      ],
      careerPaths: [
        "Digital Marketer",
        "SEO Specialist",
        "Content Strategist",
        "Marketing Manager",
      ],
    },
  };

  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (categoryId && categoryConfigs[categoryId]) {
      setCategory(categoryConfigs[categoryId]);

      // Mock courses data for the category
      const mockCourses: Course[] = [
        {
          id: "1",
          title:
            categoryId === "ui-ux-design"
              ? "Complete UI/UX Design Bootcamp"
              : categoryId === "branding"
              ? "Brand Identity Design Masterclass"
              : categoryId === "front-end"
              ? "Modern React Development"
              : "Digital Marketing Strategy 2024",
          instructor: "Sarah Johnson",
          instructorAvatar: "/api/placeholder/40/40",
          category: categoryConfigs[categoryId].name,
          level: "Beginner",
          duration: "18.5 hours",
          students: 2847,
          rating: 4.9,
          reviews: 421,
          price: 89.99,
          originalPrice: 199.99,
          thumbnail: "/api/placeholder/300/200",
          isEnrolled: false,

          description: "Master the fundamentals and advance to expert level",
          tags: categoryConfigs[categoryId].skills.slice(0, 3),
          isBestseller: true,
        },
        {
          id: "2",
          title:
            categoryId === "ui-ux-design"
              ? "Advanced Prototyping with Figma"
              : categoryId === "branding"
              ? "Logo Design Psychology"
              : categoryId === "front-end"
              ? "JavaScript ES6+ Masterclass"
              : "SEO & Content Marketing",
          instructor: "Michael Chen",
          instructorAvatar: "/api/placeholder/40/40",
          category: categoryConfigs[categoryId].name,
          level: "Intermediate",
          duration: "12.3 hours",
          students: 1523,
          rating: 4.8,
          reviews: 289,
          price: 79.99,
          thumbnail: "/api/placeholder/300/200",
          isEnrolled: false,

          description: "Take your skills to the next level",
          tags: categoryConfigs[categoryId].skills.slice(1, 4),
          isNew: true,
        },
        {
          id: "3",
          title:
            categoryId === "ui-ux-design"
              ? "User Research & Testing"
              : categoryId === "branding"
              ? "Brand Strategy Fundamentals"
              : categoryId === "front-end"
              ? "CSS Grid & Flexbox Mastery"
              : "Social Media Marketing Pro",
          instructor: "Emma Davis",
          instructorAvatar: "/api/placeholder/40/40",
          category: categoryConfigs[categoryId].name,
          level: "Advanced",
          duration: "24.7 hours",
          students: 934,
          rating: 4.7,
          reviews: 156,
          price: 129.99,
          originalPrice: 249.99,
          thumbnail: "/api/placeholder/300/200",
          isEnrolled: false,

          description: "Expert-level techniques and industry secrets",
          tags: categoryConfigs[categoryId].skills.slice(2, 5),
        },
      ];

      setCourses(mockCourses);
    }
  }, [categoryId]);

  const handleEnrollNow = (courseId: string) => {
    navigate(`/dashboard/courses/enroll/${courseId}`);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel =
      selectedLevel === "all" || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.isNew ? 1 : -1;
      default: // popular
        return b.students - a.students;
    }
  });

  if (!category) {
    return (
      <DashboardLayout
        title="Loading..."
        subtitle="Please wait while we load the category"
        icon={<BookOpen size={18} className="text-white" />}
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={category.name}
      subtitle={`${
        category.totalCourses
      } courses • ${category.totalStudents.toLocaleString()} students`}
      icon={category.icon}
      actions={
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[var(--color-primary)] border border-gray-300 hover:border-[var(--color-primary)] rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
      }
    >
      {/* Category Hero Section */}
      <div
        className={`relative bg-gradient-to-r ${category.gradient} rounded-2xl shadow-2xl border border-gray-200 p-8 text-white overflow-hidden mb-8`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
              <p className="text-white/90 text-lg">{category.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen size={20} className="text-white" />
                <span className="font-semibold">Courses Available</span>
              </div>
              <p className="text-2xl font-bold">{category.totalCourses}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Users size={20} className="text-white" />
                <span className="font-semibold">Students Learning</span>
              </div>
              <p className="text-2xl font-bold">
                {category.totalStudents.toLocaleString()}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Award size={20} className="text-white" />
                <span className="font-semibold">Career Opportunities</span>
              </div>
              <p className="text-2xl font-bold">
                {category.careerPaths.length}+
              </p>
            </div>
          </div>

          {/* Skills & Career Paths */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Skills You'll Learn
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Career Paths</h3>
              <div className="flex flex-wrap gap-2">
                {category.careerPaths.map((path, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/30"
                  >
                    {path}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all appearance-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${
                  viewMode === "list"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{sortedCourses.length}</span> of{" "}
            <span className="font-semibold">{category.totalCourses}</span>{" "}
            courses
          </p>
        </div>
      </div>

      {/* Courses Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Course Image */}
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play
                      size={20}
                      className="text-[var(--color-primary)] ml-1"
                    />
                  </button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {course.isBestseller && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      Bestseller
                    </span>
                  )}
                  {course.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      New
                    </span>
                  )}
                </div>

                {/* Bookmark */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Bookmark size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                      course.level
                    )}`}
                  >
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-gray-500">
                      ({course.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  by {course.instructor}
                </p>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Price and Enroll */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEnrollNow(course.id)}
                    className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors font-semibold"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Course Image */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 lg:h-32 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {course.isBestseller && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          Bestseller
                        </span>
                      )}
                      {course.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {course.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                            course.level
                          )}`}
                        >
                          {course.level}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-2">
                        by {course.instructor}
                      </p>
                      <p className="text-gray-600 mb-4">{course.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>
                            {course.students.toLocaleString()} students
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={14} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                          <span>({course.reviews} reviews)</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {course.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="lg:text-right flex lg:flex-col items-center lg:items-end gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ${course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleEnrollNow(course.id)}
                        className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors font-semibold"
                      >
                        Enroll Now
                      </button>
                      <div className="flex gap-2">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Heart size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Share2 size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {sortedCourses.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedLevel("all");
            }}
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CategoryPage;
