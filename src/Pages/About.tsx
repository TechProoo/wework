import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import TeamImg1 from "../assets/in.jpg";
import TeamImg2 from "../assets/gr.jpg";
import TeamImg3 from "../assets/en.jpg";
import { Users, Target, ShieldCheck } from "lucide-react";
import WatchLearnGrow from "../Components/Wlg";

export const About = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-[#94a7ae] py-16 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text_lg text-5xl md:text-6xl text_lg font-bold text-[#3c4d42] mb-4">
          <span className="text_lg">
            <span className="text_lg">WeWork</span>
          </span>{" "}
          Remotely
        </h1>
        <p className="text-lg md:text-xl text-[$f4f2f3] mb-8 font-comic md:w-8/12">
          Skills Today, Global Jobs Tomorrow
          <br />
          Empowering African youth with tech skills and remote job
          opportunities.
        </p>
        <div className="flex gap-6 justify-center mb-2">
          <img
            src={TeamImg1}
            alt="Team"
            className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#3c4d42]"
          />
          <img
            src={TeamImg2}
            alt="Office"
            className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#3c4d42]"
          />
          <img
            src={TeamImg3}
            alt="Collaboration"
            className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#3c4d42]"
          />
        </div>
      </section>

      {/* Section One – Mission */}
      <section className="py-16 px-4 md:px-16 flex flex-col md:flex-row items-center justify-center gap-12 bg-white">
        <div className="md:w-1/2">
          <h2 className="text-3xl text_lg md:text-4xl font-bold text-[#64766a] mb-4">
            What’s the Issue?
          </h2>
          <p className="text-lg text-gray-700">
            In Nigeria, 42.5% of young people were unemployed in early 2025.
            Across Africa, millions of talented youths lack access to tech
            skills and global job opportunities. We’re here to break that cycle
            and unlock potential.
          </p>
        </div>
        <div className="md:w-1/2 flex items-center">
          <p className="text-lg text-gray-700 text-left">
            <span className="text_lg">WeWork</span> Remotely is dedicated to
            transforming lives by connecting African youth to the skills and
            jobs they need to shine on the world stage.
          </p>
        </div>
      </section>

      {/* Section Two – Empowering Businesses */}
      <section className="py-16 px-4 md:px-16 flex flex-col md:flex-row items-center justify-center gap-12 bg-gray-50">
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img
              src={TeamImg2}
              alt="Professional"
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-yellow-300"
            />
            <span className="text-sm text-gray-600">
              Making an impact, together
            </span>
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl text_lg md:text-4xl font-bold text-[#64766a] mb-4">
            How We Fix It
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We offer online and in-person courses in tech fields like coding,
            data analysis, cybersecurity, AI, digital marketing, and more. Our
            graduates connect with remote jobs from companies worldwide, putting
            African talent on the global map.
          </p>
          <div className="bg-yellow-200 rounded-xl p-4 italic text-gray-800 font-comic shadow-md">
            “<span className="text_lg">WeWork</span> Remotely helped me land my
            first remote tech job. The support and opportunities are
            life-changing!”
          </div>
        </div>
      </section>

      <WatchLearnGrow />

      {/* Section Three – Growth Promise */}
      <section className="py-16 px-4 md:px-16 flex flex-col items-center justify-center bg-white">
        <h2 className="text_lg text-3xl md:text-4xl font-bold text-[#3c4d42] mb-4 text-center">
          Our Big Dream
        </h2>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl">
          We want to be Africa’s go-to tech skill academy and remote job hub.
          Our goal? Transform Nigeria’s tech scene and put African talent on the
          world map, turning dreams into real opportunities for millions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center about_cd bg-yellow-100 rounded-2xl p-8 shadow-md">
            <Users size={40} className="text-yellow-400 mb-4" />
            <h3 className="text-xl text_lg font-bold text-[#64766a] mb-2">
              Empowering Youth
            </h3>
            <p className="text-gray-700 text-center">
              We connect African youth to global tech skills and jobs.
            </p>
          </div>
          <div className="flex flex-col items-center bg-yellow-100 rounded-2xl p-8 shadow-md">
            <Target size={40} className="text-yellow-400 mb-4" />
            <h3 className="text-xl  text_lg font-bold text-[#64766a] mb-2">
              Opportunity Focused
            </h3>
            <p className="text-gray-700 text-center">
              We help you access remote jobs and real-world experience.
            </p>
          </div>
          <div className="flex flex-col items-center about_cd bg-yellow-100 rounded-2xl p-8 shadow-md">
            <ShieldCheck size={40} className="text-yellow-400 mb-4" />
            <h3 className="text-xl text_lg font-bold text-[#64766a] mb-2"></h3>
            <p className="text-gray-700 text-center">
              We deliver sustainable solutions that secure your growth.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h3 className="text-2xl text_lg font-bold text-[#64766a] mb-2">
            Join the Movement!
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            Whether you’re a student ready to learn, a pro who can mentor, or a
            company wanting to partner, we need you! Sign up for our courses,
            volunteer to teach, or reach out to collaborate. Let’s make it
            happen together.
          </p>
          <p className="text-lg text-black font-bold">
            Contact:{" "}
            <a
              href="mailto:info@work-remotely.ng"
              className="underline text-yellow-600"
            >
              info@work-remotely.ng
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};
