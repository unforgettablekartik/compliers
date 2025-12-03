import Head from 'next/head';
import React from 'react';
import { Shield, FileText, Lock, ClipboardCheck, Scale } from 'lucide-react';

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
      <header id="hero" className="homepage-hero">
        <div className="homepage-hero-container">
          <div className="homepage-hero-grid">
            <div className="homepage-hero-left">
              <div className="homepage-brand-chip">
                <span className="homepage-brand-name">The Compliers</span>
                <span>Your Legal Partner</span>
              </div>
              <h1 className="homepage-hero-title">
                Specialized Legal Protection for Modern Businesses.
              </h1>
              <p className="homepage-hero-description">
                Fear of legal complexity? Compromising contracts?<br />
                Risk of forced litigations? Big Bills of Big Firms?<br />
                We bring expertise with determined attention.<br />
                Fixed fees. Fast turnaround. Deep specialization.
              </p>
              <div className="homepage-hero-buttons">
                <a href="/book-a-call" className="btn homepage-btn-primary">Connect Now</a>
                <a href="#featured-services" className="btn homepage-btn-secondary">Explore Services</a>
              </div>
              <p className="homepage-hero-caption">
                FREE 20-minute call to answer all your queries.
              </p>
            </div>
            <div className="homepage-hero-right">
              <div className="areas-expertise-card">
                <ul className="areas-expertise-list">
                  <li className="areas-expertise-item">
                    <span className="areas-expertise-icon areas-expertise-icon-blue">
                      <Shield size={20} />
                    </span>
                    <span className="areas-expertise-text">Trademark Filing &amp; Protection</span>
                  </li>
                  <li className="areas-expertise-item">
                    <span className="areas-expertise-icon areas-expertise-icon-green">
                      <FileText size={20} />
                    </span>
                    <span className="areas-expertise-text">Contract Drafting &amp; Review</span>
                  </li>
                  <li className="areas-expertise-item">
                    <span className="areas-expertise-icon areas-expertise-icon-purple">
                      <Lock size={20} />
                    </span>
                    <span className="areas-expertise-text">Data Privacy &amp; Responsible AI</span>
                  </li>
                  <li className="areas-expertise-item">
                    <span className="areas-expertise-icon areas-expertise-icon-orange">
                      <ClipboardCheck size={20} />
                    </span>
                    <span className="areas-expertise-text">Compliance Advisory</span>
                  </li>
                  <li className="areas-expertise-item">
                    <span className="areas-expertise-icon areas-expertise-icon-teal">
                      <Scale size={20} />
                    </span>
                    <span className="areas-expertise-text">Legal Counselling</span>
                  </li>
                </ul>
              </div>
              <div className="hero-trust-bar">
                <span className="hero-trust-item">
                  <span className="trust-check-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" fill="#0f4562"/>
                      <path d="M4.5 8L7 10.5L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  300+ Contracts Handled
                </span>
                <span className="hero-trust-item">
                  <span className="trust-check-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" fill="#0f4562"/>
                      <path d="M4.5 8L7 10.5L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  40+ Trademarks Filed
                </span>
                <span className="hero-trust-item">
                  <span className="trust-check-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" fill="#0f4562"/>
                      <path d="M4.5 8L7 10.5L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  24 Hour Turnaround
                </span>
                <span className="hero-trust-item">
                  <span className="trust-check-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" fill="#0f4562"/>
                      <path d="M4.5 8L7 10.5L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  20 Minute Free Call
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Problem Statement section */}
      <section id="problem-statement" className="problem-statement-section">
        <div className="container">
          <h2 className="problem-statement-headline">Facing These Legal Headaches Like Most Businesses?</h2>
          <div className="problem-cards-grid">
            {/* Card 1: Big Bills */}
            <div className="problem-card">
              <div className="problem-card-header">
                <span className="problem-card-icon">💸</span>
                <h3 className="problem-card-title">Big Firm = Big Bills</h3>
              </div>
              <p className="problem-card-text">
                Tier-1 firms charge massive retainers and hourly rates you can&apos;t predict. You need expertise, not overhead.
              </p>
            </div>

            {/* Card 2: Slow Response Times */}
            <div className="problem-card">
              <div className="problem-card-header">
                <span className="problem-card-icon">⏰</span>
                <h3 className="problem-card-title">Slow Response Times</h3>
              </div>
              <p className="problem-card-text">
                Your business moves fast. Waiting 5 days for contract review kills deals. You need speed with specialization.
              </p>
            </div>

            {/* Card 3: Generic Templates */}
            <div className="problem-card">
              <div className="problem-card-header">
                <span className="problem-card-icon">📄</span>
                <h3 className="problem-card-title">Generic Templates</h3>
              </div>
              <p className="problem-card-text">
                Businesses lose lakhs due to readymade samples and AI-made templates. You need customization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Statement section */}
      <section id="solution-statement" className="solution-statement-section">
        <div className="container">
          <h2 className="solution-statement-headline">We Become Your Strategic Legal Support</h2>
          <div className="solution-cards-grid">
            {/* Prop 1: Fixed Fees */}
            <div className="solution-card">
              <div className="solution-card-header">
                <span className="solution-card-icon">💰</span>
                <h3 className="solution-card-title">Fixed Fees Options, No Surprises</h3>
              </div>
              <p className="solution-card-text">
                Retainership package. One-time project. You know the cost before we start.
              </p>
            </div>

            {/* Prop 2: Fast Turnaround */}
            <div className="solution-card">
              <div className="solution-card-header">
                <span className="solution-card-icon">⚡</span>
                <h3 className="solution-card-title">Quick 24 Hour Turnaround</h3>
              </div>
              <p className="solution-card-text">
                Get your queries answered in hours. For faster contract reviews, we prioritise.
              </p>
            </div>

            {/* Prop 3: Specialization */}
            <div className="solution-card">
              <div className="solution-card-header">
                <span className="solution-card-icon">🎯</span>
                <h3 className="solution-card-title">Specialized in What You Need</h3>
              </div>
              <p className="solution-card-text">
                Agreements. Trademark. Advisory. We speak your language, with no complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services section */}
      <section id="featured-services" className="featured-services-section">
        <div className="container">
          <div className="featured-services-grid">
            {/* MARKSTER Card */}
            <div className="featured-service-card markster-card">
              <div className="featured-service-header">
                <span className="featured-service-brand">MARKSTER™</span>
                <h3 className="featured-service-title">Protecting Your Brand</h3>
                <p className="featured-service-tagline">File your trademark with maximum brand protection.</p>
              </div>
              <div className="featured-service-content">
                <h4 className="featured-service-label">What&apos;s included:</h4>
                <ul className="featured-service-list">
                  <li>✓ Comprehensive search</li>
                  <li>✓ Checks: identical/phonetic/visual</li>
                  <li>✓ Strategic class mapping</li>
                  <li>✓ TM-A application filing</li>
                  <li>✓ One examination reply</li>
                  <li>✓ 60-day conflict watch</li>
                  <li>✓ Usage guidelines (™ vs ®)</li>
                </ul>
                <p className="featured-service-timeline">
                  <strong>Timeline:</strong> Search in 48 hours | Filing in 3 days
                </p>
                <p className="featured-service-perfect">
                  <strong>Perfect for:</strong> Businesses protecting names, brands to be launched, creators building IP.
                </p>
              </div>
              <div className="featured-service-buttons">
                <a href="/markster" className="btn featured-btn-primary featured-btn-full">Protect Your Brand</a>
                <p className="featured-service-explore-text">Explore Markster™</p>
              </div>
            </div>

            {/* AGREEMENTOR Card */}
            <div className="featured-service-card agreementor-card">
              <div className="featured-service-header">
                <span className="featured-service-brand">AGREEMENTOR™</span>
                <h3 className="featured-service-title">Your Contract Specialist</h3>
                <p className="featured-service-tagline">Keeps you risk-free while signing an agreement.</p>
              </div>
              <div className="featured-service-content">
                <h4 className="featured-service-label">What&apos;s offered:</h4>
                <ul className="featured-service-list">
                  <li>✓ Comprehensive Risk Report</li>
                  <li>✓ Drafting of contracts &amp; Agreements</li>
                  <li>✓ Document review and redlining</li>
                  <li>✓ Business risk analysis &amp; advisory</li>
                  <li>✓ Roadmap for legal compliance</li>
                  <li>✓ Complex laws simplified</li>
                  <li>✓ NDAs and Employment Agreements</li>
                </ul>
                <p className="featured-service-timeline">
                  <strong>Timeline:</strong> 3 days average delivery time
                </p>
                <p className="featured-service-perfect">
                  <strong>Best:</strong> Fixed retainerships for the dedicated support from a fractional legal counsel.
                </p>
              </div>
              <div className="featured-service-buttons">
                <a href="/book-a-call" className="btn featured-btn-primary featured-btn-full">Connect Now</a>
                <p className="featured-service-explore-text">Explore Agreementor™</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <h2 className="how-it-works-headline">Simple Process. Clear Communication. Fast Results.</h2>
          <div className="how-it-works-timeline">
            {/* Step 1 */}
            <div className="how-it-works-step">
              <div className="how-it-works-step-number">1</div>
              <div className="how-it-works-step-content">
                <h3 className="how-it-works-step-title">YOUR REQUIREMENTS?</h3>
                <p className="how-it-works-step-text">
                  Book a free 20-minute consultation or describe your requirement via email. Just tell us what you&apos;re trying to accomplish. Be ready with your queries.
                </p>
              </div>
              <div className="how-it-works-connector">
                <span className="how-it-works-arrow">↓</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="how-it-works-step">
              <div className="how-it-works-step-number">2</div>
              <div className="how-it-works-step-content">
                <h3 className="how-it-works-step-title">GET CLEAR PRICING</h3>
                <p className="how-it-works-step-text">
                  We share a proposal:
                </p>
                <ul className="how-it-works-step-list">
                  <li>Exactly what we&apos;ll deliver</li>
                  <li>Fixed fee (no surprises)</li>
                  <li>Timeline commitments</li>
                  <li>What we need from you</li>
                </ul>
              </div>
              <div className="how-it-works-connector">
                <span className="how-it-works-arrow">↓</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="how-it-works-step">
              <div className="how-it-works-step-number">3</div>
              <div className="how-it-works-step-content">
                <h3 className="how-it-works-step-title">WE GET TO WORK</h3>
                <p className="how-it-works-step-text">
                  Share documents via secure upload. We complete the work within the agreed timeline. Get updates via email/WhatsApp.
                </p>
              </div>
              <div className="how-it-works-connector">
                <span className="how-it-works-arrow">↓</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="how-it-works-step">
              <div className="how-it-works-step-number">4</div>
              <div className="how-it-works-step-content">
                <h3 className="how-it-works-step-title">RECEIVE &amp; IMPLEMENT</h3>
                <p className="how-it-works-step-text">
                  Get your queries answered, trademarks filed, contracts drafted, and documents reviewed with plain-English explanations.
                </p>
              </div>
              <div className="how-it-works-connector how-it-works-final">
                <span className="how-it-works-check">✓</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="how-it-works-cta">
            <a href="/book-a-call" className="btn homepage-btn-primary">Start With FREE Consultation</a>
            <p className="how-it-works-cta-subtext">Don&apos;t worry. You may choose not to continue further. No charges imposed.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us section */}
      <section id="why-choose-us" className="why-choose-us-section">
        <div className="container">
          <h2 className="why-choose-us-headline">Why Businesses Choose The Compliers?</h2>
          <div className="why-choose-us-grid">
            {/* Reason 1: Niche Expertise */}
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-header">
                <span className="why-choose-us-card-icon">🎯</span>
                <h3 className="why-choose-us-card-title">Niche Expertise</h3>
              </div>
              <p className="why-choose-us-card-text">
                Not generalists. Deep focus on saving you from court cases.<br />
                Simplified solutions of the complex legal problems.
              </p>
            </div>

            {/* Reason 2: Speed Matters */}
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-header">
                <span className="why-choose-us-card-icon">⚡</span>
                <h3 className="why-choose-us-card-title">Speed Matters</h3>
              </div>
              <p className="why-choose-us-card-text">
                24-hour standard turnaround. Priority service available.<br />
                Your deal won&apos;t die waiting for legal review.
              </p>
            </div>

            {/* Reason 3: Transparent Pricing */}
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-header">
                <span className="why-choose-us-card-icon">💰</span>
                <h3 className="why-choose-us-card-title">Transparent Pricing</h3>
              </div>
              <p className="why-choose-us-card-text">
                Fixed fees before we start. No surprise invoices.<br />
                You know exactly what you&apos;re paying.
              </p>
            </div>

            {/* Reason 4: Modern Communication */}
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-header">
                <span className="why-choose-us-card-icon">📱</span>
                <h3 className="why-choose-us-card-title">Modern Communication</h3>
              </div>
              <p className="why-choose-us-card-text">
                WhatsApp updates. Email responses within 4 hours.<br />
                Safe document upload. Privacy protected.
              </p>
            </div>

            {/* Reason 5: Simplified Interpretation */}
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-header">
                <span className="why-choose-us-card-icon">🎓</span>
                <h3 className="why-choose-us-card-title">Simplified Interpretation</h3>
              </div>
              <p className="why-choose-us-card-text">
                Complex laws explained to your level of understanding.<br />
                No AI generated response. Clear, actionable advice.
              </p>
            </div>

            {/* Reason 6: Aligned Incentives */}
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-header">
                <span className="why-choose-us-card-icon">🤝</span>
                <h3 className="why-choose-us-card-title">Aligned Incentives</h3>
              </div>
              <p className="why-choose-us-card-text">
                Fixed fees mean we&apos;re incentivized to be efficient.<br />
                Not to rack up billable hours. Your success = Our success.
              </p>
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