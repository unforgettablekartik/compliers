import Head from 'next/head';
import React from 'react';

export default function Home() {
  // Handle form submission with a simple alert
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Head>
        <title>The Compliers – Law & Technology Specialists</title>
        <meta
          name="description"
          content="Rendering support on the conventional areas of law as well as the latest legal developments across the industries."
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
          <p>
            Rendering support on the conventional areas of law as well as the latest legal developments across the industries.
          </p>
          <span className="highlight">
            Special assistance for new entrepreneurs and startups in making.
          </span>
          <div className="hero-buttons">
            <a href="/#contact" className="btn">Need Help</a>
            <a href="/blog" className="btn btn-secondary">Learning Center</a>
          </div>
        </div>
      </header>

      {/* About section */}
      <section id="about" className="about-section no-bg">
        <div className="container about-container">
          <h2>About Us</h2>
          <p>
            At The Compliers, we unite deep expertise in law, technology, and policy to deliver tailored solutions for ambitious entrepreneurs and modern businesses. We go beyond traditional legal counsel—offering strategic guidance and fulfillment that empowers your growth in a rapidly evolving digital world.
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

      {/* Contact section */}
      <section id="contact">
        <div className="container">
          <h2>Contact for Enquiries</h2>
          <div className="contact-wrapper">
            <div className="contact-form">
              <form id="contact-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" required></textarea>
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
