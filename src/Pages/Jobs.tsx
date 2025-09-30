import React from "react";

export const Jobs = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        background: "#f5f5f5",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            border: "6px solid #eee",
            borderTop: "6px solid #555",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px auto",
          }}
        />
        <div style={{ fontSize: "1.5rem", color: "#555", fontWeight: "bold" }}>
          The page is under construction 😊...
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};
