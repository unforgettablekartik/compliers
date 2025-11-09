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
    <div className={`border-b border-gray-200 ${className}`} {...props}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { isOpen, onToggle: () => ctx.setOpenItem(isOpen && ctx.collapsible ? null : value) })
      )}
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
      className={`w-full text-left py-4 px-0 bg-transparent flex justify-between items-start border-0 hover:text-gray-700 transition-colors ${className}`}
      onClick={onToggle}
      type="button"
      aria-expanded={isOpen}
      {...props}
    >
      <span className="flex-1 pr-8 text-base font-normal text-gray-900">{children}</span>
      <span className="text-xl font-light text-gray-500 leading-none select-none flex-shrink-0" aria-hidden="true">
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
    <div className={`pb-4 pt-0 pr-0 pl-0 bg-transparent text-gray-600 text-sm leading-relaxed ${className}`} {...props}>{children}</div>
  ) : null;
}
