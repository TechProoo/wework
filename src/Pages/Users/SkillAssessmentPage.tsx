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
  Award,
  Star,
  BookOpen,
  TrendingUp,
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Award size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Assessment Complete!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Based on your responses, here's your personalized skill
                assessment and recommended learning path.
              </p>
            </div>

            {/* Skill Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {results.map((result) => (
                <div
                  key={result.category}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 bg-${result.color}-500 rounded-xl flex items-center justify-center`}
                    >
                      <result.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {result.category}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Current Level: {result.level}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">
                        {result.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-${result.color}-500 h-3 rounded-full transition-all duration-1000`}
                        style={{ width: `${result.score}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(result.score / 20)
                            ? `text-${result.color}-500 fill-current`
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/category/${result.category
                          .toLowerCase()
                          .replace(/[^a-z]/g, "-")}`
                      )
                    }
                    className={`w-full bg-${result.color}-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-${result.color}-600 transition-colors duration-300 flex items-center justify-center gap-2`}
                  >
                    <BookOpen size={16} />
                    View Courses
                  </button>
                </div>
              ))}
            </div>

            {/* Recommended Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target size={24} />
                Recommended Next Steps
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <BookOpen size={20} className="text-blue-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Start Learning
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Begin with beginner courses in your interest area
                  </p>
                  <button
                    onClick={() => navigate("/dashboard/courses")}
                    className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                  >
                    Browse Courses →
                  </button>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <TrendingUp size={20} className="text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Set Goals
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Create learning goals based on your results
                  </p>
                  <button
                    onClick={() => navigate("/dashboard/goals")}
                    className="text-green-600 text-sm font-semibold hover:text-green-700"
                  >
                    Set Goals →
                  </button>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <CheckCircle size={20} className="text-purple-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Get Guidance
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Book a consultation for personalized advice
                  </p>
                  <button
                    onClick={() => navigate("/dashboard/consultations")}
                    className="text-purple-600 text-sm font-semibold hover:text-purple-700"
                  >
                    Book Session →
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartAssessment}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Retake Assessment
              </button>
              <button
                onClick={() => navigate("/dashboard/courses")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <BookOpen size={20} />
                Explore Courses
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-2xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Skill Assessment
              </h1>
              <div className="text-sm text-gray-600">
                {currentStep + 1} of {questions.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-gray-600">
              Answer honestly to get personalized course recommendations that
              match your skill level and interests.
            </p>
          </div>

          {/* Question Card */}
          {currentQuestion && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                      answers[currentQuestion.id] === option
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          answers[currentQuestion.id] === option
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {answers[currentQuestion.id] === option && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ArrowLeft size={20} />
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={!hasAnswer}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !hasAnswer
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
              }`}
            >
              {currentStep === questions.length - 1 ? "View Results" : "Next"}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillAssessmentPage;
