import * as React from "react";

// Accordion context unchanged
type AccordionContextType = {
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
  type: "single" | "multiple";
  collapsible: boolean;
};
const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

export function Accordion({
  children,
  type = "single",
  collapsible = true,
  className = "",
  ...props
}: React.PropsWithChildren<{ type?: "single" | "multiple"; collapsible?: boolean; className?: string }>) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem, type, collapsible }}>
      <div 
        className={className} 
        {...props} 
        style={{ 
          fontFamily: "Times New Roman, Times, serif",
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className = "",
  ...props
}: React.PropsWithChildren<{ value: string; className?: string }>) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");
  const isOpen = ctx.openItem === value;
  return (
    <div className={`${className}`} style={{ marginBottom: "16px" }} {...props}>
      <div className="relative">
        {React.Children.map(children, (child: any) =>
          React.cloneElement(child, { isOpen, onToggle: () => ctx.setOpenItem(isOpen && ctx.collapsible ? null : value) })
        )}
      </div>
      <div style={{ borderBottom: "1px solid #e5e7eb", marginTop: isOpen ? "0" : "0" }} />
    </div>
  );
}

// Replace the +/- with SVG up/down arrows, right-justified.
export function AccordionTrigger({
  isOpen,
  onToggle,
  children,
  className = "",
  ...props
}: React.PropsWithChildren<{ isOpen?: boolean; onToggle?: () => void; className?: string }>) {
  return (
    <button
      className={`w-full text-left bg-white relative cursor-pointer ${className}`}
      style={{
        border: 'none',
        outline: 'none',
        background: 'white',
        boxShadow: 'none',
        fontFamily: "Times New Roman, Times, serif",
        fontSize: "1rem",
        minHeight: "64px",
        padding: "20px 56px 20px 24px",
        display: "block",
        position: "relative"
      }}
      onClick={onToggle}
      type="button"
      aria-expanded={isOpen}
      {...props}
    >
      <span
        className="font-bold"
        style={{
          fontFamily: "Times New Roman, Times, serif",
          fontWeight: "bold",
          fontSize: "1rem",
          display: "block"
        }}
      >
        {children}
      </span>
      {/* Chevron icon with 180° rotation - absolutely positioned for perfect alignment */}
      <span
        aria-hidden="true"
        style={{ 
          position: "absolute",
          right: "24px",
          top: "50%",
          width: '24px', 
          height: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Down arrow (chevron) - rotates to up when open */}
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </span>
    </button>
  );
}

export function AccordionContent({
  isOpen,
  children,
  className = "",
  ...props
}: React.PropsWithChildren<{ isOpen?: boolean; className?: string }>) {
  return isOpen ? (
    <div
      className={`bg-white font-normal leading-relaxed ${className}`}
      style={{
        fontFamily: "Times New Roman, Times, serif",
        fontWeight: 400,
        fontSize: "1rem",
        background: "white",
        margin: 0,
        padding: "16px 24px 20px 24px"
      }}
      {...props}
    >
      {children}
    </div>
  ) : null;
}
