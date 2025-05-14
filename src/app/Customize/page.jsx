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
  const [firstLine, setFirstLine] = useState('');
  const [secondLine, setSecondLine] = useState('');
  const [firstLineFont, setFirstLineFont] = useState('Arial');
  const [secondLineFont, setSecondLineFont] = useState('Arial');
  const [selectedFontStyle, setSelectedFontStyle] = useState('Bold');
  const [showTextFields, setShowTextFields] = useState(false);
// ///////////////////////////////////////////////////////////////////
 const fontStyles = ['Bold', 'Regular', 'Light', 'Script'];

  // Removed duplicate handleNext function

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
        {/* <p className="text-sm text-gray-600 mb-6">Create up to 4 designs. Tap each to edit.</p> */}

        <div className="flex flex-col gap-4">
          {/* Image Option */}
       <button className="flex flex-col items-center gap-2 p-4 bg-white border rounded-lg hover:bg-gray-50 transition">
  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-8 h-8"
    >
      <defs>
        <style>{`.cls-1{fill:#0072ff}`}</style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <path
          className="cls-1"
          d="M39.87 48H18a2 2 0 1 0 0 4h23.21A10.79 10.79 0 0 0 52 41.21V17.9a2 2 0 0 0-2.34-2A2.08 2.08 0 0 0 48 18v21.87A8.13 8.13 0 0 1 39.87 48z"
        />
        <path
          className="cls-1"
          d="M43.71 56H30a2 2 0 1 0 0 4h14.56A15.43 15.43 0 0 0 60 44.56V42a2 2 0 0 0-2.34-2A2.08 2.08 0 0 0 56 42.11v1.6A12.29 12.29 0 0 1 43.71 56zM12.24 44h23.52A8.24 8.24 0 0 0 44 35.76V12.24A8.24 8.24 0 0 0 35.76 4H12.24A8.24 8.24 0 0 0 4 12.24v23.52A8.24 8.24 0 0 0 12.24 44zM24 12a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm-8.18 13.61a1.51 1.51 0 0 1 1.82.09 10 10 0 0 0 12.73 0 1.51 1.51 0 0 1 1.82-.09 8.89 8.89 0 0 1 3.81 7.3A3.09 3.09 0 0 1 32.91 36H15.09A3.09 3.09 0 0 1 12 32.91a8.89 8.89 0 0 1 3.82-7.3zM58 24a2 2 0 0 0-2 2v8a2 2 0 0 0 4 0v-8a2 2 0 0 0-2-2z"
        />
      </g>
    </svg>
  </div>
  <span className="text-sm font-medium text-gray-700">Image</span>
</button>

          {/* Text Option */}
          <div className="flex flex-col gap-2">
           <button
  className="flex flex-col items-center gap-2 p-4 bg-white border rounded-lg hover:bg-gray-50 transition"
  onClick={() => setShowTextFields(!showTextFields)}
>
  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="24"
      height="24"
      viewBox="0 0 6.827 6.827"
      className="w-6 h-6"
    >
      <defs>
        <style>{`.fil0{fill:none}`}</style>
      </defs>
      <g id="Layer_x0020_1">
        <g id="_494673176">
          <path id="_494673440" className="fil0" d="M0 0h6.827v6.827H0z" />
          <path id="_494673128" className="fil0" d="M.853.853h5.12v5.12H.853z" />
        </g>
        <path
          d="M5.382 3.794a2.66 2.66 0 0 1-.595.139c-.15.02-.257.045-.318.072a.31.31 0 0 0-.195.292c0 .098.037.179.11.244.074.064.181.096.323.096.14 0 .266-.03.375-.092a.57.57 0 0 0 .242-.252.876.876 0 0 0 .058-.365v-.134zm.03.815a1.383 1.383 0 0 1-.39.244c-.124.047-.259.07-.402.07-.236 0-.418-.057-.545-.173a.574.574 0 0 1-.19-.443.593.593 0 0 1 .26-.499.893.893 0 0 1 .263-.119 2.58 2.58 0 0 1 .323-.055c.295-.035.512-.076.651-.126l.003-.094c0-.149-.035-.254-.104-.314-.093-.083-.232-.124-.415-.124-.172 0-.298.03-.38.09-.082.06-.143.166-.182.32l-.356-.05a.886.886 0 0 1 .16-.37.699.699 0 0 1 .322-.216c.14-.05.303-.077.488-.077.184 0 .333.023.448.066.115.043.2.097.254.163a.58.58 0 0 1 .113.248c.012.062.018.174.018.336v.487c0 .34.008.554.024.643a.81.81 0 0 0 .092.259h-.381a.771.771 0 0 1-.073-.266z"
          style={{ fill: "#5f5f5f", fillRule: "nonzero" }}
        />
        <path
          d="M1.817 3.654h1.008l-.31-.822a8.099 8.099 0 0 1-.21-.616c-.039.19-.092.38-.161.567l-.327.871zM.96 4.874l1.141-2.97h.424l1.216 2.97h-.448l-.347-.9H1.704l-.326.9H.96z"
          style={{ fill: "#727272", fillRule: "nonzero" }}
        />
      </g>
    </svg>
  </div>
  <span className="text-sm font-medium text-gray-700">Text</span>
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
                  {/* <select
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                    value={firstLineFont}
                    onChange={(e) => setFirstLineFont(e.target.value)}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                  </select> */}
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
                  {/* <select
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                    value={secondLineFont}
                    onChange={(e) => setSecondLineFont(e.target.value)}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                  </select> */}
                </div>

                {/* Font Style Buttons */}
                <div>
                  <p className="text-center text-sm font-medium text-gray-700 mt-4 mb-2">Choose a font style:</p>
                  <div className="grid grid-cols-2 gap-4 justify-items-center">
                    {fontStyles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setSelectedFontStyle(style)}
                        className={`w-20 h-20 flex items-center justify-center rounded-full border-2 transition font-${style.toLowerCase()} ${
                          selectedFontStyle === style ? 'border-green-500 text-black font-bold' : 'border-gray-200 text-gray-500'
                        }`}
                      >
                        {style === 'Script' ? <span className="italic font-serif">{style}</span> : style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Back & Confirm Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <button className="px-6 py-2 rounded-full border border-brown-700 text-brown-700 font-bold">back</button>
                  <button className="px-6 py-2 rounded-full bg-gray-300 text-white font-bold cursor-not-allowed">confirm</button>
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
