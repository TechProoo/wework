import { useState } from "react";
import { DashboardLayout } from "../../Components/DashboardLayout";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  Star,
  Video,
  ArrowRight,
  Send,
  BookOpen,
  Target,
  Briefcase,
} from "lucide-react";

interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sessionType: string;
  preferredDate: string;
  preferredTime: string;
  duration: string;
  sessionFormat: string;
  topic: string;
  experience: string;
  goals: string;
  additionalNotes: string;
}

interface Session {
  id: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  format: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  topic: string;
}

const ConsultationPage = () => {
  const [activeTab, setActiveTab] = useState<"book" | "sessions">("book");
  const [notification, setNotification] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sessionType: "",
    preferredDate: "",
    preferredTime: "",
    duration: "",
    sessionFormat: "",
    topic: "",
    experience: "",
    goals: "",
    additionalNotes: "",
  });

  // Mock booked sessions data
  const [sessions] = useState<Session[]>([
    {
      id: "1",
      type: "Career Guidance",
      date: "2025-10-15",
      time: "14:00",
      duration: "60 minutes",
      format: "Video Call",
      status: "confirmed",
      topic: "UI/UX Career Path",
    },
    {
      id: "2",
      type: "Technical Review",
      date: "2025-10-12",
      time: "10:30",
      duration: "45 minutes",
      format: "In-Person",
      status: "completed",
      topic: "Portfolio Review",
    },
    {
      id: "3",
      type: "Skill Assessment",
      date: "2025-10-20",
      time: "16:00",
      duration: "30 minutes",
      format: "Phone Call",
      status: "pending",
      topic: "Frontend Development Skills",
    },
  ]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookSession = () => {
    if (
      !bookingForm.firstName ||
      !bookingForm.email ||
      !bookingForm.sessionType ||
      !bookingForm.preferredDate
    ) {
      showNotification("⚠️ Please fill in all required fields");
      return;
    }

    showNotification(
      "🎉 Session booking request submitted successfully! We'll contact you within 24 hours to confirm."
    );

    // Reset form
    setBookingForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      sessionType: "",
      preferredDate: "",
      preferredTime: "",
      duration: "",
      sessionFormat: "",
      topic: "",
      experience: "",
      goals: "",
      additionalNotes: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const sessionTypes = [
    { value: "career-guidance", label: "Career Guidance", icon: Target },
    { value: "technical-review", label: "Technical Review", icon: BookOpen },
    { value: "skill-assessment", label: "Skill Assessment", icon: Star },
    { value: "portfolio-review", label: "Portfolio Review", icon: Briefcase },
    {
      value: "interview-prep",
      label: "Interview Preparation",
      icon: MessageSquare,
    },
    {
      value: "general-consultation",
      label: "General Consultation",
      icon: User,
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Calendar className="text-[var(--color-primary)]" size={32} />
                Consultation Booking
              </h1>
              <p className="text-gray-600 text-lg">
                Schedule personalized sessions to accelerate your learning
                journey
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-col sm:flex-row bg-gray-100 rounded-xl p-1 gap-2 sm:gap-0">
            <button
              onClick={() => setActiveTab("book")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "book"
                  ? "bg-white text-[var(--color-primary)] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Calendar size={18} />
              <span className="hidden xs:inline">Book Session</span>
              <span className="inline xs:hidden">Book</span>
            </button>
            <button
              onClick={() => setActiveTab("sessions")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "sessions"
                  ? "bg-white text-[var(--color-primary)] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Clock size={18} />
              <span className="hidden xs:inline">My Sessions</span>
              <span className="inline xs:hidden">Sessions</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "book" ? (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Book a New Session
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Personal Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={20} />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={bookingForm.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={bookingForm.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        size={20}
                        className="absolute left-4 top-4 text-gray-400"
                      />
                      <input
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full p-4 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        size={20}
                        className="absolute left-4 top-4 text-gray-400"
                      />
                      <input
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full p-4 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Session Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target size={20} />
                    Session Type *
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {sessionTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() =>
                          handleInputChange("sessionType", type.value)
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          bookingForm.sessionType === type.value
                            ? "border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <type.icon size={20} className="mb-2" />
                        <div className="font-semibold text-sm">
                          {type.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Session Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar size={20} />
                    Session Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={bookingForm.preferredDate}
                        onChange={(e) =>
                          handleInputChange("preferredDate", e.target.value)
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={bookingForm.preferredTime}
                        onChange={(e) =>
                          handleInputChange("preferredTime", e.target.value)
                        }
                        className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Duration
                      </label>
                      <select
                        value={bookingForm.duration}
                        onChange={(e) =>
                          handleInputChange("duration", e.target.value)
                        }
                        className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                      >
                        <option value="">Select duration</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="90">90 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Format
                      </label>
                      <select
                        value={bookingForm.sessionFormat}
                        onChange={(e) =>
                          handleInputChange("sessionFormat", e.target.value)
                        }
                        className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                      >
                        <option value="">Select format</option>
                        <option value="video">📹 Video Call</option>
                        <option value="phone">📞 Phone Call</option>
                        <option value="in-person">🏢 In-Person</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Topic/Focus Area
                    </label>
                    <input
                      type="text"
                      value={bookingForm.topic}
                      onChange={(e) =>
                        handleInputChange("topic", e.target.value)
                      }
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                      placeholder="e.g., UI/UX Career Path, Portfolio Review"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={bookingForm.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300"
                    >
                      <option value="">Select your level</option>
                      <option value="beginner">🌱 Beginner</option>
                      <option value="intermediate">⚡ Intermediate</option>
                      <option value="advanced">🚀 Advanced</option>
                      <option value="expert">👑 Expert</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare size={20} />
                    Additional Information
                  </h3>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Goals & Objectives
                    </label>
                    <textarea
                      value={bookingForm.goals}
                      onChange={(e) =>
                        handleInputChange("goals", e.target.value)
                      }
                      rows={3}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300 resize-none"
                      placeholder="What do you hope to achieve in this session?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={bookingForm.additionalNotes}
                      onChange={(e) =>
                        handleInputChange("additionalNotes", e.target.value)
                      }
                      rows={3}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all duration-300 resize-none"
                      placeholder="Any special requirements or questions?"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleBookSession}
                  className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  Book Session
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* My Sessions Tab */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                My Sessions
              </h2>

              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No Sessions Booked Yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Book your first session to get started on your learning
                    journey!
                  </p>
                  <button
                    onClick={() => setActiveTab("book")}
                    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Book Your First Session
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex-1 w-full">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                              {session.type}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                session.status
                              )}`}
                            >
                              {session.status.charAt(0).toUpperCase() +
                                session.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{session.topic}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar size={14} />
                              <span>
                                {new Date(session.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock size={14} />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Video size={14} />
                              <span>{session.format}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <User size={14} />
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-2 w-full md:w-auto">
                          {session.status === "confirmed" && (
                            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors w-full md:w-auto">
                              Join Session
                            </button>
                          )}
                          {session.status === "pending" && (
                            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200 transition-colors w-full md:w-auto">
                              Awaiting Confirmation
                            </button>
                          )}
                          {session.status === "completed" && (
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors w-full md:w-auto">
                              View Summary
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-lg z-50 animate-fade-in max-w-md">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="mt-0.5" />
              <span className="font-semibold">{notification}</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ConsultationPage;
