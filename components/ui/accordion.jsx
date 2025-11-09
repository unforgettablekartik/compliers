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
    <div className={`relative ${className}`}>
        {React.Children.map(children, (child) =>
            React.cloneElement(child, {
                isOpen,
                onToggle,
            })
        )}
        <div className="border-b border-gray-200 mt-2" />
    </div>
);

const AccordionTrigger = ({ isOpen, onToggle, children }) => (
    <button 
        className="w-full text-left py-6 px-0 bg-transparent flex justify-between items-center hover:text-gray-700 transition-colors"
        style={{ border: 'none', outline: 'none' }}
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
    >
        <span className="flex-1 text-base font-medium text-gray-900 max-w-[85%]">{children}</span>
        <span className="text-2xl font-light text-gray-400 leading-none select-none flex-shrink-0 absolute right-0" aria-hidden="true" style={{ marginRight: '0' }}>
            {isOpen ? '−' : '+'}
        </span>
    </button>
);

const AccordionContent = ({ isOpen, children }) => (
    isOpen ? (
        <div className="pb-6 pt-2 pr-0 pl-0 bg-transparent text-gray-600 text-base leading-relaxed">
            {children}
        </div>
    ) : null
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };