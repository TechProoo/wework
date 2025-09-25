import {
  Ampersand,
  BringToFront,
  ChevronsLeftRightEllipsis,
  Sparkle,
} from "lucide-react";
import ImageOne from "../assets/seven.jpg";
import ImageTwo from "../assets/five.jpg";
import ImageThree from "../assets/two.jpg";

export const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row md:mt-10 px-3 gap-8 md:gap-5 lg:gap-20 items-center justify-center w-full">
      <div className="hero_text">
        <div className="hero_text_top flex flex-col gap-7">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            A new way to learn <br className="hidden md:block" />
            <span className="inline-flex items-center gap-2">
              <Ampersand className="inline-block" size={40} />
              earn
            </span>
          </h1>
          <p className="text-md md:w-[400px] ">
            WeWork is here to support you every step of the way, offering a wide
            range of expertly designed courses, learning resources, and study
            materials created by highly skilled tutors and professionals from
            all over the world.
          </p>
          <div className="flex gap-5">
            <button className="comic-button">Get started today</button>
            <button className="cta flex mt-2">
              <span className="hover-underline-animation">Explore</span>
              <svg
                className="mt-1"
                id="arrow-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="10"
                viewBox="0 0 46 16"
              >
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                  transform="translate(30)"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="hero_text_bottom mt-20">
          <div className="stats-container">
            <div className="stat-item">
              <h2>15,2K</h2>
              <p>Active students</p>
            </div>
            <div className="divider" />
            <div className="stat-item">
              <h2>4,5K</h2>
              <p>Tutors</p>
            </div>
            <div className="divider" />
            <div className="stat-item">
              <div className="icon">
                <span className="overlapping-circles">◎◎</span>
              </div>
              <p>Resources</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero_images md:mt-0 mt-10 ">
        <div className="flex gap-5">
          <div className="hero_img_ ">
            <div className="blob_one">
              <div className="blob_one_inner flex items-center justify-center">
                <ChevronsLeftRightEllipsis color="#f4f2f3" size={30} />
              </div>
            </div>
            <img src={ImageTwo} className="" alt="" />
          </div>
          <div className="hero_img_i">
            <div className="blob_t"></div>
            <img className="" src={ImageThree} alt="" />
          </div>
        </div>
        <div className="mt-5 hero_img_2">
          <div className="blob_two">
            <div className="blob_two_inner flex items-center justify-center">
              <BringToFront className="chain" color="#f4f2f3" size={40} />
            </div>
          </div>
          <img className="w-100" src={ImageOne} alt="" />
        </div>
        <div className="blob_te">
          <Sparkle />
        </div>
        <div className="blob_tr"></div>
        <div className="blob_th">
          <Sparkle />
        </div>{" "}
      </div>
    </div>
  );
};
