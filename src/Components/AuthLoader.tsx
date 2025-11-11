import React from "react";

export const AuthLoader: React.FC = () => {
  console.log("[AuthLoader] rendered");
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden
        className="absolute right-[-10%] top-[-12%] w-[28rem] h-[28rem] rounded-full opacity-10 blur-[72px]"
        style={{
          background: "var(--color-accent)",
          transform: "rotate(12deg)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-[-14%] bottom-[-14%] w-[36rem] h-[36rem] rounded-full opacity-10 blur-[96px]"
        style={{
          background: "var(--color-primary)",
          transform: "rotate(-8deg)",
        }}
      />

      {/* Loader Core */}
      <div className="relative w-28 h-28">
        {/* Rotating gradient ring */}
        <svg
          className="w-full h-full animate-spin-smooth"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
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
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-xl animate-pulse" />
        </div>
      </div>

      {/* Local keyframes for smoother spin */}
      <style>{`
        @keyframes spin-smooth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-smooth {
          animation: spin-smooth 1.1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthLoader;
