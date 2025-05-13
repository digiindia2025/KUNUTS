
"use client";

import React, { useEffect, useState } from 'react';
import { toast } from "sonner";

const CandyPreview = ({ selectedColors }) => {
  const [candies, setCandies] = useState([]);
  const [customText, setCustomText] = useState('');
  
  // Get the color values from the keys
  const getColorValue = (key) => {
    const colorMap = {
      yellow: '#FFCC00',
      pink: '#FF99CC',
      lightBlue: '#99CCFF',
      green: '#66CC66',
      orange: '#FF9933',
      purple: '#CC99CC',
      red: '#FF6666',
      brown: '#8B4513',
      blue: '#1E88E5',
      white: '#FFFFFF',
      peach: '#FFDAB9',
      cream: '#FFF8E1',
      darkPink: '#E91E63',
      darkGreen: '#2E7D32',
      darkYellow: '#FFC107',
      aqua: '#00BCD4',
      platinum: '#E5E5E5',
      lightPurple: '#D1C4E9',
      pearl: '#F5F5F5',
      gray: '#CCCCCC'
    };
    return colorMap[key] || '#CCCCCC';
  };
  
  useEffect(() => {
    // Create a random arrangement of candies based on selected colors
    const generateCandies = () => {
      if (selectedColors.length === 0) return [];
      
      const newCandies = [];
      const count = 40; // Number of candies to generate
      const predefinedTexts = ['hello', 'Love', 'Joy', 'Happy\nMother\'s\nDay!'];
      
      for (let i = 0; i < count; i++) {
        // Choose a random color from selected colors
        const colorKey = selectedColors[Math.floor(Math.random() * selectedColors.length)].id;
        const colorValue = getColorValue(colorKey);
        
        // Random position within the container
        const x = 10 + Math.random() * 80; // 10-90% of width
        const y = 10 + Math.random() * 80; // 10-90% of height
        
        // Consistent size for all candies (32-36px)
        const size = 32 + Math.random() * 4;
        
        // Random z-index for layering
        const zIndex = Math.floor(Math.random() * 10);
        
        // Random rotation
        const rotation = Math.random() * 360;
        
        // Randomly assign text to some candies
        let text = '';
        if (i % 5 === 0) {
          text = predefinedTexts[Math.floor(Math.random() * predefinedTexts.length)];
        } else if (i % 13 === 0 && customText) {
          text = customText;
        }
        
        newCandies.push({
          id: i,
          colorKey,
          colorValue,
          x,
          y,
          size,
          zIndex,
          rotation,
          text
        });
      }
      
      return newCandies;
    };
    
    setCandies(generateCandies());
  }, [selectedColors, customText]);

  const handleRefreshCandies = () => {
    setCandies(prev => {
      // Create new arrangement with same colors
      return prev.map(candy => ({
        ...candy,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        rotation: Math.random() * 360,
      }));
    });
    toast.success("Preview refreshed!");
  };
  
  const handleTextChange = (e) => {
    setCustomText(e.target.value);
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        {selectedColors.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Select colors to see your candy mix preview</p>
          </div>
        ) : (
          <>
            {candies.map((candy) => (
              <div
                key={candy.id}
                className="absolute rounded-full shadow-md flex items-center justify-center"
                style={{
                  backgroundColor: candy.colorValue,
                  width: `${candy.size}px`,
                  height: `${candy.size}px`,
                  left: `${candy.x}%`,
                  top: `${candy.y}%`,
                  zIndex: candy.zIndex,
                  transform: `rotate(${candy.rotation}deg)`,
                  transition: 'all 0.3s ease'
                }}
              >
                {candy.text && (
                  <span className="text-[8px] font-bold text-black whitespace-pre-line text-center">
                    {candy.text}
                  </span>
                )}
              </div>
            ))}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                onClick={handleRefreshCandies}
                className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-full">
          <label htmlFor="customText" className="block text-sm font-medium text-gray-700 mb-1">
            Add Custom Text
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="customText"
              value={customText}
              onChange={handleTextChange}
              placeholder="Enter text for candy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              maxLength={12}
            />
            <button 
              onClick={() => {
                if (customText) {
                  setCustomText('');
                  toast.info("Custom text cleared");
                }
              }}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Text will appear on some candies (max 12 characters)</p>
        </div>
      </div>
    </div>
  );
};

export default CandyPreview;
