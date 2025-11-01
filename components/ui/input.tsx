import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 ${className}`}
      {...props}
    />
  )
);

Input.displayName = "Input";