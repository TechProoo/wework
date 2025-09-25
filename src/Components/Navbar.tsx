export const Navbar = () => {
  return (
    <div className=" navbar_container flex justify-between items-center">
      <div className="logo">
        <h1>
          RE<span>WORK.</span>
        </h1>
      </div>
      <div className="nav_links md:gap-20 flex justify-between align-center">
        <a href="#" className="nav_link active">
          Home
        </a>
        <a href="#" className="nav_link">
          About
        </a>
        <a href="#" className="nav_link">
          Services
        </a>
        <a href="#" className="nav_link">
          Contact
        </a>
      </div>
      <div className="nav_button">
        <button className="comic-button">Get Started</button>
      </div>
    </div>
  );
};
