import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Eye, EyeOff, Users, Globe, Award } from "lucide-react";
import { useState } from "react";
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

  const stats = [
    { number: "5,000+", label: "Students Trained", icon: <Users size={20} /> },
    { number: "95%", label: "Job Placement Rate", icon: <Award size={20} /> },
    { number: "50+", label: "Global Partners", icon: <Globe size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600">
              Continue your journey to becoming a tech professional.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Login Form */}
            <div className="login-card md:sticky top-20">
              <div className="text-center mb-8">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Sign In
                </h2>
                <p className="text-gray-600">Access your learning dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="login-input w-full px-3 py-2 rounded-lg"
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
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
                      className="login-input w-full px-3 py-2 pr-10 rounded-lg"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded"
                    />
                    <span className="ml-2 text-sm">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Forgot password?
                  </Link>
                </div>

                {errors.submit && (
                  <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="comic-button w-full py-3"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>

                <div className="text-center pt-4 border-t">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Info Card */}
            <div className="login-info-card ">
              <h3
                className="text-2xl font-bold text-center mb-6"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                Join Our Community
              </h3>

              <div className="space-y-4 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="stat-item flex items-center gap-4 p-4"
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <div>
                      <div className="text-xl font-bold">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">What you get:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    ></div>
                    <span>Access to all courses and materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    ></div>
                    <span>Progress tracking and certificates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    ></div>
                    <span>Job placement assistance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    ></div>
                    <span>Community support and mentorship</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
