import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/DashboardLayout";
import { type Notification as NotificationType } from "../../data/notifications";
import {
  Bell,
  MessageCircle,
  Briefcase,
  BookOpen,
  Settings,
  Award,
  Calendar,
  Clock,
  Search,
  MoreVertical,
  ExternalLink,
  Trash2,
  Archive,
  Star,
  ArrowLeft,
} from "lucide-react";

export const Notification = () => {
  // Empty notifications for new user experience
  const [allNotifications, setAllNotifications] = useState<NotificationType[]>(
    []
  );
  const [filteredNotifications, setFilteredNotifications] = useState<
    NotificationType[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationType | null>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter and search notifications
  useEffect(() => {
    let filtered = allNotifications;

    // Apply type filter
    if (selectedFilter !== "all") {
      if (selectedFilter === "unread") {
        filtered = filtered.filter((n) => !n.isRead);
      } else if (selectedFilter === "important") {
        filtered = filtered.filter((n) => n.isImportant);
      } else {
        filtered = filtered.filter((n) => n.type === selectedFilter);
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.sender?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [allNotifications, selectedFilter, searchQuery]);

  const getNotificationIcon = (type: NotificationType["type"]) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "message":
        return <MessageCircle className={iconClass} />;
      case "job":
        return <Briefcase className={iconClass} />;
      case "course":
        return <BookOpen className={iconClass} />;
      case "system":
        return <Settings className={iconClass} />;
      case "achievement":
        return <Award className={iconClass} />;
      case "reminder":
        return <Clock className={iconClass} />;
      case "invitation":
        return <Calendar className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getNotificationColor = (type: NotificationType["type"]) => {
    switch (type) {
      case "message":
        return "from-blue-500 to-blue-600";
      case "job":
        return "from-green-500 to-green-600";
      case "course":
        return "from-purple-500 to-purple-600";
      case "system":
        return "from-orange-500 to-orange-600";
      case "achievement":
        return "from-yellow-500 to-yellow-600";
      case "reminder":
        return "from-red-500 to-red-600";
      case "invitation":
        return "from-pink-500 to-pink-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const markAsRead = (notificationId: string) => {
    setAllNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setAllNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setAllNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    if (selectedNotification?.id === notificationId) {
      setSelectedNotification(null);
    }
  };

  const toggleImportant = (notificationId: string) => {
    setAllNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, isImportant: !n.isImportant } : n
      )
    );
  };

  const handleNotificationClick = (notification: NotificationType) => {
    if (isMobileView) {
      setSelectedNotification(notification);
    }
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const handleBackToList = () => {
    setSelectedNotification(null);
  };

  const unreadCount = allNotifications.filter((n) => !n.isRead).length;
  const importantCount = allNotifications.filter(
    (n) => n.isImportant && !n.isRead
  ).length;

  const filterOptions = [
    { id: "all", label: "All", count: allNotifications.length },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "important", label: "Important", count: importantCount },
    {
      id: "message",
      label: "Messages",
      count: allNotifications.filter((n) => n.type === "message").length,
    },
    {
      id: "job",
      label: "Jobs",
      count: allNotifications.filter((n) => n.type === "job").length,
    },
    {
      id: "course",
      label: "Courses",
      count: allNotifications.filter((n) => n.type === "course").length,
    },
    {
      id: "achievement",
      label: "Achievements",
      count: allNotifications.filter((n) => n.type === "achievement").length,
    },
  ];

  return (
    <DashboardLayout
      title="Stay Connected"
      subtitle="Never miss important updates, messages, and opportunities"
      icon={<Bell className="w-6 h-6 text-[var(--color-primary)]" />}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark All Read
          </button>
          <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      }
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex h-[calc(100vh-200px)] max-h-[800px] min-h-[600px]">
          {/* Notifications List */}
          <div
            className={`${
              isMobileView
                ? selectedNotification
                  ? "hidden"
                  : "w-full"
                : "w-full lg:w-1/2"
            } border-r border-gray-200 flex flex-col`}
          >
            {/* Search and Filters */}
            <div className="p-3 md:p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="space-y-3">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 text-sm md:text-base"
                  />
                </div>

                <div className="flex gap-1 flex-wrap">
                  {filterOptions.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                        selectedFilter === filter.id
                          ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {filter.label}
                      {filter.count > 0 && (
                        <span
                          className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                            selectedFilter === filter.id
                              ? "bg-white/20 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {filter.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center space-y-6 max-w-md mx-auto">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <Bell size={36} className="text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star size={16} className="text-yellow-800" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Welcome to Your Notification Center!
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        This is where you'll stay updated on everything
                        important. As you engage with the platform, you'll
                        receive:
                      </p>
                      <div className="space-y-3 text-left">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <MessageCircle
                              size={14}
                              className="text-blue-600"
                            />
                          </div>
                          <span>New messages from mentors and connections</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Briefcase size={14} className="text-green-600" />
                          </div>
                          <span>Job application updates and opportunities</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <BookOpen size={14} className="text-purple-600" />
                          </div>
                          <span>
                            Course progress and achievement notifications
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <Award size={14} className="text-orange-600" />
                          </div>
                          <span>Achievements and milestone celebrations</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                      💡 <strong>Tip:</strong> Start exploring courses and
                      connecting with others to see your first notifications!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 p-2 md:p-3">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`group p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-50 border-2 ${
                        !notification.isRead
                          ? "bg-blue-50/50 border-blue-100 hover:border-blue-200"
                          : "bg-white border-gray-100 hover:border-gray-200"
                      } ${
                        selectedNotification?.id === notification.id
                          ? "ring-2 ring-[var(--color-primary)]/20 border-[var(--color-primary)]"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Notification Icon */}
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${getNotificationColor(
                            notification.type
                          )} flex items-center justify-center text-white shadow-lg`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className={`font-semibold text-sm md:text-base truncate ${
                                    !notification.isRead
                                      ? "text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                {notification.isImportant && (
                                  <Star
                                    size={14}
                                    className="text-yellow-500 flex-shrink-0"
                                  />
                                )}
                              </div>
                              <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock size={12} />
                                <span>{notification.timestamp}</span>
                                {notification.sender && (
                                  <>
                                    <span>•</span>
                                    <span>{notification.sender.name}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleImportant(notification.id);
                                }}
                                className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors"
                              >
                                <Star
                                  size={14}
                                  className={
                                    notification.isImportant
                                      ? "fill-current text-yellow-500"
                                      : ""
                                  }
                                />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Unread indicator */}
                        {!notification.isRead && (
                          <div className="flex-shrink-0 w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notification Detail View */}
          <div
            className={`${
              isMobileView
                ? selectedNotification
                  ? "w-full"
                  : "hidden"
                : "w-full lg:w-1/2"
            } flex flex-col bg-gradient-to-br from-gray-50 to-white`}
          >
            {selectedNotification ? (
              <>
                {/* Detail Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center gap-3">
                    {isMobileView && (
                      <button
                        onClick={handleBackToList}
                        className="p-2 -ml-2 text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft size={20} />
                      </button>
                    )}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getNotificationColor(
                        selectedNotification.type
                      )} flex items-center justify-center text-white shadow-lg`}
                    >
                      {getNotificationIcon(selectedNotification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-lg text-gray-900 truncate">
                        {selectedNotification.title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {selectedNotification.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleImportant(selectedNotification.id)}
                        className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors"
                      >
                        <Star
                          size={18}
                          className={
                            selectedNotification.isImportant
                              ? "fill-current text-yellow-500"
                              : ""
                          }
                        />
                      </button>
                      <button
                        onClick={() =>
                          deleteNotification(selectedNotification.id)
                        }
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detail Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Sender Info */}
                    {selectedNotification.sender && (
                      <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                          From
                        </h3>
                        <div className="flex items-center gap-3">
                          <img
                            src={selectedNotification.sender.avatar}
                            alt={selectedNotification.sender.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedNotification.sender.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedNotification.sender.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Message
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedNotification.message}
                      </p>
                    </div>

                    {/* Metadata */}
                    {selectedNotification.metadata && (
                      <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                          Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          {selectedNotification.metadata.jobTitle && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Job Title:</span>
                              <span className="font-medium text-gray-900">
                                {selectedNotification.metadata.jobTitle}
                              </span>
                            </div>
                          )}
                          {selectedNotification.metadata.courseName && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Course:</span>
                              <span className="font-medium text-gray-900">
                                {selectedNotification.metadata.courseName}
                              </span>
                            </div>
                          )}
                          {selectedNotification.metadata.companyName && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Company:</span>
                              <span className="font-medium text-gray-900">
                                {selectedNotification.metadata.companyName}
                              </span>
                            </div>
                          )}
                          {selectedNotification.metadata.achievementType && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Achievement:
                              </span>
                              <span className="font-medium text-gray-900">
                                {selectedNotification.metadata.achievementType}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    {selectedNotification.actionUrl &&
                      selectedNotification.actionText && (
                        <div className="flex gap-3">
                          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                            {selectedNotification.actionText}
                            <ExternalLink size={16} />
                          </button>
                          <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                            <Archive size={16} />
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </>
            ) : (
              /* No Notification Selected */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto">
                    <Bell size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Select a notification
                    </h3>
                    <p className="text-gray-600">
                      Choose a notification from the list to view details and
                      take actions.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
