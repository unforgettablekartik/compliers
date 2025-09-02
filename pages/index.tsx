import Head from 'next/head';

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
        {/* Updated title and description to reflect new focus */}
        <title>The Compliers – AI Law & IT & Data Privacy Specialists</title>
        <meta
          name="description"
          content="With our specialization in AI Law and legal aspects of IT & Data Privacy, we advise on and help with the conventional areas of law as well as the latest legal developments across the industries."
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-GmSWFp6J6IWgpr9RwQbZHhSBWfHnVeymm7oWf22C6T6QS0+hZqmYAjwoM+I3/Z+9k7EIDs4FAOMeG2E6O7G4Pg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav id="navbar">
        <div className="container">
          <div className="logo">
            <a href="#">The Compliers</a>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero">
        <div className="hero-content">
          {/* Updated hero headline and description */}
          <h1>AI Law and legal aspects of IT & Data Privacy</h1>
          <p>
            With our specialization in AI Law and legal aspects of IT & Data
            Privacy, we advise on and help with the conventional areas of law as
            well as the latest legal developments across the industries.
          </p>
          {/* Two call‑to‑action buttons for better user engagement */}
          <div className="hero-buttons">
            <a href="#contact" className="btn">
              Need Help
            </a>
            <a href="#services" className="btn btn-secondary">
              Learning Center
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <h2>About Us</h2>
          <p>
            The Compliers are a group of passionate legal and technical
            professionals dedicated to helping businesses navigate AI regulation
            and data protection. We combine expertise in technology, law and
            policy to deliver practical compliance solutions.
          </p>
          <p>
            Our mission is to empower companies to innovate responsibly by
            aligning AI development with ethical and legal standards.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          {/* Updated services heading and description */}
          <h2>Our Expertise</h2>
          <p className="services-description">
            Comprehensive legal solutions for the digital age
          </p>
          <div className="services-grid">
            <div className="service">
              <i className="fa-solid fa-shield-check service-icon" aria-hidden="true"></i>
              <h3>AI Compliance</h3>
              <p>
                Assess and implement strategies that ensure your AI systems comply
                with local and global regulations.
              </p>
            </div>
            <div className="service">
              <i className="fa-solid fa-lock service-icon" aria-hidden="true"></i>
              <h3>Data Protection</h3>
              <p>
                Design data governance frameworks that prioritise privacy and
                security across the data lifecycle.
              </p>
            </div>
            <div className="service">
              <i className="fa-solid fa-chalkboard-user service-icon" aria-hidden="true"></i>
              <h3>Training & Workshops</h3>
              <p>
                Equip your team with the knowledge to develop, deploy and manage
                AI responsibly through engaging sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="contact-wrapper">
            {/* Left side: existing contact form */}
            <div className="contact-form">
              <h2>Contact Us</h2>
              <p>
                Ready to start your compliance journey? Reach out and let's
                discuss how we can help.
              </p>
              <form id="contact-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                ></textarea>
                <button type="submit" className="btn">
                  Send Message
                </button>
              </form>
            </div>
            {/* Right side: why choose us content */}
            <div className="contact-info">
              <h3>Why Choose The Compliers?</h3>
              <p>
                We bridge the gap between cutting-edge technology and legal
                compliance, ensuring your business stays ahead while remaining
                compliant.
              </p>
              <ul>
                <li>
                  <span>Specialized Expertise</span>
                  <small>
                    Deep understanding of emerging technologies and their legal
                    implications
                  </small>
                </li>
                <li>
                  <span>Industry Experience</span>
                  <small>
                    Proven track record across multiple industries and
                    regulatory environments
                  </small>
                </li>
                <li>
                  <span>Future-Ready Solutions</span>
                  <small>
                    Stay ahead of regulatory changes and emerging legal
                    challenges
                  </small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} The Compliers. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
