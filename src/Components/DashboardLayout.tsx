import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
  showTopNav?: boolean;
  heroBannerContent?: ReactNode;
  removeTopPadding?: boolean;
}

/**
 * Complete layout wrapper for all dashboard pages
 * Handles sidebar, navigation, spacing, and responsive behavior automatically
 *
 * Features:
 * - Automatic sidebar width management (80px collapsed → 256px expanded)
 * - Responsive behavior for mobile and desktop
 * - Consistent top navigation with title, subtitle, icon, and actions
 * - Optional hero banner section
 * - Proper content spacing and overflow handling
 * - Smooth transitions for sidebar expansion/collapse
 *
 * Usage:
 * <DashboardLayout
 *   title="Page Title"
 *   subtitle="Description"
 *   icon={<Icon />}
 *   actions={<ActionButtons />}
 * >
 *   <YourContent />
 * </DashboardLayout>
 *
 * This replaces the need for manual sidebar/content management and ensures
 * consistent layout behavior across all dashboard pages.
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  icon,
  actions,
  className = "",
  showTopNav = true,
  removeTopPadding = false,
}) => {
  const [sidebarWidth, setSidebarWidth] = useState(80); // 80px collapsed, 256px expanded
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Apply dashboard-layout class to body to remove global padding
    document.body.classList.add("dashboard-layout");

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Listen for sidebar state changes
    const handleSidebarExpand = () => setSidebarWidth(256);
    const handleSidebarCollapse = () => setSidebarWidth(80);

    document.addEventListener("sidebar-expanded", handleSidebarExpand);
    document.addEventListener("sidebar-collapsed", handleSidebarCollapse);

    return () => {
      // Clean up body class when component unmounts
      document.body.classList.remove("dashboard-layout");
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("sidebar-expanded", handleSidebarExpand);
      document.removeEventListener("sidebar-collapsed", handleSidebarCollapse);
    };
  }, []);

  const contentStyle = isMobile
    ? {}
    : {
        marginLeft: `${sidebarWidth}px`,
        transition: "margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      };

  // Determine padding classes based on removeTopPadding prop
  const paddingClasses = removeTopPadding
    ? "px-4 lg:px-6 pb-4 lg:pb-6"
    : "px-4 lg:px-6 pt-4 lg:pt-6 pb-4 lg:pb-6";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main
        className="flex-1 min-h-screen overflow-x-hidden"
        style={contentStyle}
      >
        {/* Top Navigation */}
        {showTopNav && (
          <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
            <div
              className={`flex items-center gap-2 sm:gap-3 ${
                actions ? "justify-between" : "justify-start"
              }`}
            >
              {/* Page Title */}
              {(title || icon) && (
                <div className="flex items-center gap-3">
                  {icon && (
                    <div className="w-8 h-8 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg flex items-center justify-center">
                      {icon}
                    </div>
                  )}
                  {title && (
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">
                        {title}
                      </h1>
                      {subtitle && (
                        <p className="text-xs text-gray-500">{subtitle}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              {actions && (
                <div className="flex items-center gap-3">{actions}</div>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`${paddingClasses} ${className}`}>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
