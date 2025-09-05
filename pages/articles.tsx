import Head from 'next/head';

export default function Articles() {
  return (
    <>
      <Head>
        <title>Learning Center | The Compliers</title>
        <meta
          name="description"
          content="Explore resources across key topics to stay informed and compliant."
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-GmSWFp6J6IWgpr9RwQbZHhSBWfHnVeymm7oWf22C6T6QS0+hZqmYAjwoM+I3/Z+9k7EIDs4FAOMeG2E6O7G4Pg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      {/* Site Navigation */}
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

      {/* Main content */}
      <main className="articles-page">
        <div className="container">
          <h1>Learning Center</h1>
          <p className="articles-intro">
            Explore resources across key topics to stay informed and compliant.
          </p>
          <div className="articles-grid">
            <div className="article-card">
              <i className="fa-solid fa-robot article-card-icon" aria-hidden="true"></i>
              <h2>Artificial Intelligence</h2>
              <p>Latest articles on AI regulations, ethics and the impact of AI on society.</p>
            </div>
            <div className="article-card">
              <i className="fa-solid fa-user-shield article-card-icon" aria-hidden="true"></i>
              <h2>Data Privacy</h2>
              <p>Insights into data protection laws, privacy compliance, GDPR considerations, and ISO/IEC 27701 implementation.</p>
            </div>
            <div className="article-card">
              <i className="fa-solid fa-laptop-code article-card-icon" aria-hidden="true"></i>
              <h2>Information Technology</h2>
              <p>Updates on IT law, cybersecurity, and digital transformation legal support.</p>
            </div>
            <div className="article-card">
              <i className="fa-solid fa-file-contract article-card-icon" aria-hidden="true"></i>
              <h2>Contracts & Disputes</h2>
              <p>Articles on contract drafting, negotiation, risk mitigation and dispute resolution.</p>
            </div>
          </div>
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
