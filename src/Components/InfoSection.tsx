import { Rocket } from "lucide-react";
import GlassCard from "./glass_card";
import WatchLearnGrow from "./Wlg";

export const InfoSection = () => {
  return (
    <div className="info-section-container mt-20 pt-20 bg-white py-10 px-5 ">
      <div className="relative">
        {/* Decorative bubbles for this section */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--color-accent)] opacity-30 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-[var(--color-primary)] opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="absolute bottom-0 left-1/2 w-16 h-16 bg-yellow-300 opacity-25 rounded-full blur-2xl z-0"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-[var(--color-secondary)] opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-yellow-300 opacity-30 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-2/3 right-1/3 w-14 h-14 bg-[var(--color-accent)] opacity-25 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-24 left-2/3 w-10 h-10 bg-[var(--color-primary)] opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="absolute bottom-16 right-1/4 w-8 h-8 bg-[var(--color-secondary)] opacity-30 rounded-full blur-2xl z-0"></div>
        <div className="absolute bottom-32 left-10 w-16 h-16 bg-yellow-300 opacity-20 rounded-full blur-2xl z-0"></div>
        <h1 className="text-center text-5xl md:w-9/12 mx-auto relative z-10">
          The ultimate space to sharpen your technical skills
        </h1>
        <div className="md:flex justify-center gap-10 mt-10 relative z-10">
          <div className="text-center info_ic flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="ld_ic flex justify-center items-center">
                {/* @ts-ignore */}
                <lord-icon
                  src="https://cdn.lordicon.com/shcfcebj.json"
                  trigger={"loop"}
                  colors="primary:#789c5c,secondary:#3c4d42"
                  stroke="bold"
                  style={{ width: "200px", height: "200px" }}
                >
                  {/* @ts-ignore */}
                </lord-icon>
              </div>
              <div className="mt-15 font-extrabold">
                <h1 className="text-5xl">STUDENTS</h1>
                <p className="md:w-8/12 m-auto text-center">
                  Studying for that big test or nervous about your first
                  interview? <span>WeWork</span> makes practice easy so you can
                  master what you’ve learned and shine when the moment arrives.
                </p>
              </div>
              <div className="mt-10">
                <button className="comic-button">Join Us</button>
              </div>
            </div>
          </div>
          <div className="text-center info_ic">
            <div className="flex flex-col items-center">
              <div className="ld_ic flex justify-center items-center">
                {/* @ts-ignore */}
                <lord-icon
                  src="https://cdn.lordicon.com/vvyxyrur.json"
                  trigger={"loop"}
                  colors="primary:#703c9e,secondary:#789c5c"
                  state="loop-cycle"
                  stroke="bold"
                  style={{ width: "200px", height: "200px" }}
                >
                  {/* @ts-ignore */}
                </lord-icon>
              </div>
              <div className="mt-10 font-extrabold">
                <h1 className="text-5xl">Professionals</h1>
                <p className="md:w-8/12 m-auto text-center">
                  Whether you’re advancing your career or refreshing old skills,
                  <span>WeWork</span> gives you access to diverse courses — from
                  machine learning to web development.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <button className="comic-button">Elevate your career</button>
            </div>
          </div>
        </div>
      </div>

      <div className="vision_cover mt-20">
        <div className="flex justify-center items-center">
          <div className="text-center flex flex-col">
            <div className="vis_top">
              <div className="flex items-center justify-center">
                <Rocket size={30} className="text-[#3c4d42] mr-3" />
                <span className="inline-block bg-[#3c4d42] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow">
                  Our Vision
                </span>
              </div>
            </div>
            <h1 className="mt-5 text-4xl">Our Big Dream</h1>
            <p className="md:w-8/12 m-auto text-center">
              To become Africa's go-to tech academy and remote job hub,
              transforming millions of lives through technology education and
              global employment opportunities.
            </p>
          </div>
        </div>
        <div className="mt-20 ">
          <GlassCard />
        </div>
        <WatchLearnGrow />

        <div className="mt-20 mb-10">
          <div className="text-center">
            <h1 className="text-2xl">Be Part of Our Pilot Program</h1>
            <p>
              Join the first cohort of changemakers and help us shape the future
              of tech education in Africa.
            </p>
            <button className="comic-button mt-10">Join the Movement!</button>
          </div>
        </div>
      </div>
    </div>
  );
};
