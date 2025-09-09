import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use | The Compliers</title>
        <meta name="description" content="Review the Terms of Use for The Compliers." />
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
          <h1>Terms of Use</h1>
          <p>These terms govern your use of The Compliers’ website and services. By accessing or using our site, you agree to be bound by these terms. Please read them carefully.</p>
          <h2>Use of the Site</h2>
          <p>You agree to use the site for lawful purposes only and in a manner that does not infringe the rights of or restrict the use of the site by any third party.</p>
          <h2>Intellectual Property</h2>
          <p>All content on this site is the property of The Compliers or its licensors. Unauthorized reproduction or redistribution is prohibited.</p>
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
