import { useAuth } from "../../contexts/AuthContext";
import { DashboardLayout } from "../../Components/DashboardLayout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Users,
  ChevronRight,
  BookOpen,
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
  isCompleted: boolean;
}

interface Tutorial {
  id: string;
  mentor: {
    name: string;
    avatar: string;
  };
  title: string;
  type: "Video" | "Interactive" | "Project";
  date: string;
  duration: string;
}

export const DashboardHome = () => {
  const { user, isLoading } = useAuth();
  console.log(user)
  const navigate = useNavigate();
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  // Navigation handlers
  const handleCategoryClick = (categoryName: string) => {
    const categoryTutorialMap: { [key: string]: string } = {
      "UI/UX Design": "ui-ux-design-tutorial",
      Branding: "branding-tutorial",
      "Front End": "front-end-tutorial",
      Marketing: "marketing-tutorial",
    };
    const tutorialId = categoryTutorialMap[categoryName];
    if (tutorialId) {
      navigate(`/dashboard/courses/enroll/${tutorialId}`);
    }
  };

  const handleBrowseCourses = () => {
    navigate("/dashboard/courses");
  };

  const handleExploreCourses = () => {
    navigate("/dashboard/courses");
  };

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

  // New user data - empty/minimal state
  const categories = [
    { name: "UI/UX Design", progress: "0/0", color: "bg-purple-500" },
    { name: "Branding", progress: "0/0", color: "bg-blue-500" },
    { name: "Front End", progress: "0/0", color: "bg-green-500" },
    { name: "Marketing", progress: "0/0", color: "bg-orange-500" },
  ];

  const continueWatching: Course[] = [];

  const upcomingTutorials: Tutorial[] = [];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
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
          placeholder="Search tutorials..."
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
            {user.firstName?.[0]}
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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-0">
        {/* Main Content */}
        <div className="flex-1 space-y-4 lg:space-y-6">
          {/* Enhanced Welcome Banner */}
          <div className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-slate)] text-white p-8 lg:p-12 rounded-3xl shadow-2xl overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[var(--color-accent)]/40 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[var(--color-accent)]/50 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-[var(--color-accent)]/30 rounded-full animate-pulse delay-700"></div>

            <div className="relative z-10 max-w-3xl">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-2 ring-[var(--color-accent)]/30">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-white via-[var(--color-light)] to-white bg-clip-text text-transparent">
                        Welcome to WEWORK!
                      </h1>
                      <p className="text-white/80 text-sm lg:text-base">
                        Your journey to tech excellence starts here
                      </p>
                    </div>
                  </div>

                  <p className="text-white/90 mb-8 text-base lg:text-lg leading-relaxed">
                    🎯 Ready to transform your career? Explore comprehensive
                    tutorials, advance your skills, and join a community of
                    passionate learners building the future of technology.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBrowseCourses}
                  className="group bg-white text-[var(--color-primary)] px-8 py-4 rounded-2xl font-bold text-sm lg:text-base hover:bg-[var(--color-light)] transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <BookOpen size={20} />
                  <span>Start Learning</span>
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  onClick={() => navigate("/dashboard/community")}
                  className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-sm lg:text-base hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center justify-center gap-2"
                >
                  <Users size={20} />
                  <span>Join Community</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Course Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Explore Categories
                </h2>
                <p className="text-gray-600">
                  Discover your passion and build expertise in trending tech
                  fields
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category.name)}
                  className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${category.color.replace(
                      "bg-",
                      "bg-gradient-to-br from-"
                    )} to-transparent`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-white text-2xl font-bold">
                        {category.name === "UI/UX Design"
                          ? "🎨"
                          : category.name === "Branding"
                          ? "✨"
                          : category.name === "Front End"
                          ? "�"
                          : "📈"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {category.name === "UI/UX Design"
                        ? "Create stunning user experiences and interfaces"
                        : category.name === "Branding"
                        ? "Build powerful brand identities that resonate"
                        : category.name === "Front End"
                        ? "Master modern web development technologies"
                        : "Drive growth with strategic marketing approaches"}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {category.progress === "0/0"
                          ? "Start Journey"
                          : category.progress}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Tutorials */}
          <div>
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <h2 className="text-lg lg:text-xl font-semibold">
                Recommended for You
              </h2>
              <button
                onClick={handleBrowseCourses}
                className="text-[var(--color-primary)] hover:text-[var(--color-accent)] text-xs lg:text-sm font-medium flex items-center gap-1"
              >
                Browse All <ChevronRight size={14} className="lg:w-4 lg:h-4" />
              </button>
            </div>

            {continueWatching.length === 0 ? (
              <div className="bg-gradient-to-br from-[var(--color-light)] to-white rounded-3xl p-12 text-center border border-[var(--color-slate)]/20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--color-primary)]/15 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-3xl flex items-center justify-center shadow-lg">
                    <BookOpen size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                    Ready to Start Learning?
                  </h3>
                  <p className="text-[var(--color-slate)] mb-8 text-lg max-w-md mx-auto leading-relaxed">
                    Join thousands of learners mastering the latest
                    technologies. Your future in tech starts with a single
                    tutorial.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleExploreCourses}
                      className="group bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-8 py-4 rounded-2xl font-bold text-base hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-md  flex items-center justify-center gap-2"
                    >
                      <span>Explore Tutorials</span>
                      <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <button
                      onClick={() => navigate("/dashboard/goals")}
                      className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-2xl font-bold text-base hover:bg-[var(--color-light)] transition-all duration-300 border-2 border-[var(--color-slate)]/30 hover:border-[var(--color-primary)]/50 flex items-center justify-center gap-2"
                    >
                      <Target size={18} />
                      <span>Set Learning Goals</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {/* Course cards would go here */}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">
              Quick Actions
            </h2>

            {upcomingTutorials.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[var(--color-primary)]/30 transform hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-light)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookOpen size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                      Browse Tutorials
                    </h3>
                    <p className="text-[var(--color-slate)] mb-6 leading-relaxed">
                      Discover comprehensive tutorials designed by industry
                      experts to accelerate your career
                    </p>
                    <button
                      onClick={handleExploreCourses}
                      className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-3 px-6 rounded-2xl font-bold text-sm hover:shadow-lg transition-all duration-300 group-hover:shadow-lg"
                    >
                      Explore Now
                    </button>
                  </div>
                </div>

                <div className="group bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[var(--color-accent)]/30 transform hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Target size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                      Set Goals
                    </h3>
                    <p className="text-[var(--color-slate)] mb-6 leading-relaxed">
                      Create personalized learning paths that align with your
                      career aspirations
                    </p>
                    <Link
                      to="/dashboard/goals"
                      className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white py-3 px-6 rounded-2xl font-bold text-sm hover:shadow-lg transition-all duration-300 group-hover:shadow-lg block"
                    >
                      Start Planning
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 lg:space-y-4">
                {/* Tutorials would appear here when user has enrolled */}
              </div>
            )}
          </div>

          {/* Perfect Tutorials to Get Started */}
          <div>
            <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">
              Perfect Tutorials to Get Started
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Web Development Tutorial */}
              <div className="group bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[var(--color-primary)]/30 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">💻</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    Web Development
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    Learn through 8 interactive lessons: HTML basics → CSS
                    styling → JavaScript fundamentals → React components. Build
                    projects as you learn.
                  </p>
                  <button
                    onClick={() =>
                      navigate("/dashboard/courses/enroll/front-end-tutorial")
                    }
                    className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-3 px-6 rounded-2xl font-bold text-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                  >
                    Explore
                  </button>
                </div>
              </div>

              {/* UI/UX Design Tutorial */}
              <div className="group bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[var(--color-primary)]/30 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">🎨</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    UI/UX Design
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    8 structured lessons from user research to final prototype.
                    Practice with real design tools and build a complete mobile
                    app interface.
                  </p>
                  <button
                    onClick={() =>
                      navigate(
                        "/dashboard/courses/enroll/ui-ux-design-tutorial"
                      )
                    }
                    className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-3 px-6 rounded-2xl font-bold text-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                  >
                    Explore
                  </button>
                </div>
              </div>

              {/* Data Science Tutorial */}
              <div className="group bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[var(--color-primary)]/30 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    Data Science
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    End-to-end data science tutorial using Python. Build a
                    complete ML model from data collection to visualization in
                    one session.
                  </p>
                  <button
                    onClick={() =>
                      navigate(
                        "/dashboard/courses/enroll/data-science-tutorial"
                      )
                    }
                    className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-3 px-6 rounded-2xl font-bold text-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          className={`w-full  lg:w-80 p-4 lg:p-6 space-y-4 lg:space-y-6 border-l-0 lg:border-l border-gray-200 bg-white
    ${
      showRightSidebar
        ? "fixed inset-y-0 right-0 z-50 shadow-xl overflow-y-auto"
        : "md:sticky top-10"
    }`}
        >
          <div className="lg:sticky lg:top-10 ">
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

            {/* Profile Welcome Card */}
            <div className="login-card bg-gradient-to-br from-[var(--color-light)] to-white border border-[var(--color-slate)]/20 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm lg:text-base font-semibold">
                    {user.userType === "student"
                      ? user.firstName?.[0] || "U"
                      : user.companyName?.[0] || "C"}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm lg:text-base font-semibold text-[var(--color-text)]">
                    {getGreeting()}{" "}
                    {user.userType === "student"
                      ? user.firstName
                      : user.companyName}
                    ! 👋
                  </h3>
                  <p className="text-xs lg:text-sm text-[var(--color-slate)]">
                    Welcome to your learning dashboard!
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Getting Started Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mt-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Your Progress
                  </h3>
                  <p className="text-sm text-gray-600">
                    Complete your setup journey
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <BarChart3 size={20} className="text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-green-50 border border-green-200">
                  <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-green-700">
                      Account Created
                    </span>
                    <p className="text-xs text-green-600">Welcome aboard! 🎉</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-gray-600 text-sm">2</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-700">
                      Complete Profile
                    </span>
                    <p className="text-xs text-gray-500">
                      Add your skills and interests
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-gray-600 text-sm">3</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-700">
                      Enroll in First Course
                    </span>
                    <p className="text-xs text-gray-500">
                      Start your learning journey
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-700">
                      25% Complete
                    </p>
                    <p className="text-xs text-blue-600">
                      Keep going! You're doing great
                    </p>
                  </div>
                  <div className="w-12 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div className="w-3 h-full bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
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
