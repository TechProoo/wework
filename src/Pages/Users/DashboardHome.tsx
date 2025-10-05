import { useAuth } from "../../contexts/AuthContext";
import { DashboardLayout } from "../../Components/DashboardLayout";
import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  Play,
  Calendar,
  Users,
  TrendingUp,
  ChevronRight,
  BookOpen,
  Video,
  Award,
  Target,
  BarChart3,
  Home,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  mentor: {
    name: string;
    avatar: string;
  };
  progress: number;
  totalLessons: number;
  watchedLessons: number;
}

interface Lesson {
  id: string;
  mentor: {
    name: string;
    avatar: string;
  };
  title: string;
  type: "Video" | "Quiz" | "Assignment";
  date: string;
  duration: string;
}

interface Mentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  followers: number;
  isFollowing: boolean;
}

export const DashboardHome = () => {
  const { user, isLoading } = useAuth();
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  // Apply dashboard layout class to body
  useEffect(() => {
    document.body.classList.add("dashboard-layout");
    return () => {
      document.body.classList.remove("dashboard-layout");
    };
  }, []);

  // Since this is protected by ProtectedRoute, user should always exist
  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Dummy data
  const categories = [
    { name: "UI/UX Design", progress: "2/8", color: "bg-purple-500" },
    { name: "Branding", progress: "5/12", color: "bg-blue-500" },
    { name: "Front End", progress: "3/6", color: "bg-green-500" },
    { name: "Marketing", progress: "1/4", color: "bg-orange-500" },
  ];

  const continueWatching: Course[] = [
    {
      id: "1",
      title: "Advanced React Patterns",
      thumbnail: "/api/placeholder/300/180",
      category: "Front End",
      mentor: { name: "Sarah Johnson", avatar: "/api/placeholder/40/40" },
      progress: 65,
      totalLessons: 12,
      watchedLessons: 8,
    },
    {
      id: "2",
      title: "UI Design Fundamentals",
      thumbnail: "/api/placeholder/300/180",
      category: "UI/UX Design",
      mentor: { name: "Michael Chen", avatar: "/api/placeholder/40/40" },
      progress: 30,
      totalLessons: 15,
      watchedLessons: 4,
    },
    {
      id: "3",
      title: "Brand Strategy Workshop",
      thumbnail: "/api/placeholder/300/180",
      category: "Branding",
      mentor: { name: "Emma Davis", avatar: "/api/placeholder/40/40" },
      progress: 80,
      totalLessons: 8,
      watchedLessons: 6,
    },
  ];

  const upcomingLessons: Lesson[] = [
    {
      id: "1",
      mentor: { name: "Sarah Johnson", avatar: "/api/placeholder/40/40" },
      title: "React Hook Patterns",
      type: "Video",
      date: "Today, 2:00 PM",
      duration: "45 min",
    },
    {
      id: "2",
      mentor: { name: "Michael Chen", avatar: "/api/placeholder/40/40" },
      title: "Design System Creation",
      type: "Assignment",
      date: "Tomorrow, 10:00 AM",
      duration: "2 hours",
    },
    {
      id: "3",
      mentor: { name: "Emma Davis", avatar: "/api/placeholder/40/40" },
      title: "Brand Identity Quiz",
      type: "Quiz",
      date: "Dec 6, 3:00 PM",
      duration: "30 min",
    },
  ];

  const topMentors: Mentor[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior React Developer",
      avatar: "/api/placeholder/40/40",
      followers: 2500,
      isFollowing: false,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "UI/UX Design Lead",
      avatar: "/api/placeholder/40/40",
      followers: 1800,
      isFollowing: true,
    },
    {
      id: "3",
      name: "Emma Davis",
      role: "Brand Strategist",
      avatar: "/api/placeholder/40/40",
      followers: 3200,
      isFollowing: false,
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video size={16} className="text-blue-500" />;
      case "Quiz":
        return <Award size={16} className="text-purple-500" />;
      case "Assignment":
        return <BookOpen size={16} className="text-green-500" />;
      default:
        return <BookOpen size={16} />;
    }
  };

  const topNavActions = (
    <>
      {/* Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-md relative">
        <Search
          size={16}
          className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full pl-7 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
        <button className="relative p-1.5 sm:p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors rounded-lg hover:bg-gray-100">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-red-500 rounded-full"></span>
        </button>

        <button
          onClick={() => setShowRightSidebar(!showRightSidebar)}
          className="lg:hidden p-1.5 sm:p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors rounded-lg hover:bg-gray-100"
        >
          <Users size={16} />
        </button>

        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
          <span className="text-white text-xs lg:text-sm font-semibold">
            {user.userType === "student"
              ? user.firstName?.[0] || "U"
              : user.companyName?.[0] || "C"}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <DashboardLayout
      icon={<Home size={18} className="text-white" />}
      actions={topNavActions}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 space-y-4 lg:space-y-6">
          {/* Hero Banner */}
          <div className="login-card bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white p-6 lg:p-8 rounded-xl lg:rounded-2xl">
            <div className="max-w-2xl">
              <h1
                className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                Sharpen Your Skills with Professional Online Courses
              </h1>
              <p className="text-white/80 mb-4 lg:mb-6 text-sm lg:text-base">
                Join thousands of learners advancing their careers with
                expert-led courses
              </p>
              <button className="comic-button-outline bg-white text-[var(--color-primary)] hover:bg-gray-100 border-white text-sm lg:text-base">
                Join Now
              </button>
            </div>
          </div>

          {/* Course Progress Pills */}
          <div>
            <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">
              Your Progress
            </h2>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 lg:gap-3 bg-white rounded-full px-3 lg:px-4 py-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full ${category.color}`}
                  ></div>
                  <span className="text-xs lg:text-sm font-medium text-gray-700 whitespace-nowrap">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full whitespace-nowrap">
                    {category.progress} watched
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Watching */}
          <div>
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <h2 className="text-lg lg:text-xl font-semibold">
                Continue Watching
              </h2>
              <button className="text-[var(--color-primary)] hover:text-[var(--color-accent)] text-xs lg:text-sm font-medium flex items-center gap-1">
                See All <ChevronRight size={14} className="lg:w-4 lg:h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {continueWatching.map((course) => (
                <div
                  key={course.id}
                  className="login-card p-0 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative">
                    <div className="w-full h-32 lg:h-40 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Play
                        size={20}
                        className="text-white bg-black/20 rounded-full p-1 w-8 h-8 lg:w-10 lg:h-10"
                      />
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span
                        className={`text-xs font-medium px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-white ${
                          course.category === "Front End"
                            ? "bg-green-500"
                            : course.category === "UI/UX Design"
                            ? "bg-purple-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {course.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 lg:p-4">
                    <h3 className="font-semibold text-sm lg:text-base text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">
                          {course.mentor.name[0]}
                        </span>
                      </div>
                      <span className="text-xs lg:text-sm text-gray-600 truncate">
                        {course.mentor.name}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs lg:text-sm">
                        <span className="text-gray-600">
                          {course.watchedLessons}/{course.totalLessons} lessons
                        </span>
                        <span className="text-[var(--color-primary)] font-medium">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 lg:h-2">
                        <div
                          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-1.5 lg:h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Lessons */}
          <div>
            <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">
              Your Lessons
            </h2>

            {/* Mobile Card Layout */}
            <div className="lg:hidden space-y-3">
              {upcomingLessons.map((lesson) => (
                <div key={lesson.id} className="login-card p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">
                        {lesson.mentor.name[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {lesson.mentor.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {getTypeIcon(lesson.type)}
                        <span className="text-xs text-gray-500">
                          {lesson.type}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      {lesson.date}
                    </div>
                    <button className="comic-button flex  text-xs py-1.5 px-3">
                      <Play size={12} className="mr-1" />
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden lg:block login-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingLessons.map((lesson) => (
                      <tr
                        key={lesson.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">
                                {lesson.mentor.name[0]}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {lesson.mentor.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {lesson.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {lesson.duration}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(lesson.type)}
                            <span className="text-sm text-gray-900">
                              {lesson.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} />
                            {lesson.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="comic-button flex items-center text-sm py-2 px-4">
                            <Play size={14} className="mr-1" />
                            Start
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          className={`w-full lg:w-80 p-4 lg:p-6 space-y-4 lg:space-y-6 border-l-0 lg:border-l border-gray-200 bg-white ${
            showRightSidebar ? "block" : "hidden lg:block"
          } ${
            showRightSidebar
              ? "fixed inset-y-0 right-0 z-50 shadow-xl overflow-y-auto"
              : "lg:sticky lg:top-10"
          }`}
        >
          {/* Mobile Close Button */}
          {showRightSidebar && (
            <div className="flex justify-end lg:hidden mb-4">
              <button
                onClick={() => setShowRightSidebar(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          )}

          {/* Profile Greeting Card */}
          <div className="login-card bg-gradient-to-br from-orange-100 to-orange-200 border-orange-200">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                <span className="text-white text-sm lg:text-base font-semibold">
                  {user.userType === "student"
                    ? user.firstName?.[0] || "U"
                    : user.companyName?.[0] || "C"}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                  {getGreeting()}{" "}
                  {user.userType === "student"
                    ? user.firstName
                    : user.companyName}
                  ! 🔥
                </h3>
                <p className="text-xs lg:text-sm text-gray-600">
                  Ready to learn something new?
                </p>
              </div>
            </div>

            <div className="mt-3 lg:mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600">
                  Learning Progress
                </p>
                <p className="text-xl lg:text-2xl font-bold text-[var(--color-primary)]">
                  68%
                </p>
              </div>
              <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                <svg
                  className="w-12 h-12 lg:w-16 lg:h-16 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-300"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-[var(--color-primary)]"
                    strokeDasharray="68, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target
                    size={16}
                    className="lg:w-5 lg:h-5 text-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="login-card">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                Weekly Progress
              </h3>
              <BarChart3 size={18} className="lg:w-5 lg:h-5 text-gray-400" />
            </div>

            <div className="space-y-2 lg:space-y-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => {
                  const values = [80, 65, 90, 45, 75, 60, 85];
                  return (
                    <div key={day} className="flex items-center gap-2 lg:gap-3">
                      <span className="text-xs lg:text-sm text-gray-600 w-6 lg:w-8">
                        {day}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 lg:h-2">
                        <div
                          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-1.5 lg:h-2 rounded-full transition-all duration-500"
                          style={{ width: `${values[index]}%` }}
                        ></div>
                      </div>
                      <span className="text-xs lg:text-sm font-medium text-gray-700 w-8">
                        {values[index]}%
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Top Mentors */}
          <div className="login-card">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                Top Mentors
              </h3>
              <TrendingUp size={18} className="lg:w-5 lg:h-5 text-gray-400" />
            </div>

            <div className="space-y-3 lg:space-y-4">
              {topMentors.map((mentor) => (
                <div key={mentor.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs lg:text-sm font-semibold">
                      {mentor.name[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {mentor.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {mentor.role}
                    </p>
                  </div>
                  <button
                    className={`text-xs px-2 lg:px-3 py-1 rounded-full transition-colors whitespace-nowrap ${
                      mentor.isFollowing
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)]"
                    }`}
                  >
                    {mentor.isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-3 lg:mt-4 text-xs lg:text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium flex items-center justify-center gap-1">
              See All Mentors{" "}
              <ChevronRight size={12} className="lg:w-3.5 lg:h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {showRightSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowRightSidebar(false)}
        />
      )}
    </DashboardLayout>
  );
};
