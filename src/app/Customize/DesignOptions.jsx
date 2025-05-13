
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageIcon, TypeIcon, Palette } from 'lucide-react';

const DesignOptions = () => {
  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-6">design your candy</h2>
      <p className="text-gray-600 mb-8">Create up to 4 designs. Tap each to edit.</p>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Image Option */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <AspectRatio ratio={1/1} className="bg-white">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <ImageIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-brown-800 mb-1">Image</h3>
              <div className="w-16 h-1 bg-yellow-500 rounded"></div>
            </div>
          </AspectRatio>
        </div>
        
        {/* Text Option */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <AspectRatio ratio={1/1} className="bg-white">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-2">
                <span className="text-4xl font-bold text-orange-500">Aa</span>
              </div>
              <h3 className="text-xl font-bold text-brown-800 mb-1">Text</h3>
              <div className="w-16 h-1 bg-yellow-500 rounded"></div>
            </div>
          </AspectRatio>
        </div>
        
        {/* Clipart Option */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden col-span-2">
          <AspectRatio ratio={2/1} className="bg-white">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brown-800 mb-1">Clipart</h3>
              <div className="w-16 h-1 bg-yellow-500 rounded"></div>
            </div>
          </AspectRatio>
        </div>
      </div>
      
      <div className="mt-10">
        <button className="w-full py-4 bg-yellow-400 text-black text-xl font-bold rounded-full hover:bg-yellow-500 transition-colors">
          skip
        </button>
      </div>
    </div>
  );
};

export default DesignOptions;