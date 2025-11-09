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
    <div className={className}>
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
        className="w-full text-left py-3 px-0 bg-white flex justify-between items-center hover:text-gray-600 transition-colors"
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
    >
        <span className="flex-1 text-base font-medium">{children}</span>
        <svg
            className={`w-4 h-4 ml-3 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    </button>
);

const AccordionContent = ({ isOpen, children }) => (
    isOpen ? (
        <div className="pb-4 pt-1 pr-0 pl-0 bg-white text-gray-600 text-sm leading-relaxed">
            {children}
        </div>
    ) : null
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };