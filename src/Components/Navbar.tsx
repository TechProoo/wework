import { useState, useEffect } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <nav className="navbar_container flex justify-between items-center relative">
      <a
        href="#"
        className="logo z-20 focus:outline-none focus:ring-2 focus:ring-accent rounded"
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
        <a
          href="#"
          className="nav_link active mb-4 md:mb-0"
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>
        <a
          href="#"
          className="nav_link mb-4 md:mb-0"
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          About
        </a>
        <a
          href="#"
          className="nav_link mb-4 md:mb-0"
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Services
        </a>
        <a
          href="#"
          className="nav_link mb-4 md:mb-0"
          tabIndex={menuOpen || window.innerWidth >= 768 ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>
        {/* Show button in mobile menu */}
        <div className="nav_button md:hidden mt-4 w-full">
          <button className="comic-button w-full">Get Started</button>
        </div>
      </div>
      {/* Show button in desktop */}
      <div className="nav_button ">
        <button className="comic-button hidden md:block">Get Started</button>
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
    </nav>
  );
};
