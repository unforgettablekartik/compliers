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
  collapsible = false,
  className = "",
  ...props
}: React.PropsWithChildren<{ type?: "single" | "multiple"; collapsible?: boolean; className?: string }>) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem, type, collapsible }}>
      <div className={className} {...props} style={{ fontFamily: "Times New Roman, Times, serif" }}>{children}</div>
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
    <div className={`${className}`} {...props}>
      <div className="relative">
        {React.Children.map(children, (child: any) =>
          React.cloneElement(child, { isOpen, onToggle: () => ctx.setOpenItem(isOpen && ctx.collapsible ? null : value) })
        )}
      </div>
      <div className="border-b border-gray-200 mt-2" />
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
      className={`w-full text-left py-6 px-0 pr-12 bg-white relative cursor-pointer ${className}`}
      style={{
        border: 'none',
        outline: 'none',
        background: 'white',
        boxShadow: 'none',
        fontFamily: "Times New Roman, Times, serif"
      }}
      onClick={onToggle}
      type="button"
      aria-expanded={isOpen}
      {...props}
    >
      <span
        className="text-base font-bold"
        style={{
          fontFamily: "Times New Roman, Times, serif",
          fontWeight: "bold",
        }}
      >
        {children}
      </span>
      {/* Up/down move icon, SVG, right-aligned absolute */}
      <span
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        aria-hidden="true"
        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isOpen ? (
          // Up arrow (chevron)
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="5 12 10 7 15 12"/>
          </svg>
        ) : (
          // Down arrow (chevron)
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="5 8 10 13 15 8"/>
          </svg>
        )}
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
      className={`pb-6 pt-2 pr-0 pl-0 bg-white text-base font-normal leading-relaxed ${className}`}
      style={{
        fontFamily: "Times New Roman, Times, serif",
        fontWeight: 400,
        fontSize: "1rem",
        background: "white",
        margin: 0,
      }}
      {...props}
    >
      {children}
    </div>
  ) : null;
}
