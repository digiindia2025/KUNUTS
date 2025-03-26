import React from "react";
import { cn } from "@/lib/utils"; // Ensure this utility is properly imported

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
}

// Define button variants manually
export const buttonVariants = ({
  variant = "primary",
  size = "medium",
}: {
  variant: ButtonProps["variant"];
  size?: ButtonProps["size"];
}) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return `${variants[variant]} ${sizes[size]}`;
};

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = "primary",
  size = "medium",
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-md transition font-medium",
        buttonVariants({ variant, size }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Ensure ButtonProps and buttonVariants are exported
export { ButtonProps };
