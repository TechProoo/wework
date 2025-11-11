import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Target,
  CheckCircle,
  Star,
  Video,
  Globe,
} from "lucide-react";
import { useState } from "react";

export const Consultation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentStatus: "",
    experience: "",
    goals: "",
    preferredTime: "",
    consultationType: "",
    specificInterests: [] as string[],
    additionalInfo: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      specificInterests: prev.specificInterests.includes(interest)
        ? prev.specificInterests.filter((i) => i !== interest)
        : [...prev.specificInterests, interest],
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.currentStatus) {
      newErrors.currentStatus = "Please select your current status";
    }
    if (!formData.goals.trim()) {
      newErrors.goals = "Please describe your goals";
    }
    if (!formData.consultationType) {
      newErrors.consultationType = "Please select consultation type";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(
        "Consultation request submitted successfully! We'll contact you within 24 hours."
      );
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        currentStatus: "",
        experience: "",
        goals: "",
        preferredTime: "",
        consultationType: "",
        specificInterests: [],
        additionalInfo: "",
        agreeToTerms: false,
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const techInterests = [
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "Machine Learning",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
    "UI/UX Design",
    "Blockchain",
    "Game Development",
  ];

  const benefits = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Personalized Guidance",
      description: "Get tailored advice based on your background and goals",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Career Roadmap",
      description:
        "Receive a clear path to achieve your tech career objectives",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Course Recommendations",
      description: "Discover the perfect courses for your learning journey",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Job Market Insights",
      description: "Learn about current opportunities and industry trends",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Free 30-Minute Session</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get Your Free
            <span className="block bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Career Consultation
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Speak with our expert career counselors to discover your perfect
            tech career path and the best courses to get you there.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>100% Free Session</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>30-Minute Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-400" />
              <span>Video or Phone Call</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[var(--color-text)]">
            What You'll Get from Your Consultation
          </h2>
          <p className="text-lg text-center mb-12 text-[var(--color-secondary)] max-w-2xl mx-auto">
            Our expert counselors will work with you to create a personalized
            roadmap for your tech career success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-[var(--color-accent)] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">
                  {benefit.title}
                </h3>
                <p className="text-[var(--color-secondary)]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div id="consultation-form" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border-4 border-[var(--color-primary)] p-8">
                <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">
                  Book Your Free Consultation
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Current Status */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Current Status *
                    </label>
                    <select
                      name="currentStatus"
                      value={formData.currentStatus}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                        errors.currentStatus
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your current status</option>
                      <option value="student">Student</option>
                      <option value="graduate">Recent Graduate</option>
                      <option value="professional">Working Professional</option>
                      <option value="career-change">
                        Looking for Career Change
                      </option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="unemployed">Currently Unemployed</option>
                    </select>
                    {errors.currentStatus && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.currentStatus}
                      </p>
                    )}
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Tech Experience Level
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      <option value="">Select your experience level</option>
                      <option value="complete-beginner">
                        Complete Beginner
                      </option>
                      <option value="some-exposure">Some Exposure</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  {/* Consultation Type */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Preferred Consultation Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["Video Call", "Phone Call", "In-Person"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="consultationType"
                            value={type.toLowerCase().replace(" ", "-")}
                            checked={
                              formData.consultationType ===
                              type.toLowerCase().replace(" ", "-")
                            }
                            onChange={handleInputChange}
                            className="w-4 h-4 text-[var(--color-primary)] border-gray-300 focus:ring-[var(--color-primary)]"
                          />
                          <span className="text-[var(--color-text)]">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.consultationType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.consultationType}
                      </p>
                    )}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      <option value="">Select preferred time</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">
                        Afternoon (12 PM - 5 PM)
                      </option>
                      <option value="evening">Evening (5 PM - 8 PM)</option>
                      <option value="flexible">I'm Flexible</option>
                    </select>
                  </div>

                  {/* Specific Interests */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Areas of Interest (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {techInterests.map((interest) => (
                        <label
                          key={interest}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.specificInterests.includes(
                              interest
                            )}
                            onChange={() => handleInterestToggle(interest)}
                            className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)]"
                          />
                          <span className="text-sm text-[var(--color-text)]">
                            {interest}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Goals */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Career Goals *
                    </label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none ${
                        errors.goals ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tell us about your career goals and what you hope to achieve..."
                    />
                    {errors.goals && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.goals}
                      </p>
                    )}
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                      placeholder="Any specific questions or topics you'd like to discuss?"
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className={`w-5 h-5 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] mt-1 ${
                          errors.agreeToTerms ? "border-red-500" : ""
                        }`}
                      />
                      <span className="text-sm text-[var(--color-text)]">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-[var(--color-primary)] underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-[var(--color-primary)] underline"
                        >
                          Privacy Policy
                        </Link>
                        . I consent to being contacted about this consultation.
                        *
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.agreeToTerms}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full comic-button py-4 text-lg font-bold ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting
                      ? "Booking Your Consultation..."
                      : "Book Free Consultation"}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Consultation Info */}
              <div className="bg-linear-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">30 Minutes</p>
                      <p className="text-sm opacity-80">
                        Focused discussion about your goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Expert Counselor</p>
                      <p className="text-sm opacity-80">
                        Industry professional with 10+ years experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Personalized Plan</p>
                      <p className="text-sm opacity-80">
                        Custom roadmap for your success
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-[var(--color-text)] mb-3">
                  "The consultation completely changed my perspective on my
                  career path. The counselor helped me identify the perfect
                  courses for my goals!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text)]">
                      Amara K.
                    </p>
                    <p className="text-sm text-[var(--color-secondary)]">
                      Software Developer
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-4 text-[var(--color-text)]">
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-sm">consultation@wework.africa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-sm">+234 (0) 123 456 7890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-sm">Available worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--color-text)]">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Is the consultation really free?",
                answer:
                  "Yes! Our 30-minute career consultation is completely free with no hidden costs or obligations.",
              },
              {
                question: "How soon can I book a consultation?",
                answer:
                  "We typically have availability within 24-48 hours. Our team will contact you to schedule at your preferred time.",
              },
              {
                question: "What should I prepare for the consultation?",
                answer:
                  "Just bring yourself and any questions about your career goals. We'll handle the rest!",
              },
              {
                question: "Can I reschedule my consultation?",
                answer:
                  "Absolutely! Contact us at least 24 hours in advance and we'll be happy to reschedule.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold mb-3 text-[var(--color-text)]">
                  {faq.question}
                </h3>
                <p className="text-[var(--color-secondary)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful professionals who started their journey
            with a free consultation.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#consultation-form"
              className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Book Your Free Session
            </a>
            <Link
              to="/courses"
              className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[var(--color-primary)] transition-colors"
            >
              Browse Our Courses
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
