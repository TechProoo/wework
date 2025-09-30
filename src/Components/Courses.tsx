import { categories } from "../data/categories";
import InfoCard from "./InfoCard";
import { InfoSection } from "./InfoSection";
import CourseCard from "./Styles/Card";
import WatchLearnGrow from "./wlg";

export const Courses = () => {
  return (
    <div className="p_courses mt-20">
      <h1 className="text-center md:text-5xl text-4xl font-extrabold">
        Popular Courses
      </h1>
      <div>
        <div className="w-full flex justify-center mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-3 mx-3 md:mx-10">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="mx-auto comic-button">View All</button>
        </div>
      </div>
      <div className="about_us mt-20 py-10">
        <InfoCard />
      </div>

      <div>
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-center md:text-5xl text-4xl font-extrabold">
              Top Categories
            </h2>
            <div className="grid grid-cols-2 mt-10 md:grid-cols-4 gap-6">
              {categories.map((cat, i) => {
                const CatIcon = cat.icon;
                return (
                  <div
                    key={i}
                    className={`relative flex flex-col items-center justify-center ${cat.color} rounded-lg py-6 shadow-sm`}
                  >
                    <span className="cat_text text-[#3c4d42]">{cat.name}</span>
                    <div className="absolute -bottom-5 flex items-center justify-center w-10 h-10  rounded-full border-2">
                      <CatIcon className="w-6 h-6 text-[#3c4d42]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <InfoSection />
    </div>
  );
};
