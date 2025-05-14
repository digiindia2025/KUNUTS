"use client";
import React, { useState } from 'react';
import ProgressBar from '../Customize/ProgressBar';
import ColorPicker from '../Customize/ColorPicker';
import CandyPreview from '../Customize/CandyPreview';
import PackageSelector from '../Customize/PackageSelector';
import { StepNavigation } from '../Customize/StepNavigation';
import HoverToolbar from '../Customize/HoverToolbar';

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customText, setCustomText] = useState('');
  const [customImage, setCustomImage] = useState(null);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
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
    setSelectedPackage(null);
    setCustomText('');
    setCustomImage(null);
    setCurrentStep(1);
  };


// ///////////////////////////////////////////////////////////////////
  const [showTextFields, setShowTextFields] = useState(false);
const [firstLine, setFirstLine] = useState('');
const [secondLine, setSecondLine] = useState('');
const [firstLineFont, setFirstLineFont] = useState('Arial');
const [secondLineFont, setSecondLineFont] = useState('Arial');
// ///////////////////////////////////////////////////////////////////


  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 w-full bg-gray-100 p-4 rounded-lg shadow-md h-fit sticky top-20">
              <h3 className="text-xl font-bold mb-4">Select Colors</h3>
              <ColorPicker
                selectedColors={selectedColors}
                onSelectColor={setSelectedColors}
                maxSelections={3}
              />
              {selectedColors.length > 0 && (

        //          <button
        //   onClick={handleNext}
        //   className="mt-6 w-full bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-full hover:bg-yellow-500 transition"
        // >
        //   Skip
        // </button>
                <button
                  onClick={handleNext}
                  className={`mt-6 w-full bg-green-400 text-gray-900 font-semibold py-2 px-4 rounded-full ${selectedColors.length > 0 ? 'bg-candy-orange text-white hover:bg-orange-500' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                  disabled={selectedColors.length === 0}
                >
                  Next Step
                </button>
              )}
            </div>

            <div className="md:w-2/3 w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Preview Your Mix</h3>
              <CandyPreview selectedColors={selectedColors} />
            </div>
          </div>
        );

      case 2:
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Panel */}
      <div className="md:w-1/3 w-full bg-gray-100 p-6 rounded-lg shadow-md h-fit sticky top-20">
        <h3 className="text-xl font-bold mb-4">Design Your Candy</h3>
        <p className="text-sm text-gray-600 mb-6">Create up to 4 designs. Tap each to edit.</p>

        <div className="flex flex-col gap-4">
          {/* Image Option */}
          <button className="flex items-center gap-3 py-2 px-4 bg-white border rounded-lg hover:bg-gray-50 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h4l2 3h7a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
            </svg>
            <span>Image</span>
          </button>

          {/* Text Option */}
          <div className="flex flex-col gap-2">
            <button
              className="flex items-center gap-3 py-2 px-4 bg-white border rounded-lg hover:bg-gray-50 transition"
              onClick={() => setShowTextFields(!showTextFields)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>Text</span>
            </button>

            {showTextFields && (
              <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
                {/* First Line */}
                <div>
                  <label className="text-sm font-medium text-gray-700">First Line</label>
                  <input
                    type="text"
                    value={firstLine}
                    onChange={(e) => setFirstLine(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <select
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                    value={firstLineFont}
                    onChange={(e) => setFirstLineFont(e.target.value)}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div>

                {/* Second Line */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Second Line</label>
                  <input
                    type="text"
                    value={secondLine}
                    onChange={(e) => setSecondLine(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <select
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                    value={secondLineFont}
                    onChange={(e) => setSecondLineFont(e.target.value)}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Clipart Option */}
          <button className="flex items-center gap-3 py-2 px-4 bg-white border rounded-lg hover:bg-gray-50 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m4 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2z" />
            </svg>
            <span>Clipart</span>
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleNext}
          className="mt-6 w-full bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-full hover:bg-yellow-500 transition"
        >
          Skip
        </button>
      </div>

       <div className="md:w-2/3 w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Preview Your Mix</h3>
              <CandyPreview selectedColors={selectedColors} />
            </div>
          </div>
        );


      case 3:
        return (
          <div>
            <PackageSelector
              selectedPackage={selectedPackage}
              onSelectPackage={setSelectedPackage}
            />
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Colors Selected:</span>
                <span>{selectedColors.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Packaging:</span>
                <span>{selectedPackage || 'None selected'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-300">
                <span>Estimated Total:</span>
                <span>${selectedPackage ? '19.99' : '0.00'}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-gray-800">
            Customize Your Candy
          </h1>
          <p className="text-center text-gray-600 text-lg mb-8">
            Create a unique candy mix with your favorite colors and messages
          </p>

          <div className="bg-white rounded-xl shadow-md p-6">
            <ProgressBar currentStep={currentStep} />
            <div className="mt-8">{renderCurrentStep()}</div>

            {currentStep !== 1 && (
              <StepNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}
          </div>
        </div>
      </main>

      {selectedColors.length > 0 && (
        <div className="fixed bottom-4 right-4 z-10 bg-white shadow-md p-4 rounded-lg">
          <HoverToolbar onReset={handleReset} />
        </div>
      )}
    </div>
  );
};

export default Page;
