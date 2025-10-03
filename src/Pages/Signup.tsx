import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  Eye,
  EyeOff,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Globe,
  Phone,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [currentStep, setCurrentStep] = useState<
    "selection" | "student" | "company"
  >("selection");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    country: "",
    city: "",
    education: "",
    interests: [] as string[],
    agreeToTerms: false,
  });

  const [companyData, setCompanyData] = useState({
    companyName: "",
    contactPersonName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    website: "",
    industry: "",
    companySize: "",
    country: "",
    city: "",
    description: "",
    agreeToTerms: false,
  });

  const interests = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "UI/UX Design",
    "Cybersecurity",
    "Cloud Computing",
  ];

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "E-commerce",
    "Manufacturing",
    "Consulting",
    "Media & Entertainment",
    "Government",
    "Non-profit",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const handleStudentInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setStudentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCompanyInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setCompanyData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleInterestChange = (interest: string) => {
    setStudentData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const validateStudentForm = () => {
    const newErrors: { [key: string]: string } = {};
    const data = studentData;

    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Please enter a valid email";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!data.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!data.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!data.country.trim()) newErrors.country = "Country is required";
    if (!data.city.trim()) newErrors.city = "City is required";
    if (!data.education) newErrors.education = "Education level is required";
    if (data.interests.length === 0)
      newErrors.interests = "Please select at least one interest";
    if (!data.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCompanyForm = () => {
    const newErrors: { [key: string]: string } = {};
    const data = companyData;

    if (!data.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!data.contactPersonName.trim())
      newErrors.contactPersonName = "Contact person name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Please enter a valid email";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!data.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!data.industry) newErrors.industry = "Industry is required";
    if (!data.companySize) newErrors.companySize = "Company size is required";
    if (!data.country.trim()) newErrors.country = "Country is required";
    if (!data.city.trim()) newErrors.city = "City is required";
    if (!data.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStudentForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Student registration successful! Welcome to WeWork.");
    setIsSubmitting(false);
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCompanyForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Company registration successful! Welcome to WeWork.");
    setIsSubmitting(false);
  };

  const renderUserTypeSelection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Join WeWork
        </h1>
        <p className="text-lg text-gray-600">
          Choose how you'd like to get started with our platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Student Card */}
        <div
          onClick={() => setCurrentStep("student")}
          className="login-card cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <div className="text-center">
            <div className="stat-icon mx-auto mb-4">
              <GraduationCap size={24} />
            </div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              I'm a Student
            </h3>
            <p className="text-gray-600 mb-6">
              Looking to learn new skills and advance my career in technology
            </p>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm">Access to all courses</span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm">Job placement assistance</span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm">Certificates and portfolio</span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm">Mentorship and community</span>
              </li>
            </ul>
            <button className="comic-button w-full">
              Get Started as Student
            </button>
          </div>
        </div>

        {/* Company Card */}
        <div
          onClick={() => setCurrentStep("company")}
          className="login-card cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <div className="text-center">
            <div className="stat-icon mx-auto mb-4">
              <Building2 size={24} />
            </div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              I'm a Company
            </h3>
            <p className="text-gray-600 mb-6">
              Looking to hire skilled developers and tech professionals
            </p>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm">Access to talent pool</span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm">Post job opportunities</span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm">Employer branding</span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm">Priority support</span>
              </li>
            </ul>
            <button className="comic-button w-full">
              Get Started as Company
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );

  const renderStudentForm = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => setCurrentStep("selection")}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          <ChevronLeft size={16} />
          Back to selection
        </button>
        <div className="text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Student Registration
          </h1>
          <p className="text-lg text-gray-600">
            Create your student account to start learning
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="login-card">
            <form onSubmit={handleStudentSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={studentData.firstName}
                      onChange={handleStudentInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter your first name"
                      required
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={studentData.lastName}
                      onChange={handleStudentInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter your last name"
                      required
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
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
                      value={studentData.email}
                      onChange={handleStudentInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={studentData.phone}
                      onChange={handleStudentInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter your phone number"
                      required
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium mb-2"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={studentData.dateOfBirth}
                    onChange={handleStudentInputChange}
                    className="login-input w-full px-3 py-2 rounded-lg"
                    required
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Location
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium mb-2"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={studentData.country}
                      onChange={handleStudentInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter your country"
                      required
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={studentData.city}
                      onChange={handleStudentInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter your city"
                      required
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Education & Interests */}
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Education & Interests
                </h3>

                <div className="mb-4">
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium mb-2"
                  >
                    Education Level
                  </label>
                  <select
                    id="education"
                    name="education"
                    value={studentData.education}
                    onChange={handleStudentInputChange}
                    className="login-input w-full px-3 py-2 rounded-lg"
                    required
                  >
                    <option value="">Select your education level</option>
                    <option value="high-school">High School</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.education && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Areas of Interest (Select at least one)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={studentData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm">{interest}</span>
                      </label>
                    ))}
                  </div>
                  {errors.interests && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.interests}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Account Security
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
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
                        value={studentData.password}
                        onChange={handleStudentInputChange}
                        className="login-input w-full px-3 py-2 pr-10 rounded-lg"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium mb-2"
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
                        className="login-input w-full px-3 py-2 pr-10 rounded-lg"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div>
                <label className="flex items-start gap-3 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={studentData.agreeToTerms}
                    onChange={handleStudentInputChange}
                    className="w-4 h-4 rounded mt-1"
                  />
                  <span className="text-sm">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mb-4 text-sm text-red-600">
                    {errors.agreeToTerms}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="comic-button w-full py-3"
                >
                  {isSubmitting
                    ? "Creating Account..."
                    : "Create Student Account"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Student Benefits */}
        <div className="login-info-card">
          <h3
            className="text-xl font-bold text-center mb-6"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Student Benefits
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Users size={20} style={{ color: "var(--color-primary)" }} />
              <div>
                <h4 className="font-bold text-sm mb-1">Expert Mentorship</h4>
                <p className="text-xs text-gray-600">
                  Get guidance from industry professionals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <GraduationCap
                size={20}
                style={{ color: "var(--color-primary)" }}
              />
              <div>
                <h4 className="font-bold text-sm mb-1">
                  Comprehensive Courses
                </h4>
                <p className="text-xs text-gray-600">
                  Access to 100+ courses and learning paths
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase size={20} style={{ color: "var(--color-primary)" }} />
              <div>
                <h4 className="font-bold text-sm mb-1">Job Placement</h4>
                <p className="text-xs text-gray-600">
                  95% of our graduates find jobs within 6 months
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe size={20} style={{ color: "var(--color-primary)" }} />
              <div>
                <h4 className="font-bold text-sm mb-1">Global Network</h4>
                <p className="text-xs text-gray-600">
                  Connect with students and professionals worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanyForm = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => setCurrentStep("selection")}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          <ChevronLeft size={16} />
          Back to selection
        </button>
        <div className="text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Company Registration
          </h1>
          <p className="text-lg text-gray-600">
            Create your company account to hire talented developers
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="login-card">
            <form onSubmit={handleCompanySubmit} className="space-y-6">
              {/* Company Information */}
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Company Information
                </h3>

                <div className="mb-4">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={companyData.companyName}
                    onChange={handleCompanyInputChange}
                    className="login-input w-full px-3 py-2 rounded-lg"
                    placeholder="Enter your company name"
                    required
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium mb-2"
                    >
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={companyData.industry}
                      onChange={handleCompanyInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      required
                    >
                      <option value="">Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.industry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="companySize"
                      className="block text-sm font-medium mb-2"
                    >
                      Company Size
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={companyData.companySize}
                      onChange={handleCompanyInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      required
                    >
                      <option value="">Select company size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    {errors.companySize && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.companySize}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium mb-2"
                  >
                    Company Website (Optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={companyData.website}
                    onChange={handleCompanyInputChange}
                    className="login-input w-full px-3 py-2 rounded-lg"
                    placeholder="https://your-company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-2"
                  >
                    Company Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={companyData.description}
                    onChange={handleCompanyInputChange}
                    rows={3}
                    className="login-input w-full px-3 py-2 rounded-lg resize-none"
                    placeholder="Brief description of your company..."
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Contact Information
                </h3>

                <div className="mb-4">
                  <label
                    htmlFor="contactPersonName"
                    className="block text-sm font-medium mb-2"
                  >
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    id="contactPersonName"
                    name="contactPersonName"
                    value={companyData.contactPersonName}
                    onChange={handleCompanyInputChange}
                    className="login-input w-full px-3 py-2 rounded-lg"
                    placeholder="Enter contact person's full name"
                    required
                  />
                  {errors.contactPersonName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.contactPersonName}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Business Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={companyData.email}
                      onChange={handleCompanyInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter business email"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Business Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={companyData.phone}
                      onChange={handleCompanyInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter business phone"
                      required
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Company Location
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium mb-2"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={companyData.country}
                      onChange={handleCompanyInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter company country"
                      required
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={companyData.city}
                      onChange={handleCompanyInputChange}
                      className="login-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter company city"
                      required
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  Account Security
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
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
                        value={companyData.password}
                        onChange={handleCompanyInputChange}
                        className="login-input w-full px-3 py-2 pr-10 rounded-lg"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={companyData.confirmPassword}
                        onChange={handleCompanyInputChange}
                        className="login-input w-full px-3 py-2 pr-10 rounded-lg"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div>
                <label className="flex items-start gap-3 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={companyData.agreeToTerms}
                    onChange={handleCompanyInputChange}
                    className="w-4 h-4 rounded mt-1"
                  />
                  <span className="text-sm">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mb-4 text-sm text-red-600">
                    {errors.agreeToTerms}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="comic-button w-full py-3"
                >
                  {isSubmitting
                    ? "Creating Account..."
                    : "Create Company Account"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Company Benefits */}
        <div className="login-info-card">
          <h3
            className="text-xl font-bold text-center mb-6"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Company Benefits
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Users size={20} style={{ color: "var(--color-primary)" }} />
              <div>
                <h4 className="font-bold text-sm mb-1">Talent Pool Access</h4>
                <p className="text-xs text-gray-600">
                  Access to 5,000+ trained developers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase size={20} style={{ color: "var(--color-primary)" }} />
              <div>
                <h4 className="font-bold text-sm mb-1">Job Posting</h4>
                <p className="text-xs text-gray-600">
                  Post unlimited job opportunities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 size={20} style={{ color: "var(--color-primary)" }} />
              <div>
                <h4 className="font-bold text-sm mb-1">Employer Branding</h4>
                <p className="text-xs text-gray-600">
                  Showcase your company culture
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={20} style={{ color: "var(--color-primary)" }} />
              <div>
                <h4 className="font-bold text-sm mb-1">Priority Support</h4>
                <p className="text-xs text-gray-600">
                  Dedicated account manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        {currentStep === "selection" && renderUserTypeSelection()}
        {currentStep === "student" && renderStudentForm()}
        {currentStep === "company" && renderCompanyForm()}
      </main>

      <Footer />
    </div>
  );
};
