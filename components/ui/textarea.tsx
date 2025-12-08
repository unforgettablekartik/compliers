import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 min-h-[100px] resize-y ${className}`}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
