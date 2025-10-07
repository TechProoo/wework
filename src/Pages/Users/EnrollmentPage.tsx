import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Star,
  Play,
  CheckCircle,
  Lock,
  ArrowLeft,
  CreditCard,
  Shield,
  Heart,
  Share2,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  instructorTitle: string;
  instructorRating: number;
  instructorStudents: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  description: string;
  longDescription: string;
  tags: string[];
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: {
    title: string;
    totalDuration: string;
    isPreview: boolean;
  };
  features: string[];
  lastUpdated: string;
  language: string;
  certificate: boolean;
}

export const EnrollmentPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "reviews"
  >("overview");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Mock tutorial data - In a real app, this would come from an API
  useEffect(() => {
    // Get tutorial data based on courseId
    const getTutorialData = (tutorialId: string): Course => {
      const tutorialMap: { [key: string]: Partial<Course> } = {
        "ui-ux-design-tutorial": {
          title: "UI/UX Design Fundamentals",
          category: "UI/UX Design",
          description:
            "Master user interface and user experience design through interactive lessons",
          longDescription:
            "Learn UI/UX design through structured, hands-on lessons. Start with design principles and progress through advanced prototyping. Each lesson builds upon the previous one, giving you practical skills you can apply immediately.",
          tags: [
            "UI Design",
            "UX Design",
            "Figma",
            "Prototyping",
            "User Research",
          ],
          whatYouWillLearn: [
            "Lesson 1: Introduction to UI/UX Design Principles",
            "Lesson 2: Understanding User Psychology & Behavior",
            "Lesson 3: Wireframing and Information Architecture",
            "Lesson 4: Creating Visual Hierarchies & Typography",
            "Lesson 5: Color Theory and Design Systems",
            "Lesson 6: Prototyping with Interactive Elements",
            "Lesson 7: Usability Testing & Iteration Methods",
            "Lesson 8: Final Project: Complete App Design",
          ],
          thumbnail: "/api/placeholder/800/400",
        },
        "branding-tutorial": {
          title: "Brand Identity Essentials",
          category: "Branding",
          description:
            "Learn professional branding through step-by-step lessons",
          longDescription:
            "Master brand identity design with our structured lesson approach. From understanding brand psychology to creating complete visual systems, each lesson provides hands-on exercises and real-world applications.",
          tags: [
            "Branding",
            "Logo Design",
            "Visual Identity",
            "Brand Strategy",
            "Typography",
          ],
          whatYouWillLearn: [
            "Lesson 1: Brand Psychology & Strategy Fundamentals",
            "Lesson 2: Logo Design Principles & Techniques",
            "Lesson 3: Color Psychology in Brand Design",
            "Lesson 4: Typography Systems & Hierarchies",
            "Lesson 5: Creating Visual Identity Guidelines",
            "Lesson 6: Brand Applications Across Media",
            "Lesson 7: Packaging & Marketing Materials",
            "Lesson 8: Final Project: Complete Brand System",
          ],
          thumbnail: "/api/placeholder/800/400",
        },
        "front-end-tutorial": {
          title: "Frontend Development Fundamentals",
          category: "Frontend Development",
          description:
            "Build modern websites through interactive coding lessons",
          longDescription:
            "Learn frontend development step-by-step with hands-on coding exercises. Each lesson builds your skills progressively, from basic HTML to advanced JavaScript frameworks, with instant feedback and practice projects.",
          tags: ["HTML", "CSS", "JavaScript", "React", "Frontend"],
          whatYouWillLearn: [
            "Lesson 1: HTML Structure & Semantic Elements",
            "Lesson 2: CSS Styling & Layout Techniques",
            "Lesson 3: Responsive Design with Flexbox & Grid",
            "Lesson 4: JavaScript Fundamentals & DOM Manipulation",
            "Lesson 5: Modern JavaScript (ES6+) & Async Programming",
            "Lesson 6: Introduction to React & Component Architecture",
            "Lesson 7: State Management & API Integration",
            "Lesson 8: Final Project: Complete Web Application",
          ],
          thumbnail: "/api/placeholder/800/400",
        },
        "marketing-tutorial": {
          title: "Digital Marketing Essentials",
          category: "Digital Marketing",
          description:
            "Master digital marketing through practical, step-by-step lessons",
          longDescription:
            "Learn digital marketing fundamentals with hands-on exercises and real campaign examples. Each lesson covers essential marketing skills, from content creation to data analysis, with practical assignments you can apply immediately.",
          tags: [
            "Digital Marketing",
            "SEO",
            "Content Marketing",
            "Social Media",
            "Analytics",
          ],
          whatYouWillLearn: [
            "Lesson 1: Digital Marketing Fundamentals & Strategy",
            "Lesson 2: Content Marketing & Storytelling",
            "Lesson 3: Search Engine Optimization (SEO) Basics",
            "Lesson 4: Social Media Marketing & Community Building",
            "Lesson 5: Email Marketing & Automation",
            "Lesson 6: Paid Advertising & Campaign Management",
            "Lesson 7: Analytics & Performance Measurement",
            "Lesson 8: Final Project: Complete Marketing Campaign",
          ],
          thumbnail: "/api/placeholder/800/400",
        },
        "data-science-tutorial": {
          title: "Data Science Fundamentals",
          category: "Data Science",
          description:
            "Learn data science through hands-on Python programming and real datasets",
          longDescription:
            "Master data science with our comprehensive tutorial covering Python programming, data analysis, visualization, and machine learning. Work with real datasets and build a complete ML project from data collection to model deployment.",
          tags: [
            "Python",
            "Data Analysis",
            "Machine Learning",
            "Data Visualization",
            "Pandas",
          ],
          whatYouWillLearn: [
            "Lesson 1: Python Programming for Data Science",
            "Lesson 2: Data Collection & Cleaning with Pandas",
            "Lesson 3: Exploratory Data Analysis & Statistics",
            "Lesson 4: Data Visualization with Matplotlib & Seaborn",
            "Lesson 5: Introduction to Machine Learning",
            "Lesson 6: Building Predictive Models",
            "Lesson 7: Model Evaluation & Optimization",
            "Lesson 8: Final Project: Complete ML Pipeline",
          ],
          thumbnail: "/api/placeholder/800/400",
        },
      };

      const tutorialData =
        tutorialMap[tutorialId] || tutorialMap["ui-ux-design-tutorial"];

      return {
        id: tutorialId,
        instructor: "TechPro Learning",
        instructorAvatar: "/api/placeholder/60/60",
        instructorTitle: "Interactive Learning Platform",
        instructorRating: 4.9,
        instructorStudents: 15420,
        level: "Beginner" as const,
        duration: "8 lessons",
        students: 2847,
        rating: 4.9,
        reviews: 421,
        price: 49.99,
        originalPrice: 99.99,
        ...tutorialData,
        requirements: [
          "Basic computer skills and internet access",
          "Willingness to learn and practice",
          "No prior experience required",
          "Motivation to complete interactive exercises",
        ],
        curriculum: {
          title: tutorialData.title || "Complete Tutorial",
          totalDuration: "8 interactive lessons",
          isPreview: true,
        },
        features: [
          "8 structured interactive lessons",
          "Hands-on coding exercises",
          "Instant feedback and progress tracking",
          "Lifetime access to all content",
          "Mobile and desktop compatibility",
          "Certificate upon completion",
          "Community support forum",
          "Downloadable resources and examples",
        ],
        lastUpdated: "October 2024",
        language: "English",
        certificate: true,
      } as Course;
    };

    const tutorialData = getTutorialData(courseId || "ui-ux-design-tutorial");
    setCourse(tutorialData);
  }, [courseId]);

  const handleEnrollNow = () => {
    setShowPayment(true);
  };

  const handleCompleteEnrollment = async () => {
    setIsEnrolling(true);

    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolling(false);
      setShowPayment(false);
      // Navigate to course content or dashboard
      navigate("/dashboard/courses");
      // Show success message
      alert("🎉 Enrollment successful! Welcome to the course!");
    }, 2000);
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

  if (!course) {
    return (
      <DashboardLayout
        title="Loading..."
        subtitle="Please wait while we load the course details"
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
      title={course.title}
      subtitle={`${course.category} • ${course.level} Level`}
      icon={<BookOpen size={18} className="text-white" />}
      actions={
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[var(--color-primary)] border border-gray-300 hover:border-[var(--color-primary)] rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      }
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Hero */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Play
                    size={32}
                    className="text-[var(--color-primary)] ml-1"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-200">
              {["overview", "curriculum", "instructor", "reviews"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`flex-1 px-6 py-4 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-blue-50"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Course Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {course.longDescription}
                    </p>
                  </div>

                  {/* What You'll Learn */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      What You'll Learn
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle
                            size={20}
                            className="text-green-500 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Lesson Structure
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Complete 8 interactive lessons at your own pace. Each lesson
                    builds upon the previous one with hands-on exercises and
                    instant feedback.
                  </p>
                  <div className="space-y-3">
                    {course.whatYouWillLearn.map((lesson, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {lesson}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Interactive exercises • Practical examples
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {index === 0 ? (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              Free Preview
                            </span>
                          ) : (
                            <Lock size={16} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      🏆 Final Project
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Apply everything you've learned in a comprehensive project
                      that demonstrates your new skills. Get personalized
                      feedback and earn your completion certificate.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "instructor" && (
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">TP</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        TechPro Learning
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Interactive Learning Platform
                      </p>
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          Our tutorials are carefully crafted by industry
                          experts and delivered through an interactive,
                          self-paced learning system. Each lesson is designed
                          with hands-on exercises, instant feedback, and
                          practical examples that you can follow along with.
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">
                              {course.instructorRating}
                            </span>
                            <span className="text-gray-500">
                              Platform Rating
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">
                              {course.instructorStudents.toLocaleString()}
                            </span>
                            <span className="text-gray-500">Learners</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-green-700 font-semibold">
                              ✓ Interactive Exercises
                            </div>
                            <div className="text-green-600 text-sm">
                              Practice as you learn
                            </div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-blue-700 font-semibold">
                              ✓ Instant Feedback
                            </div>
                            <div className="text-blue-600 text-sm">
                              Know your progress immediately
                            </div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="text-purple-700 font-semibold">
                              ✓ Self-Paced
                            </div>
                            <div className="text-purple-600 text-sm">
                              Learn at your own speed
                            </div>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <div className="text-orange-700 font-semibold">
                              ✓ Real Projects
                            </div>
                            <div className="text-orange-600 text-sm">
                              Build portfolio pieces
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">
                        {course.rating}
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= course.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {course.reviews} reviews
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    Reviews will be available after course launch
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
            <div className="p-6">
              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${course.originalPrice}
                  </span>
                )}
                {course.originalPrice && (
                  <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded-full font-medium">
                    {Math.round(
                      ((course.originalPrice - course.price) /
                        course.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              {/* Enroll Button */}
              <button
                onClick={handleEnrollNow}
                disabled={isEnrolling}
                className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
              >
                {isEnrolling ? "Enrolling..." : "Enroll Now"}
              </button>

              <p className="text-center text-sm text-gray-500 mb-6">
                30-day money-back guarantee
              </p>

              {/* Course Info */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="font-semibold text-gray-900">
                  This course includes:
                </h4>
                <div className="space-y-3">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {course.students.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {course.duration}
                  </div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Heart size={16} />
                  <span className="text-sm">Wishlist</span>
                </button>
                <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Share2 size={16} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Course Details</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Level</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                    course.level
                  )}`}
                >
                  {course.level}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Language</span>
                <span className="font-medium">{course.language}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Certificate</span>
                <span className="font-medium">
                  {course.certificate ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">{course.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Complete Enrollment
                </h3>
                <button
                  onClick={() => setShowPayment(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Course Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      by {course.instructor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-[var(--color-primary)]">
                    ${course.price}
                  </span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none"
                    />
                    <CreditCard className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-3 mt-6 p-4 bg-blue-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Secure Payment
                  </p>
                  <p className="text-xs text-blue-600">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>

              {/* Complete Button */}
              <button
                onClick={handleCompleteEnrollment}
                disabled={isEnrolling}
                className="w-full mt-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isEnrolling ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  `Complete Enrollment • $${course.price}`
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                By enrolling, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EnrollmentPage;
