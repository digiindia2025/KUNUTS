"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const colorOptions = [
  { name: "Dark Blue", value: "#000080", key: "darkBlue" },
  { name: "Black", value: "#000000", key: "black" },
  { name: "Purple", value: "#800080", key: "purple" },
  { name: "Maroon", value: "#800000", key: "maroon" },
  { name: "Brown", value: "#8B4513", key: "brown" },
  { name: "White", value: "#FFFFFF", key: "white" },
  { name: "Blue", value: "#0074BC", key: "blue" },
  { name: "Red", value: "#BC0034", key: "red" },
  { name: "Yellow", value: "#F9D71C", key: "yellow" },
  { name: "Pearl", value: "#F5F5F5", key: "pearl" },
  { name: "Pink", value: "#F5A3C7", key: "pink" },
  { name: "Light Blue", value: "#A3E0F5", key: "lightBlue" },
  { name: "Dark Green", value: "#007C36", key: "darkGreen" },
  { name: "Platinum", value: "#E5E4E2", key: "platinum" },
  { name: "Orange", value: "#FF5C00", key: "orange" },
  { name: "Light Purple", value: "#C1A7E2", key: "lightPurple" },
  { name: "Dark Pink", value: "#D6218F", key: "darkPink" },
  { name: "Dark Yellow", value: "#EFAA22", key: "darkYellow" },
];

const getColorValue = (colorKey) => {
  const foundColor = colorOptions.find((c) => c.key === colorKey);
  return foundColor ? foundColor.value : "#CCCCCC";
};

const CandyPreview = ({ selectedColors }) => {
  const [candies, setCandies] = useState([]);

  useEffect(() => {
    const generateCandies = () => {
      if (selectedColors.length === 0) return [];

      const newCandies = [];
      const count = 150;

      const gridSize = 10; // Divide the area into a grid

      for (let i = 0; i < count; i++) {
        const colorKey =
          selectedColors[Math.floor(Math.random() * selectedColors.length)];

        const x = Math.floor(Math.random() * gridSize) * (100 / gridSize); // Grid-based x position
        const y = Math.floor(Math.random() * gridSize) * (100 / gridSize); // Grid-based y position

        const size = 50 + Math.random() * 5;

        const zIndex = Math.floor(Math.random() * 5);

        const rotation = Math.random() * 360;

        newCandies.push({
          id: i,
          colorKey,
          x,
          y,
          size,
          zIndex,
          rotation,
        });
      }

      return newCandies;
    };

    setCandies(generateCandies());
  }, [selectedColors]);

  const handleRefreshCandies = () => {
    setCandies((prev) =>
      prev.map((candy) => ({
        ...candy,
        x: Math.floor(Math.random() * 8) * (100 / 8),
        y: Math.floor(Math.random() * 8) * (100 / 8),
        rotation: Math.random() * 360,
      }))
    );
    toast.success("Preview refreshed!");
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[580px] bg-white rounded-lg overflow-hidden border border-gray-200">
        {selectedColors.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Select colors to see your candy mix preview
            </p>
          </div>
        ) : (
          <>
            {candies.map((candy) => {
              const colorValue = getColorValue(candy.colorKey);
              const isDark =
                colorValue !== "#FFFFFF" &&
                colorValue !== "#F5F5F5" &&
                colorValue !== "#E5E4E2" &&
                colorValue !== "#A3E0F5";

              return (
                <div
                  key={candy.id}
                  className="absolute rounded-full flex items-center justify-center transform transition-all duration-300"
                  style={{
                    backgroundColor: colorValue,
                    width: `${candy.size}px`,
                    height: `${candy.size}px`,
                    left: `${candy.x}%`,
                    top: `${candy.y}%`,
                    zIndex: candy.zIndex,
                    transform: `rotate(${candy.rotation}deg)`,
                    boxShadow:
                      "0px 4px 8px rgba(0, 0, 0, 0.3), inset 0px -3px 6px rgba(0, 0, 0, 0.2), inset 0px 3px 6px rgba(255, 255, 255, 0.5)",
                  }}
                />
              );
            })}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={handleRefreshCandies}
                className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CandyPreview;
