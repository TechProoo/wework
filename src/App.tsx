import { Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Route } from "react-router-dom";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Courses } from "./Pages/Courses";
import { Jobs } from "./Pages/Jobs";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { Consultation } from "./Pages/Consultation";
import { DashboardHome } from "./Pages/Users/DashboardHome";
import { Profile } from "./Pages/Users/Profile";
import { Settings } from "./Pages/Users/Settings";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { PublicOnlyRoute } from "./Components/PublicOnlyRoute";
import { CoursesPage } from "./Pages/Users/Courses_page";
import { JobsPage } from "./Pages/Users/Jobs_page";
import { ConsultationPage } from "./Pages/Users/ConsultationPage";
import { MessagesPage } from "./Pages/Users/MessagesPage";
import { Notification } from "./Pages/Users/Notification";

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
      </Routes>
    </>
  );
}

export default App;
