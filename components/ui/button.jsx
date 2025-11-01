import React from "react";
export function Button({ asChild, className = "", children, ...props }) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp
      className={`inline-flex items-center justify-center px-4 py-2 rounded bg-sky-600 hover:bg-sky-700 text-white font-medium transition ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}