import React, { useState } from 'react';

const Accordion = ({ children }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    isOpen: openIndex === index,
                    onToggle: () => toggleAccordion(index),
                })
            )}
        </div>
    );
};

const AccordionItem = ({ isOpen, onToggle, children }) => (
    <div>
        {React.Children.map(children, (child) =>
            React.cloneElement(child, {
                isOpen,
                onToggle,
            })
        )}
    </div>
);

const AccordionTrigger = ({ onToggle, children }) => (
    <button onClick={onToggle}>
        {children}
    </button>
);

const AccordionContent = ({ isOpen, children }) => (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
        {children}
    </div>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };