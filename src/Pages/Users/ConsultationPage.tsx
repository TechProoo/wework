import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  User,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Plus,
  Phone,
  Users,
  TrendingUp,
  Target,
  Globe,
  ExternalLink,
  ChevronRight,
  MapPin,
} from "lucide-react";

interface Consultation {
  id: string;
  mentorName: string;
  mentorAvatar: string;
  mentorTitle: string;
  mentorRating: number;
  mentorExperience: string;
  date: string;
  time: string;
  duration: number;
  type: "video" | "voice" | "chat";
  status: "upcoming" | "completed" | "cancelled" | "in-progress";
  topic: string;
  price: number;
  sessionNotes?: string;
  meetingLink?: string;
}

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  rating: number;
  reviews: number;
  experience: string;
  expertise: string[];
  hourlyRate: number;
  availability: string;
  location: string;
  languages: string[];
  isOnline: boolean;
  totalSessions: number;
  successRate: number;
}

export const ConsultationPage = () => {
  const [activeTab, setActiveTab] = useState<"sessions" | "mentors">(
    "sessions"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedExpertise, setSelectedExpertise] = useState("all");

  // Mock data for consultations
  const consultations: Consultation[] = [
    {
      id: "1",
      mentorName: "Sarah Johnson",
      mentorAvatar: "/api/placeholder/40/40",
      mentorTitle: "Senior Product Manager at Google",
      mentorRating: 4.9,
      mentorExperience: "8+ years",
      date: "2024-10-08",
      time: "14:00",
      duration: 60,
      type: "video",
      status: "upcoming",
      topic: "Product Strategy & Roadmapping",
      price: 120,
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "2",
      mentorName: "Michael Chen",
      mentorAvatar: "/api/placeholder/40/40",
      mentorTitle: "Lead UX Designer at Airbnb",
      mentorRating: 4.8,
      mentorExperience: "6+ years",
      date: "2024-10-05",
      time: "10:30",
      duration: 45,
      type: "video",
      status: "completed",
      topic: "UX Design Portfolio Review",
      price: 80,
      sessionNotes:
        "Great session! Received valuable feedback on portfolio structure and presentation.",
    },
    {
      id: "3",
      mentorName: "Emily Rodriguez",
      mentorAvatar: "/api/placeholder/40/40",
      mentorTitle: "Software Engineering Manager at Netflix",
      mentorRating: 5.0,
      mentorExperience: "10+ years",
      date: "2024-10-15",
      time: "16:00",
      duration: 90,
      type: "video",
      status: "upcoming",
      topic: "Technical Interview Preparation",
      price: 150,
    },
    {
      id: "4",
      mentorName: "David Kim",
      mentorAvatar: "/api/placeholder/40/40",
      mentorTitle: "Data Science Director at Spotify",
      mentorRating: 4.7,
      mentorExperience: "7+ years",
      date: "2024-09-28",
      time: "13:00",
      duration: 60,
      type: "chat",
      status: "cancelled",
      topic: "Career Transition to Data Science",
      price: 100,
    },
  ];

  // Mock data for mentors
  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Alex Thompson",
      avatar: "/api/placeholder/60/60",
      title: "Principal Software Engineer",
      company: "Microsoft",
      rating: 4.9,
      reviews: 127,
      experience: "12+ years",
      expertise: [
        "System Design",
        "Leadership",
        "Cloud Architecture",
        "Microservices",
      ],
      hourlyRate: 180,
      availability: "Available this week",
      location: "Seattle, WA",
      languages: ["English", "Spanish"],
      isOnline: true,
      totalSessions: 342,
      successRate: 96,
    },
    {
      id: "2",
      name: "Maria Garcia",
      avatar: "/api/placeholder/60/60",
      title: "VP of Design",
      company: "Adobe",
      rating: 4.8,
      reviews: 89,
      experience: "9+ years",
      expertise: [
        "Design Strategy",
        "Team Leadership",
        "User Research",
        "Product Design",
      ],
      hourlyRate: 160,
      availability: "Available next week",
      location: "San Jose, CA",
      languages: ["English", "Portuguese"],
      isOnline: false,
      totalSessions: 198,
      successRate: 94,
    },
    {
      id: "3",
      name: "James Wilson",
      avatar: "/api/placeholder/60/60",
      title: "Head of Growth",
      company: "Stripe",
      rating: 4.7,
      reviews: 156,
      experience: "8+ years",
      expertise: [
        "Growth Strategy",
        "Product Marketing",
        "Analytics",
        "A/B Testing",
      ],
      hourlyRate: 140,
      availability: "Available today",
      location: "San Francisco, CA",
      languages: ["English", "French"],
      isOnline: true,
      totalSessions: 267,
      successRate: 92,
    },
    {
      id: "4",
      name: "Lisa Park",
      avatar: "/api/placeholder/60/60",
      title: "Engineering Director",
      company: "Tesla",
      rating: 5.0,
      reviews: 203,
      experience: "11+ years",
      expertise: [
        "Engineering Management",
        "Scalable Systems",
        "Team Building",
        "Technical Strategy",
      ],
      hourlyRate: 200,
      availability: "Available this week",
      location: "Austin, TX",
      languages: ["English", "Korean"],
      isOnline: true,
      totalSessions: 445,
      successRate: 98,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock size={16} className="text-blue-600" />;
      case "completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "cancelled":
        return <XCircle size={16} className="text-red-600" />;
      case "in-progress":
        return <AlertCircle size={16} className="text-yellow-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video size={16} className="text-blue-600" />;
      case "voice":
        return <Phone size={16} className="text-green-600" />;
      case "chat":
        return <MessageCircle size={16} className="text-purple-600" />;
      default:
        return <MessageCircle size={16} className="text-gray-600" />;
    }
  };

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.mentorName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      consultation.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || consultation.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise =
      selectedExpertise === "all" ||
      mentor.expertise.some((skill) =>
        skill.toLowerCase().includes(selectedExpertise.toLowerCase())
      );
    return matchesSearch && matchesExpertise;
  });

  const consultationStats = {
    total: consultations.length,
    upcoming: consultations.filter((c) => c.status === "upcoming").length,
    completed: consultations.filter((c) => c.status === "completed").length,
    totalHours:
      consultations
        .filter((c) => c.status === "completed")
        .reduce((sum, c) => sum + c.duration, 0) / 60,
  };

  const topNavActions = (
    <div className="flex items-center gap-3">
      <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors rounded-lg hover:bg-gray-100">
        <Filter size={18} />
      </button>
      <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
        <Plus size={18} />
        <span className="hidden md:inline">Book Session</span>
      </button>
      <button className="flex sm:hidden items-center justify-center p-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
        <Plus size={18} />
      </button>
    </div>
  );

  return (
    <DashboardLayout
      title="Consultations"
      subtitle="Book mentorship sessions and connect with industry experts"
      icon={<Calendar size={18} className="text-white" />}
      actions={topNavActions}
      className="space-y-6"
      removeTopPadding={true}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Total Sessions */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-purple-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110">
                <Calendar size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1.5 rounded-full border border-purple-200">
                  Total
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                {consultationStats.total}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Total Sessions
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-blue-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
                <Clock size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full border border-blue-200">
                  Upcoming
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {consultationStats.upcoming}
              </h3>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
            </div>
          </div>
        </div>

        {/* Completed Sessions */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/10 to-green-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-110">
                <CheckCircle size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-full border border-green-200">
                  Complete
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                {consultationStats.completed}
              </h3>
              <p className="text-sm font-medium text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        {/* Total Hours */}
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-orange-600/5 rounded-bl-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-110">
                <TrendingUp size={22} className="text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200">
                  Hours
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                {consultationStats.totalHours.toFixed(1)}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Learning Hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex relative bg-gradient-to-r from-gray-50 to-white p-2">
          <div className="flex w-full relative bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("sessions")}
              className={`relative flex-1 px-6 py-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "sessions"
                  ? "bg-white text-[var(--color-primary)] shadow-md border border-gray-200 transform scale-[1.02]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar size={18} />
                <span>My Sessions</span>
                <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 py-1 rounded-full text-xs font-bold">
                  {consultationStats.total}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("mentors")}
              className={`relative flex-1 px-6 py-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "mentors"
                  ? "bg-white text-[var(--color-primary)] shadow-md border border-gray-200 transform scale-[1.02]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Users size={18} />
                <span>Find Mentors</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                  {mentors.length}+
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {activeTab === "sessions"
                  ? "Manage Sessions"
                  : "Discover Mentors"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {activeTab === "sessions"
                  ? "Track your consultation sessions and view session history"
                  : "Connect with industry experts and book personalized mentorship sessions"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {activeTab === "sessions"
                  ? `${filteredConsultations.length} sessions`
                  : `${filteredMentors.length} mentors available`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative group">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors"
              />
              <input
                type="text"
                placeholder={
                  activeTab === "sessions"
                    ? "Search sessions, mentors, or topics..."
                    : "Search mentors, companies, or expertise..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md"
              />
            </div>

            <div className="relative">
              {activeTab === "sessions" ? (
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 appearance-none cursor-pointer shadow-sm hover:shadow-md font-medium"
                >
                  <option value="all">All Sessions</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="in-progress">In Progress</option>
                </select>
              ) : (
                <select
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 appearance-none cursor-pointer shadow-sm hover:shadow-md font-medium"
                >
                  <option value="all">All Expertise</option>
                  <option value="design">Design</option>
                  <option value="engineering">Engineering</option>
                  <option value="product">Product</option>
                  <option value="leadership">Leadership</option>
                  <option value="growth">Growth</option>
                </select>
              )}
              <ChevronRight
                className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          {/* Quick Filter Tags */}
          {activeTab === "mentors" && (
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-sm font-medium text-gray-600 mr-2">
                Popular:
              </span>
              {[
                "Product Strategy",
                "System Design",
                "Career Growth",
                "Leadership",
                "UX Design",
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === "sessions" ? (
        <div className="space-y-6">
          {filteredConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="group relative bg-gradient-to-r from-white to-purple-50/30 rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:border-purple-300/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-bl-full"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <User size={24} className="text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                        {getTypeIcon(consultation.type)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                        {consultation.topic}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {consultation.mentorName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {consultation.mentorTitle}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star
                            size={14}
                            className="text-yellow-400 fill-current"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {consultation.mentorRating}
                          </span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {consultation.mentorExperience}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 shadow-sm ${getStatusColor(
                        consultation.status
                      )}`}
                    >
                      {getStatusIcon(consultation.status)}
                      {consultation.status.charAt(0).toUpperCase() +
                        consultation.status.slice(1)}
                    </span>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${consultation.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {consultation.duration} minutes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Calendar size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Date
                      </p>
                      <p className="font-bold text-gray-900">
                        {new Date(consultation.date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Clock size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Time
                      </p>
                      <p className="font-bold text-gray-900">
                        {consultation.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      {getTypeIcon(consultation.type)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Type
                      </p>
                      <p className="font-bold text-gray-900 capitalize">
                        {consultation.type}
                      </p>
                    </div>
                  </div>
                </div>

                {consultation.sessionNotes && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-900 mb-1">
                          Session Notes
                        </p>
                        <p className="text-sm text-green-800">
                          {consultation.sessionNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    {consultation.status === "upcoming" &&
                      consultation.meetingLink && (
                        <a
                          href={consultation.meetingLink}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <ExternalLink size={16} />
                          Join Meeting
                        </a>
                      )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[var(--color-primary)] border border-gray-300 hover:border-[var(--color-primary)] rounded-xl transition-all duration-300">
                      <MessageCircle size={16} />
                      Message
                    </button>
                    {consultation.status === "upcoming" ? (
                      <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <Video size={16} />
                        Join Session
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <Calendar size={16} />
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="group relative bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl hover:border-blue-300/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-transparent rounded-bl-full"></div>

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <User size={24} className="text-white" />
                    </div>
                    {mentor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                      {mentor.name}
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">
                      {mentor.title}
                    </p>
                    <p className="text-gray-500 text-sm">{mentor.company}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="text-yellow-400 fill-current"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {mentor.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({mentor.reviews})
                        </span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-xs text-gray-600">
                        {mentor.experience}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${mentor.hourlyRate}
                    </p>
                    <p className="text-xs text-gray-500">/hour</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{mentor.expertise.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{mentor.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{mentor.totalSessions} sessions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe size={12} />
                      <span>{mentor.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target size={12} />
                      <span>{mentor.successRate}% success</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        mentor.isOnline
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          mentor.isOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></span>
                      {mentor.availability}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] border border-gray-300 hover:border-[var(--color-primary)] rounded-lg transition-all">
                      <MessageCircle size={16} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-semibold">
                      <Calendar size={14} />
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === "sessions" && filteredConsultations.length === 0) ||
        (activeTab === "mentors" && filteredMentors.length === 0)) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {activeTab === "sessions" ? (
              <Calendar size={32} className="text-gray-400" />
            ) : (
              <Users size={32} className="text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeTab === "sessions"
              ? "No sessions found"
              : "No mentors found"}
          </h3>
          <p className="text-gray-600 mb-4">
            {activeTab === "sessions"
              ? "Try adjusting your search or status filter to find sessions."
              : "Try adjusting your search criteria to discover more mentors."}
          </p>
          {activeTab === "mentors" && (
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
              Browse All Mentors
            </button>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};
