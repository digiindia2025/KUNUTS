"use client";
import React, { useState } from "react";
import ProgressBar from "../Customize/ProgressBar";
import ColorPicker from "../Customize/ColorPicker";
import CandyPreview from "../Customize/CandyPreview";
import PackageSelector from "../Customize/PackageSelector";
import { StepNavigation } from "../Customize/StepNavigation";
import HoverToolbar from "../Customize/HoverToolbar";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customText, setCustomText] = useState("");
  const [customImage, setCustomImage] = useState(null);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      alert(
        "Thank you for your order! This would proceed to checkout in a real app."
      );
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
    setCustomText("");
    setCustomImage(null);
    setCurrentStep(1);
  };

  // ///////////////////////////////////////////////////////////////////
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [firstLineFont, setFirstLineFont] = useState("Arial");
  const [secondLineFont, setSecondLineFont] = useState("Arial");
  const [selectedFontStyle, setSelectedFontStyle] = useState("Bold");
  const [showTextFields, setShowTextFields] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const fileInputRef = React.useRef(null);

  // ///////////////////////////3////////////////////////////////////////

  const [showClipartPanel, setShowClipartPanel] = useState(false);

  const handleClipartClick = () => {
    setShowClipartPanel((prev) => !prev); // Toggle state
  };

  // ///////////////////////////////////////////////////////////////////
  const fontStyles = [
    "Bold",
    "Regular",
    "Light",
    "Script",
    "Italic",
    "Monospace",
  ];

  // Handle file input change and preview image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    if (agreeTerms) {
      fileInputRef.current.click(); // trigger file selector
    }
  };

  // Handle upload button click

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
                  className={`mt-6 w-full bg-green-400 text-gray-900 font-semibold py-2 px-4 rounded-full ${
                    selectedColors.length > 0
                      ? "bg-candy-orange text-white hover:bg-orange-500"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={selectedColors.length === 0}
                >
                  Next Step
                </button>
              )}
            </div>

            <div className="md:w-2/3 w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Preview Your Mix
              </h3>
              <CandyPreview selectedColors={selectedColors} />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Panel */}
            <div className="md:w-1/3 w-full bg-gray-100 p-6 rounded-lg shadow-md h-fit sticky top-20">
              <h3 className="text-xl font-bold mb-4 text-center">
                Design Your Candy
              </h3>

              <div className="flex flex-col gap-4">
                {/* Image Option Button */}
                <button
                  className="flex flex-col items-center gap-2 p-4"
                  onClick={() => setShowForm(!showForm)}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
                    {/* SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      className="w-8 h-8"
                    >
                      <style>{`.cls-1{fill:#0072ff}`}</style>
                      <g data-name="Layer 2">
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
                  <span className="text-sm font-medium text-gray-700">
                    Image
                  </span>
                </button>

                {showForm && (
                  <div className="mt-0 p-2 border rounded-lg shadow bg-white w-full">
                    <h4 className="text-lg font-bold mb-4 text-center">
                      Choose an Image
                    </h4>
                    <h6 className="text-sm text-gray-600 mb-2 text-center">
                      first image upload is FREE.
                    </h6>
                    <h6 className="text-sm text-gray-600 mb-2 text-center">
                      Additional images are $1.00 each.
                    </h6>

                    {/* 👇 Add this new section below the line above */}
                    <div className="mt-4">
                      <div className="flex justify-center items-center space-x-4 mb-6">
                        <img
                          src="/images/convert.jpeg"
                          className="rounded-full w-60 h-30 object-cover"
                          alt="original"
                        />
                      </div>
                      <p className="text-sm text-center text-gray-700 mb-2">
                        Your image will be printed black
                      </p>

                      <h5 className="text-base font-semibold mb-2">
                        For best results
                      </h5>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                          <img
                            src="/images/print.png"
                            className="rounded-full border"
                            alt="1-2 faces"
                          />
                          <p className="mt-2 text-sm text-center">1-2 faces</p>
                          <span className="text-green-500 text-xl">✔️</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <img
                            src="/images/print1.png"
                            className="rounded-full border"
                            alt="Face forward"
                          />
                          <p className="mt-2 text-sm text-center">
                            Face forward
                          </p>
                          <span className="text-green-500 text-xl">✔️</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <img
                            src="/images/print2.png"
                            className="rounded-full border"
                            alt="Crop to face only"
                          />
                          <p className="mt-2 text-sm text-center">
                            Crop to show face only
                          </p>
                          <span className="text-green-500 text-xl">✔️</span>
                        </div>
                      </div>
                    </div>
                    {/* 👆 End of new section */}

                    {/* Preview Selected Image */}
                    {/* Preview Selected Image */}
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="mb-4 max-w-full max-h-48 object-contain rounded"
                      />
                    )}

                    <div className="mb-6">
                      <h6 className="text-sm text-gray-600 font-bold mb-2">
                        Image Requirements
                      </h6>
                      <ul className="mt-4 list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>
                          Upload a high-quality <strong>.jpg</strong>,{" "}
                          <strong>.png</strong>, or <strong>.jpeg</strong> file
                          (max 15MB).
                        </li>
                        <li>
                          Background will be removed; photo will be printed in
                          black.
                        </li>
                        <li>Only 1–2 faces cheek to cheek are allowed.</li>
                        <li>
                          Crop close to faces for best results — arms, legs, and
                          body will not be included.
                        </li>
                        <li>
                          No copyrighted or trademarked images/logos unless
                          legal permission is provided.
                        </li>
                        <li>
                          For logo printing questions, please contact our
                          Business Consultants directly.
                        </li>
                        <li>
                          First image upload is <strong>FREE</strong>.
                        </li>
                        <li>
                          Add a second image for <strong>$4.99</strong>.
                        </li>
                        <li>
                          Accepted file types: <code>.jpg</code>,{" "}
                          <code>.jpeg</code>, <code>.png</code>.
                        </li>
                        <li>
                          Ensure your image is well-lit and faces are clearly
                          visible for optimal quality.
                        </li>
                      </ul>
                    </div>

                    {/* Agreement Checkbox */}
                    <label
                      htmlFor="image-upload"
                      className="flex items-center space-x-2 text-sm"
                    >
                      <input
                        id="image-upload"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <span>
                        I have read, understand and agree to the Terms &
                        Conditions
                      </span>
                    </label>

                    <div className="mt-4 flex justify-between">
                      {/* Buttons */}

                      <div className="mt-4 flex justify-between items-center gap-4">
                        <button
                          className="px-4 py-2 bg-gray-200 rounded"
                          onClick={() => {
                            setSelectedImage(null);
                            setAgreeTerms(false);
                          }}
                        >
                          Back
                        </button>

                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        <button
                          className={`px-6 py-2 rounded text-white transition-colors duration-200 ${
                            agreeTerms
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-blue-300 cursor-not-allowed"
                          }`}
                          onClick={handleUploadClick}
                          disabled={!agreeTerms}
                        >
                          Upload Image
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/*///////////////// Text Option ////////////////////////////////*/}

                <div className="flex flex-col gap-2">
                  <button
                    className="flex flex-col items-center gap-2 p-4"
                    onClick={() => setShowTextFields(!showTextFields)}
                  >
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
                      {/* Text SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 6.827 6.827"
                        className="w-6 h-6"
                      >
                        <style>{`.fil0{fill:none}`}</style>
                        <path className="fil0" d="M0 0h6.827v6.827H0z" />
                        <path className="fil0" d="M.853.853h5.12v5.12H.853z" />
                        <path
                          d="M5.382 3.794a2.66 2.66 0 0 1-.595.139c-.15.02-.257.045-.318.072a.31.31 0 0 0-.195.292c0 .098.037.179.11.244.074.064.181.096.323.096.14 0 .266-.03.375-.092a.57.57 0 0 0 .242-.252.876.876 0 0 0 .058-.365v-.134z"
                          fill="#5f5f5f"
                        />
                        <path
                          d="M1.817 3.654h1.008l-.31-.822a8.099 8.099 0 0 1-.21-.616c-.039.19-.092.38-.161.567l-.327.871zM.96 4.874l1.141-2.97h.424l1.216 2.97h-.448l-.347-.9H1.704l-.326.9H.96z"
                          fill="#727272"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Text
                    </span>
                  </button>

                  {showTextFields && (
                    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
                      {/* Text Inputs */}
                      <div>
                        <input
                          type="text"
                          value={firstLine}
                          placeholder="Type The First Line"
                          onChange={(e) => setFirstLine(e.target.value)}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-full"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={secondLine}
                          placeholder="Type The Second Line"
                          onChange={(e) => setSecondLine(e.target.value)}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-full"
                        />
                      </div>

                      {/* Font Styles */}
                      <div>
                        <p className="text-center text-sm font-medium text-gray-700 mt-4 mb-2">
                          Choose a font style:
                        </p>
                        <div className="grid grid-cols-2 gap-4 justify-items-center">
                          {fontStyles.map((style) => (
                            <button
                              key={style}
                              onClick={() => setSelectedFontStyle(style)}
                              className={`w-20 h-20 flex items-center justify-center rounded-full border-2 transition ${
                                selectedFontStyle === style
                                  ? "border-green-500 text-black font-bold"
                                  : "border-gray-200 text-gray-500"
                              } font-${style.toLowerCase()}`}
                            >
                              {style === "Script" ? (
                                <span className="italic font-serif">
                                  {style}
                                </span>
                              ) : (
                                style
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center mt-6">
                        <button className="px-6 py-2 rounded-full border border-brown-700 text-brown-700 font-bold">
                          Back
                        </button>
                        <button
                          className={`px-6 py-2 rounded-full font-bold transition-colors duration-200 ${
                            firstLine && secondLine && selectedFontStyle
                              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                              : "bg-gray-300 text-white cursor-not-allowed"
                          }`}
                          disabled={
                            !(firstLine && secondLine && selectedFontStyle)
                          }
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* ///////////////////////////////////////////////////////////////////////// */}
                {/* Clipart Option */}

                <button
                  className="flex flex-col items-center gap-2 p-4"
                  onClick={handleClipartClick}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
                    <span className="text-lg font-bold text-blue-600">🎨</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Clipart
                  </span>
                </button>

                {/* Clipart Panel */}
                {showClipartPanel && (
                  <div className="mt-6 p-4 border rounded-md shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold mb-4">Choose Clipart</h2>
                      <button
                        onClick={handleClipartClick}
                        className="text-gray-500 hover:text-black text-xl font-bold"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 border rounded-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        Select category
                      </label>
                      <select className="w-full p-2 border rounded-full mt-1">
                        <option>Graduation</option>
                        <option>Birthday</option>
                        <option>Wedding</option>
                        <option>Holiday</option>
                        <option>Custom</option>
                        <option>Anniversary</option>
                        <option>Baby Shower</option>
                        <option>Sports</option>
                        <option>Other</option>
                       
                      </select>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                     
                      <img
                        src="/images/cliparts1.avif"
                        alt="Graduation Cap"
                        className="w-16 h-16"
                      />
                      <img    
                        src="/images/cliparts2.avif"
                        alt="Class of 2024"
                        className="w-16 h-16"
                      />
                      <img
                        src="/images/cliparts3.avif"
                        alt="Class of 2025"
                        className="w-16 h-16"
                      />
                      <img
                        src="/images/cliparts4.avif"
                        alt="Class of 2026"
                        className="w-16 h-16" 
                      />
                      <img
                        src="/images/cliparts5.avif"
                        alt="Class of 2027"
                        className="w-16 h-16" 
                      />
                      <img
                        src="/images/cliparts6.avif"
                        alt="Class of 2028"
                        className="w-16 h-16"
                      />
                      <img
                        src="/images/cliparts7.avif"
                        alt="Class of 2029"
                        className="w-16 h-16"
                      />
                      <img
                        src="/images/cliparts8.avif"
                        alt="Class of 2030"
                        className="w-16 h-16"
                      />
                      <img
                        src="/images/cliparts9.avif"
                        alt="Class of 2031"
                        className="w-16 h-16" 
                      />
                      <img
                        src="/images/cliparts10.avif"
                        alt="Class of 2032"
                        className="w-16 h-16" 
                      />
                      <img
                        src="/images/cliparts11.avif"
                        alt="Class of 2033"
                        className="w-16 h-16" 
                      />
                      <img
                        src="/images/cliparts12.avif"
                        alt="Class of 2034"
                        className="w-16 h-16" 
                      />
                      <img
                        src="/images/cliparts13.avif"
                        alt="Class of 2035"
                        className="w-16 h-16" 
                      />
                      <img
                        src="/images/cliparts14.avif"
                        alt="Class of 2036"
                        className="w-16 h-16"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* //////////////////////////////////////////////////////////////////////// */}

            <div className="md:w-2/3 w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Preview Your Mix
              </h3>
              <CandyPreview selectedColors={selectedColors} />
            </div>
          </div>
        );

      // /////////////////////////////////3///////////////////////

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
                <span>{selectedPackage || "None selected"}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-300">
                <span>Estimated Total:</span>
                <span>${selectedPackage ? "19.99" : "0.00"}</span>
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
