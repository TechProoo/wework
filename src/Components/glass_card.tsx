import { GraduationCap, Globe, User } from "lucide-react"; // icon

const cards = [
  {
    icon: GraduationCap,
    title: "Skills Excellence",
    description:
      "World-class training programs that rival Silicon Valley bootcamps",
    stat: "🎓 1M+ Graduates",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connecting African talent to remote opportunities worldwide",
    stat: "🌍 50+ Countries Served",
  },
  {
    icon: User,
    title: "Community Impact",
    description: "Building the largest network of African tech professionals",
    stat: "👥 500K+ Active Members",
  },
];

export default function GlassCard() {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="relative w-80 p-6 rounded-2xl text-[#3c4d42]"
            style={{
              background: "rgba(244, 242, 243, 0.25)",
              borderRadius: 20,
              boxShadow: "0 8px 32px 0 rgba(100, 118, 106, 0.18)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="p-3 rounded-full flex items-center justify-center mb-2">
              <Icon size={50} className="text-[#64766a]" />
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-xl font-extrabold text-[#3c4d42] drop-shadow">
                {card.title}
              </h2>
            </div>
            <p
              className="text-base mb-6 font-medium"
              style={{ color: "#7a8a7f" }}
            >
              {card.description}
            </p>
            <div className="float-right">
              <span className="px-3 py-1 text-xs font-bold rounded-full text-white shadow bg-[#64766a]">
                {card.stat}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
