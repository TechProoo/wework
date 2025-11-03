import React from "react";

export const AuthLoader: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "var(--color-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative flowing blobs to match platform theme (purely visual) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-10%",
          top: "-12%",
          width: "28rem",
          height: "28rem",
          background: "var(--color-accent)",
          opacity: 0.08,
          borderRadius: "50%",
          filter: "blur(72px)",
          transform: "rotate(12deg)",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-14%",
          bottom: "-14%",
          width: "36rem",
          height: "36rem",
          background: "var(--color-primary)",
          opacity: 0.06,
          borderRadius: "50%",
          filter: "blur(96px)",
          transform: "rotate(-8deg)",
        }}
      />

      <div className="relative w-28 h-28">
        {/* Rotating gradient ring */}
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          style={{ animation: "spin 1.1s linear infinite" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Use CSS variables provided by the platform to match colors */}
            <linearGradient id="lg" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodColor="var(--color-text)"
                floodOpacity="0.06"
              />
            </filter>
          </defs>

          <g filter="url(#shadow)">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#lg)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="120"
              strokeDashoffset="40"
            />
          </g>
        </svg>

        {/* Pulsing center gem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-forest-500 to-mauve-500 shadow-xl animate-pulse" />
        </div>

        {/* Inline keyframes to ensure spin works without Tailwind customization */}
        <style>{`
          @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        `}</style>
      </div>
    </div>
  );
};

export default AuthLoader;
