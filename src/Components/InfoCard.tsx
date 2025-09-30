import React from "react";
import infoCardsData from "../data/infoData";

const InfoCard = () => {
  return (
    <div className="flex w-10/12 justify-center items-center mx-auto info-card-container">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-30 gap-4 info-card-grid">
        {infoCardsData.map((card, index) => (
          <div
            key={index}
            className={`flex items-center     rounded-md gap-2 info-card-item info-card-item-${index}`}
          >
            <div
              className={`flex items-center   info-card-icon info-card-icon-${index}`}
            >
              <div
                style={{
                  backgroundColor: [
                    "#fcf414",
                    "#703c9e",
                    "#789c5c",
                    "#703c9e",
                    "#7190af",
                  ][index % 5],
                  borderRadius: "50%",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {React.createElement(card.icon, { color: "#fff", size: 24 })}
              </div>
            </div>
            <div
              className={`flex flex-col info-card-content info-card-content-${index}`}
            >
              <span className="text-sm font-semibold drop-shadow info-card-title">
                {card.title}
              </span>
              <span className="text-xs text-indigo-100 info-card-subtitle">
                {card.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
