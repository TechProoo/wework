import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Mail,
  Lock,
  User,
  Globe,
  Users,
  ArrowLeft,
  Eye,
  EyeOff,
  Phone,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const CompanySignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPersonName: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    companySize: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Media",
    "Government",
    "Non-profit",
    "Other",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors: any = {};

    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.contactPersonName) {
      newErrors.contactPersonName = "Contact person name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};

    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }

    if (!formData.companySize) {
      newErrors.companySize = "Company size is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      const result = await signup(formData, "company");

      if (result.success) {
        toast.success(
          "Company account created successfully! Redirecting to your dashboard..."
        );
        navigate("/company/dashboard");
      } else {
        const errorMsg =
          result.error || "Registration failed. Please try again.";
        setErrors({ general: errorMsg });
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = "An unexpected error occurred. Please try again.";
      setErrors({ general: errorMsg });
      toast.error(errorMsg);
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

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[var(--color-slate)]/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl mb-4">
              <Building2 size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
              Create Company Account
            </h1>
            <p className="text-gray-600">Join WEWORK to find top talent</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`w-16 h-1 mx-2 ${
                  step >= 2 ? "bg-[var(--color-primary)]" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={
              step === 1
                ? (e) => {
                    e.preventDefault();
                    handleNextStep();
                  }
                : handleSubmit
            }
            className="space-y-6"
          >
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {errors.general}
              </div>
            )}

            {step === 1 && (
              <>
                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Your Company Ltd"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors ${
                        errors.companyName
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Contact Person Name */}
                <div>
                  <label
                    htmlFor="contactPersonName"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="contactPersonName"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors ${
                        errors.contactPersonName
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.contactPersonName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.contactPersonName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Company Email *
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
                      placeholder="hr@company.com"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors ${
                        errors.email ? "border-red-300" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors ${
                        errors.phone ? "border-red-300" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Company Website (Optional)
                  </label>
                  <div className="relative">
                    <Globe
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://company.com"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {/* Industry */}
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors ${
                      errors.industry ? "border-red-300" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.industry}
                    </p>
                  )}
                </div>

                {/* Company Size */}
                <div>
                  <label
                    htmlFor="companySize"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Company Size *
                  </label>
                  <div className="relative">
                    <Users
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors appearance-none ${
                        errors.companySize
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    >
                      <option value="">Select Company Size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.companySize && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.companySize}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Password *
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
                      placeholder="Create a strong password"
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
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[var(--color-text)] mb-2"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`w-full pl-12 pr-12 py-4 border rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-colors ${
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 px-6 border border-gray-300 text-[var(--color-text)] font-semibold rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Already have a company account?{" "}
              <Link
                to="/company/login"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-medium"
              >
                Sign In
              </Link>
            </p>
            <div className="mt-4">
              <Link
                to="/signup"
                className="text-sm text-gray-500 hover:text-[var(--color-text)]"
              >
                Looking for personal account? Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySignup;
