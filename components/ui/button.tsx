import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export function Button({ asChild = false, variant = "default", size = "default", className = "", children, ...props }: ButtonProps) {
  const Comp = asChild ? "span" : "button";
  
  const baseStyles = "inline-flex items-center justify-center rounded font-medium transition";
  const variantStyles = variant === "outline" 
    ? "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
    : "bg-sky-600 hover:bg-sky-700 text-white";
  const sizeStyles = size === "sm" 
    ? "px-3 py-1.5 text-sm" 
    : size === "lg" 
    ? "px-6 py-3 text-lg" 
    : "px-4 py-2";
  
  return (
    <Comp
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
