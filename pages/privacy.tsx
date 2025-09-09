import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | The Compliers</title>
        <meta name="description" content="Learn about The Compliers’ privacy practices." />
      </Head>
      {/* Site Navigation */}
      <nav id="navbar">
        <div className="container">
          <div className="logo"><a href="/">The Compliers</a></div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Our Expertise</a></li>
              <li><a href="/blog">Blogs</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      {/* Main content */}
      <main className="legal-page">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>This Privacy Policy explains how The Compliers collects, uses, and protects your personal data when you use our website or services.</p>
          <h2>Information We Collect</h2>
          <p>We may collect personal information such as your name, contact details, and any other information you voluntarily provide.</p>
          <h2>How We Use Your Information</h2>
          <p>We use the information to provide and improve our services, respond to inquiries, and comply with legal obligations.</p>
        </div>
      </main>
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
