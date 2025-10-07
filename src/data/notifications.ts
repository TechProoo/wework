export interface Notification {
  id: string;
  type:
    | "message"
    | "job"
    | "course"
    | "system"
    | "achievement"
    | "reminder"
    | "invitation";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  actionUrl?: string;
  actionText?: string;
  sender?: {
    name: string;
    avatar: string;
    role: string;
  };
  metadata?: {
    jobTitle?: string;
    courseName?: string;
    companyName?: string;
    achievementType?: string;
  };
}

export const notifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message from Sarah Chen",
    message:
      "Thanks for the interview preparation session! I have a follow-up question about...",
    timestamp: "2 minutes ago",
    isRead: false,
    isImportant: true,
    actionUrl: "/dashboard/messages",
    actionText: "Reply",
    sender: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      role: "Senior Developer",
    },
  },
  {
    id: "2",
    type: "job",
    title: "New job application received",
    message:
      "Michael Rodriguez has applied for the Senior React Developer position at your company.",
    timestamp: "15 minutes ago",
    isRead: false,
    isImportant: false,
    actionUrl: "/dashboard/jobs",
    actionText: "View Application",
    metadata: {
      jobTitle: "Senior React Developer",
      companyName: "TechCorp Inc.",
    },
  },
  {
    id: "3",
    type: "course",
    title: "Course deadline approaching",
    message:
      "Your Advanced JavaScript course assignment is due in 2 days. Don't forget to submit!",
    timestamp: "1 hour ago",
    isRead: false,
    isImportant: true,
    actionUrl: "/dashboard/courses",
    actionText: "View Course",
    metadata: {
      courseName: "Advanced JavaScript Mastery",
    },
  },
  {
    id: "4",
    type: "achievement",
    title: "Congratulations! New badge earned",
    message:
      "You've earned the 'Mentor of the Month' badge for helping 10+ students this month!",
    timestamp: "2 hours ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/profile",
    actionText: "View Badge",
    metadata: {
      achievementType: "Mentor of the Month",
    },
  },
  {
    id: "5",
    type: "invitation",
    title: "Workshop invitation",
    message:
      "You're invited to join the 'AI in Software Development' workshop next Friday at 2 PM.",
    timestamp: "3 hours ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/events",
    actionText: "RSVP",
    sender: {
      name: "WEWORK Academy",
      avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150",
      role: "Education Team",
    },
  },
  {
    id: "6",
    type: "job",
    title: "Interview scheduled",
    message:
      "Your interview for Frontend Developer at InnovateWeb is scheduled for tomorrow at 10 AM.",
    timestamp: "4 hours ago",
    isRead: true,
    isImportant: true,
    actionUrl: "/dashboard/jobs",
    actionText: "View Details",
    metadata: {
      jobTitle: "Frontend Developer",
      companyName: "InnovateWeb",
    },
  },
  {
    id: "7",
    type: "system",
    title: "Profile verification completed",
    message:
      "Your profile has been successfully verified. You now have access to premium features!",
    timestamp: "6 hours ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/profile",
    actionText: "View Profile",
  },
  {
    id: "8",
    type: "message",
    title: "New message from Alex Thompson",
    message:
      "Great job on the code review! Your suggestions really improved the architecture...",
    timestamp: "1 day ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/messages",
    actionText: "Reply",
    sender: {
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      role: "Tech Lead",
    },
  },
  {
    id: "9",
    type: "course",
    title: "New course available",
    message:
      "Check out the new 'Machine Learning Fundamentals' course - perfect for your career goals!",
    timestamp: "1 day ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/courses",
    actionText: "Enroll Now",
    metadata: {
      courseName: "Machine Learning Fundamentals",
    },
  },
  {
    id: "10",
    type: "reminder",
    title: "Weekly goal reminder",
    message:
      "You're 2 skills short of your weekly learning goal. Keep up the great work!",
    timestamp: "2 days ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/goals",
    actionText: "View Progress",
  },
  {
    id: "11",
    type: "job",
    title: "Application status update",
    message:
      "Your application for UX Designer at CreativeStudio has been shortlisted for the next round!",
    timestamp: "3 days ago",
    isRead: true,
    isImportant: true,
    actionUrl: "/dashboard/jobs",
    actionText: "View Status",
    metadata: {
      jobTitle: "UX Designer",
      companyName: "CreativeStudio",
    },
  },
  {
    id: "12",
    type: "achievement",
    title: "Milestone reached!",
    message:
      "Congratulations on completing 50 hours of mentoring. You're making a real difference!",
    timestamp: "3 days ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/achievements",
    actionText: "View All",
    metadata: {
      achievementType: "50 Hours Mentor",
    },
  },
  {
    id: "13",
    type: "system",
    title: "Security alert",
    message:
      "New login detected from Windows device. If this wasn't you, please secure your account.",
    timestamp: "4 days ago",
    isRead: true,
    isImportant: true,
    actionUrl: "/dashboard/security",
    actionText: "Review Activity",
  },
  {
    id: "14",
    type: "invitation",
    title: "Networking event invitation",
    message:
      "Join us for the Monthly Tech Networking event this Saturday. Great opportunity to connect!",
    timestamp: "5 days ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/events",
    actionText: "Learn More",
    sender: {
      name: "Tech Community",
      avatar: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=150",
      role: "Event Organizer",
    },
  },
  {
    id: "15",
    type: "course",
    title: "Course completed!",
    message:
      "Congratulations on completing 'React Advanced Patterns'. Your certificate is ready!",
    timestamp: "1 week ago",
    isRead: true,
    isImportant: false,
    actionUrl: "/dashboard/certificates",
    actionText: "Download Certificate",
    metadata: {
      courseName: "React Advanced Patterns",
    },
  },
];

export const getUnreadCount = (): number => {
  return notifications.filter((n) => !n.isRead).length;
};

export const getNotificationsByType = (
  type: Notification["type"]
): Notification[] => {
  return notifications.filter((n) => n.type === type);
};

export const getImportantNotifications = (): Notification[] => {
  return notifications.filter((n) => n.isImportant && !n.isRead);
};
