"use client";
import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Colors' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Packaging' }
  ];

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center relative">
        {/* Progress bar */}
        <div className="absolute h-1 bg-gray-200 top-1/2 left-0 right-0 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute h-1 bg-candy-green top-1/2 left-0 -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
        ></div>
        
        {/* Steps */}
        {steps.map((step) => (
          <div key={step.id} className="z-10 flex flex-col items-center">
            <div 
              className={`progress-step ${
                step.id < currentStep 
                  ? 'step-completed' 
                  : step.id === currentStep 
                    ? 'step-active' 
                    : 'step-inactive'
              }`}
            >
              {step.id < currentStep ? '✓' : step.id}
            </div>
            <span className="mt-2 text-sm font-medium">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
