"use client";

import {
  setColorSelection,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const weightOptions: { name: string }[] = [
  { name: "100g" },
  { name: "200g" },
  { name: "500g" },
  { name: "1kg" },
];

const WeightSelection = () => {
  const { colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Select Weight
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {weightOptions.map((option, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              "border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base",
              colorSelection.name === option.name ? "bg-green-500 text-white" : "bg-white text-black",
            ])}
            onClick={() => dispatch(setColorSelection(option))}
          >
            {option.name}
            {colorSelection.name === option.name && (
              <IoMdCheckmark className="ml-2 text-lg" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeightSelection;
