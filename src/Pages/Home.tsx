import { Courses } from "../Components/Courses";
import Footer from "../Components/Footer";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (!isLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Show loading or nothing while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render home page if user is not authenticated
  if (user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <Courses />
      <Footer />
    </div>
  );
};
