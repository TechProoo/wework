import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Bookmark, Clock, Users, CheckCircle, Star } from "lucide-react";
// Accept courses as a prop

type Course = {
  id: number;
  title: string;
  description: string;
  level: string;
  rating: number;
  reviews: number;
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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookmark = (id: number) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
    console.log("bookmark toggled for course:", id);
  };

  const handleEnrollClick = (courseId: number, event: React.MouseEvent) => {
    event.preventDefault();
    if (!isAuthenticated) {
      // Store the course ID in sessionStorage to redirect back after login
      sessionStorage.setItem("intendedCourse", courseId.toString());
      // Redirect to student login if not authenticated
      navigate("/login");
      return;
    }
    // If authenticated, proceed to course page
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border overflow-hidden cursor-pointer"
          style={{ borderColor: "#94a7ae" }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "#64766a";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "#94a7ae";
          }}
        >
          <div className="relative p-6">
            {/* Image */}
            <div className="relative mb-4 -m-6 mx-0 mt-0">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                  onClick={() => handleBookmark(course.id)}
                >
                  <Bookmark
                    size={16}
                    className={`${bookmarked[course.id] ? "fill-current" : ""}`}
                    style={{
                      color: bookmarked[course.id] ? "#c0a9bd" : "#94a7ae",
                    }}
                  />
                </button>
              </div>
            </div>
            {/* Level Badge */}
            <div className="mb-3">
              <span
                className={
                  `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ` +
                  (course.level.trim().toLowerCase() === "beginner"
                    ? "bg-green-100 text-green-800"
                    : course.level.trim().toLowerCase() === "intermediate"
                    ? "bg-blue-100 text-blue-800"
                    : course.level.trim().toLowerCase() === "advanced"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800")
                }
              >
                {course.level}
              </span>
            </div>
            {/* Title */}
            <h3
              className="text-lg font-semibold mb-2 line-clamp-2"
              style={{ color: "#64766a" }}
            >
              {course.title}
            </h3>
            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star size={14} className="text-amber-400 fill-current" />
                <span
                  className="text-sm font-medium ml-1"
                  style={{ color: "#64766a" }}
                >
                  {course.rating}
                </span>
                <span className="text-sm ml-1" style={{ color: "#94a7ae" }}>
                  ({course.reviews} reviews)
                </span>
              </div>
            </div>
            <p
              className="text-sm mb-4 line-clamp-2"
              style={{ color: "#94a7ae" }}
            >
              {course.description}
            </p>
            {/* Course Details */}
            <div
              className="flex items-center justify-between text-sm mb-4"
              style={{ color: "#94a7ae" }}
            >
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>12 weeks</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{course.reviews} students</span>
              </div>
            </div>
            <div
              className="flex items-center text-sm mb-4"
              style={{ color: "#94a7ae" }}
            >
              <CheckCircle size={14} className="text-green-600" />
              <span className="ml-1">Certificate included</span>
            </div>{" "}
            {/* Instructor */}
            <div className="text-sm mb-4" style={{ color: "#94a7ae" }}>
              <span>Instructor:</span>{" "}
              <span className="font-medium" style={{ color: "#64766a" }}>
                {course.owner}
              </span>
            </div>
            {/* CTA Button */}
            <button
              onClick={(event) => handleEnrollClick(course.id, event)}
              className="w-full text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-md"
              style={{
                backgroundColor: "#64766a",
                borderColor: "#64766a",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#5a6b60";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#64766a";
              }}
            >
              {isAuthenticated ? "Start Learning" : "Enroll Now"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
