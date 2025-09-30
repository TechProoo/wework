import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#f4f2f3] border-t border-[#64766a] mt-20 py-10 px-4 text-[#3c4d42]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span
            className="font-extrabold text-xl"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            WeWork
          </span>
          <span className="px-2 py-1 rounded-full bg-[#64766a] text-white text-xs font-bold">
            Africa's Tech Academy
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <a
            href="#"
            className="hover:underline hover:text-[#94a7ae] font-semibold"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:underline hover:text-[#94a7ae] font-semibold"
          >
            Courses
          </a>
          <a
            href="#"
            className="hover:underline hover:text-[#94a7ae] font-semibold"
          >
            Community
          </a>
          <a
            href="#"
            className="hover:underline hover:text-[#94a7ae] font-semibold"
          >
            Contact
          </a>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-sm">
            &copy; {new Date().getFullYear()} WeWork. All rights reserved.
          </span>
          <span className="text-xs text-[#94a7ae]">
            Made with ❤️ for Africa
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
