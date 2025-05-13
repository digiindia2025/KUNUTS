'use client';
import React, { useState } from 'react';
// import Header from '../components/Header';
import ProgressBar from '../Customize/ProgressBar';
import ColorPicker from '../Customize/ColorPicker';
import CandyPreview from '../Customize/CandyPreview';
import StepNavigation from '../Customize/StepNavigation';
import HoverToolbar from '../Customize/HoverToolbar';

const MAX_COLOR_SELECTIONS = 5;

const Customize = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const colorOptions = [
    { name: 'Yellow', hex: '#F9D71C', id: 'yellow' },
    { name: 'Pink', hex: '#F5A3C7', id: 'pink' },
    { name: 'Light Blue', hex: '#A3E0F5', id: 'lightBlue' },
    { name: 'Blue', hex: '#1E88E5', id: 'blue' },
    { name: 'Light Purple', hex: '#D1C4E9', id: 'lightPurple' },
    { name: 'Dark Pink', hex: '#E91E63', id: 'darkPink' },
    { name: 'White', hex: '#FFFFFF', id: 'white' },
    { name: 'Dark Green', hex: '#2E7D32', id: 'darkGreen' },
    { name: 'Orange', hex: '#FF9800', id: 'orange' },
    { name: 'Red', hex: '#FF5252', id: 'red' },
    { name: 'Brown', hex: '#795548', id: 'brown' },
    { name: 'Cream', hex: '#FFF8E1', id: 'cream' },
  ];

  const handleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else if (selectedColors.length < MAX_COLOR_SELECTIONS) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit or finalize order
      alert("Thank you for your order! This would proceed to checkout in a real app.");
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleReset = () => {
    setSelectedColors([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <HoverToolbar onReset={handleReset} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              customize your candy
            </h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 flex items-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mr-1">
                  <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </button>
            </div>
          </div>
          
          {/* Step Progress */}
          <div className="mb-8 relative">
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="ml-2 text-sm font-medium text-green-500">Colors</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="ml-2 text-sm font-medium text-green-500">Design</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">Packaging</span>
              </div>
            </div>
            <div className="h-1 bg-gray-200 rounded-full mt-2">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">choose up to three colors</h2>
                <p className="text-gray-600 mb-6">Looking for something specific? Contact us for custom color options.</p>
                
                <div className="grid grid-cols-4 gap-4">
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelection(color)}
                      className={`relative flex flex-col items-center p-2 rounded-lg transition-all ${
                        selectedColors.includes(color) ? 'ring-2 ring-yellow-400' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div 
                        className="w-12 h-12 rounded-full mb-2 border border-gray-200"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <span className="text-xs text-center font-medium">{color.name}</span>
                      {selectedColors.includes(color) && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Your selection ({selectedColors.length}/{MAX_COLOR_SELECTIONS})</h3>
                    {selectedColors.length > 0 && (
                      <button 
                        onClick={handleReset}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    {[...Array(MAX_COLOR_SELECTIONS)].map((_, index) => (
                      <div 
                        key={index}
                        className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                      >
                        {selectedColors[index] ? (
                          <div 
                            className="w-full h-full rounded-full"
                            style={{ backgroundColor: selectedColors[index].hex }}
                          ></div>
                        ) : (
                          <span className="text-gray-400 text-sm">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Preview Your Mix</h3>
                <CandyPreview selectedColors={selectedColors} />
                
                <div className="mt-8">
                  <button 
                    className={`w-full py-3 rounded-full font-medium ${
                      selectedColors.length > 0 
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={selectedColors.length === 0}
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;
