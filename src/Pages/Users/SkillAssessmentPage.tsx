import { useState } from "react";
import { DashboardLayout } from "../../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Target,
  Palette,
  Globe,
  Database,
  Shield,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Star,
  BookOpen,
  Sparkles,
  Zap,
  Brain,
  Rocket,
  Trophy,
  ChevronRight,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  type: "multiple-choice" | "skill-level" | "interest";
  options?: string[];
  category?: string;
}

interface AssessmentResult {
  category: string;
  score: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: any;
  color: string;
}

const SkillAssessmentPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResult[]>([]);

  const questions: Question[] = [
    {
      id: "experience",
      question: "What's your overall programming experience?",
      type: "multiple-choice",
      options: [
        "Complete beginner - I'm just getting started",
        "Some experience - I've built small projects",
        "Intermediate - I've worked on multiple projects",
        "Advanced - I have professional experience",
      ],
    },
    {
      id: "web-dev",
      question: "How comfortable are you with web development?",
      type: "skill-level",
      options: [
        "Not familiar",
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ],
      category: "Web Development",
    },
    {
      id: "mobile-dev",
      question: "What's your experience with mobile app development?",
      type: "skill-level",
      options: [
        "Not familiar",
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ],
      category: "Mobile Development",
    },
    {
      id: "data-science",
      question: "How familiar are you with data science and analytics?",
      type: "skill-level",
      options: [
        "Not familiar",
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ],
      category: "Data Science",
    },
    {
      id: "ui-ux",
      question: "What's your level in UI/UX design?",
      type: "skill-level",
      options: [
        "Not familiar",
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ],
      category: "UI/UX Design",
    },
    {
      id: "cybersecurity",
      question: "How much do you know about cybersecurity?",
      type: "skill-level",
      options: [
        "Not familiar",
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ],
      category: "Cybersecurity",
    },
    {
      id: "interests",
      question: "Which area interests you the most for future learning?",
      type: "interest",
      options: [
        "Frontend Web Development",
        "Backend Development",
        "Mobile App Development",
        "Data Science & Machine Learning",
        "UI/UX Design",
        "Cybersecurity",
        "Cloud Computing",
        "DevOps",
      ],
    },
    {
      id: "goals",
      question: "What's your primary learning goal?",
      type: "multiple-choice",
      options: [
        "Career change - Switch to tech",
        "Skill upgrade - Enhance current role",
        "Freelancing - Start independent work",
        "Personal projects - Build cool things",
        "Academic - Complement studies",
      ],
    },
    {
      id: "time-commitment",
      question: "How much time can you dedicate to learning per week?",
      type: "multiple-choice",
      options: [
        "2-5 hours - Light commitment",
        "6-10 hours - Moderate commitment",
        "11-20 hours - Serious commitment",
        "20+ hours - Full-time learning",
      ],
    },
  ];

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentStep].id]: answer }));
  };

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResults = () => {
    const skillCategories = [
      { name: "Web Development", icon: Globe, color: "blue" },
      { name: "Mobile Development", icon: Smartphone, color: "purple" },
      { name: "Data Science", icon: Database, color: "green" },
      { name: "UI/UX Design", icon: Palette, color: "pink" },
      { name: "Cybersecurity", icon: Shield, color: "red" },
    ];

    const calculatedResults: AssessmentResult[] = skillCategories.map(
      (category) => {
        const answer =
          answers[category.name.toLowerCase().replace(/[^a-z]/g, "-")];
        let score = 0;
        let level: "Beginner" | "Intermediate" | "Advanced" = "Beginner";

        if (answer) {
          const skillLevels = [
            "Not familiar",
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert",
          ];
          score = skillLevels.indexOf(answer) * 25;

          if (score >= 75) level = "Advanced";
          else if (score >= 50) level = "Intermediate";
          else level = "Beginner";
        }

        return {
          category: category.name,
          score,
          level,
          icon: category.icon,
          color: category.color,
        };
      }
    );

    setResults(calculatedResults);
    setShowResults(true);
  };

  const restartAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setResults([]);
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const hasAnswer = answers[currentQuestion?.id];

  if (showResults) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-[var(--color-light)] via-purple-50 to-blue-50 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-primary)]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-[var(--color-accent)]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-[var(--color-forest)]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-6xl mx-auto py-8 px-4 relative z-10">
            {/* Celebration Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <Trophy size={64} className="text-white drop-shadow-lg" />
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Sparkles size={24} className="text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] mb-4">
                Assessment Complete! 🎉
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Fantastic work! Here's your personalized skill profile and
                recommended learning journey
              </p>

              {/* Stats Summary */}
              <div className="flex justify-center gap-8 mt-8 flex-wrap">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--color-primary)] mb-1">
                    {results.filter((r) => r.score > 0).length}
                  </div>
                  <div className="text-sm text-gray-600">Skills Assessed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--color-forest)] mb-1">
                    {Math.round(
                      results.reduce((acc, r) => acc + r.score, 0) /
                        results.length
                    )}
                    %
                  </div>
                  <div className="text-sm text-gray-600">Avg. Proficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--color-accent)] mb-1">
                    {results.filter((r) => r.level === "Advanced").length +
                      results.filter((r) => r.level === "Intermediate").length}
                  </div>
                  <div className="text-sm text-gray-600">Strong Areas</div>
                </div>
              </div>
            </div>

            {/* Skill Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {results.map((result, index) => (
                <div
                  key={result.category}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${result.color}-500/5 to-${result.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`relative w-16 h-16 bg-gradient-to-br from-${result.color}-400 to-${result.color}-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <result.icon
                            size={32}
                            className="text-white drop-shadow"
                          />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                            <span className="text-xs font-bold text-gray-700">
                              {result.level[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Level Badge */}
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          result.level === "Advanced"
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                            : result.level === "Intermediate"
                            ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                            : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
                        } shadow-md`}
                      >
                        {result.level}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {result.category}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {result.score === 0
                          ? "Not assessed yet"
                          : `You're ${result.level.toLowerCase()} in this skill`}
                      </p>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold text-gray-700">
                          Proficiency
                        </span>
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                          {result.score}%
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${result.color}-400 via-${result.color}-500 to-${result.color}-600 rounded-full transition-all duration-1000 ease-out shadow-lg`}
                          style={{
                            width: `${result.score}%`,
                            animation: "shimmer 2s infinite",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"></div>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`transition-all duration-300 ${
                            i < Math.floor(result.score / 20)
                              ? `text-yellow-400 fill-yellow-400 drop-shadow-sm`
                              : "text-gray-300"
                          }`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-gray-600">
                        {Math.floor(result.score / 20)}/5
                      </span>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() =>
                        navigate(
                          `/dashboard/category/${result.category
                            .toLowerCase()
                            .replace(/[^a-z]/g, "-")}`
                        )
                      }
                      className={`w-full bg-gradient-to-r from-${result.color}-500 to-${result.color}-600 text-white py-3.5 px-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group`}
                    >
                      <BookOpen size={18} />
                      <span>Explore Courses</span>
                      <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Next Steps */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center shadow-lg">
                  <Rocket size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Your Learning Journey Starts Here
                  </h3>
                  <p className="text-gray-600">
                    Choose your next step and start building amazing skills
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="group relative p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:border-[var(--color-primary)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/dashboard/courses")}
                >
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-forest)] rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <BookOpen size={28} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Start Learning
                  </h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Begin with courses tailored to your skill level and
                    interests
                  </p>
                  <div className="flex items-center text-[var(--color-primary)] font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Browse Courses</span>
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>

                <div
                  className="group relative p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 hover:border-[var(--color-forest)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/dashboard/goals")}
                >
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[var(--color-forest)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-accent)] rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Target size={28} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Set Your Goals
                  </h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Define your learning objectives and track your progress
                  </p>
                  <div className="flex items-center text-[var(--color-forest)] font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Create Goals</span>
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>

                <div
                  className="group relative p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 hover:border-[var(--color-accent)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/dashboard/consultations")}
                >
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Brain size={28} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Get Expert Guidance
                  </h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Book personalized consultations with industry professionals
                  </p>
                  <div className="flex items-center text-[var(--color-accent)] font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Book Session</span>
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={restartAssessment}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Retake Assessment
              </button>
              <button
                onClick={() => navigate("/dashboard/courses")}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Zap
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
                Start Learning Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Add custom animations */}
        <style>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-light)] via-purple-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-[var(--color-accent)]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-[var(--color-forest)]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-3xl mx-auto py-8 px-4 relative z-10">
          {/* Enhanced Header Card */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/50 animate-fade-in-up">
            {/* Top Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-xl">
                  <Brain size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900">
                    Skill Assessment
                  </h1>
                  <p className="text-sm text-gray-600">
                    Discover your learning path
                  </p>
                </div>
              </div>

              {/* Step Counter */}
              <div className="text-center">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                  {currentStep + 1}
                </div>
                <div className="text-xs text-gray-500 font-semibold">
                  of {questions.length}
                </div>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="relative mb-6">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shimmer"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs font-semibold text-[var(--color-primary)]">
                  {Math.round(progress)}% Complete
                </span>
                <span className="text-xs font-semibold text-gray-600">
                  {questions.length - currentStep - 1} remaining
                </span>
              </div>
            </div>

            {/* Motivational Text */}
            <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-[var(--color-light)] to-purple-50 rounded-2xl border border-[var(--color-primary)]/20">
              <Sparkles
                size={18}
                className="text-[var(--color-primary)] flex-shrink-0"
              />
              <p className="text-sm text-gray-700 font-medium">
                {currentStep < 3
                  ? "Answer honestly to get personalized course recommendations tailored to you!"
                  : currentStep < 7
                  ? "Great progress! Your responses help us understand your learning style better."
                  : "Almost there! Just a few more questions to complete your profile."}
              </p>
            </div>
          </div>

          {/* Question Card with Enhanced Design */}
          {currentQuestion && (
            <div
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/50 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              {/* Question Header */}
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {currentStep + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                      {currentQuestion.question}
                    </h2>
                    {currentQuestion.category && (
                      <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-[var(--color-light)] to-purple-100 text-[var(--color-primary)] text-xs font-semibold rounded-full">
                        {currentQuestion.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = answers[currentQuestion.id] === option;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`group w-full p-5 text-left rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                        isSelected
                          ? "border-[var(--color-primary)] bg-gradient-to-r from-[var(--color-light)] to-purple-50 shadow-xl scale-[1.02]"
                          : "border-gray-200 bg-white hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-light)]/50 hover:shadow-lg hover:scale-[1.01]"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Selection Indicator */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`relative w-6 h-6 rounded-full border-2 flex-shrink-0 transition-all duration-300 ${
                            isSelected
                              ? "border-[var(--color-primary)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg"
                              : "border-gray-300 group-hover:border-[var(--color-primary)]/50"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <CheckCircle size={24} className="text-white" />
                            </div>
                          )}
                          {!isSelected && (
                            <div className="absolute inset-1 bg-white rounded-full group-hover:bg-[var(--color-light)] transition-colors"></div>
                          )}
                        </div>

                        <span
                          className={`font-semibold text-base transition-colors ${
                            isSelected
                              ? "text-[var(--color-primary)]"
                              : "text-gray-700 group-hover:text-[var(--color-primary)]"
                          }`}
                        >
                          {option}
                        </span>
                      </div>

                      {/* Hover Effect */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 rounded-2xl"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Helper Text */}
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                <Zap size={16} className="text-[var(--color-accent)]" />
                <span>
                  Select the option that best describes your experience
                </span>
              </div>
            </div>
          )}

          {/* Enhanced Navigation */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={prevQuestion}
              disabled={currentStep === 0}
              className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl border-2 border-gray-200 hover:border-gray-300"
              }`}
            >
              <ArrowLeft
                size={20}
                className={
                  currentStep !== 0
                    ? "group-hover:-translate-x-1 transition-transform"
                    : ""
                }
              />
              <span>Previous</span>
            </button>

            <button
              onClick={nextQuestion}
              disabled={!hasAnswer}
              className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                !hasAnswer
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] text-white hover:shadow-2xl hover:scale-105"
              }`}
            >
              <span>
                {currentStep === questions.length - 1 ? (
                  <span className="flex items-center gap-2">
                    <Trophy size={20} />
                    View Results
                  </span>
                ) : (
                  "Next Question"
                )}
              </span>
              <ArrowRight
                size={20}
                className={
                  hasAnswer
                    ? "group-hover:translate-x-1 transition-transform"
                    : ""
                }
              />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                    : index < currentStep
                    ? "w-2 bg-green-500"
                    : "w-2 bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Add custom animations */}
        <style>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default SkillAssessmentPage;
