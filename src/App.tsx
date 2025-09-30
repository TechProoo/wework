import { Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Route } from "react-router-dom";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Courses } from "./Pages/Courses";
import { Jobs } from "./Pages/Jobs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </>
  );
}

export default App;
