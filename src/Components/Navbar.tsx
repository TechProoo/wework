import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogoutModal } from "./LogoutModal";

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar_container flex justify-between items-center relative ${
        scrolled ? "navbar_scrolled" : ""
      }`}
    >
      <a
        href="#"
        className={`logo z-20 focus:outline-none focus:ring-2 focus:ring-accent rounded ${
          scrolled ? "logo_scrolled" : ""
        }`}
      >
        <h1>
          WE<span>WORK.</span>
        </h1>
      </a>
      {/* Hamburger Icon for mobile - absolutely positioned to right */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-30 focus:outline-none focus:ring-2 focus:ring-accent rounded absolute right-4 top-1/2 -translate-y-1/2"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="navbar-menu"
        onClick={() => setMenuOpen((prev) => !prev)}
        style={{ marginLeft: "auto" }}
      >
        <span
          className={`block w-7 h-1 bg-[#64766a] rounded transition-all duration-300 mb-1 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-1 bg-[#64766a] rounded transition-all duration-300 mb-1 ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-1 bg-[#64766a] rounded transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      {/* Nav Links */}
      <div
        id="navbar-menu"
        className={`nav_links md:gap-20 flex-col md:flex-row flex md:static fixed top-0 right-0 h-full md:h-auto w-4/5 max-w-xs md:max-w-none bg-white md:bg-transparent shadow-lg md:shadow-none p-8 md:p-0 transition-transform duration-300 z-20
        ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:flex`}
        style={{
          minHeight: menuOpen ? "100vh" : undefined,
        }}
        tabIndex={menuOpen ? 0 : -1}
        aria-hidden={!menuOpen && window.innerWidth < 768}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav_link mb-4 md:mb-0${isActive ? " active" : ""}`
          }
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `nav_link mb-4 md:mb-0${isActive ? " active" : ""}`
          }
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Courses
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `nav_link mb-4 md:mb-0${isActive ? " active" : ""}`
          }
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Jobs
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `nav_link mb-4 md:mb-0${isActive ? " active" : ""}`
          }
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `nav_link mb-4 md:mb-0${isActive ? " active" : ""}`
          }
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Contacts
        </NavLink>
        {/* Show buttons in mobile menu */}
        <div className="nav_button md:hidden mt-4 w-full space-y-3">
          {isAuthenticated ? (
            <>
              <div className="text-center p-2 text-sm text-gray-600">
                Welcome, {user?.firstName || user?.companyName || user?.email}!
              </div>
              <NavLink
                to="/dashboard"
                className="comic-button w-full block text-center"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  setShowLogoutModal(true);
                  setMenuOpen(false);
                }}
                className="comic-button-outline w-full border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition-all duration-300 block text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="comic-button w-full block text-center"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </NavLink>
              <NavLink
                to="/login"
                className="comic-button-outline w-full border-2 border-[var(--comic-blue)] text-[var(--comic-blue)] bg-transparent hover:bg-[var(--comic-blue)] hover:text-black transition-all duration-300 block text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
      {/* Show buttons in desktop */}
      <div className="nav_button flex items-center gap-4">
        {isAuthenticated ? (
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.firstName || user?.companyName || user?.email}!
            </span>
            <NavLink to="/dashboard" className="comic-button">
              Dashboard
            </NavLink>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="comic-button-outline border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition-all duration-300 px-6 py-2 rounded-lg font-bold"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/login"
                className="comic-button-outline border-2 border-[var(--comic-blue)] text-[var(--comic-blue)] bg-transparent hover:bg-[var(--comic-blue)] hover:text-black transition-all duration-300 px-4 py-2 rounded-lg font-bold text-sm"
              >
                Login
              </NavLink>
            </div>
            <NavLink to="/signup" className="comic-button hidden md:block">
              Get Started
            </NavLink>
          </>
        )}
      </div>
      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </nav>
  );
};
