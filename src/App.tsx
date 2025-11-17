import { Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Route } from "react-router-dom";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Courses } from "./Pages/Courses";
import { Jobs } from "./Pages/Jobs";
import { Login } from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Consultation } from "./Pages/Consultation";
import { DashboardHome } from "./Pages/Users/DashboardHome";
import { Profile } from "./Pages/Users/Profile";
import { Settings } from "./Pages/Users/Settings";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { PublicOnlyRoute } from "./Components/PublicOnlyRoute";
import { CompanyProtectedRoute } from "./Components/CompanyProtectedRoute";
import { CoursesPage } from "./Pages/Users/Courses_page";
import { JobsPage } from "./Pages/Users/Jobs_page";
import { Bookmarks } from "./Pages/Users/Bookmarks";
import { BuildProfilePage } from "./Pages/Users/BuildProfilePage";
import { JobProfileViewPage } from "./Pages/Users/JobProfileViewPage";
import ConsultationPage from "./Pages/Users/ConsultationPage";
import { MessagesPage } from "./Pages/Users/MessagesPage";
import { Notification } from "./Pages/Users/Notification";
import EnrollmentPage from "./Pages/Users/EnrollmentPage";
import CategoryPage from "./Pages/Users/CategoryPage";
import LearningGoals from "./Pages/Users/LearningGoals";
import Community from "./Pages/Users/Community";
import SkillAssessmentPage from "./Pages/Users/SkillAssessmentPage";
import PopularCoursesPage from "./Pages/Users/PopularCoursesPage";
import CompanyDashboard from "./Pages/Company/DashboardPage";
import CompanyLogin from "./Pages/Company/LoginPage";
import CompanySignup from "./Pages/Company/SignupPage";
import PostJobPage from "./Pages/Company/PostJobPage";

// CHANGED THE BACKEND URL

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup/student"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route path="/consultation" element={<Consultation />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses"
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/build-profile"
          element={
            <ProtectedRoute>
              <BuildProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/job-profile"
          element={
            <ProtectedRoute>
              <JobProfileViewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/consultations"
          element={
            <ProtectedRoute>
              <ConsultationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/notifications"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses/enroll/:courseId"
          element={
            <ProtectedRoute>
              <EnrollmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/category/:categoryId"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/goals"
          element={
            <ProtectedRoute>
              <LearningGoals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/skill-assessment"
          element={
            <ProtectedRoute>
              <SkillAssessmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/popular-courses"
          element={
            <ProtectedRoute>
              <PopularCoursesPage />
            </ProtectedRoute>
          }
        />

        {/* Company Routes */}
        <Route
          path="/company/login"
          element={
            <PublicOnlyRoute>
              <CompanyLogin />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/company/signup"
          element={
            <PublicOnlyRoute>
              <CompanySignup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/company/dashboard"
          element={
            <CompanyProtectedRoute>
              <CompanyDashboard />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/company/post-job"
          element={
            <CompanyProtectedRoute>
              <PostJobPage />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/company/edit-job/:jobId"
          element={
            <CompanyProtectedRoute>
              <PostJobPage />
            </CompanyProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
