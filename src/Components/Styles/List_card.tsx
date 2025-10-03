import React from "react";
import { Link } from "react-router-dom";
// Accept courses as a prop

type Course = {
  id: number;
  title: string;
  description: string;
  level: string;
  rating: number;
  reviews: number;
  price: string;
  owner: string;
  image: string;
};

interface ListCardProps {
  courses: Course[];
}

export const List_card: React.FC<ListCardProps> = ({ courses }) => {
  const [bookmarked, setBookmarked] = React.useState<{
    [key: number]: boolean;
  }>({});
  const handleBookmark = (id: number) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
    console.log("book mark");
  };

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="card_cover cursor-pointer rounded-2xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto border border-[var(--color-secondary)] shadow-lg backdrop-blur-md bg-white/70"
        >
          <div className="relative p-4 bg-[var(--color-bg)]">
            {/* Image */}
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover rounded-xl mb-2"
            />
            {/* Top Badge */}
            <div className="flex justify-between items-start">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-primary)] shadow border-none bg-transparent"
                onClick={() => handleBookmark(course.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill={bookmarked[course.id] ? "var(--color-accent)" : "none"}
                  viewBox="0 0 24 24"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z"
                  />
                </svg>
              </button>
              <span
                className={
                  `text-xs font-semibold px-3 py-1 rounded-full ` +
                  (course.level.trim().toLowerCase() === "beginner"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : course.level.trim().toLowerCase() === "intermediate"
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : course.level.trim().toLowerCase() === "advanced"
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-yellow-200 text-[var(--color-primary)] border border-yellow-300")
                }
              >
                {course.level}
              </span>
            </div>
            {/* Rating */}
            <div className="flex items-center mt-3">
              <span className="text-sm font-semibold text-[var(--color-accent)] flex items-center">
                {course.rating}
              </span>
              <span className="text-xs text-[var(--color-secondary)] ml-1">
                ({course.reviews})
              </span>
            </div>
            {/* Title */}
            <h2 className="mt-2 text-lg font-semibold text-[var(--color-primary)]">
              {course.title}
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-1">
              {course.description}
            </p>
            {/* Details */}
            <div className="flex items-center text-[var(--color-secondary)] text-sm mt-4 gap-4">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6l4 2"
                  />
                </svg>
                <span>12 weeks</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5V10h-5M7 20h5V4H7v16z"
                  />
                </svg>
                <span>{course.reviews} students</span>
              </div>
            </div>
            <div className="flex items-center text-[var(--color-secondary)] text-sm mt-2 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4"
                />
              </svg>
              <span>Certificate included</span>
            </div>
            {/* Price */}
            <div className="border-t border-[var(--color-secondary)] mt-4 pt-4">
              <span className="text-lg font-bold text-[var(--color-accent)]">
                {course.price}
              </span>
            </div>
            {/* Owner */}
            <div className="mt-2 text-xs text-[var(--color-secondary)]">
              By {course.owner}
            </div>
            {/* CTA */}
            <Link
              to={`/courses/${course.id}`}
              className="mt-4 w-full comic-button text-lg inline-block text-center"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
