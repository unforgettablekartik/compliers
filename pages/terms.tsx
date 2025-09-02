import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use | The Compliers</title>
        <meta name="description" content="Read the terms and conditions governing the use of our website and services." />
      </Head>
      <main className="legal-page">
        <div className="container">
          <h1>Terms of Use</h1>
          <p>Welcome to The Compliers. By accessing our website, you agree to abide by the following terms and conditions. This page outlines our service terms, intellectual property rights, and limitations of liability. Please read these terms carefully before using our website.</p>
          <h2>Use of the Site</h2>
          <p>This site is provided for informational purposes only. We do not provide legal advice through this website. The information presented here should not be construed as legal counsel or as creating a lawyer-client relationship.</p>
          <h2>Intellectual Property</h2>
          <p>All content on this site, including text, graphics and logos, is the property of The Compliers or its content suppliers and is protected by international copyright laws.</p>
        </div>
      </main>
    </>
  );
}
