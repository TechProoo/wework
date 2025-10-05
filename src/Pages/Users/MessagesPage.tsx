import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState, useEffect } from "react";
import {
  MessageCircle,
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Star,
  User,
  CheckCheck,
  Check,
  Circle,
  Filter,
  Plus,
  Users,
  Zap,
} from "lucide-react";
import { conversations } from "../../data/conversations";

export const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  // Mobile detection and responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobileView(mobile);
      if (mobile && selectedConversation) {
        setShowConversationList(false);
      } else if (!mobile) {
        setShowConversationList(true);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, [selectedConversation]);

  // Handle conversation selection on mobile
  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    if (isMobileView) {
      setShowConversationList(false);
    }
  };

  // Handle back to conversations on mobile
  const handleBackToConversations = () => {
    if (isMobileView) {
      setShowConversationList(true);
      setSelectedConversation(null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mentor":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "employer":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "colleague":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mentor":
        return <Star size={12} className="text-purple-600" />;
      case "employer":
        return <Zap size={12} className="text-blue-600" />;
      case "colleague":
        return <Users size={12} className="text-green-600" />;
      default:
        return <User size={12} className="text-gray-600" />;
    }
  };

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || conversation.type === filter;
    return matchesSearch && matchesFilter;
  });

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConv) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const totalUnread = conversations.reduce(
    (sum, conv) => sum + conv.unreadCount,
    0
  );

  const topNavActions = (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
        <Circle className="w-3 h-3 text-green-500 fill-current" />
        <span>{conversations.filter((c) => c.isOnline).length} online</span>
      </div>
      <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors rounded-lg hover:bg-gray-100">
        <Filter size={18} />
      </button>
      <button className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors text-xs md:text-base">
        <Plus size={16} className="md:w-[18px] md:h-[18px]" />
        <span className="hidden sm:inline">New Chat</span>
        <span className="sm:hidden">New</span>
      </button>
    </div>
  );

  return (
    <DashboardLayout
      title="Messages"
      subtitle={`${totalUnread} unread messages across ${conversations.length} conversations`}
      icon={<MessageCircle size={18} className="text-white" />}
      actions={topNavActions}
      removeTopPadding={true}
    >
      <div className="bg-white shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex h-[calc(100vh-200px)] max-h-[800px] min-h-[600px]">
          {/* Conversations List */}
          <div
            className={`${
              isMobileView
                ? showConversationList
                  ? "w-full"
                  : "hidden"
                : "w-full lg:w-1/3"
            } border-r border-gray-200 overflow-y-scroll flex flex-col`}
          >
            {/* Search and Filter */}
            <div
              className="p-3 md:p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white
              sticky top-0 z-10
              "
            >
              <div className="space-y-3">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 text-sm md:text-base"
                  />
                </div>
                <div className="flex gap-1 flex-wrap">
                  {["all", "mentor", "employer", "colleague"].map(
                    (filterType) => (
                      <button
                        key={filterType}
                        onClick={() => setFilter(filterType)}
                        className={`px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize flex-shrink-0 ${
                          filter === filterType
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300"
                        }`}
                      >
                        {filterType}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Conversations */}
            <div className="relative flex-1">
              <div
                className="h-full overflow-y-auto overflow-x-hidden"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db #f3f4f6",
                }}
              >
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation.id)}
                    className={`p-3 md:p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 ${
                      selectedConversation === conversation.id
                        ? "bg-blue-50 border-blue-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                          <User
                            size={18}
                            className="text-white md:w-5 md:h-5"
                          />
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1 md:gap-2 flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate flex-1">
                              {conversation.name}
                            </h3>
                            {conversation.isStarred && (
                              <Star
                                size={12}
                                className="text-yellow-500 fill-current flex-shrink-0"
                              />
                            )}
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {conversation.lastMessageTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(
                              conversation.type
                            )}`}
                          >
                            {getTypeIcon(conversation.type)}
                          </span>
                          <p className="text-xs text-gray-600 truncate">
                            {conversation.title} • {conversation.company}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate flex-1">
                            {conversation.isTyping ? (
                              <span className="text-green-600 italic">
                                Typing...
                              </span>
                            ) : (
                              conversation.lastMessage
                            )}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-[var(--color-primary)] text-white text-xs rounded-full px-2 py-1 ml-2 flex-shrink-0 min-w-[18px] md:min-w-[20px] text-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scroll fade indicator */}
              {filteredConversations.length > 5 && (
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={`${
              isMobileView
                ? showConversationList
                  ? "hidden"
                  : "w-full"
                : "flex-1"
            } flex flex-col`}
          >
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-3 md:p-4 border-b border-gray-200 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Back button for mobile */}
                      {isMobileView && (
                        <button
                          onClick={handleBackToConversations}
                          className="p-2 hover:bg-white/80 rounded-lg transition-colors lg:hidden"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                        </button>
                      )}
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        {selectedConv.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                          {selectedConv.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 truncate">
                          {selectedConv.isOnline ? "Online" : "Offline"} •{" "}
                          {selectedConv.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200">
                        <Phone size={16} className="md:w-5 md:h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200">
                        <Video size={16} className="md:w-5 md:h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200">
                        <MoreVertical size={16} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-4 space-y-2 md:space-y-4 bg-gradient-to-b from-white to-gray-50"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#d1d5db #f3f4f6",
                  }}
                >
                  {selectedConv.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isFromMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-sm ${
                          message.isFromMe
                            ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white"
                            : "bg-white border border-gray-200 text-gray-900"
                        }`}
                      >
                        {message.type === "file" ? (
                          <div className="flex items-center gap-2">
                            <Paperclip size={14} className="md:w-4 md:h-4" />
                            <span className="text-xs md:text-sm">
                              {message.fileName}
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs md:text-sm leading-relaxed">
                            {message.content}
                          </p>
                        )}
                        <div
                          className={`flex items-center gap-1 mt-1 text-xs ${
                            message.isFromMe
                              ? "text-white/80 justify-end"
                              : "text-gray-500"
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          {message.isFromMe &&
                            (message.isRead ? (
                              <CheckCheck size={10} className="md:w-3 md:h-3" />
                            ) : (
                              <Check size={10} className="md:w-3 md:h-3" />
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-3 md:p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-end gap-2 md:gap-3">
                    <button className="p-2 text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200 flex-shrink-0">
                      <Paperclip
                        size={16}
                        className="md:w-[18px] md:h-[18px]"
                      />
                    </button>
                    <div className="flex-1 relative min-w-0">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        rows={1}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 pr-10 md:pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-300 resize-none text-sm md:text-base"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200">
                        <Smile size={14} className="md:w-4 md:h-4" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2.5 md:p-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-95 flex-shrink-0"
                    >
                      <Send size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No Conversation Selected */
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle
                      size={24}
                      className="md:w-8 md:h-8 text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 px-2">
                      Choose a conversation from the list to start messaging
                      with mentors, employers, or colleagues.
                    </p>
                  </div>
                  <button className="px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm md:text-base">
                    Start New Conversation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
