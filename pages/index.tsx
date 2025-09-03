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
      </Head>

      {/* Navigation */}
      <nav id="navbar">
        <div className="container">
          <div className="logo"><a href="/">The Compliers</a></div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Our Expertise</a></li>
            <li><a href="/articles">Blogs</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero section */}
      <header id="hero">
        <div className="hero-content">
          <h1>
            <span className="hero-line1">Contracts & Risk Mitigation | Intellectual Property</span>
            <span className="hero-line2">Corporate Law | Legal aspects of AI, IT & Data Privacy</span>
          </h1>
          <p>
            Rendering support on the conventional areas of law as well as the latest legal developments across the industries.
          </p>
          <span className="highlight">
            Special assistance for new entrepreneurs and startups in making.
          </span>
          <div className="hero-buttons">
            <a href="/#contact" className="btn">Need Help</a>
            <a href="/articles" className="btn btn-secondary">Learning Center</a>
          </div>
        </div>
      </header>

      {/* Rest of your page content… (About, Our Expertise, Contact, etc.) */}
      {/* Ensure these sections remain unchanged unless you need further edits. */}

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <ul className="footer-nav">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Our Expertise</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
