import * as React from "react";

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
      <div className={className} {...props}>{children}</div>
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
      style={{ border: 'none', outline: 'none' }}
      onClick={onToggle}
      type="button"
      aria-expanded={isOpen}
      {...props}
    >
      <span className="text-base font-bold">{children}</span>
      <span 
        className="text-2xl font-light leading-none select-none absolute right-0 top-6" 
        aria-hidden="true"
      >
        {isOpen ? '−' : '+'}
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
    <div className={`pb-6 pt-2 pr-0 pl-0 bg-white text-base font-normal leading-relaxed ${className}`} {...props}>{children}</div>
  ) : null;
}
