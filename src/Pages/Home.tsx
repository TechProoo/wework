import { Courses } from "../Components/Courses";
import Footer from "../Components/Footer";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Courses />
      <Footer />
    </div>
  );
};
