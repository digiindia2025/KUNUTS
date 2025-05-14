"use client";
import React from 'react';
import { Button } from "@/components/ui/button";

const StepNavigation = ({ currentStep, totalSteps, onNext, onPrev, disabled = false }) => {
  return (
    <div className="flex justify-between mt-8 mb-4">
      {currentStep > 1 ? (
        <Button 
          onClick={onPrev}
          variant="outline"
          className="border-2 border-gray-300"
        >
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      <Button 
        onClick={onNext}
        disabled={disabled}
        className={`bg-yellow-400 text-black hover:bg-yellow-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {currentStep === totalSteps ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
};

export default StepNavigation;