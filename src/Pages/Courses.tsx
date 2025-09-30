import { AlignStartVertical, Star } from "lucide-react";
import Bg from "../assets/ccc.png";
import { List_card } from "../Components/Styles/List_card";
import { useState } from "react";
import { dummyCourses } from "../Components/Styles/dummy_courses";
import Footer from "../Components/Footer";
import { Navbar } from "../Components/Navbar";

export const Courses = () => {
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(5);

  // Get all unique levels from dummyCourses (case-insensitive, trimmed)
  const levels = [
    "All",
    ...Array.from(
      new Set(dummyCourses.map((c) => c.level.trim().toLowerCase()))
    ).map(
      (lvl) =>
        dummyCourses.find((c) => c.level.trim().toLowerCase() === lvl)?.level ||
        lvl
    ),
  ];

  // Filter courses by level (case-insensitive, trimmed)
  const filteredCourses =
    filter === "All"
      ? dummyCourses
      : dummyCourses.filter(
          (course) =>
            course.level.trim().toLowerCase() === filter.trim().toLowerCase()
        );

  const visibleCourses = filteredCourses.slice(0, limit);

  return (
    <div className="courses_section relative">
      <div className="courses_cover relative w-full h-[600px] overflow-hidden">
        <Navbar />
        <div
          className="animate-moveBg absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${Bg})`,
          }}
        ></div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
          <span className="cc_badge flex items-center gap-2 px-3 py-1 rounded-full font-semibold mb-10">
            <AlignStartVertical size={15} /> Join 5,000+ Students Worldwide
          </span>
          <h1 className="text-5xl font-bold mb-4">
            Tech Courses That Launch Careers
          </h1>
          <p className="mb-8 mt-4 md:w-5/12">
            Learn in-demand skills from industry experts. Get certified and land
            remote jobs with global companies.
          </p>
          {/* Search Bar */}
          <div className="w-full flex justify-center mb-8">
            <div className="relative w-full max-w-xl focus-within:max-w-2xl transition-all duration-300">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M20 20l-4-4"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search for courses…"
                className="w-full pl-12 rounded-3xl px-8 py-2 text-lg shadow-lg bg-white/90 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 md:mx-auto md:w-11/12 my-10 ">
        <div className="course_head">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex gap-2 items-center">
              <Star size={50} color="#789c5c" />
              <span className="font-bold text-3xl">Featured Courses</span>
            </div>
            <div className="flex gap-2 items-center ml-auto">
              {/* Responsive filter: select on mobile, buttons on desktop */}
              <div className="block md:hidden w-full">
                <select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setLimit(5);
                  }}
                  className="rounded-full px-5 py-2 border font-semibold text-base bg-white text-[var(--color-primary)] border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-200 w-full"
                >
                  {levels.map((lvl) => (
                    <option
                      key={lvl}
                      value={lvl}
                      className="text-[var(--color-primary)]"
                    >
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden md:flex gap-2 items-center">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    className={`px-5 py-2 rounded-full border font-semibold text-base transition-all duration-200 ${
                      filter === lvl
                        ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                        : "bg-white text-[var(--color-primary)] border-[var(--color-accent)]"
                    }`}
                    onClick={() => {
                      setFilter(lvl);
                      setLimit(5);
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="course_list mt-10">
          <div className="">
            <List_card courses={visibleCourses} />
          </div>
          {filteredCourses.length > limit && (
            <div className="flex justify-center mt-8">
              <button
                className="comic-button px-8 py-2 text-lg"
                onClick={() => setLimit(limit + 5)}
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="courses_why mt-20 bg-white py-20 px-3">
        <div className="text-center">
          <h1 className="text_lg text-5xl">Why Choose Our Courses?</h1>
        </div>
        <div className="md:flex justify-center flex-wrap gap-10 mt-20">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold text-[var(--color-accent)]">
              100%
            </h2>
            <h3 className="text-xl font-semibold mt-5">Online Access</h3>
            <p className="text-sm text-gray-600 mt-3">
              Learn from anywhere, anytime at your own pace
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold text-[var(--color-accent)]">
              24/7
            </h2>
            <h3 className="text-xl font-semibold mt-5">Support Available</h3>
            <p className="text-sm text-gray-600  mt-5">
              Get help whenever you need it from mentors and community
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold text-[var(--color-accent)]">
              95%
            </h2>
            <h3 className="text-xl font-semibold mt-5">Job Placement Rate</h3>
            <p className="text-sm text-gray-600 mt-5">
              Most graduates land remote jobs within 6 months
            </p>
          </div>
        </div>
      </div>
      <div className="courses_cons  py-20">
        <div>
          <h1 className="text-3xl font-bold text-center text_lg">
            Not Sure Which Course to Take?
          </h1>
          <p className="mt-10 text-center md:w-6/12 mx-auto text-md">
            Our career counselors can help you choose the perfect course based
            on your goals and background.
          </p>
          <div className="mx-auto flex justify-center mt-10">
            <button className="comic-button">Get Free Consultation</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
