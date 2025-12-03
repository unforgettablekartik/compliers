import Head from 'next/head';
import React from 'react';

export default function AboutPage() {
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
        <title>About Us - The Compliers | Legal Counsel for Startups &amp; Businesses</title>
        <meta
          name="description"
          content="Learn about The Compliers - your trusted legal partner for contracts, trademarks, and corporate compliance. We combine law, technology, and policy expertise."
        />
        {/* Font Awesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-GmSWFp6J6IWgpr9RwQbZHhSBWfHnVeymm7oWf22C6T6QS0+hZqmYAjwoM+I3/Z+9k7EIDs4FAOMeG2E6O7G4Pg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      {/* About section */}
      <section id="about" className="about-section about-page no-bg">
        <div className="container about-container">
          <h1>About Us</h1>
          <p>
            At The Compliers, we unite deep expertise in law, technology, and policy to deliver tailored solutions for ambitious entrepreneurs and modern businesses. We go beyond traditional legal services, leveraging technology and data-driven strategies to help you minimize risks and maximize opportunities.
          </p>
          <p>
            Our services cover the entire spectrum, from safeguarding your Intellectual Property to drafting robust Commercial Contracts, and from pioneering Data Privacy strategies to integrating the latest in Legal-Tech. We thrive at the intersection of innovation and compliance, providing advanced alternatives to conventional legal services.
          </p>
          <p>
            With us, you don't just solve legal challenges—you gain a proactive partner committed to your long-term success. Join us as we reimagine what legal support can mean for tomorrow's leaders.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="about-contact-section">
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
