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
    <div className="mt-10 md:flex items-center justify-center gap-10 mx-auto">
      <div className="hero_text">
        <div className="hero_text_top flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            A new way to learn <br />
            <span className="flex items-center gap-2">
              <Ampersand size={40} />
              earn
            </span>
          </h1>
          <p className="text-md w-[400px] ">
            Rework is here for you with various courses and materials from
            skilled tutors all over the world.
          </p>
          <div className="flex gap-5">
            <button className="comic-button">Get started today</button>
            <button>Learn More</button>
          </div>
        </div>
        <div className="hero_text_bottom"></div>
      </div>
      <div className="hero_images">
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
