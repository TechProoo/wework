import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Play,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Award,
  Clock,
  Target,
  Lightbulb,
  Code,
  Eye,
  Download,
  Star,
  Users,
} from "lucide-react";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  instructor: string;
  rating: number;
  students: number;
  thumbnail: string;
  videoUrl?: string;
  content: {
    introduction: string;
    steps: {
      id: string;
      title: string;
      content: string;
      type: "text" | "code" | "exercise" | "video";
      code?: string;
      hint?: string;
    }[];
    conclusion: string;
    resources: string[];
  };
}

const TutorialViewPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showCode, setShowCode] = useState<{ [key: number]: boolean }>({});

  // Mock tutorial data
  useEffect(() => {
    const getTutorialData = (tutorialId: string): Tutorial => {
      const tutorialMap: { [key: string]: Tutorial } = {
        "1": {
          id: "1",
          title: "Complete Web Development Bootcamp",
          description:
            "Learn HTML, CSS, JavaScript, React, and Node.js in one comprehensive tutorial",
          category: "Web Development",
          level: "Beginner",
          duration: "3 hours",
          instructor: "TechPro Team",
          rating: 4.9,
          students: 250000,
          thumbnail: "/api/placeholder/800/400",
          content: {
            introduction:
              "Welcome to the Complete Web Development Bootcamp! In this tutorial, you'll learn everything you need to know to become a full-stack web developer. We'll start with the basics and build up to creating complete web applications.",
            steps: [
              {
                id: "step1",
                title: "Setting Up Your Development Environment",
                content:
                  "First, let's set up your development environment. You'll need a code editor and a web browser. We recommend Visual Studio Code as your editor.",
                type: "text",
              },
              {
                id: "step2",
                title: "HTML Fundamentals",
                content:
                  "HTML (HyperText Markup Language) is the foundation of all web pages. Let's create your first HTML document.",
                type: "code",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to web development!</p>
</body>
</html>`,
                hint: "Copy this code and save it as 'index.html', then open it in your browser.",
              },
              {
                id: "step3",
                title: "CSS Styling Basics",
                content:
                  "CSS (Cascading Style Sheets) is used to style HTML elements. Let's add some style to your webpage.",
                type: "code",
                code: `/* Add this CSS to make your page look better */
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}`,
                hint: "Add this CSS inside <style> tags in your HTML head section.",
              },
              {
                id: "step4",
                title: "JavaScript Interactivity",
                content:
                  "JavaScript adds interactivity to your web pages. Let's create a simple button that responds to clicks.",
                type: "code",
                code: `// Add this JavaScript to make your page interactive
function showMessage() {
    alert('Congratulations! You just learned web development basics!');
}

// Add this button to your HTML body
// <button onclick="showMessage()">Click Me!</button>`,
                hint: "Add the button HTML to your body and the JavaScript inside <script> tags.",
              },
              {
                id: "step5",
                title: "Practice Exercise",
                content:
                  "Now it's your turn! Create a simple webpage with a header, paragraph, styled with CSS, and a button that shows an alert when clicked.",
                type: "exercise",
                hint: "Use everything you've learned: HTML structure, CSS styling, and JavaScript functionality.",
              },
            ],
            conclusion:
              "Congratulations! You've completed your first web development tutorial. You've learned the fundamentals of HTML, CSS, and JavaScript. Keep practicing and building projects to improve your skills!",
            resources: [
              "MDN Web Docs - HTML Reference",
              "MDN Web Docs - CSS Reference",
              "MDN Web Docs - JavaScript Guide",
              "freeCodeCamp - Web Development Curriculum",
              "W3Schools - Online Web Tutorials",
            ],
          },
        },
        "2": {
          id: "2",
          title: "Python for Data Science and Machine Learning",
          description:
            "Master Python for data analysis, visualization, and machine learning",
          category: "Data Science",
          level: "Intermediate",
          duration: "4 hours",
          instructor: "TechPro Team",
          rating: 4.8,
          students: 180000,
          thumbnail: "/api/placeholder/800/400",
          content: {
            introduction:
              "Welcome to Python for Data Science! In this comprehensive tutorial, you'll learn how to use Python libraries like pandas, numpy, and scikit-learn to analyze data and build machine learning models.",
            steps: [
              {
                id: "step1",
                title: "Python Environment Setup",
                content:
                  "Let's set up your Python environment with the necessary libraries for data science.",
                type: "code",
                code: `# Install required packages
pip install pandas numpy matplotlib scikit-learn jupyter

# Import essential libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split`,
                hint: "Run these commands in your terminal or command prompt.",
              },
              {
                id: "step2",
                title: "Loading and Exploring Data",
                content:
                  "Learn how to load data and perform initial exploration.",
                type: "code",
                code: `# Load a sample dataset
import pandas as pd

# Create sample data
data = {
    'Age': [25, 30, 35, 40, 45],
    'Salary': [50000, 60000, 70000, 80000, 90000],
    'Experience': [2, 5, 8, 12, 15]
}

df = pd.DataFrame(data)

# Explore the data
print(df.head())
print(df.describe())
print(df.info())`,
                hint: "This creates a simple dataset to work with. In real projects, you'd load data from CSV files.",
              },
              {
                id: "step3",
                title: "Data Visualization",
                content:
                  "Create visualizations to understand your data better.",
                type: "code",
                code: `# Create visualizations
import matplotlib.pyplot as plt

# Scatter plot
plt.figure(figsize=(10, 6))
plt.scatter(df['Experience'], df['Salary'])
plt.xlabel('Experience (Years)')
plt.ylabel('Salary ($)')
plt.title('Salary vs Experience')
plt.show()

# Bar chart
plt.figure(figsize=(8, 6))
plt.bar(df['Age'], df['Salary'])
plt.xlabel('Age')
plt.ylabel('Salary ($)')
plt.title('Salary by Age')
plt.show()`,
                hint: "Run this code to see how salary correlates with experience and age.",
              },
              {
                id: "step4",
                title: "Building a Simple ML Model",
                content:
                  "Create a basic machine learning model to predict salary based on experience.",
                type: "code",
                code: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# Prepare the data
X = df[['Experience']].values
y = df['Salary'].values

# Create and train the model
model = LinearRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict(X)

# Evaluate the model
r2 = r2_score(y, predictions)
print(f'R² Score: {r2:.2f}')

# Predict salary for someone with 10 years experience
new_experience = [[10]]
predicted_salary = model.predict(new_experience)
print(f'Predicted salary for 10 years experience: \${predicted_salary[0]:.2f}')`,
                hint: "This creates a linear regression model to predict salary based on experience.",
              },
              {
                id: "step5",
                title: "Practice Project",
                content:
                  "Create your own dataset analysis project using the techniques you've learned.",
                type: "exercise",
                hint: "Try loading a real dataset (like from Kaggle) and apply these techniques to explore and model the data.",
              },
            ],
            conclusion:
              "Excellent work! You've learned the fundamentals of data science with Python. You now know how to load data, explore it, visualize it, and build basic machine learning models. Continue practicing with real datasets to strengthen your skills!",
            resources: [
              "Pandas Documentation",
              "NumPy Documentation",
              "Matplotlib Gallery",
              "Scikit-learn User Guide",
              "Kaggle Learn - Data Science Courses",
            ],
          },
        },
        "ui-ux-design-tutorial": {
          id: "ui-ux-design-tutorial",
          title: "UI/UX Design Fundamentals",
          description:
            "Master user interface and user experience design principles",
          category: "Design",
          level: "Beginner",
          duration: "2.5 hours",
          instructor: "TechPro Team",
          rating: 4.7,
          students: 120000,
          thumbnail: "/api/placeholder/800/400",
          content: {
            introduction:
              "Welcome to UI/UX Design Fundamentals! This tutorial will teach you the essential principles of creating beautiful, user-friendly interfaces. You'll learn design theory and apply it through practical exercises.",
            steps: [
              {
                id: "step1",
                title: "Understanding UI vs UX",
                content:
                  "UI (User Interface) focuses on the visual elements users interact with, while UX (User Experience) encompasses the entire user journey and how they feel using your product.",
                type: "text",
              },
              {
                id: "step2",
                title: "Design Principles: Visual Hierarchy",
                content:
                  "Visual hierarchy guides users' attention through your design. Use size, color, contrast, and spacing to create clear information flow.",
                type: "text",
                hint: "Think about how your eye moves when looking at a well-designed webpage or app.",
              },
              {
                id: "step3",
                title: "Color Theory in Design",
                content:
                  "Colors evoke emotions and convey meaning. Learn to choose color palettes that support your design goals and ensure accessibility.",
                type: "text",
                hint: "Consider using tools like Adobe Color or Coolors.co to create harmonious color schemes.",
              },
              {
                id: "step4",
                title: "Typography Best Practices",
                content:
                  "Typography affects readability and user experience. Choose fonts that are legible, appropriate for your audience, and consistent with your brand.",
                type: "text",
                hint: "Limit yourself to 2-3 font families maximum and establish a clear type scale.",
              },
              {
                id: "step5",
                title: "Layout and Spacing",
                content:
                  "White space (negative space) is crucial for creating clean, organized layouts. Use grids and consistent spacing to create visual harmony.",
                type: "text",
                hint: "Remember: white space is not wasted space - it helps users focus on what's important.",
              },
              {
                id: "step6",
                title: "User Research Basics",
                content:
                  "Good UX starts with understanding your users. Learn basic research methods like user interviews, surveys, and usability testing.",
                type: "text",
                hint: "Always design for your users, not for yourself or your personal preferences.",
              },
              {
                id: "step7",
                title: "Wireframing Exercise",
                content:
                  "Create a simple wireframe for a mobile app login screen. Focus on layout and functionality, not visual details.",
                type: "exercise",
                hint: "Use basic shapes and boxes to represent buttons, input fields, and text. Tools like Figma, Sketch, or even paper work great.",
              },
              {
                id: "step8",
                title: "Final Design Challenge",
                content:
                  "Design a complete user interface for a weather app homepage, applying all the principles you've learned.",
                type: "exercise",
                hint: "Consider: What information is most important? How can you create clear visual hierarchy? What colors and fonts support the app's purpose?",
              },
            ],
            conclusion:
              "Congratulations on completing the UI/UX Design Fundamentals tutorial! You now understand the core principles of good design and user experience. Practice these concepts by redesigning interfaces you use daily and always keep the user at the center of your design decisions.",
            resources: [
              "Figma - Free Design Tool",
              "Material Design Guidelines",
              "Apple Human Interface Guidelines",
              "Nielsen Norman Group - UX Research",
              "Dribbble - Design Inspiration",
            ],
          },
        },
      };

      return tutorialMap[tutorialId] || tutorialMap["1"];
    };

    const tutorialData = getTutorialData(courseId || "1");
    setTutorial(tutorialData);
  }, [courseId]);

  const toggleStepCompletion = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const toggleCodeView = (stepIndex: number) => {
    setShowCode((prev) => ({ ...prev, [stepIndex]: !prev[stepIndex] }));
  };

  const nextStep = () => {
    if (currentStep < (tutorial?.content.steps.length || 0) - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isCompleted = completedSteps.length === tutorial?.content.steps.length;
  const progressPercentage = tutorial
    ? (completedSteps.length / tutorial.content.steps.length) * 100
    : 0;

  if (!tutorial) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const currentStepData = tutorial.content.steps[currentStep];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-light)] to-white">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-[var(--color-slate)]/20">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors mb-2 md:mb-0"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-[var(--color-text)]">
                    {tutorial.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-[var(--color-slate)]">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-[var(--color-accent)] fill-current"
                      />
                      {tutorial.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {tutorial.students.toLocaleString()} students
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                <div className="text-right md:text-left">
                  <div className="text-sm font-semibold text-[var(--color-text)]">
                    Progress: {Math.round(progressPercentage)}%
                  </div>
                  <div className="w-full md:w-32 bg-[var(--color-slate)]/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                {isCompleted && (
                  <div className="flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full mt-2 md:mt-0">
                    <Award size={16} />
                    <span className="text-sm font-semibold">Completed!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Steps Overview */}
            <div className="lg:col-span-1">
              {/* Mobile Horizontal Scroll Version */}
              <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-[var(--color-slate)]/20 p-4 mb-6">
                <h3 className="font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
                  <BookOpen size={18} />
                  Tutorial Steps
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[var(--color-slate)]/30">
                  {tutorial.content.steps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        currentStep === index
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                          : "bg-[var(--color-light)] hover:bg-white text-[var(--color-text)]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          completedSteps.includes(index)
                            ? "bg-[var(--color-primary)] text-white"
                            : currentStep === index
                            ? "bg-[var(--color-accent)] text-white"
                            : "bg-[var(--color-slate)]/30 text-[var(--color-slate)]"
                        }`}
                      >
                        {completedSteps.includes(index) ? (
                          <CheckCircle size={12} />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {step.title.length > 20
                          ? `${step.title.substring(0, 20)}...`
                          : step.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Sidebar Version */}
              <div className="hidden lg:block sticky top-20 self-start z-10">
                <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-slate)]/20 p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
                  <h3 className="font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                    <BookOpen size={18} />
                    Tutorial Steps
                  </h3>
                  <div className="space-y-2">
                    {tutorial.content.steps.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(index)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                          currentStep === index
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20"
                            : "hover:bg-[var(--color-light)] text-[var(--color-text)]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              completedSteps.includes(index)
                                ? "bg-[var(--color-primary)] text-white"
                                : currentStep === index
                                ? "bg-[var(--color-accent)] text-white"
                                : "bg-[var(--color-slate)]/20 text-[var(--color-slate)]"
                            }`}
                          >
                            {completedSteps.includes(index) ? (
                              <CheckCircle size={14} />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {step.title}
                            </p>
                            <p className="text-xs opacity-70 capitalize">
                              {step.type}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-slate)]/20 p-8">
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          currentStepData.type === "code"
                            ? "bg-[var(--color-accent)]"
                            : currentStepData.type === "exercise"
                            ? "bg-orange-500"
                            : currentStepData.type === "video"
                            ? "bg-red-500"
                            : "bg-[var(--color-primary)]"
                        }`}
                      >
                        {currentStepData.type === "code" ? (
                          <Code size={20} />
                        ) : currentStepData.type === "exercise" ? (
                          <Target size={20} />
                        ) : currentStepData.type === "video" ? (
                          <Play size={20} />
                        ) : (
                          <BookOpen size={20} />
                        )}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                        <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
                          {currentStepData.title}
                        </h2>
                        <p className="text-[var(--color-slate)] capitalize mt-1 md:mt-0 md:ml-4 text-sm md:text-base">
                          Step {currentStep + 1} • {currentStepData.type}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStepCompletion(currentStep)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl font-semibold transition-all duration-300
                      ${
                        completedSteps.includes(currentStep)
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20"
                          : "bg-[var(--color-light)] text-[var(--color-text)] hover:bg-[var(--color-slate)]/10"
                      }
                      text-sm md:text-base
                    `}
                  >
                    <CheckCircle size={18} />
                    {completedSteps.includes(currentStep)
                      ? "Completed"
                      : "Mark Complete"}
                  </button>
                </div>

                {/* Step Content */}
                <div className="prose max-w-none mb-8">
                  <p className="text-[var(--color-text)] text-lg leading-relaxed mb-6">
                    {currentStepData.content}
                  </p>

                  {/* Code Block */}
                  {currentStepData.type === "code" && currentStepData.code && (
                    <div className="bg-gray-900 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          <Code size={18} />
                          Code Example
                        </h4>
                        <button
                          onClick={() => toggleCodeView(currentStep)}
                          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                          <Eye size={16} />
                          {showCode[currentStep] ? "Hide" : "Show"} Code
                        </button>
                      </div>
                      {showCode[currentStep] && (
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{currentStepData.code}</code>
                        </pre>
                      )}
                    </div>
                  )}

                  {/* Hint */}
                  {currentStepData.hint && (
                    <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Lightbulb
                          size={18}
                          className="text-[var(--color-accent)] mt-0.5"
                        />
                        <div>
                          <h4 className="font-semibold text-[var(--color-text)] mb-1">
                            Hint
                          </h4>
                          <p className="text-[var(--color-slate)]">
                            {currentStepData.hint}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Exercise */}
                  {currentStepData.type === "exercise" && (
                    <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-xl p-6 mb-6">
                      <div className="flex items-start gap-3">
                        <Target
                          size={20}
                          className="text-[var(--color-primary)] mt-0.5"
                        />
                        <div>
                          <h4 className="font-bold text-[var(--color-text)] mb-2">
                            Practice Exercise
                          </h4>
                          <p className="text-[var(--color-slate)] mb-4">
                            Complete this hands-on exercise to reinforce your
                            learning.
                          </p>
                          <button className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-4 py-2 rounded-lg font-semibold hover:shadow-md transition-all duration-300">
                            Start Exercise
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-6 border-t border-[var(--color-slate)]/20 gap-4">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto ${
                      currentStep === 0
                        ? "bg-[var(--color-light)] text-[var(--color-slate)]/50 cursor-not-allowed"
                        : "bg-[var(--color-light)] text-[var(--color-text)] hover:bg-white"
                    }`}
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </button>

                  <div className="text-center w-full sm:w-auto">
                    <p className="text-[var(--color-slate)] text-sm">
                      Step {currentStep + 1} of {tutorial.content.steps.length}
                    </p>
                  </div>

                  {currentStep === tutorial.content.steps.length - 1 ? (
                    <button
                      onClick={() => navigate("/dashboard/courses")}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                    >
                      <Award size={18} />
                      Finish Tutorial
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                    >
                      Next
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Completion Summary */}
              {isCompleted && (
                <div className="mt-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-2xl p-8 text-center">
                  <Award size={48} className="mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                  <p className="text-white/90 mb-6">
                    {tutorial.content.conclusion}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => {
                        setCurrentStep(0);
                        setCompletedSteps([]);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
                    >
                      <RotateCcw size={18} />
                      Restart Tutorial
                    </button>
                    <button
                      onClick={() => navigate("/dashboard/courses")}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary)] rounded-xl font-semibold hover:bg-[var(--color-light)] transition-colors"
                    >
                      <BookOpen size={18} />
                      Browse More Courses
                    </button>
                  </div>
                </div>
              )}

              {/* Resources */}
              {tutorial.content.resources.length > 0 && (
                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-[var(--color-slate)]/20 p-6">
                  <h3 className="font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                    <Download size={18} />
                    Additional Resources
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tutorial.content.resources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[var(--color-light)] rounded-lg hover:bg-white transition-colors w-full"
                      >
                        <BookOpen
                          size={16}
                          className="text-[var(--color-primary)] shrink-0"
                        />
                        <span className="text-[var(--color-text)] font-medium break-words">
                          {resource}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TutorialViewPage;
