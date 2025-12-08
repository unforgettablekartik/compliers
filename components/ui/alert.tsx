import * as React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error";
}

export function Alert({ variant = "default", className = "", children, ...props }: AlertProps) {
  const variantStyles = {
    default: "bg-blue-50 text-blue-900 border-blue-200",
    success: "bg-green-50 text-green-900 border-green-200",
    warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
    error: "bg-red-50 text-red-900 border-red-200",
  };

  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={`font-semibold mb-1 ${className}`} {...props}>
      {children}
    </h5>
  );
}

export function AlertDescription({ className = "", children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm ${className}`} {...props}>
      {children}
    </p>
  );
}
