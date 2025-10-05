import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  User,
  BookOpen,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Building,
  Users,
  Calendar,
  SchoolIcon,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      const small = window.innerWidth < 640;

      setIsMobile(mobile);
      setIsSmallScreen(small);
      setIsCollapsed(true);
    };

    // Set initial state
    handleResize();

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector("[data-sidebar]");
      const mobileButton = document.querySelector("[data-mobile-menu]");

      if (
        isMobileOpen &&
        sidebar &&
        mobileButton &&
        !sidebar.contains(event.target as Node) &&
        !mobileButton.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileOpen]);

  // Handle body class for mobile sidebar
  useEffect(() => {
    if (isMobileOpen && isMobile) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isMobileOpen, isMobile]);

  // Handle sidebar hover effect for main content with improved responsiveness
  const handleSidebarMouseEnter = () => {
    if (!isMobile) {
      setIsCollapsed(false);
      document.body.classList.add("sidebar-expanded");
      // Dispatch event for layout components
      document.dispatchEvent(new CustomEvent("sidebar-expanded"));
    }
  };

  const handleSidebarMouseLeave = () => {
    if (!isMobile) {
      setIsCollapsed(true);
      document.body.classList.remove("sidebar-expanded");
      // Dispatch event for layout components
      document.dispatchEvent(new CustomEvent("sidebar-collapsed"));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    ...(user?.userType === "student"
      ? [
          {
            id: "courses",
            label: "My Courses",
            icon: <BookOpen size={20} />,
            path: "/dashboard/courses",
          },
          {
            id: "jobs",
            label: "Job Applications",
            icon: <Briefcase size={20} />,
            path: "/dashboard/jobs",
          },
          {
            id: "consultations",
            label: "Consultations",
            icon: <Calendar size={20} />,
            path: "/dashboard/consultations",
          },
        ]
      : [
          {
            id: "jobs",
            label: "Job Postings",
            icon: <Briefcase size={20} />,
            path: "/dashboard/jobs",
          },
          {
            id: "candidates",
            label: "Candidates",
            icon: <Users size={20} />,
            path: "/dashboard/candidates",
          },
          {
            id: "partnerships",
            label: "Partnerships",
            icon: <Building size={20} />,
            path: "/dashboard/partnerships",
          },
        ]),
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell size={20} />,
      path: "/dashboard/notifications",
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageCircle size={20} />,
      path: "/dashboard/messages",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={20} />,
      path: "/dashboard/profile",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
      {/* Logo/Brand */}
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 bg-white">
        <div
          className={`flex items-center ${
            isMobileOpen ? "justify-start" : "justify-center lg:justify-start"
          } gap-3`}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <SchoolIcon color="#fff" size={isSmallScreen ? 16 : 20} />
          </div>
          <span
            className={`font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isMobileOpen || !isCollapsed
                ? "opacity-100 max-w-full"
                : "opacity-0 lg:group-hover:opacity-100 max-w-0 lg:group-hover:max-w-full"
            }`}
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            WeWork
          </span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100 bg-white">
        <div
          className={`flex items-center ${
            isMobileOpen ? "justify-start" : "justify-center lg:justify-start"
          } gap-3 sm:gap-4`}
        >
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center shadow-lg">
              <User size={isSmallScreen ? 18 : 22} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div
            className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ${
              isMobileOpen || !isCollapsed
                ? "opacity-100 max-w-full"
                : "opacity-0 lg:group-hover:opacity-100 max-w-0 lg:group-hover:max-w-full"
            }`}
          >
            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate whitespace-nowrap">
              {user?.userType === "student"
                ? `${user?.firstName} ${user?.lastName}`
                : user?.companyName || user?.email}
            </p>
            <p className="text-xs text-gray-500 capitalize flex items-center gap-1 whitespace-nowrap">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {user?.userType} Account
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 lg:p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.id === "dashboard"}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) => {
              return `
                flex items-center ${
                  isMobileOpen
                    ? "justify-start"
                    : "justify-center lg:justify-start"
                } gap-3 sm:gap-4 px-3 lg:px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative hover:scale-[1.02] active:scale-[0.98]
                ${
                  isActive
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-lg transform"
                    : "text-gray-700 hover:bg-white hover:shadow-md"
                }
              `;
            }}
            title={isCollapsed && !isMobile ? item.label : undefined} // Tooltip for collapsed state
          >
            {({ isActive }) => {
              return (
                <>
                  <span
                    className={`
                    transition-all duration-300 flex-shrink-0
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-[var(--color-primary)]"
                    }
                  `}
                  >
                    {React.cloneElement(item.icon, {
                      size: isSmallScreen ? 16 : 20,
                    })}
                  </span>
                  <span
                    className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                      isMobileOpen || !isCollapsed
                        ? "opacity-100 max-w-full"
                        : "opacity-0 lg:group-hover:opacity-100 max-w-0 lg:group-hover:max-w-full"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (isMobileOpen || !isCollapsed) && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse transition-all duration-300"></div>
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 lg:p-4 border-t border-gray-100 space-y-3 flex-shrink-0 bg-white">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            isMobileOpen ? "justify-start" : "justify-center lg:justify-start"
          } gap-3 sm:gap-4 px-3 lg:px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-300 w-full group hover:scale-[1.02] active:scale-[0.98]`}
          title={isCollapsed && !isMobile ? "Logout" : undefined}
        >
          <LogOut
            size={isSmallScreen ? 16 : 18}
            className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
          />
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isMobileOpen || !isCollapsed
                ? "opacity-100 max-w-full"
                : "opacity-0 lg:group-hover:opacity-100 max-w-0 lg:group-hover:max-w-full"
            }`}
          >
            Logout
          </span>
          {(isMobileOpen || !isCollapsed) && (
            <div className="ml-auto transition-all duration-300 text-xs">↗</div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        data-mobile-menu
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMobileOpen((prev) => !prev);
        }}
        className="fixed top-1 left-1 z-[60] lg:hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white p-3 rounded-xl shadow-xl border-2 border-white hover:scale-110 active:scale-95 transition-all duration-300 block"
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? (
          <X size={isSmallScreen ? 15 : 20} />
        ) : (
          <Menu size={isSmallScreen ? 15 : 20} />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[35] backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        data-sidebar
        className={`
        fixed top-0 left-0 z-[40] h-screen bg-white border-r border-gray-200 shadow-2xl transition-all duration-300 ease-out group
        ${
          // Mobile behavior
          isMobile
            ? isMobileOpen
              ? "translate-x-0 w-80 sm:w-80"
              : "-translate-x-full w-80 sm:w-80"
            : // Desktop behavior
              "translate-x-0 w-20 hover:w-64"
        }
      `}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
        style={{
          transition: isMobile
            ? "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
