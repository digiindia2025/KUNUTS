
import React, { useState, useRef, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageIcon, TypeIcon, Palette, MoveHorizontal, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DesignOptions = ({ 
  onImageSelect, 
  onTextChange, 
  onFontStyleChange,
  firstLine,
  secondLine,
  selectedFontStyle,
  selectedImage
}) => {
  const [showTextFields, setShowTextFields] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showClipartPanel, setShowClipartPanel] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const [tempFirstLine, setTempFirstLine] = useState(firstLine);
  const [tempSecondLine, setTempSecondLine] = useState(secondLine);
  const [tempFontStyle, setTempFontStyle] = useState(selectedFontStyle);
  
  // Image editing state
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [editingImage, setEditingImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageZoom, setImageZoom] = useState(100); // Range 50-150
  const [imageRotation, setImageRotation] = useState(0); // Range 0-360
  
  // Selected design option (radio button)
  const [selectedOption, setSelectedOption] = useState("none"); // none, image, text, clipart

  const fontStyles = [
    "Bold",
    "Regular",
    "Light",
    "Script",
    "Italic",
    "Monospace",
  ];

  // Sample cliparts
  const allCliparts = [
    { src: 'https://via.placeholder.com/100?text=Graduation', alt: 'Graduation Cap', category: 'Graduation' },
    { src: 'https://via.placeholder.com/100?text=2024', alt: 'Class of 2024', category: 'Graduation' },
    { src: 'https://via.placeholder.com/100?text=Star', alt: 'Star', category: 'Birthday' },
    { src: 'https://via.placeholder.com/100?text=Heart', alt: 'Heart', category: 'Wedding' },
    { src: 'https://via.placeholder.com/100?text=Tree', alt: 'Tree', category: 'Holiday' },
    { src: 'https://via.placeholder.com/100?text=Cake', alt: 'Cake', category: 'Birthday' },
    { src: 'https://via.placeholder.com/100?text=Ring', alt: 'Wedding Ring', category: 'Wedding' },
    { src: 'https://via.placeholder.com/100?text=Gift', alt: 'Gift Box', category: 'Holiday' },
  ];

  const filteredCliparts = allCliparts.filter(
    clipart =>
      (selectedCategory === 'All' || clipart.category === selectedCategory) &&
      clipart.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setEditingImage(imageUrl);
        setShowImageEditor(true);
        setShowImageUpload(false);
        // Reset image transformation values
        setImagePosition({ x: 0, y: 0 });
        setImageZoom(100);
        setImageRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (agreeTerms) {
      fileInputRef.current.click();
    }
  };

  const handleTextConfirm = () => {
    onTextChange(tempFirstLine, tempSecondLine);
    onFontStyleChange(tempFontStyle);
    setShowTextFields(false);
  };

  const handleClipartSelect = (src) => {
    onImageSelect(src);
    setShowClipartPanel(false);
    setSelectedOption("clipart"); // Update selected option
  };
  
  // Handle option selection
  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    
    // Reset all panels
    setShowTextFields(false);
    setShowImageUpload(false);
    setShowClipartPanel(false);
    setShowImageEditor(false);
    
    // Open the corresponding panel
    if (value === "image") {
      setShowImageUpload(true);
    } else if (value === "text") {
      setShowTextFields(true);
    } else if (value === "clipart") {
      setShowClipartPanel(true);
    }
  };

  // Mouse event handlers for image dragging
  const handleMouseDown = (e) => {
    if (imageRef.current) {
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX - imagePosition.x, 
        y: e.clientY - imagePosition.y 
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const container = containerRef.current;
    if (!container || !imageRef.current) return;

    const containerRect = container.getBoundingClientRect();
    
    // Calculate new position relative to the container
    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;

    // Limit the drag area to the container boundaries
    const imageRect = imageRef.current.getBoundingClientRect();
    const maxX = containerRect.width - imageRect.width;
    const maxY = containerRect.height - imageRect.height;
    
    newX = Math.max(-maxX/2, Math.min(newX, maxX/2));
    newY = Math.max(-maxY/2, Math.min(newY, maxY/2));
    
    setImagePosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add mouse event listeners when dragging is active
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleImageConfirm = () => {
    // Pass the edited image with transformation data
    onImageSelect({
      src: editingImage,
      position: imagePosition,
      zoom: imageZoom,
      rotation: imageRotation
    });
    setShowImageEditor(false);
    toast.success("Image has been added to your candy design!");
    setSelectedOption("image"); // Update selected option
  };

  const handleResetImageEdits = () => {
    setImagePosition({ x: 0, y: 0 });
    setImageZoom(100);
    setImageRotation(0);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Design Your Candy</h2>
      <p className="text-gray-600 mb-8 text-center">Choose your design option below</p>
      
      {/* Design options as radio group */}
      <RadioGroup value={selectedOption} onValueChange={handleOptionSelect} className="flex flex-col space-y-5">
        {/* Image Option */}
        <div className={`flex items-center space-x-3 p-3 rounded-lg ${selectedOption === "image" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}>
          <RadioGroupItem value="image" id="option-image" />
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleOptionSelect("image")}>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <label htmlFor="option-image" className="text-lg font-semibold cursor-pointer">Image</label>
              <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
              {selectedImage && <p className="text-xs text-gray-500 mt-1">Image selected</p>}
            </div>
          </div>
        </div>
        
        {/* Text Option */}
        <div className={`flex items-center space-x-3 p-3 rounded-lg ${selectedOption === "text" ? "bg-orange-50 border border-orange-200" : "hover:bg-gray-50"}`}>
          <RadioGroupItem value="text" id="option-text" />
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleOptionSelect("text")}>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-500">Aa</span>
            </div>
            <div>
              <label htmlFor="option-text" className="text-lg font-semibold cursor-pointer">Text</label>
              <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
              {(firstLine || secondLine) && <p className="text-xs text-gray-500 mt-1">Text added</p>}
            </div>
          </div>
        </div>
        
        {/* Clipart Option */}
        <div className={`flex items-center space-x-3 p-3 rounded-lg ${selectedOption === "clipart" ? "bg-green-50 border border-green-200" : "hover:bg-gray-50"}`}>
          <RadioGroupItem value="clipart" id="option-clipart" />
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleOptionSelect("clipart")}>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Palette className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <label htmlFor="option-clipart" className="text-lg font-semibold cursor-pointer">Clipart</label>
              <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
            </div>
          </div>
        </div>
        
        {/* Option for additional image - shown as an example from the reference */}
        <div className="mt-2 text-center">
          <span className="text-gray-500 text-sm">+$4.99 for another image</span>
        </div>
      </RadioGroup>
      
      {/* Text Fields Panel */}
      {showTextFields && (
        <div className="mt-6 p-4 border rounded-md shadow-md">
          <h4 className="text-lg font-bold mb-4">Add Your Text</h4>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstLine" className="block text-sm font-medium text-gray-700 mb-1">First Line</label>
              <input
                type="text"
                id="firstLine"
                value={tempFirstLine}
                onChange={(e) => setTempFirstLine(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type first line"
              />
            </div>
            
            <div>
              <label htmlFor="secondLine" className="block text-sm font-medium text-gray-700 mb-1">Second Line</label>
              <input
                type="text"
                id="secondLine"
                value={tempSecondLine}
                onChange={(e) => setTempSecondLine(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type second line"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
              <div className="grid grid-cols-3 gap-2">
                {fontStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setTempFontStyle(style)}
                    className={`px-3 py-2 text-sm ${
                      tempFontStyle === style
                        ? "bg-yellow-100 border-yellow-500 border-2"
                        : "bg-gray-100"
                    } rounded-md transition-colors`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleTextConfirm}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Apply Text
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Image Upload Panel */}
      {showImageUpload && (
        <div className="mt-6 p-4 border rounded-md shadow-md">
          <h4 className="text-lg font-bold mb-4">Upload Image</h4>
          
          {selectedImage && !showImageEditor && (
            <div className="mb-4">
              <img 
                src={typeof selectedImage === 'object' ? selectedImage.src : selectedImage} 
                alt="Selected" 
                className="max-h-40 mx-auto object-contain" 
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => {
                onImageSelect(null);
                setShowImageUpload(false);
                setSelectedOption("none");
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            <button
              onClick={handleUploadClick}
              disabled={!agreeTerms}
              className={`px-4 py-2 rounded-md ${
                agreeTerms 
                  ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors`}
            >
              Upload Image
            </button>
          </div>
        </div>
      )}
      
      {/* Clipart Panel */}
      {showClipartPanel && (
        <div className="mt-6 p-4 border rounded-md shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-bold">Choose Clipart</h4>
            <button
              onClick={() => setShowClipartPanel(false)}
              className="text-gray-500 hover:text-black"
            >
              &times;
            </button>
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cliparts..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="All">All Categories</option>
              <option value="Graduation">Graduation</option>
              <option value="Birthday">Birthday</option>
              <option value="Wedding">Wedding</option>
              <option value="Holiday">Holiday</option>
            </select>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-4">
            {filteredCliparts.map((clipart, index) => (
              <div
                key={index}
                onClick={() => handleClipartSelect(clipart.src)}
                className={`cursor-pointer p-1 rounded-md ${
                  selectedImage === clipart.src
                    ? "ring-2 ring-yellow-500"
                    : ""
                }`}
              >
                <img
                  src={clipart.src}
                  alt={clipart.alt}
                  className="w-full aspect-square object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Inline Image Editor (not in a dialog) */}
      {showImageEditor && (
        <div className="mt-6 p-4 border rounded-md shadow-md">
          <h4 className="text-lg font-bold mb-4">Edit Your Image</h4>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            <div 
              ref={containerRef}
              className="bg-gray-700 w-64 h-64 rounded-full flex items-center justify-center overflow-hidden relative"
            >
              {editingImage && (
                <img 
                  ref={imageRef}
                  src={editingImage} 
                  alt="Editing" 
                  className="object-cover cursor-move"
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) rotate(${imageRotation}deg) scale(${imageZoom / 100})`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease',
                    cursor: isDragging ? 'grabbing' : 'grab',
                  }}
                  onMouseDown={handleMouseDown}
                />
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <MoveHorizontal className="h-5 w-5 text-gray-500" />
              <p className="text-center">Drag image to reposition photo</p>
            </div>

            <div className="w-full space-y-4">
              {/* Zoom control */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Zoom</label>
                  <span className="text-sm">{imageZoom}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ZoomOut className="h-4 w-4 text-gray-500" />
                  <Slider
                    value={[imageZoom]} 
                    min={50}
                    max={150}
                    step={1}
                    onValueChange={(value) => setImageZoom(value[0])}
                    className="flex-1"
                  />
                  <ZoomIn className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              {/* Rotation control */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Rotation</label>
                  <span className="text-sm">{imageRotation}°</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCw className="h-4 w-4 text-gray-500" />
                  <Slider
                    value={[imageRotation]} 
                    min={0}
                    max={360}
                    step={5}
                    onValueChange={(value) => setImageRotation(value[0])}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm text-center">
              Since M&M'S are round, it doesn't matter if your<br />
              image is upside down or sideways!
            </p>
            
            <button 
              onClick={handleResetImageEdits}
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10.146 8.146a.5.5 0 01.708 0L12 9.293l1.146-1.147a.5.5 0 11.708.708L12.707 10l1.147 1.146a.5.5 0 01-.708.708L12 10.707l-1.146 1.147a.5.5 0 010-.708z" clipRule="evenodd" />
              </svg>
              <span>Reset position</span>
            </button>
            
            <div className="flex w-full justify-between space-x-4">
              <button 
                onClick={() => {
                  setShowImageEditor(false);
                  setShowImageUpload(true);
                }}
                className="w-full border-2 border-brown-800 text-brown-800 font-bold py-3 px-6 rounded-full"
              >
                back
              </button>
              <button 
                onClick={handleImageConfirm}
                className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-500"
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignOptions;