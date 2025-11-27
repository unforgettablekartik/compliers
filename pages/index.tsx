import Head from 'next/head';
import React from 'react';

export default function Home() {
  // Handle form submission by calling the contact API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you for reaching out! We will get back to you soon.');
        form.reset();
      } else {
        alert(`Error: ${result.message || 'Failed to send message. Please try again.'}`);
      }
    } catch (error) {
      alert('Failed to send message. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  // Handle opening the chatbot
  const handleOpenChatbot = () => {
    const event = new CustomEvent('openCompliersBot');
    window.dispatchEvent(event);
  };

  return (
    <>
      <Head>
        <title>The Compliers - Best Legal Counsel for Contracts, Trademarks & Corporate Compliance</title>
        <meta
          name="description"
          content="Founders' favorite General Counsel, The Compliers offers affordable legal solution for contracts, trademark registration, and corporate matters. Serving businesses, startups, content creators, agencies and professionals as specialized legal counsel. Project-based and retainer services available with reasonable fixed fee options."
        />
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        {/* Font Awesome and Google Fonts */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-GmSWFp6J6IWgpr9RwQbZHhSBWfHnVeymm7oWf22C6T6QS0+hZqmYAjwoM+I3/Z+9k7EIDs4FAOMeG2E6O7G4Pg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Hero section */}
      <header id="hero">
        <div className="hero-content">
          <h1>
            <span className="hero-line1">Contracts &amp; Risk Mitigation | Intellectual Property</span>
            <span className="hero-line2">Corporate Law | Legal aspects of AI, IT &amp; Data Privacy</span>
          </h1>
          <p className="hero-description-line1">
            Specialized legal support for Businesses, Entrepreneurs, Creators, and Agencies.
          </p>
          <p className="hero-description-line2">
            Founder&apos;s favorite Legal Counsel. No Big Bulky Bills. No Complex Legalese.
          </p>
          <div className="hero-buttons">
            <a href="/book-a-call" className="btn">Connect Now</a>
            <a href="/#services" className="btn btn-secondary">Our Services</a>
          </div>
        </div>
      </header>

      {/* Service Tabs Section */}
      <section className="service-tabs-section">
        <div className="service-tabs-container">
          <h2 className="service-tabs-intro-heading">
            Explore our unique tools, each dedicated to your customised needs:
          </h2>
          <div className="service-tabs-grid">
            {/* Tab 1: Agreementor - Unclickable */}
            <div className="service-tab service-tab-agreementor unclickable">
              <h2 className="service-tab-heading">Agreementor</h2>
              <p className="service-tab-description">Contracts &amp; Agreements</p>
            </div>

            {/* Tab 2: Markster - Links to /markster */}
            <a href="/markster" className="service-tab-link">
              <div className="service-tab service-tab-markster">
                <h2 className="service-tab-heading">Markster</h2>
                <p className="service-tab-description">Securing Trademarks</p>
              </div>
            </a>

            {/* Tab 3: Creator in Law - Links to /creator-in-law */}
            <a href="/creator-in-law" className="service-tab-link">
              <div className="service-tab service-tab-creator">
                <span className="service-tab-badge">New</span>
                <h2 className="service-tab-heading">Creator in Law</h2>
                <p className="service-tab-description">Creators&apos; Legal Support</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="about-section no-bg">
        <div className="container about-container">
          <h2>About Us</h2>
          <p>
            At The Compliers, we unite deep expertise in law, technology, and policy to deliver tailored solutions for ambitious entrepreneurs and modern businesses. We go beyond traditional legal services, leveraging technology and data-driven strategies to help you minimize risks and maximize opportunities.
          </p>
          <p>
            Our services cover the entire spectrum, from safeguarding your Intellectual Property to drafting robust Commercial Contracts, and from pioneering Data Privacy strategies to integrating the latest in Legal-Tech. We thrive at the intersection of innovation and compliance, providing advanced alternatives to conventional legal services.
          </p>
          <p>
            With us, you don’t just solve legal challenges—you gain a proactive partner committed to your long-term success. Join us as we reimagine what legal support can mean for tomorrow’s leaders.
          </p>
        </div>
      </section>

      {/* Our Expertise section */}
      <section id="services">
        <div className="container">
          <h2>Our Expertise</h2>
          <p className="services-description">Comprehensive legal solutions for the digital age</p>
          <div className="services-grid">
            {/* Commercial Contracts block */}
            <div className="service">
              <i className="fa-solid fa-file-signature service-icon" aria-hidden="true"></i>
              <h3>Commercial Contracts</h3>
              <p>Drafting, negotiating and reviewing vendor, client and partnership agreements that balance commercial outcomes with regulatory compliance.</p>
            </div>
            {/* Intellectual Property block */}
            <div className="service">
              <i className="fa-solid fa-lightbulb service-icon" aria-hidden="true"></i>
              <h3>Intellectual Property</h3>
              <p>Protection strategies for patents, trademarks, copyrights and trade secrets, including licensing support and portfolio management.</p>
            </div>
            {/* IT &amp; Data Privacy block */}
            <div className="service">
              <i className="fa-solid fa-shield-halved service-icon" aria-hidden="true"></i>
              <h3>IT &amp; Data Privacy</h3>
              <p>Advisory on technology law, cybersecurity obligations and global privacy frameworks to keep digital operations resilient and compliant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Markster Button Section */}
      <section className="markster-banner">
        <div className="container">
          <div className="markster-cta">
            <div className="markster-content">
              <h3>🛡️ Trademark Filing Made Simple</h3>
              <p>File your trademark with lawyer-led, fixed-fee package for Indian startups & MSMEs</p>
            </div>
            <a href="/markster" className="btn btn-markster">
              Explore Markster™
            </a>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact">
        <div className="container">
          <div className="contact-header-row">
            <h2>Contact for Enquiries</h2>
            <button onClick={handleOpenChatbot} className="lets-chat-button" type="button">
              <i className="fa-solid fa-comments" aria-hidden="true"></i>
              <span>Let&apos;s Chat</span>
            </button>
          </div>
          <div className="contact-wrapper">
            <div className="contact-form">
              <form id="contact-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" required className="contact-placeholder" />
                <input type="email" name="email" placeholder="Email" required className="contact-placeholder" />
                <textarea name="message" placeholder="Message" required className="contact-placeholder"></textarea>
                <button type="submit" className="btn">Send Message</button>
              </form>
            </div>
            <div className="contact-info">
              <h3>Why Choose The Compliers?</h3>
              <p>We bridge the gap between cutting-edge technology and legal compliance, ensuring your business stays ahead while remaining compliant.</p>
              <ul>
                <li><strong>Specialized Expertise</strong><br />Deep understanding of emerging technologies and their legal implications</li>
                <li><strong>Industry Experience</strong><br />Proven track record across multiple industries and regulatory environments</li>
                <li><strong>Future-Ready Solutions</strong><br />Stay ahead of regulatory changes and emerging legal challenges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}