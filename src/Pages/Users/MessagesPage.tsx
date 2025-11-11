import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState } from "react";
import {
  MessageCircle,
  Search,
  Send,
  Plus,
  Users,
  Star,
  Zap,
  ArrowLeft,
  Smile,
  Image,
  Mic,
  MoreVertical,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isFromMe: boolean;
  isRead?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  type: "mentor" | "peer" | "employer";
  messages: Message[];
}

export const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Sample conversations for demo
  const sampleConversations: Conversation[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "SC",
      lastMessage:
        "Thanks for the React tips! Looking forward to our next session.",
      timestamp: "2 min ago",
      unreadCount: 2,
      isOnline: true,
      type: "mentor",
      messages: [
        {
          id: "1",
          content:
            "Hi! I'd love to learn more about React hooks. Can you help?",
          timestamp: "10:30 AM",
          isFromMe: true,
          isRead: true,
        },
        {
          id: "2",
          content:
            "Of course! Let's start with useState and useEffect. They're the foundation.",
          timestamp: "10:32 AM",
          isFromMe: false,
        },
        {
          id: "3",
          content:
            "Thanks for the React tips! Looking forward to our next session.",
          timestamp: "10:35 AM",
          isFromMe: false,
        },
      ],
    },
    {
      id: "2",
      name: "TechCorp HR",
      avatar: "TC",
      lastMessage: "Your interview is scheduled for tomorrow at 2 PM.",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isOnline: false,
      type: "employer",
      messages: [
        {
          id: "1",
          content: "Thank you for applying to our Frontend Developer position.",
          timestamp: "Yesterday",
          isFromMe: false,
        },
        {
          id: "2",
          content:
            "I'm very interested in the role. When can we schedule an interview?",
          timestamp: "Yesterday",
          isFromMe: true,
          isRead: true,
        },
        {
          id: "3",
          content: "Your interview is scheduled for tomorrow at 2 PM.",
          timestamp: "1 hour ago",
          isFromMe: false,
        },
      ],
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "AR",
      lastMessage: "Want to work on that project together?",
      timestamp: "3 hours ago",
      unreadCount: 1,
      isOnline: true,
      type: "peer",
      messages: [
        {
          id: "1",
          content: "Hey! How's your portfolio project coming along?",
          timestamp: "3 hours ago",
          isFromMe: false,
        },
        {
          id: "2",
          content: "Going well! Almost done with the design system.",
          timestamp: "3 hours ago",
          isFromMe: true,
          isRead: true,
        },
        {
          id: "3",
          content: "Want to work on that project together?",
          timestamp: "3 hours ago",
          isFromMe: false,
        },
      ],
    },
  ];

  const [conversations, setConversations] =
    useState<Conversation[]>(sampleConversations);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setShowMobileChat(true);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setShowMobileChat(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConv) {
      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isFromMe: true,
        isRead: false,
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConv.id
            ? {
                ...conv,
                messages: [...conv.messages, newMsg],
                lastMessage: newMessage,
                timestamp: "Just now",
              }
            : conv
        )
      );
      setNewMessage("");
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mentor":
        return "bg-purple-50 text-purple-700";
      case "employer":
        return "bg-blue-50 text-blue-700";
      case "peer":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mentor":
        return <Star size={12} className="text-purple-600" />;
      case "employer":
        return <Zap size={12} className="text-blue-600" />;
      case "peer":
        return <Users size={12} className="text-green-600" />;
      default:
        return <MessageCircle size={12} className="text-gray-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-50px)] bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex h-full">
          {/* Conversations List */}
          <div
            className={`${
              showMobileChat ? "hidden lg:flex" : "flex"
            } flex-col w-full lg:w-80 border-r border-gray-100`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Messages</h1>
                  <p className="text-white/80 text-sm">
                    {conversations.length} conversations
                  </p>
                </div>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  <Plus size={20} className="text-white" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-16 h-16 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center mb-4">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No conversations yet
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Start a conversation with mentors, peers, or employers
                  </p>
                  <button className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors">
                    Start Chatting
                  </button>
                </div>
              ) : (
                <div className="space-y-1 p-4">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleSelectConversation(conversation.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        selectedConversation === conversation.id
                          ? "bg-blue-50 border border-blue-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-12 h-12 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-semibold">
                            {conversation.avatar}
                          </div>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {conversation.name}
                            </h4>
                            <span className="text-xs text-gray-500 shrink-0">
                              {conversation.timestamp}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeColor(
                                conversation.type
                              )}`}
                            >
                              {getTypeIcon(conversation.type)}
                              {conversation.type}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={`${
              showMobileChat ? "flex" : "hidden lg:flex"
            } flex-col flex-1`}
          >
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleBackToList}
                        className="lg:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <ArrowLeft size={20} />
                      </button>

                      <div className="relative">
                        <div className="w-10 h-10 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-semibold">
                          {selectedConv.avatar}
                        </div>
                        {selectedConv.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedConv.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedConv.isOnline ? "Online" : "Offline"} •{" "}
                          {selectedConv.type}
                        </p>
                      </div>
                    </div>

                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {selectedConv.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isFromMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.isFromMe
                            ? "bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white"
                            : "bg-white border border-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isFromMe ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-6 bg-white border-t border-gray-100">
                  <div className="flex items-end gap-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Image size={20} />
                    </button>

                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                          <Smile size={16} />
                        </button>
                      </div>
                    </div>

                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Mic size={20} />
                    </button>

                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-3 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No Conversation Selected */
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-20 h-20 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choose a conversation to start messaging
                  </p>
                  <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary)]/90 transition-colors">
                    Start New Chat
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
