import { AlignStartVertical } from "lucide-react";
import Bg from "../assets/cc.jpg";

export const Courses = () => {
  return (
    <div className="courses_section">
      {" "}
      <div className="courses_cover relative">
        <div
          className="animate-moveBg"
          style={{
            backgroundImage: `url(${Bg})`,
          }}
        ></div>
        <div className="relative z-10 w-full h-[600px] flex flex-col items-center justify-center text-center px-4">
          <span className="cc_badge flex items-center gap-2 px-3 py-1 rounded-full font-semibold mb-10">
            <AlignStartVertical size={15} /> Join 5,000+ Students Worldwide
          </span>
          <h1 className="text-5xl font-bold">
            Tech Courses That Launch Careers
          </h1>
          <p className="mt-4 md:w-5/12">
            Learn in-demand skills from industry experts. Get certified and land
            remote jobs with global companies.
          </p>
          <div className="cc_search mt-10">
            <input
              type="text"
              placeholder="Search courses..."
              className="border rounded-full py-2 px-4 w-[300px] md:w-[600px] max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
