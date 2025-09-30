import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";

export const Contact = () => {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen flex flex-col font-[Poppins,sans-serif] text-[var(--color-text)]">
      <Navbar />
      {/* Top Section */}
      <section className="bg-white py-12 px-4 text-center">
        <h1 className="text-5xl font-bold text-[var(--color-primary)] mb-2 text_lg">
          Contact Us
        </h1>
        <p className="text-lg text-[var(--color-secondary)] mb-6 font-comic">
          We’d love to hear from you! Reach out and let’s connect African talent
          to global opportunities.
        </p>
      </section>

      {/* Main Section */}
      <section className="flex flex-col md:flex-row gap-12 px-4 md:px-16 py-12 items-start justify-center w-full max-w-6xl mx-auto">
        {/* Left Column – Get In Touch */}
        <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-8 mb-8 md:mb-0 border border-[var(--color-secondary)]">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
            Get In Touch
          </h2>
          <div className="mb-4 text-[var(--color-text)]">
            <p className="mb-2">
              <span className="font-semibold">Address:</span> Example Street,
              Lagos, Nigeria
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+1234567890"
                className="text-[var(--color-primary)] hover:underline"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:contact@work-remotely.ng"
                className="text-[var(--color-primary)] hover:underline"
              >
                contact@work-remotely.ng
              </a>
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:scale-110 transition">
              <i className="fab fa-linkedin text-2xl text-[var(--color-primary)]"></i>
            </a>
            <a href="#" className="hover:scale-110 transition">
              <i className="fab fa-twitter text-2xl text-[var(--color-primary)]"></i>
            </a>
            <a href="#" className="hover:scale-110 transition">
              <i className="fab fa-facebook text-2xl text-[var(--color-primary)]"></i>
            </a>
            <a href="#" className="hover:scale-110 transition">
              <i className="fab fa-instagram text-2xl text-[var(--color-primary)]"></i>
            </a>
          </div>
        </div>

        {/* Right Column – Contact Form */}
        <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-8 border border-[var(--color-secondary)]">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
            Send Us a Message
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border border-[var(--color-secondary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition font-[Poppins,sans-serif]"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-[var(--color-secondary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition font-[Poppins,sans-serif]"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="border border-[var(--color-secondary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition resize-none font-[Poppins,sans-serif]"
            />
            <button
              type="submit"
              className="comic-button w-full py-2 font-bold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Bottom Section – Map */}
      <section className="w-full flex justify-center py-8">
        <div className="w-full max-w-2xl h-64 rounded-2xl overflow-hidden shadow-lg border border-[var(--color-secondary)]">
          <iframe
            title="Office Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=3.3792%2C6.5244%2C3.3892%2C6.5344&amp;layer=mapnik"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <div className="text-center py-4 text-[var(--color-secondary)] text-sm">
        <span className="font-bold text-[var(--color-primary)]">
          We Work Remotely
        </span>{" "}
        &mdash; Features | Resources | Community | Support
        <br />
        Made with <span className="text-red-500">❤️</span> by We Work Remotely
      </div>
    </div>
  );
};
