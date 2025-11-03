import {
  Eye,
  EyeOff,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  Shield,
  Building2,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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
    // focus first invalid field for better UX
    const keys = Object.keys(newErrors);
    if (keys.length > 0) {
      const first = keys[0];
      setTimeout(() => {
        if (first === "email") {
          emailRef.current?.focus();
        } else if (first === "password") {
          passwordRef.current?.focus();
        }
      }, 50);
    }

    return keys.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await login(formData.email, formData.password);
      console.log(result);

      if (result.success) {
        // show inline success and redirect shortly after
        setSuccessMessage("Welcome back — signing you in...");
        // default to the student's dashboard
        const from = location.state?.from?.pathname || "/users/dashboard";
        setTimeout(() => navigate(from, { replace: true }), 700);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-forest-200/20 to-mauve-200/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-mauve-200/20 to-forest-200/20 blur-3xl"></div>
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-forest-600 to-mauve-600 bg-clip-text">
                WEWORK
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 hidden sm:block">
                New to WEWORK?
              </span>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-forest-500 to-emerald-500 hover:from-forest-600 hover:to-emerald-600 text-white rounded-full shadow-lg shadow-forest-500/25 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
              >
                <span>Sign Up</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)] relative z-10">
        {/* Left Side - Enhanced Form */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-lg">
            {/* Enhanced Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-6 shadow-sm">
                <Sparkles size={16} className="text-mauve-600" />
                <span className="text-sm font-medium text-slate-600">
                  Welcome Back
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-forest-600 via-slate-700 to-forest-800 bg-clip-text text-transparent mb-4 leading-tight">
                Sign In to
                <span className="block text-mauve-600">WEWORK</span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed">
                Access your personalized learning dashboard and continue your
                tech journey
              </p>
            </div>

            {/* Enhanced Form Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl shadow-slate-200/50 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-3"
                  >
                    Email Address
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400 text-lg disabled:opacity-60"
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      role="alert"
                    >
                      <span
                        className="w-1 h-1 bg-red-500 rounded-full"
                        aria-hidden
                      />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700 mb-3"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.password}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
                      }
                      disabled={isSubmitting}
                      className="w-full px-4 py-4 pr-12 bg-white border-2 border-slate-200 rounded-xl focus:border-forest-400 focus:ring-0 transition-colors duration-200 placeholder-slate-400 text-lg disabled:opacity-60"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p
                      id="password-error"
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      role="alert"
                    >
                      <span
                        className="w-1 h-1 bg-red-500 rounded-full"
                        aria-hidden
                      />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Enhanced Options */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-forest-500 bg-white border-2 border-slate-200 rounded focus:ring-forest-400 focus:ring-2"
                      />
                    </div>
                    <span className="ml-3 text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-forest-600 hover:text-forest-700 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Enhanced Error Display */}
                {/* Error and Success Banners (live region) */}
                <div aria-live="polite" className="min-h-[1.5rem]">
                  {errors.submit && (
                    <div
                      className="bg-red-50 border border-red-200 rounded-xl p-4"
                      role="alert"
                    >
                      <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                        <span
                          className="w-2 h-2 bg-red-500 rounded-full"
                          aria-hidden
                        />
                        {errors.submit}
                      </p>
                    </div>
                  )}

                  {successMessage && (
                    <div
                      className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"
                      role="status"
                    >
                      <p className="text-emerald-700 text-sm font-medium flex items-center gap-2">
                        <span
                          className="w-2 h-2 bg-emerald-500 rounded-full"
                          aria-hidden
                        />
                        {successMessage}
                      </p>
                    </div>
                  )}
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full bg-gradient-to-r from-forest-500 to-emerald-500 hover:from-forest-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-forest-500/25 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3" aria-hidden>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Enhanced Login Footer */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-slate-600">Don't have an account?</span>
                <Link
                  to="/signup"
                  className="text-forest-600 hover:text-forest-700 font-semibold transition-colors duration-200 hover:underline"
                >
                  Sign up for free
                </Link>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-500 font-medium">
                    or
                  </span>
                </div>
              </div>

              <Link
                to="/company/login"
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-mauve-200 text-mauve-600 hover:bg-mauve-50 hover:border-mauve-300 transition-all duration-300 px-6 py-3 rounded-full shadow-lg shadow-mauve-500/10 hover:shadow-mauve-500/20 font-semibold"
              >
                <Building2 size={20} />
                <span>Company Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Info Panel */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-forest-600 via-slate-700 to-forest-800 p-8 lg:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-mauve-400/20 rounded-full -translate-x-16 -translate-y-16"></div>
          </div>

          <div className="relative flex items-center justify-center w-full">
            <div className="max-w-md">
              {/* Enhanced Header */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6 shadow-lg">
                  <Sparkles className="w-5 h-5 text-mauve-200" />
                  <span className="text-sm font-medium text-white/90">
                    Welcome to WEWORK
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Join Africa's Leading
                  <span className="block text-mauve-200">Tech Community</span>
                </h2>

                <p className="text-xl text-white/80 leading-relaxed">
                  Transform your career with industry-leading courses,
                  mentorship, and job placement support
                </p>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="space-y-6 mb-10">
                <div className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-mauve-400 to-mauve-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-mauve-500/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">
                      50K+ Active Users
                    </h3>
                    <p className="text-white/70 text-sm">
                      Trained across Africa in cutting-edge tech skills
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">
                      500+ Companies
                    </h3>
                    <p className="text-white/70 text-sm">
                      Direct pathway to employment with top companies
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/30">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">
                      95% Success Rate
                    </h3>
                    <p className="text-white/70 text-sm">
                      Recognized credentials that employers trust
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Testimonial */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-start gap-4">
                  <img
                    src="/src/assets/one.jpg"
                    alt="Success story"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/30 shadow-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-white/95 mb-4 italic text-lg leading-relaxed">
                      "WEWORK transformed my life. In 6 months, I went from zero
                      coding knowledge to landing my dream job at a top tech
                      company."
                    </p>
                    <div>
                      <p className="text-white font-semibold text-lg">
                        Adaora K.
                      </p>
                      <p className="text-mauve-200 text-sm font-medium">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
