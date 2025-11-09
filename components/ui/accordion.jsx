import React, { useState } from 'react';

const Accordion = ({ children, type = "single", collapsible = false, className = "" }) => {
    const [openItem, setOpenItem] = useState(null);

    const toggleAccordion = (value) => {
        setOpenItem(openItem === value && collapsible ? null : value);
    };

    return (
        <div className={className}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    isOpen: openItem === child.props.value,
                    onToggle: () => toggleAccordion(child.props.value),
                })
            )}
        </div>
    );
};

const AccordionItem = ({ isOpen, onToggle, children, className = "", value }) => (
    <div className={`border-b border-gray-200 ${className}`}>
        {React.Children.map(children, (child) =>
            React.cloneElement(child, {
                isOpen,
                onToggle,
            })
        )}
    </div>
);

const AccordionTrigger = ({ isOpen, onToggle, children }) => (
    <button 
        className="w-full text-left py-4 px-0 bg-transparent flex justify-between items-start border-0 hover:text-gray-700 transition-colors"
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
    >
        <span className="flex-1 pr-8 text-base font-normal text-gray-900">{children}</span>
        <span className="text-xl font-light text-gray-500 leading-none select-none flex-shrink-0" aria-hidden="true">
            {isOpen ? '−' : '+'}
        </span>
    </button>
);

const AccordionContent = ({ isOpen, children }) => (
    isOpen ? (
        <div className="pb-4 pt-0 pr-0 pl-0 bg-transparent text-gray-600 text-sm leading-relaxed">
            {children}
        </div>
    ) : null
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };