import Head from 'next/head';
import React from 'react';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - The Compliers | Legal Counsel for Startups &amp; Businesses</title>
        <meta
          name="description"
          content="Learn about The Compliers - your trusted legal partner for contracts, trademarks, and corporate compliance. We combine law, technology, and policy expertise."
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
    </>
  );
}
