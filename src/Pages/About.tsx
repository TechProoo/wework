import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import TeamImg1 from "../assets/in.jpg";
import TeamImg2 from "../assets/gr.jpg";
import TeamImg3 from "../assets/en.jpg";
import {
  Users,
  Target,
  Award,
  Globe,
  Heart,
  Rocket,
  CheckCircle,
  Star,
  Calendar,
} from "lucide-react";
import WatchLearnGrow from "../Components/Wlg";

export const About = () => {
  const stats = [
    { number: "5,000+", label: "Students Trained", icon: <Users size={24} /> },
    { number: "95%", label: "Job Placement Rate", icon: <Award size={24} /> },
    { number: "50+", label: "Global Partners", icon: <Globe size={24} /> },
    { number: "3 Years", label: "Experience", icon: <Calendar size={24} /> },
  ];

  const values = [
    {
      icon: <Users size={32} />,
      title: "Empowering Youth",
      description:
        "We believe every African youth deserves access to world-class tech education and global opportunities.",
    },
    {
      icon: <Target size={32} />,
      title: "Excellence Driven",
      description:
        "We maintain the highest standards in education and job placement, ensuring our graduates succeed globally.",
    },
    {
      icon: <Heart size={32} />,
      title: "Community First",
      description:
        "We build supportive communities where learners, mentors, and industry experts collaborate for success.",
    },
    {
      icon: <Globe size={32} />,
      title: "Global Vision",
      description:
        "We connect African talent to worldwide opportunities, breaking geographical barriers in the digital age.",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Foundation",
      description:
        "WeWork was founded with a mission to bridge the tech skills gap in Africa.",
    },
    {
      year: "2023",
      title: "First 1000 Graduates",
      description:
        "Celebrated our first 1000 successful graduates with 90% job placement rate.",
    },
    {
      year: "2024",
      title: "Global Partnerships",
      description:
        "Established partnerships with 50+ international companies for remote job placements.",
    },
    {
      year: "2025",
      title: "Expansion",
      description:
        "Expanded to 5 African countries with over 5000 active students.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: TeamImg1,
      description:
        "Former Google engineer passionate about African tech talent.",
    },
    {
      name: "Kwame Asante",
      role: "Head of Education",
      image: TeamImg2,
      description:
        "15 years experience in curriculum development and tech training.",
    },
    {
      name: "Amira Hassan",
      role: "Career Services Director",
      image: TeamImg3,
      description: "Expert in global remote job market and career development.",
    },
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-light)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--color-primary)] rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-[var(--color-accent)] rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[var(--color-secondary)] rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-[var(--color-primary)] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white rounded-full font-semibold text-sm mb-6">
              About WeWork
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[var(--color-text)]">
              Connecting African Talent to <br className="hidden md:block" />
              <span className="text-[var(--color-primary)]">
                Global Opportunities
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-secondary)] max-w-3xl mx-auto mb-12">
              We're not just a training academy – we're a movement. Our mission
              is to transform Africa's tech landscape by empowering youth with
              world-class skills and connecting them to remote careers with
              leading global companies.
            </p>

            {/* Team Images */}
            <div className="flex justify-center gap-4 mb-8">
              {team.map((member, index) => (
                <div key={index} className="about-team-avatar">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary)] text-white rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-[var(--color-text)] mb-2">
                  {stat.number}
                </div>
                <div className="text-[var(--color-secondary)] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Problem */}
            <div className="about-content-card bg-red-50 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  !
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                  The Challenge We're Solving
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-[var(--color-secondary)] leading-relaxed">
                  In Nigeria alone,{" "}
                  <strong>42.5% of young people were unemployed</strong> in
                  early 2025. Across Africa, millions of talented youth lack
                  access to:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-[var(--color-secondary)]">
                      Quality tech education and training programs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-[var(--color-secondary)]">
                      Global job opportunities and remote work access
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-[var(--color-secondary)]">
                      Professional mentorship and career guidance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-[var(--color-secondary)]">
                      Industry connections and networking opportunities
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Solution */}
            <div className="about-content-card bg-green-50 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                  Our Solution
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-[var(--color-secondary)] leading-relaxed">
                  WeWork bridges this gap by providing comprehensive tech
                  education and direct pathways to global remote careers:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-[var(--color-secondary)]">
                      World-class curriculum designed by industry experts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-[var(--color-secondary)]">
                      Direct partnerships with 50+ global companies
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-[var(--color-secondary)]">
                      95% job placement rate within 6 months
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-[var(--color-secondary)]">
                      Ongoing mentorship and career support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="py-16 px-4 bg-[var(--color-light)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-[var(--color-secondary)] max-w-3xl mx-auto">
              These principles guide everything we do, from curriculum design to
              job placement, ensuring we deliver on our promise to transform
              lives through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="about-value-card">
                <div className="text-[var(--color-primary)] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  {value.title}
                </h3>
                <p className="text-[var(--color-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6">
              Our Journey
            </h2>
            <p className="text-lg text-[var(--color-secondary)] max-w-3xl mx-auto">
              From a small initiative to Africa's leading tech education
              platform, here's how we've grown to impact thousands of lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="about-milestone-card">
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-3">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  {milestone.title}
                </h3>
                <p className="text-[var(--color-secondary)] leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 px-4 bg-[var(--color-light)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-[var(--color-secondary)] max-w-3xl mx-auto">
              Our team combines decades of industry experience with a deep
              passion for empowering African youth through technology education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="about-team-card">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-[var(--color-primary)]"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
                    <Star size={16} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-[var(--color-primary)] font-semibold mb-4 text-center">
                  {member.role}
                </p>
                <p className="text-[var(--color-secondary)] text-center leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Watch Learn Grow Component */}
      <WatchLearnGrow />

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Rocket size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Movement?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a student ready to learn, a professional who can
            mentor, or a company wanting to partner with us - we need you! Let's
            build the future of African tech together.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-light)] transition-colors text-center"
            >
              Start Learning Today
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[var(--color-primary)] transition-colors text-center"
            >
              Partner With Us
            </Link>
          </div>
          <div className="mt-8">
            <p className="text-sm opacity-75">Questions? Contact us at:</p>
            <a
              href="mailto:hello@wework.africa"
              className="text-white font-semibold hover:underline"
            >
              hello@wework.africa
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
