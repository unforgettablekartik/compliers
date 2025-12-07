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
          fontFamily: "Montserrat, sans-serif",
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
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
    <div 
      className={`${className}`} 
      style={{ 
        background: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e8e8e8",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        ...(isOpen && {
          borderColor: "#0077cc",
          boxShadow: "0 4px 16px rgba(0, 119, 204, 0.15)"
        })
      }} 
      {...props}
      onMouseEnter={(e) => {
        if (!isOpen) {
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 119, 204, 0.1)";
          e.currentTarget.style.borderColor = "#d0e8f0";
        }
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
          e.currentTarget.style.borderColor = "#e8e8e8";
        }
      }}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { isOpen, onToggle: () => ctx.setOpenItem(isOpen && ctx.collapsible ? null : value) })
      )}
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
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <button
      className={`w-full text-left cursor-pointer ${className}`}
      style={{
        border: 'none',
        outline: 'none',
        background: isHovered ? '#f9fafb' : 'transparent',
        boxShadow: 'none',
        fontFamily: "Montserrat, sans-serif",
        fontSize: "1.05rem",
        padding: "1.25rem 1.5rem",
        paddingRight: "3.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        transition: "background-color 0.2s ease"
      }}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type="button"
      aria-expanded={isOpen}
      {...props}
    >
      <span
        className="font-bold"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "600",
          fontSize: "1.05rem",
          display: "block",
          lineHeight: "1.4",
          color: "#1a1a1a",
          flex: 1,
          paddingRight: "1rem"
        }}
      >
        {children}
      </span>
      {/* Chevron icon with 180° rotation */}
      <span
        aria-hidden="true"
        style={{ 
          color: "#0077cc",
          flexShrink: 0,
          width: '20px', 
          height: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Down arrow (chevron) - rotates to up when open */}
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 8 10 12 14 8"/>
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
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = React.useState<string>("0px");

  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen, children]);

  return (
    <div
      style={{
        maxHeight: maxHeight,
        overflow: "hidden",
        transition: isOpen ? "max-height 0.5s ease-in" : "max-height 0.3s ease-out"
      }}
    >
      <div
        ref={contentRef}
        className={`font-normal leading-relaxed ${className}`}
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          fontSize: "1rem",
          background: "#f9fafb",
          margin: 0,
          padding: "0 1.5rem 1.5rem 1.5rem",
          lineHeight: "1.7",
          color: "#4a4a4a"
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
