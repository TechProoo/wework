import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  User,
  BookOpen,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  Building,
  Users,
  Calendar,
  Bookmark,
  BarChart4Icon,
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
  const userType = user?.userType ?? "student";
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

  // Handle sidebar toggle for main content
  const handleSidebarToggle = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
      if (!isCollapsed) {
        document.body.classList.remove("sidebar-expanded");
        document.dispatchEvent(new CustomEvent("sidebar-collapsed"));
      } else {
        document.body.classList.add("sidebar-expanded");
        document.dispatchEvent(new CustomEvent("sidebar-expanded"));
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    ...(userType === "student"
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
            id: "bookmarks",
            label: "Bookmarks",
            icon: <Bookmark size={20} />,
            path: "/dashboard/bookmarks",
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
    // {
    //   id: "notifications",
    //   label: "Notifications",
    //   icon: <Bell size={20} />,
    //   path: "/dashboard/notifications",
    // },
    // {
    //   id: "messages",
    //   label: "Messages",
    //   icon: <MessageCircle size={20} />,
    //   path: "/dashboard/messages",
    // },
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
    <div className="flex flex-col h-full bg-linear-to-br from-[var(--color-light)] via-[var(--color-light)]/80 to-white/50 backdrop-blur-xl">
      {/* Logo/Brand */}
      <div className="p-4 lg:p-6 border-b border-[var(--color-slate)]/20 bg-white/80 backdrop-blur-sm">
        <div
          className={`flex items-center ${
            isMobileOpen ? "justify-start" : "justify-center lg:justify-start"
          } gap-3 cursor-pointer group/logo`}
          onClick={handleSidebarToggle}
        >
          <div className="relative w-10 h-10 sm:w-10 sm:h-10 bg-linear-to-br from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/25 shrink-0 group-hover/logo:shadow-xl group-hover/logo:shadow-[var(--color-primary)]/40 transition-all duration-300 group-hover/logo:scale-110 group-hover/logo:rotate-3">
            <BarChart4Icon
              color="#fff"
              size={isSmallScreen ? 18 : 18}
              className="drop-shadow-sm"
            />
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span
            className={`font-black text-xl sm:text-2xl bg-linear-to-r from-[var(--color-text)] via-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-all duration-500 ${
              isMobileOpen || !isCollapsed
                ? "opacity-100 max-w-full transform translate-x-0"
                : "opacity-0 max-w-0 transform -translate-x-2"
            }`}
            style={{
              fontFamily: "Inter, -apple-system, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            WEWORK
          </span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 lg:p-6 border-b border-[var(--color-slate)]/10 bg-linear-to-r from-white/60 to-white/40 backdrop-blur-sm">
        <div
          className={`flex items-center ${
            isMobileOpen ? "justify-start" : "justify-center lg:justify-start"
          } gap-3 sm:gap-4`}
        >
          <div className="relative shrink-0 group/avatar">
            <div className="w-11 h-11 sm:w-11 sm:h-11 bg-linear-to-br from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-slate)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20 ring-2 ring-white/50 group-hover/avatar:shadow-xl group-hover/avatar:shadow-[var(--color-primary)]/30 transition-all duration-300 group-hover/avatar:scale-105">
              <User
                size={isSmallScreen ? 20 : 24}
                className="text-white drop-shadow-sm"
              />
              <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent rounded-2xl"></div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full border-3 border-white shadow-sm">
              <div className="w-full h-full bg-[var(--color-primary)] rounded-full animate-pulse"></div>
            </div>
          </div>
          <div
            className={`flex-1 min-w-0 overflow-hidden transition-all duration-500 ${
              isMobileOpen || !isCollapsed
                ? "opacity-100 max-w-full transform translate-x-0"
                : "opacity-0 max-w-0 transform -translate-x-3"
            }`}
          >
            <p className="text-sm sm:text-base font-bold text-[var(--color-text)] truncate whitespace-nowrap mb-0.5">
              {userType === "student"
                ? `${user?.firstName} ${user?.lastName}`
                : user?.companyName || user?.email}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-text)]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full shadow-sm"></div>
                <span className="font-medium capitalize">{"USER"}</span>
              </div>
              <span className="text-[var(--color-slate)]">•</span>
              <span className="text-[var(--color-slate)] font-medium">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-slate)]/50 scrollbar-track-transparent">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.id === "dashboard"}
            onClick={() => {
              setIsMobileOpen(false);
              // Ensure sidebar is collapsed on navigation (desktop)
              if (!isMobile && !isCollapsed) {
                setIsCollapsed(true);
                document.body.classList.remove("sidebar-expanded");
                document.dispatchEvent(new CustomEvent("sidebar-collapsed"));
              }
            }}
            className={({ isActive }) => {
              return `
                flex items-center ${
                  isMobileOpen
                    ? "justify-start"
                    : "justify-center lg:justify-start"
                } gap-3 sm:gap-4 px-1 rounded-2xl text-sm font-semibold transition-all duration-300 group relative hover:scale-[1.02] active:scale-[0.98] ${
                isActive
                  ? "bg-linear-to-r from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-primary)]/25 transform ring-1 ring-white/20"
                  : "text-[var(--color-text)] hover:bg-white/80 hover:shadow-md hover:shadow-[var(--color-slate)]/20 hover:text-[var(--color-primary)] backdrop-blur-sm"
              }
              `;
            }}
            title={isCollapsed && !isMobile ? item.label : undefined}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: "slideInFromLeft 0.4s ease-out forwards",
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <div
                    className={`
                    relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 shrink-0
                    ${
                      isActive
                        ? "bg-white/20 text-white shadow-sm"
                        : "text-[var(--color-slate)] group-hover:text-[var(--color-primary)] group-hover:bg-[var(--color-light)] group-hover:scale-110"
                    }
                  `}
                  >
                    {React.cloneElement(item.icon, {
                      size: isSmallScreen ? 16 : 18,
                      className: "drop-shadow-sm",
                    })}
                  </div>
                  <span
                    className={`font-semibold whitespace-nowrap overflow-hidden transition-all duration-500 ${
                      isMobileOpen || !isCollapsed
                        ? "opacity-100 max-w-full transform translate-x-0"
                        : "opacity-0 max-w-0 transform -translate-x-2"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (isMobileOpen || !isCollapsed) && (
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse delay-75"></div>
                    </div>
                  )}
                  {!isActive && (isMobileOpen || !isCollapsed) && (
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    </div>
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[var(--color-slate)]/20 bg-linear-to-br from-white via-[var(--color-light)]/50 to-white/30 backdrop-blur-sm space-y-2 shrink-0">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 text-slate-700 rounded-2xl hover:bg-linear-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-300 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] hover:shadow-md hover:shadow-red-200/50 w-full ${
            isCollapsed && !isMobile ? "justify-center" : "justify-start"
          }`}
          title={isCollapsed && !isMobile ? "Logout" : undefined}
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-red-100 transition-all duration-300 group-hover:scale-110">
            <LogOut className="w-4 h-4 text-slate-600 group-hover:text-red-500 transition-colors duration-300 drop-shadow-sm" />
          </div>
          <span
            className={`text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-500 ${
              isMobileOpen || !isCollapsed
                ? "opacity-100 max-w-full transform translate-x-0"
                : "opacity-0 max-w-0 transform -translate-x-2"
            }`}
          >
            Logout
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-1 h-1 bg-red-400 rounded-full"></div>
          </div>
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
        className="fixed top-1 left-1 z-[60] lg:hidden bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white p-3 rounded-xl shadow-xl border-2 border-white hover:scale-110 active:scale-95 transition-all duration-300 block"
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? (
          <X size={isSmallScreen ? 15 : 20} />
        ) : (
          <Menu size={isSmallScreen ? 15 : 20} />
        )}
      </button>

      {/* Mobile Overlay - always in DOM so opacity can transition smoothly */}
      {isMobile && (
        <div
          aria-hidden={!isMobileOpen}
          onClick={() => setIsMobileOpen(false)}
          className={`fixed inset-0 z-[35] backdrop-blur-sm transition-opacity duration-300 ease-out pointer-events-${
            isMobileOpen ? "auto" : "none"
          } ${
            isMobileOpen
              ? "bg-black bg-opacity-50 opacity-100"
              : "bg-black bg-opacity-0 opacity-0"
          }`}
        />
      )}

      {/* Sidebar */}
      <aside
        data-sidebar
        className={`
        fixed top-0 left-0 z-[40] h-screen bg-white border-r border-gray-200 shadow-2xl group
        ${
          // Mobile behavior
          isMobile
            ? isMobileOpen
              ? "translate-x-0 w-80 sm:w-80"
              : "-translate-x-full w-80 sm:w-80"
            : // Desktop behavior - now click-based instead of hover
            isCollapsed
            ? "translate-x-0 w-20"
            : "translate-x-0 w-64"
        }
      `}
        style={{
          transition:
            "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform, width, opacity",
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
