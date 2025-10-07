import { useState } from "react";
import { DashboardLayout } from "../../Components/DashboardLayout";
import {
  Users,
  MessageCircle,
  Heart,
  Send,
  Clock,
  Calendar,
  UserPlus,
  BookOpen,
  Trophy,
  Star,
  CheckCircle,
  TrendingUp,
  Plus,
  Search,
} from "lucide-react";

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    level: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  category: string;
}

interface StudyGroup {
  id: string;
  title: string;
  description: string;
  members: number;
  maxMembers: number;
  nextSession: string;
  isJoined: boolean;
  category: string;
}

const Community = () => {
  const [newPostContent, setNewPostContent] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Simplified sample data
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: {
        name: "Sarah Chen",
        avatar: "SC",
        role: "UI/UX Designer",
        level: "Expert",
      },
      content:
        "Just finished the Advanced Figma Prototyping course! The interactive components section was mind-blowing. Has anyone tried the new component variants feature? 🚀",
      timestamp: "2h ago",
      likes: 24,
      comments: 12,
      isLiked: false,
      category: "UI/UX Design",
    },
    {
      id: "2",
      author: {
        name: "Alex Rodriguez",
        avatar: "AR",
        role: "Frontend Dev",
        level: "Intermediate",
      },
      content:
        "Looking for study partners for the React Advanced Patterns course. Planning to dedicate 2 hours daily for the next month. DM if interested! 💪",
      timestamp: "4h ago",
      likes: 18,
      comments: 8,
      isLiked: true,
      category: "Frontend Development",
    },
    {
      id: "3",
      author: {
        name: "Maria Santos",
        avatar: "MS",
        role: "Marketing Manager",
        level: "Advanced",
      },
      content:
        "Pro tip: The conversion optimization strategies from Module 5 increased our landing page conversions by 89%! Real results from real learning 📈",
      timestamp: "6h ago",
      likes: 45,
      comments: 20,
      isLiked: false,
      category: "Digital Marketing",
    },
  ]);

  const [studyGroups] = useState<StudyGroup[]>([
    {
      id: "1",
      title: "React Mastery Circle",
      description:
        "Weekly deep-dives into React patterns, hooks, and performance optimization.",
      members: 28,
      maxMembers: 35,
      nextSession: "Tomorrow, 7:00 PM",
      isJoined: false,
      category: "Frontend Development",
    },
    {
      id: "2",
      title: "UX Design Lab",
      description:
        "Collaborative design sessions, portfolio reviews, and industry insights.",
      members: 22,
      maxMembers: 30,
      nextSession: "Friday, 6:00 PM",
      isJoined: true,
      category: "UI/UX Design",
    },
    {
      id: "3",
      title: "Marketing Growth Hacks",
      description:
        "Data-driven strategies, A/B testing, and conversion optimization techniques.",
      members: 35,
      maxMembers: 40,
      nextSession: "Sunday, 4:00 PM",
      isJoined: false,
      category: "Digital Marketing",
    },
  ]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLikePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
    showNotification("Post liked! ❤️");
  };

  const handleCreatePost = () => {
    if (newPostContent.trim() === "") return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "YO",
        role: "Learner",
        level: "Intermediate",
      },
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
      category: "General",
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setNewPostContent("");
    showNotification("Post shared successfully! 🎉");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "UI/UX Design":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Frontend Development":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Digital Marketing":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Learning Community
              </h1>
              <p className="text-gray-600">
                Connect, learn, and grow with fellow learners worldwide
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">1,247 online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-400" />
                  <span className="font-medium">12,847 members</span>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                <UserPlus size={18} />
                Invite Friends
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{posts.length}</div>
                  <div className="text-blue-100 text-sm">Posts Today</div>
                </div>
                <MessageCircle size={24} className="text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{studyGroups.length}</div>
                  <div className="text-green-100 text-sm">Study Groups</div>
                </div>
                <BookOpen size={24} className="text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-purple-100 text-sm">Active Mentors</div>
                </div>
                <Star size={24} className="text-purple-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-orange-100 text-sm">Success Rate</div>
                </div>
                <Trophy size={24} className="text-orange-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-semibold">
                  YO
                </div>
                <input
                  type="text"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your learning journey, ask questions, or help others..."
                  className="flex-1 p-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleCreatePost()}
                />
                <button
                  onClick={handleCreatePost}
                  disabled={newPostContent.trim() === ""}
                  className="p-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  Ask Question
                </span>
                <span className="flex items-center gap-1">
                  <Trophy size={16} />
                  Share Achievement
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={16} />
                  Share Resource
                </span>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-semibold">
                      {post.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {post.author.name}
                        </h4>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                          {post.author.level}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium border ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {post.author.role} • {post.timestamp}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-800 mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-2 transition-all duration-300 ${
                          post.isLiked
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={post.isLiked ? "currentColor" : "none"}
                        />
                        <span className="text-sm font-medium">
                          {post.likes}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle size={18} />
                        <span className="text-sm font-medium">
                          {post.comments}
                        </span>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-sm font-medium transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Groups */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Study Groups
                </h3>
                <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                {studyGroups.map((group) => (
                  <div
                    key={group.id}
                    className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {group.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {group.members}/{group.maxMembers}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {group.nextSession}
                          </span>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          group.isJoined
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90"
                        }`}
                      >
                        {group.isJoined ? "Joined" : "Join"}
                      </button>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(group.members / group.maxMembers) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Trending Topics
              </h3>
              <div className="space-y-3">
                {[
                  { tag: "ReactHooks", posts: 45 },
                  { tag: "UIDesign", posts: 32 },
                  { tag: "MarketingTips", posts: 28 },
                  { tag: "CareerAdvice", posts: 24 },
                  { tag: "Figma", posts: 18 },
                ].map((topic) => (
                  <button
                    key={topic.tag}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-[var(--color-primary)] font-semibold">
                      #{topic.tag}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {topic.posts}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <Search size={16} />
                  <span className="text-sm font-medium">Find Study Buddy</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <Calendar size={16} />
                  <span className="text-sm font-medium">Schedule Session</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <TrendingUp size={16} />
                  <span className="text-sm font-medium">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-lg z-50 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} />
              <span className="font-medium">{notification}</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Community;
