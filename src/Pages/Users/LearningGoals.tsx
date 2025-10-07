import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Clock,
  BookOpen,
  Calendar,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Trophy,
  X,
  Eye,
  Play,
  Star,
  Zap,
} from "lucide-react";

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Completed";
  progress: number;
  timeCommitment: string;
  tutorialId?: string;
  tutorialTitle?: string;
}

interface Tutorial {
  id: string;
  title: string;
  category: string;
  lessons: number;
}

export const LearningGoals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showGoalDetails, setShowGoalDetails] = useState<string | null>(null);
  const [selectedGoalForTutorial, setSelectedGoalForTutorial] = useState<
    string | null
  >(null);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    targetDate: "",
    priority: "Medium" as "High" | "Medium" | "Low",
    timeCommitment: "",
  });

  // Available tutorials
  const availableTutorials: Tutorial[] = [
    {
      id: "ui-ux-design-tutorial",
      title: "UI/UX Design Fundamentals",
      category: "UI/UX Design",
      lessons: 8,
    },
    {
      id: "front-end-tutorial",
      title: "Frontend Development Fundamentals",
      category: "Frontend Development",
      lessons: 8,
    },
    {
      id: "marketing-tutorial",
      title: "Digital Marketing Essentials",
      category: "Digital Marketing",
      lessons: 8,
    },
    {
      id: "branding-tutorial",
      title: "Brand Identity Essentials",
      category: "Branding",
      lessons: 8,
    },
    {
      id: "data-science-tutorial",
      title: "Data Science Fundamentals",
      category: "Data Science",
      lessons: 8,
    },
  ];

  // Sample goals data
  useEffect(() => {
    const sampleGoals: LearningGoal[] = [
      {
        id: "1",
        title: "Master UI/UX Design Fundamentals",
        description:
          "Complete all 8 lessons in UI/UX Design and build a mobile app prototype",
        category: "UI/UX Design",
        targetDate: "2024-12-15",
        priority: "High",
        status: "In Progress",
        progress: 37,
        timeCommitment: "2 hours/week",
      },
      {
        id: "2",
        title: "Learn Frontend Development",
        description:
          "Build proficiency in HTML, CSS, JavaScript, and React through structured lessons",
        category: "Frontend Development",
        targetDate: "2025-01-30",
        priority: "High",
        status: "Not Started",
        progress: 0,
        timeCommitment: "3 hours/week",
      },
      {
        id: "3",
        title: "Digital Marketing Certification",
        description:
          "Complete digital marketing essentials and create a marketing campaign project",
        category: "Digital Marketing",
        targetDate: "2024-11-20",
        priority: "Medium",
        status: "Not Started",
        progress: 0,
        timeCommitment: "1.5 hours/week",
      },
    ];
    setGoals(sampleGoals);
  }, []);

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.category && newGoal.targetDate) {
      const goal: LearningGoal = {
        id: Date.now().toString(),
        ...newGoal,
        status: "Not Started",
        progress: 0,
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: "",
        description: "",
        category: "",
        targetDate: "",
        priority: "Medium",
        timeCommitment: "",
      });
      setShowAddGoal(false);
      showNotification("🎯 Learning goal created successfully!");
    }
  };

  const handleDeleteGoal = (id: string) => {
    const goal = goals.find((g) => g.id === id);
    setGoals(goals.filter((goal) => goal.id !== id));
    showNotification(`🗑️ "${goal?.title}" has been deleted`);
  };

  const handleConnectTutorial = (goalId: string, tutorialId: string) => {
    const tutorial = availableTutorials.find((t) => t.id === tutorialId);
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, tutorialId, tutorialTitle: tutorial?.title }
          : goal
      )
    );
    setSelectedGoalForTutorial(null);
    showNotification(
      `📚 Tutorial "${tutorial?.title}" connected successfully!`
    );
  };

  const handleRemoveTutorial = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, tutorialId: undefined, tutorialTitle: undefined }
          : goal
      )
    );
    showNotification(`🔗 Tutorial disconnected from "${goal?.title}"`);
  };

  const handleStartTutorial = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (goal?.tutorialId) {
      navigate(`/dashboard/courses/enroll/${goal.tutorialId}`);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "In Progress":
        return "text-blue-600";
      case "Not Started":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "In Progress":
        return <Clock size={16} className="text-blue-600" />;
      case "Not Started":
        return <AlertCircle size={16} className="text-gray-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const completedGoals = goals.filter(
    (goal) => goal.status === "Completed"
  ).length;
  const inProgressGoals = goals.filter(
    (goal) => goal.status === "In Progress"
  ).length;
  const totalGoals = goals.length;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Modern Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Target className="text-[var(--color-primary)]" size={32} />
                Learning Goals
              </h1>
              <p className="text-gray-600 text-lg">
                Transform your ambitions into achievements with structured
                learning paths
              </p>
            </div>
            <button
              onClick={() => setShowAddGoal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Plus size={20} />
              Create Goal
            </button>
          </div>

          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalGoals}</div>
                  <div className="text-blue-100 text-sm">Total Goals</div>
                </div>
                <Target size={24} className="text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{inProgressGoals}</div>
                  <div className="text-orange-100 text-sm">In Progress</div>
                </div>
                <Zap size={24} className="text-orange-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{completedGoals}</div>
                  <div className="text-green-100 text-sm">Completed</div>
                </div>
                <Trophy size={24} className="text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {totalGoals > 0
                      ? Math.round((completedGoals / totalGoals) * 100)
                      : 0}
                    %
                  </div>
                  <div className="text-purple-100 text-sm">Success Rate</div>
                </div>
                <Star size={24} className="text-purple-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div>
          {goals.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to Start Learning?
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Set your first learning goal and embark on your journey to
                master new skills with structured, achievable objectives.
              </p>
              <button
                onClick={() => setShowAddGoal(true)}
                className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <Plus size={20} />
                Create Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  {/* Goal Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"></div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          {goal.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {goal.description}
                      </p>

                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(
                            goal.priority
                          )}`}
                        >
                          {goal.priority}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                          {goal.category}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(goal.status)}
                        <span
                          className={`text-sm font-semibold ${getStatusColor(
                            goal.status
                          )}`}
                        >
                          {goal.status}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Goal Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} />
                      <span>
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={14} />
                      <span>{goal.timeCommitment}</span>
                    </div>
                  </div>

                  {/* Connected Tutorial Section */}
                  {goal.tutorialId ? (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <div className="text-xs font-medium text-green-700 mb-1">
                              Connected Tutorial
                            </div>
                            <div className="text-sm text-green-600 font-semibold">
                              {goal.tutorialTitle}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveTutorial(goal.id)}
                          className="p-1 text-green-400 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} className="text-blue-500" />
                          <div>
                            <div className="text-xs font-medium text-blue-700 mb-1">
                              Connect Tutorial
                            </div>
                            <div className="text-xs text-blue-600">
                              Link a course to track your progress
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedGoalForTutorial(goal.id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors font-medium"
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowGoalDetails(goal.id)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Eye size={16} />
                      Details
                    </button>
                    {goal.tutorialId && (
                      <button
                        onClick={() => handleStartTutorial(goal.tutorialId!)}
                        className="flex-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                      >
                        <Play size={16} />
                        Start Learning
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center">
                  <Target size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Create New Goal
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                    placeholder="e.g., Master React Development"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, description: e.target.value })
                    }
                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300 resize-none"
                    rows={3}
                    placeholder="Describe what you want to achieve and why it matters to you..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Category
                  </label>
                  <select
                    value={newGoal.category}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, category: e.target.value })
                    }
                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                  >
                    <option value="">Choose your learning category...</option>
                    <option value="UI/UX Design">🎨 UI/UX Design</option>
                    <option value="Frontend Development">
                      💻 Frontend Development
                    </option>
                    <option value="Digital Marketing">
                      📈 Digital Marketing
                    </option>
                    <option value="Branding">🎯 Branding</option>
                    <option value="Data Science">📊 Data Science</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Priority Level
                    </label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          priority: e.target.value as "High" | "Medium" | "Low",
                        })
                      }
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                    >
                      <option value="High">🔥 High Priority</option>
                      <option value="Medium">⚡ Medium Priority</option>
                      <option value="Low">📌 Low Priority</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, targetDate: e.target.value })
                      }
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Weekly Time Commitment
                  </label>
                  <input
                    type="text"
                    value={newGoal.timeCommitment}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, timeCommitment: e.target.value })
                    }
                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                    placeholder="e.g., 5 hours/week, 1 hour daily"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tutorial Selection Modal */}
        {selectedGoalForTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Select Tutorial to Connect
                </h3>
                <button
                  onClick={() => setSelectedGoalForTutorial(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-4">
                {availableTutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[var(--color-primary)] transition-colors cursor-pointer"
                    onClick={() => {
                      handleConnectTutorial(
                        selectedGoalForTutorial,
                        tutorial.id
                      );
                      setSelectedGoalForTutorial(null);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {tutorial.title}
                          </h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">
                            {tutorial.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{tutorial.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Self-paced</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConnectTutorial(
                              selectedGoalForTutorial,
                              tutorial.id
                            );
                            setSelectedGoalForTutorial(null);
                          }}
                          className="px-3 py-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white text-sm rounded-lg transition-colors"
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedGoalForTutorial(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Goal Details Modal */}
        {showGoalDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
              {(() => {
                const goal = goals.find((g) => g.id === showGoalDetails);
                if (!goal) return null;

                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        Goal Details
                      </h3>
                      <button
                        onClick={() => setShowGoalDetails(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {goal.title}
                        </h4>
                        <p className="text-gray-600">{goal.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Category
                          </span>
                          <p className="text-gray-900">{goal.category}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Priority
                          </span>
                          <p className="text-gray-900">{goal.priority}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Target Date
                          </span>
                          <p className="text-gray-900">
                            {new Date(goal.targetDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Time Commitment
                          </span>
                          <p className="text-gray-900">{goal.timeCommitment}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Progress
                        </span>
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {goal.status}
                            </span>
                            <span className="text-sm text-gray-600">
                              {goal.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {goal.tutorialId && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Connected Tutorial
                          </span>
                          <p className="text-gray-900">{goal.tutorialTitle}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => setShowGoalDetails(null)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                      {goal.tutorialId && (
                        <button
                          onClick={() => {
                            handleStartTutorial(goal.tutorialId!);
                            setShowGoalDetails(null);
                          }}
                          className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-lg transition-colors"
                        >
                          Start Tutorial
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-lg z-50 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} />
              <span className="font-semibold">{notification}</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LearningGoals;
