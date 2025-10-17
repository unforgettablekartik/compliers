'use client';

import React, { useState, useEffect } from 'react';

export default function DisclosureBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already acknowledged the banner
    const hasAcknowledged = localStorage.getItem('disclosureBannerAcknowledged');
    if (!hasAcknowledged) {
      setIsVisible(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('disclosureBannerAcknowledged', 'true');
    setIsVisible(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAcknowledge();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="disclosure-banner"
      role="banner"
      aria-label="Bar Council of India Disclosure"
    >
      <div className="disclosure-banner-content">
        <p className="disclosure-banner-text">
          Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. This website is made for information and education only and in no manner for advertising or solicitation. We adhere to the law and practice of the noble profession.
        </p>
        <button
          className="disclosure-banner-button"
          onClick={handleAcknowledge}
          onKeyDown={handleKeyDown}
          aria-label="Acknowledge and dismiss disclosure banner"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
