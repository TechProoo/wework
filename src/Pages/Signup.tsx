import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  GraduationCap,
  Building2,
  Users,
  Globe,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../Components/Styles/Button";
import type { CompanyData, StudentData } from "../types/auth";
import toast from "react-hot-toast";



const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [currentStep, setCurrentStep] = useState<
    "selection" | "student" | "company"
  >("selection");
  const [studentData, setStudentData] = useState<StudentData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    major: "",
    graduationYear: "",
  });
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: "",
    industry: "",
    email: "",
    password: "",
    confirmPassword: "",
    website: "",
    companySize: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.body.className = "auth-layout";
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleStudentInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCompanyInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStudentForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!studentData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!studentData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!studentData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(studentData.email))
      newErrors.email = "Email is invalid";
    if (!studentData.password) newErrors.password = "Password is required";
    else if (studentData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (studentData.password !== studentData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!studentData.university.trim())
      newErrors.university = "University is required";
    if (!studentData.major.trim()) newErrors.major = "Major is required";
    if (!studentData.graduationYear)
      newErrors.graduationYear = "Graduation year is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCompanyForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!companyData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!companyData.industry.trim())
      newErrors.industry = "Industry is required";
    if (!companyData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(companyData.email))
      newErrors.email = "Email is invalid";
    if (!companyData.password) newErrors.password = "Password is required";
    else if (companyData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (companyData.password !== companyData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!companyData.companySize)
      newErrors.companySize = "Company size is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStudentForm()) return;

    setLoading(true);
    try {
      const result = await signup(studentData, "student");

      if (result.success) {
        // Success! AuthContext automatically logs in the user
        toast.success("Account created successfully! Redirecting to your dashboard...");
        // Redirect to student dashboard
        navigate("/dashboard");
      } else {
        // Handle signup error
        const errorMsg = result.error || "Signup failed. Please try again.";
        setErrors({ submit: errorMsg });
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Student signup error:", error);
      const errorMsg = "An unexpected error occurred. Please try again.";
      setErrors({ submit: errorMsg });
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCompanyForm()) return;

    setLoading(true);
    try {
      const result = await signup(companyData, "company");

      if (result.success) {
        // Success! AuthContext automatically logs in the user
        toast.success("Company account created successfully! Redirecting to your dashboard...");
        // Redirect to company dashboard
        navigate("/company/dashboard");
      } else {
        // Handle signup error
        const errorMsg = result.error || "Signup failed. Please try again.";
        setErrors({ submit: errorMsg });
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Company signup error:", error);
      const errorMsg = "An unexpected error occurred. Please try again.";
      setErrors({ submit: errorMsg });
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const renderUserSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-forest-200/20 to-mauve-200/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-mauve-200/20 to-forest-200/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 mb-6">
            <Sparkles size={16} className="text-mauve-600" />
            <span className="text-sm font-medium text-slate-600">
              Start Your Journey
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-forest-600 via-slate-700 to-forest-800 bg-clip-text text-transparent">
            Join <span className="text-mauve-600">WEWORK</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The premier platform connecting talented students with innovative
            companies. Start your journey towards meaningful career
            opportunities and growth.
          </p>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
          <div className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-forest-200 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-forest-500 to-forest-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users size={28} className="" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-forest-600 to-forest-700 bg-clip-text  mb-2">
              50K+
            </div>
            <div className="text-slate-600 font-medium">Active Users</div>
          </div>
          <div className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-mauve-200 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-mauve-500 to-forest-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Globe size={28} className="" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-mauve-600 to-forest-700 bg-clip-text mb-2">
              500+
            </div>
            <div className="text-slate-600 font-medium">Companies</div>
          </div>
          <div className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-forest-200 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={28} className="text-white" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-2">
              95%
            </div>
            <div className="text-slate-600 font-medium">Success Rate</div>
          </div>
        </div>

        {/* Enhanced User Type Selection */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            How would you like to join?
          </h2>
          <p className="text-lg text-slate-600">
            Choose your account type to get started with a personalized
            experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Enhanced Student Card */}
          <div
            onClick={() => setCurrentStep("student")}
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 cursor-pointer hover:border-forest-300 transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-forest-500 to-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                I'm a Student
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Find internships, full-time opportunities, and connect with top
                companies looking for fresh talent and new perspectives.
              </p>
              <ul className="text-left text-slate-600 space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle
                    size={16}
                    className="text-forest-600 mr-3 flex-shrink-0"
                  />
                  <span>Browse exclusive internships & jobs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle
                    size={16}
                    className="text-forest-600 mr-3 flex-shrink-0"
                  />
                  <span>Create your professional portfolio</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle
                    size={16}
                    className="text-forest-600 mr-3 flex-shrink-0"
                  />
                  <span>Network with hiring managers</span>
                </li>
              </ul>
              <div className="flex items-center justify-center gap-2 text-forest-600 font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Join as Student</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Company Card */}
          <div
            onClick={() => setCurrentStep("company")}
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 cursor-pointer hover:border-mauve-300 transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-mauve-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-mauve-500 to-purple-500 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Building2 size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                I'm a Company
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Post job openings, discover talented candidates, and build your
                team with the brightest minds from leading universities.
              </p>
              <ul className="text-left text-slate-600 space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle
                    size={16}
                    className="text-mauve-600 mr-3 flex-shrink-0"
                  />
                  <span>Post job openings & internships</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle
                    size={16}
                    className="text-mauve-600 mr-3 flex-shrink-0"
                  />
                  <span>Browse pre-screened candidates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle
                    size={16}
                    className="text-mauve-600 mr-3 flex-shrink-0"
                  />
                  <span>Streamlined hiring process</span>
                </li>
              </ul>
              <div className="flex items-center justify-center gap-2 text-mauve-600 font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Join as Company</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="text-center mt-20">
          <p className="text-slate-500 mb-6 font-medium">
            Trusted by leading companies and universities worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="font-semibold">Microsoft</span>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="font-semibold">Google</span>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="font-semibold">Stanford</span>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="font-semibold">MIT</span>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="font-semibold">Harvard</span>
            </div>
          </div>
        </div>

        {/* Enhanced Login Link */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <span className="text-slate-600">Already have an account?</span>
            <Link
              to="/login"
              className="text-forest-600 hover:text-forest-700 font-semibold transition-colors duration-200 hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-200/30 to-forest-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-forest-200/30 to-emerald-200/30 blur-3xl"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-10">
          <button
            onClick={() => setCurrentStep("selection")}
            className="group inline-flex items-center gap-2 text-slate-600 hover:text-forest-600 mb-6 transition-colors duration-200 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Back to selection</span>
          </button>

          <div className="w-20 h-20 bg-gradient-to-br from-forest-500 to-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <GraduationCap size={32} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-forest-600 to-emerald-600 bg-clip-text text-transparent">
              Student Signup
            </span>
          </h1>
          <p className="text-slate-600 text-lg">
            Create your account and start building your future
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
          <form onSubmit={handleStudentSubmit} className="space-y-6">
            {/* Enhanced Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={studentData.firstName}
                  onChange={handleStudentInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={studentData.lastName}
                  onChange={handleStudentInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Enhanced Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-3"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={studentData.email}
                onChange={handleStudentInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                placeholder="your.email@university.edu"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Enhanced Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={studentData.password}
                    onChange={handleStudentInputChange}
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                    placeholder="Create strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={studentData.confirmPassword}
                    onChange={handleStudentInputChange}
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Enhanced University */}
            <div>
              <label
                htmlFor="university"
                className="block text-sm font-semibold text-slate-700 mb-3"
              >
                University
              </label>
              <input
                type="text"
                id="university"
                name="university"
                value={studentData.university}
                onChange={handleStudentInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                placeholder="e.g., Stanford University"
              />
              {errors.university && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.university}
                </p>
              )}
            </div>

            {/* Enhanced Academic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="major"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Major
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={studentData.major}
                  onChange={handleStudentInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                  placeholder="e.g., Computer Science"
                />
                {errors.major && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.major}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="graduationYear"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Graduation Year
                </label>
                <select
                  id="graduationYear"
                  name="graduationYear"
                  value={studentData.graduationYear}
                  onChange={handleStudentInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 12px center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "12px",
                  }}
                >
                  <option value="">Select graduation year</option>
                  {Array.from(
                    { length: 7 },
                    (_, i) => new Date().getFullYear() + i
                  ).map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.graduationYear && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.graduationYear}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Error Display */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${
                loading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Create Student Account</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <span className="text-slate-600">Already have an account?</span>
            <Link
              to="/login"
              className="text-forest-600 hover:text-forest-700 font-semibold transition-colors duration-200 hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanyForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-mauve-50/30 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-mauve-200/30 to-forest-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-forest-200/30 to-mauve-200/30 blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => setCurrentStep("selection")}
            className="group mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-forest-600 transition-colors duration-200 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:border-forest-200"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            <span>Back to selection</span>
          </button>

          <div className="w-20 h-20 bg-gradient-to-br from-forest-500 to-forest-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-forest-500/25">
            <Building2 size={36} className="" />
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-forest-600 to-forest-800 bg-clip-text mb-4">
            Create Company Account
          </h1>
          <p className="text-xl text-slate-600 max-w-lg mx-auto leading-relaxed">
            Join our network of innovative companies and connect with top talent
            from leading universities
          </p>
        </div>

        {/* Enhanced Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl shadow-slate-200/50 p-8 md:p-12 animate-fade-in">
          <form onSubmit={handleCompanySubmit} className="space-y-8">
            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-semibold text-slate-700 mb-3"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyData.companyName}
                onChange={handleCompanyInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                placeholder="e.g., Acme Corporation"
              />
              {errors.companyName && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Industry */}
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-semibold text-slate-700 mb-3"
              >
                Industry *
              </label>
              <select
                id="industry"
                name="industry"
                value={companyData.industry}
                onChange={handleCompanyInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200"
              >
                <option value="">Select your industry</option>
                <option value="technology">Technology & Software</option>
                <option value="finance">Finance & Banking</option>
                <option value="healthcare">Healthcare & Life Sciences</option>
                <option value="education">Education & Training</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">
                  Manufacturing & Industrial
                </option>
                <option value="consulting">
                  Consulting & Professional Services
                </option>
                <option value="media">Media & Entertainment</option>
                <option value="nonprofit">Non-profit & Government</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.industry}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-3"
              >
                Work Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={companyData.email}
                onChange={handleCompanyInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                placeholder="e.g., hr@acmecorp.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={companyData.password}
                    onChange={handleCompanyInputChange}
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={companyData.confirmPassword}
                    onChange={handleCompanyInputChange}
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Website and Company Size */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Company Website
                  <span className="text-slate-400 font-normal ml-1">
                    (Optional)
                  </span>
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={companyData.website}
                  onChange={handleCompanyInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                  placeholder="https://yourcompany.com"
                />
              </div>
              <div>
                <label
                  htmlFor="companySize"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Company Size *
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={companyData.companySize}
                  onChange={handleCompanyInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees (Startup)</option>
                  <option value="11-50">11-50 employees (Small)</option>
                  <option value="51-200">51-200 employees (Medium)</option>
                  <option value="201-500">201-500 employees (Large)</option>
                  <option value="501-1000">501-1,000 employees (Large)</option>
                  <option value="1000+">1,000+ employees (Enterprise)</option>
                </select>
                {errors.companySize && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.companySize}
                  </p>
                )}
              </div>
            </div>

            {/* Company Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-slate-700 mb-3"
              >
                Company Description
                <span className="text-slate-400 font-normal ml-1">
                  (Optional)
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                value={companyData.description}
                onChange={handleCompanyInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400 resize-none"
                placeholder="Tell us about your company, mission, and what makes you unique..."
              />
            </div>

            {/* Submit Error Display */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-forest-500/25 hover:shadow-forest-600/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Your Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Building2 size={20} />
                    Create Company Account
                    <ArrowRight size={20} />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Enhanced Login Link */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <span className="text-slate-600">Already have an account?</span>
            <Link
              to="/login"
              className="text-forest-600 hover:text-forest-700 font-semibold transition-colors duration-200 hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentStep === "student") {
    return renderStudentForm();
  }

  if (currentStep === "company") {
    return renderCompanyForm();
  }

  return renderUserSelection();
};

export default Signup;
