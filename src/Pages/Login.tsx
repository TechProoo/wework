import {
  Eye,
  EyeOff,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  Shield,
  Building2,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Apply auth layout class to remove navbar padding
  useEffect(() => {
    document.body.classList.add("auth-layout");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("auth-layout");
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        alert("Login successful! Welcome back to WeWork.");

        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setErrors({ submit: result.error || "Login failed" });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred during login" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-light)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-slate)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-[var(--color-text)]">
                WEWORK
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">New to WEWORK?</span>
              <Link
                to="/signup"
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary)]/90 transition-colors text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to access your learning dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--color-text)] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors"
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--color-text)] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[var(--color-primary)] bg-white border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {errors.submit && (
                <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[var(--color-light)] text-gray-500">
                      or
                    </span>
                  </div>
                </div>
                <Link
                  to="/company/login"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent)] hover:text-white transition-colors text-sm font-medium"
                >
                  <Building2 size={16} />
                  Company Login
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-8 items-center justify-center">
          <div className="max-w-md text-white">
            <div className="mb-8">
              <Sparkles size={48} className="mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Join Africa's Leading Tech Community
              </h2>
              <p className="text-lg opacity-90 mb-6">
                Transform your career with industry-leading courses, mentorship,
                and job placement support.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">5,000+ Students</h3>
                  <p className="opacity-90 text-sm">
                    Trained across Africa in cutting-edge tech skills
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">95% Job Placement</h3>
                  <p className="opacity-90 text-sm">
                    Direct pathway to employment with top companies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Industry Certified</h3>
                  <p className="opacity-90 text-sm">
                    Recognized credentials that employers trust
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div className="font-semibold">Success Story</div>
                  <div className="text-sm opacity-75">
                    From student to software engineer
                  </div>
                </div>
              </div>
              <p className="text-sm opacity-90 italic">
                "WEWORK transformed my life. In 6 months, I went from zero
                coding knowledge to landing my dream job at a top tech company
                in Lagos."
              </p>
              <div className="mt-3 text-xs opacity-75">
                - Adaora K., Full Stack Developer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
