import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const CompanyLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  // Apply auth layout class to remove navbar padding
  useEffect(() => {
    document.body.classList.add("auth-layout");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("auth-layout");
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
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

    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate("/company/dashboard");
      } else {
        setErrors({
          general: result.error || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-light)] via-white to-[var(--color-light)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-primary)] mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[var(--color-slate)]/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl mb-4">
              <Building2 size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
              Company Login
            </h1>
            <p className="text-gray-600">
              Access your WEWORK company dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {errors.general}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-text)] mb-2"
              >
                Company Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="company@example.com"
                  className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors ${
                    errors.email ? "border-red-300" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--color-text)] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors ${
                    errors.password ? "border-red-300" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/company/forgot-password"
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Don't have a company account?{" "}
              <Link
                to="/company/signup"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-medium"
              >
                Create Account
              </Link>
            </p>
            <div className="mt-4">
              <Link
                to="/login"
                className="text-sm text-gray-500 hover:text-[var(--color-text)]"
              >
                Looking for personal account? Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
