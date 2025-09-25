import { Star } from "lucide-react";
import CourseCard from "./Styles/Card";

export const Courses = () => {
  return (
    <div className="p_courses mt-20">
      <h1 className="text-center text-5xl">Popular Courses</h1>
      <div className="w-full flex justify-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </div>
  );
};
