"use client";
import React from 'react';

const ColorPicker = ({ selectedColors, onSelectColor, maxSelections = 3 }) => {
  const colorOptions = [
    { name: 'Yellow', value: '#FFCC00', key: 'yellow' },
    { name: 'Pink', value: '#FF99CC', key: 'pink' },
    { name: 'Light Blue', value: '#99CCFF', key: 'lightBlue' },
    { name: 'Green', value: '#66CC66', key: 'green' },
    { name: 'Orange', value: '#FF9933', key: 'orange' },
    { name: 'Purple', value: '#CC99CC', key: 'purple' },
    { name: 'Red', value: '#FF6666', key: 'red' },
    { name: 'Brown', value: '#8B4513', key: 'brown' },
    { name: 'Peach', value: '#FFDAB9', key: 'peach' },
    { name: 'Gray', value: '#CCCCCC', key: 'gray' }
  ];

  const isSelected = (color) => {
    return selectedColors.includes(color.key);
  };

  const canSelect = (color) => {
    return isSelected(color) || selectedColors.length < maxSelections;
  };

  const handleColorClick = (color) => {
    if (isSelected(color)) {
      onSelectColor(selectedColors.filter(c => c !== color.key));
    } else if (canSelect(color)) {
      onSelectColor([...selectedColors, color.key]);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">choose up to {maxSelections} colors</h2>
      <p className="text-gray-600 mb-6">personalize your special candy mix with your favorite colors</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colorOptions.map((color) => (
          <div key={color.key} className="flex flex-col items-center">
            <button
              onClick={() => handleColorClick(color)}
              disabled={!canSelect(color) && !isSelected(color)}
              className={`w-16 h-16 rounded-full transition-all duration-300 ${
                isSelected(color) 
                  ? 'ring-4 ring-black scale-110' 
                  : canSelect(color)
                    ? 'hover:scale-105 hover:shadow-lg'
                    : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name}`}
            >
              {isSelected(color) && (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-white text-2xl">✓</span>
                </div>
              )}
            </button>
            <span className="mt-2 text-sm font-medium text-gray-700">{color.name}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="font-medium">Selected colors: {selectedColors.length}/{maxSelections}</p>
        <div className="flex mt-2 space-x-2">
          {selectedColors.map((colorKey) => {
            const color = colorOptions.find(c => c.key === colorKey);
            return (
              <div 
                key={colorKey}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color ? color.value : '#000' }}
              ></div>
            );
          })}
          {Array(maxSelections - selectedColors.length).fill(0).map((_, i) => (
            <div 
              key={i}
              className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
