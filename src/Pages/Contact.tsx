import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Globe,
  Users,
  Zap,
  Star,
} from "lucide-react";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Thank you! Your message has been sent successfully.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@wework.africa",
      action: "mailto:hello@wework.africa",
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      description: "Speak with our team",
      value: "+234 802 123 4567",
      action: "tel:+2348021234567",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Live Chat",
      description: "Chat with support",
      value: "Available 24/7",
      action: "#",
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      description: "Our main office",
      value: "Lagos, Nigeria",
      action: "#",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM WAT" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM WAT" },
    { day: "Sunday", hours: "Closed" },
  ];

  const stats = [
    { number: "5,000+", label: "Students Trained", icon: <Users size={24} /> },
    { number: "95%", label: "Job Placement Rate", icon: <Star size={24} /> },
    { number: "50+", label: "Partner Companies", icon: <Globe size={24} /> },
    { number: "24/7", label: "Support Available", icon: <Zap size={24} /> },
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-light)] relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--color-primary)] rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-[var(--color-accent)] rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[var(--color-secondary)] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white rounded-full font-semibold text-sm mb-6">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[var(--color-text)]">
            Let's Build the Future of <br className="hidden md:block" />
            <span className="text-[var(--color-primary)]">
              Remote Work Together
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] max-w-2xl mx-auto mb-8">
            Have questions about our programs? Want to partner with us? We're
            here to help you connect with global opportunities.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--color-primary)] text-white rounded-full mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-[var(--color-text)]">
                  {stat.number}
                </div>
                <div className="text-sm text-[var(--color-secondary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--color-text)]">
            Choose Your Preferred Way to Connect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="contact-method-card group cursor-pointer"
              >
                <div className="text-[var(--color-primary)] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
                  {method.title}
                </h3>
                <p className="text-[var(--color-secondary)] text-sm mb-3">
                  {method.description}
                </p>
                <p className="text-[var(--color-primary)] font-semibold text-sm">
                  {method.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-4 bg-[var(--color-light)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="contact-form-card">
                <div className="flex items-center gap-3 mb-6">
                  <Send size={28} className="text-[var(--color-primary)]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                    Send Us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="contact-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="contact-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="contact-input"
                    >
                      <option value="">Select a subject</option>
                      <option value="course-inquiry">Course Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="job-placement">Job Placement</option>
                      <option value="technical-support">
                        Technical Support
                      </option>
                      <option value="general">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="contact-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`comic-button w-full py-4 text-lg font-bold ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            {/* Office Info Sidebar */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="contact-info-card">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={24} className="text-[var(--color-primary)]" />
                  <h3 className="text-xl font-bold text-[var(--color-text)]">
                    Office Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-[var(--color-secondary)]">
                        {schedule.day}
                      </span>
                      <span className="text-[var(--color-text)] font-medium">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="contact-info-card">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail
                      size={20}
                      className="text-[var(--color-primary)] mt-1"
                    />
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">
                        Email
                      </p>
                      <a
                        href="mailto:hello@wework.africa"
                        className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        hello@wework.africa
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone
                      size={20}
                      className="text-[var(--color-primary)] mt-1"
                    />
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">
                        Phone
                      </p>
                      <a
                        href="tel:+2348021234567"
                        className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        +234 802 123 4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={20}
                      className="text-[var(--color-primary)] mt-1"
                    />
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">
                        Address
                      </p>
                      <p className="text-[var(--color-secondary)]">
                        Victoria Island
                        <br />
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="contact-info-card">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a href="#" className="social-icon">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.887 2.747.097.118.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--color-text)]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "How long does it take to get a response?",
                answer:
                  "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.",
              },
              {
                question: "What programs do you offer?",
                answer:
                  "We offer comprehensive training programs in Frontend Development, Backend Development, Full Stack Development, UI/UX Design, DevOps, and Data Science.",
              },
              {
                question: "Do you help with job placement?",
                answer:
                  "Yes! We have a 95% job placement rate and work with over 50 partner companies to help our graduates find remote positions.",
              },
              {
                question: "Can I visit your office?",
                answer:
                  "Absolutely! Our office is located in Victoria Island, Lagos. Please schedule an appointment in advance to ensure someone is available to meet with you.",
              },
            ].map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">
                  {faq.question}
                </h3>
                <p className="text-[var(--color-secondary)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
