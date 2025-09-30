import { useState } from "react";
import Image from "../assets/three.jpg";
import Image2 from "../assets/two.jpg";
import Image3 from "../assets/one.jpg";
import Lottie from "../assets/lottie.jpg";
import { Sparkle } from "lucide-react";

const courses = [
  {
    title: "Creative Writing",
    subtitle: "Unleash your imagination",
    image: Image,
  },
  {
    title: "Digital Storytelling",
    subtitle: "Craft compelling narratives",
    image: Image2,
  },
  {
    title: "Entrepreneurship",
    subtitle: "Build, launch, and grow",
    image: Image3,
  },
];

export default function WatchLearnGrow() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-12 relative mt-20">
      <div className="mx-auto px-6 md:w-10/12">
        <div className="grid grid-cols-1 md:grid-cols-2  max-w-6xl mx-auto items-center">
          <h2 className="text_lg text-5xl font-bold mb-6">
            Watch.
            <br />
            <span className="text-4xl">Learn.</span>
            <br />
            <span className="text-3xl">Grow.</span>
          </h2>
          <div className="flex gap-4 h-[400px] z-10">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`relative flex-1 overflow-hidden rounded-2xl transition-all duration-500 ease-in-out cursor-pointer shadow-md ${
                  activeIndex === index ? "flex-[3]" : "flex-[1]"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover absolute inset-0 w-full h-full"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className={`absolute bottom-4 left-4 text-white z-10 transition-all duration-500 flex items-center justify-center ${
                    activeIndex === index ? "rotate-0" : ""
                  }`}
                  style={{
                    writingMode:
                      activeIndex === index ? "horizontal-tb" : "vertical-lr",
                    textAlign: activeIndex === index ? "left" : "center",
                    left: activeIndex === index ? "1rem" : "50%",
                    top: activeIndex === index ? "auto" : "50%",
                    bottom: activeIndex === index ? "1rem" : "auto",
                    transform:
                      activeIndex === index
                        ? "translateY(0)"
                        : "translate(-50%, -50%)",
                  }}
                >
                  <span>
                    <h3 className="text-2xl font-semibold drop-shadow-md">
                      {course.title}
                    </h3>
                    <p className="text-sm opacity-80">{course.subtitle}</p>
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <Sparkle size={32} className="text-yellow-400 opacity-80" />
        </div>
        <div className="absolute top-10 right-8">
          <Sparkle size={24} className="text-blue-400 opacity-70" />
        </div>
        <div className="absolute bottom-6 left-10">
          <Sparkle size={28} className="text-pink-400 opacity-75" />
        </div>
        <div className="absolute bottom-2 right-4">
          <Sparkle size={20} className="text-green-400 opacity-60" />
        </div>
        <div className="absolute top-10 left-70 z-0 opacity-20">
          <img className="w-100" src={Lottie} alt="" />
        </div>
      </div>
    </section>
  );
}
