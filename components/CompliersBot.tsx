'use client';

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

type ConversationStep = 
  | 'initial'
  | 'greeting'
  | 'category'
  | 'collect-info'
  | 'final-action'
  | 'exit';

type Category = 'trademark' | 'contract' | 'privacy' | 'other' | null;

const CompliersBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [conversationStep, setConversationStep] = useState<ConversationStep>('initial');
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isCollectingInfo, setIsCollectingInfo] = useState(false);
  const [infoField, setInfoField] = useState<'name' | 'email' | 'phone' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when opening or after bot message
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenBot = () => {
      handleOpen();
    };
    
    window.addEventListener('openCompliersBot', handleOpenBot);
    return () => window.removeEventListener('openCompliersBot', handleOpenBot);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Add a message to the chat
  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Handle opening the chatbot
  const handleOpen = () => {
    // Play pop sound
    const audio = new Audio('/pop-sound.mp3');
    audio.play().catch(err => console.log('Audio play failed:', err));
    
    setIsOpen(true);
    if (conversationStep === 'initial') {
      setInputValue('Hey Compliers!');
      setConversationStep('greeting');
    }
  };

  // Handle closing/minimizing the chatbot
  const handleClose = () => {
    setIsOpen(false);
  };

  // Send message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const message = inputValue.trim();
    addMessage(message, 'user');
    setInputValue('');

    // Handle different conversation steps
    if (conversationStep === 'greeting') {
      setTimeout(() => {
        addMessage("Hi, how can I help you this time?", 'bot');
        setTimeout(() => {
          addMessage("Please select from the following:", 'bot');
          setConversationStep('category');
        }, 800);
      }, 600);
    } else if (conversationStep === 'collect-info' && isCollectingInfo) {
      handleInfoCollection(message);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    
    const categoryNames = {
      trademark: 'Trademark Assistance',
      contract: 'Contract Support',
      privacy: 'Data Privacy Compliance',
      other: 'Other Query',
    };
    
    if (category) {
      addMessage(categoryNames[category], 'user');
      
      setTimeout(() => {
        addMessage(`Great! I'll help you with ${categoryNames[category].toLowerCase()}. To proceed, I need some information from you.`, 'bot');
        setTimeout(() => {
          addMessage("What's your name?", 'bot');
          setConversationStep('collect-info');
          setIsCollectingInfo(true);
          setInfoField('name');
        }, 800);
      }, 600);
    }
  };

  // Handle information collection
  const handleInfoCollection = (value: string) => {
    if (infoField === 'name') {
      setUserInfo((prev) => ({ ...prev, name: value }));
      setTimeout(() => {
        addMessage("Thanks! What's your email address?", 'bot');
        setInfoField('email');
      }, 600);
    } else if (infoField === 'email') {
      setUserInfo((prev) => ({ ...prev, email: value }));
      setTimeout(() => {
        addMessage("And your phone number?", 'bot');
        setInfoField('phone');
      }, 600);
    } else if (infoField === 'phone') {
      setUserInfo((prev) => ({ ...prev, phone: value }));
      setIsCollectingInfo(false);
      setInfoField(null);
      setTimeout(() => {
        addMessage("Perfect! How would you like to proceed?", 'bot');
        setConversationStep('final-action');
      }, 600);
    }
  };

  // Handle final action
  const handleFinalAction = (action: 'whatsapp' | 'email' | 'exit') => {
    if (action === 'whatsapp') {
      addMessage('Connect Now on WhatsApp', 'user');
      
      // Send data via EmailJS
      sendEmailJSNotification();
      
      setTimeout(() => {
        addMessage("Great! I'm redirecting you to WhatsApp with all the context...", 'bot');
        
        setTimeout(() => {
          // Create WhatsApp message with context
          const categoryNames = {
            trademark: 'Trademark Assistance',
            contract: 'Contract Support',
            privacy: 'Data Privacy Compliance',
            other: 'Other Query',
          };
          
          const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919540101740';
          const whatsappMessage = encodeURIComponent(
            `Hi, I'm ${userInfo.name}. I need help with ${selectedCategory ? categoryNames[selectedCategory] : 'a query'}.\n\nEmail: ${userInfo.email}\nPhone: ${userInfo.phone}`
          );
          
          window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        }, 1500);
      }, 600);
      
    } else if (action === 'email') {
      addMessage('Get a Response from The Compliers', 'user');
      
      // Send data via EmailJS
      sendEmailJSNotification();
      
      setTimeout(() => {
        addMessage("Thank you! We will get back within 90 minutes.", 'bot');
        setTimeout(() => {
          addMessage("Is there anything else I can help you with?", 'bot');
          setConversationStep('category');
          setSelectedCategory(null);
        }, 2000);
      }, 600);
      
    } else if (action === 'exit') {
      addMessage('Exit this Conversation', 'user');
      
      setTimeout(() => {
        addMessage("No Problem! Feel free to email your queries at connect@thecompliers.com", 'bot');
        setTimeout(() => {
          handleClose();
        }, 2000);
      }, 600);
    }
  };

  // Send notification via EmailJS
  const sendEmailJSNotification = () => {
    const categoryNames = {
      trademark: 'Trademark Assistance',
      contract: 'Contract Support',
      privacy: 'Data Privacy Compliance',
      other: 'Other Query',
    };

    const templateParams = {
      to_email: 'connect@thecompliers.com',
      from_name: userInfo.name,
      from_email: userInfo.email,
      phone: userInfo.phone,
      category: selectedCategory ? categoryNames[selectedCategory] : 'Not specified',
      message: `User interaction via Compliers Bot\nCategory: ${selectedCategory ? categoryNames[selectedCategory] : 'Not specified'}\nConversation history available in chat logs.`,
    };

    // EmailJS configuration - these should be set as environment variables
    // For now, using placeholder - needs to be configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        console.log('EmailJS notification sent successfully');
      })
      .catch((error) => {
        console.error('Failed to send EmailJS notification:', error);
      });
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button when minimized */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="compliers-bot-button"
          aria-label="Open Compliers Bot"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
              fill="white"
            />
            <circle cx="8" cy="10" r="1.5" fill="white" />
            <circle cx="12" cy="10" r="1.5" fill="white" />
            <circle cx="16" cy="10" r="1.5" fill="white" />
          </svg>
        </button>
      )}

      {/* Chat window when open */}
      {isOpen && (
        <div className="compliers-bot-container">
          {/* Header */}
          <div className="compliers-bot-header">
            <div className="compliers-bot-header-content">
              <div className="compliers-bot-avatar">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="compliers-bot-header-text">
                <h3>Compliers Bot</h3>
                <p>Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="compliers-bot-close"
              aria-label="Close chat"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="compliers-bot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`compliers-bot-message compliers-bot-message-${message.sender}`}
              >
                <div className="compliers-bot-message-content">
                  {message.text}
                </div>
              </div>
            ))}

            {/* Category selection buttons */}
            {conversationStep === 'category' && (
              <div className="compliers-bot-options">
                <button
                  onClick={() => handleCategorySelect('trademark')}
                  className="compliers-bot-option-button"
                >
                  Trademark Assistance
                </button>
                <button
                  onClick={() => handleCategorySelect('contract')}
                  className="compliers-bot-option-button"
                >
                  Contract Support
                </button>
                <button
                  onClick={() => handleCategorySelect('privacy')}
                  className="compliers-bot-option-button"
                >
                  Data Privacy Compliance
                </button>
                <button
                  onClick={() => handleCategorySelect('other')}
                  className="compliers-bot-option-button"
                >
                  Other Query
                </button>
              </div>
            )}

            {/* Final action buttons */}
            {conversationStep === 'final-action' && (
              <div className="compliers-bot-options">
                <button
                  onClick={() => handleFinalAction('whatsapp')}
                  className="compliers-bot-option-button compliers-bot-option-primary"
                >
                  Connect Now on WhatsApp
                </button>
                <button
                  onClick={() => handleFinalAction('email')}
                  className="compliers-bot-option-button compliers-bot-option-secondary"
                >
                  Get a Response from The Compliers
                </button>
                <button
                  onClick={() => handleFinalAction('exit')}
                  className="compliers-bot-option-button compliers-bot-option-tertiary"
                >
                  Exit this Conversation
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          {(conversationStep === 'greeting' || isCollectingInfo) && (
            <div className="compliers-bot-input-container">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="compliers-bot-input"
                aria-label="Chat message input"
              />
              <button
                onClick={handleSendMessage}
                className="compliers-bot-send"
                aria-label="Send message"
                disabled={!inputValue.trim()}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CompliersBot;
