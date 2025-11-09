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
        className="w-full text-left py-4 px-0 bg-white flex justify-between items-center gap-4 hover:text-gray-700 transition-colors border-0"
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
    >
        <span className="flex-1 text-base font-normal text-gray-900">{children}</span>
        <span className="text-2xl font-light text-gray-500 leading-none select-none" aria-hidden="true">
            {isOpen ? '−' : '+'}
        </span>
    </button>
);

const AccordionContent = ({ isOpen, children }) => (
    isOpen ? (
        <div className="pb-6 pt-2 pr-0 pl-0 bg-white text-gray-600 text-sm leading-relaxed">
            {children}
        </div>
    ) : null
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };