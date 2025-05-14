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
                <button
                  onClick={handleNext}
                  className={`mt-6 w-full py-2 px-4 rounded-lg transition ${selectedColors.length > 0 ? 'bg-candy-orange text-white hover:bg-orange-500' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
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
            <div className="md:w-1/3 w-full bg-gray-100 p-4 rounded-lg shadow-md h-fit sticky top-20">
              <h3 className="text-xl font-bold mb-4">Add Customizations</h3>

              <label className="block mb-2 font-medium text-gray-700">Write Text</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your message"
                className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
              />

              <label className="block mb-2 font-medium text-gray-700">Add Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setCustomImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full mb-4"
              />

              <button
                onClick={handleNext}
                className="mt-4 w-full bg-candy-orange text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition"
              >
                Next Step
              </button>
            </div>

            <div className="md:w-2/3 w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Preview Your Candy</h3>
              <CandyPreview
                selectedColors={selectedColors}
                customText={customText}
                customImage={customImage}
              />
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
