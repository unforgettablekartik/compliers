import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | The Compliers</title>
        <meta name="description" content="Our privacy policy outlines how we handle your data." />
      </Head>
      <main className="legal-page">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy is important to us. This policy describes how we handle your data.</p>
          <h2>Information We Collect</h2>
          <p>We collect personal information you provide directly, including when you contact us via our forms or subscribe to updates. We also collect data automatically through analytics tools to understand how our site is used.</p>
          <h2>Use of Your Information</h2>
          <p>We use the information to respond to your inquiries, improve our services, and comply with legal obligations.</p>
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us through the form on our website.</p>
        </div>
      </main>
    </>
  );
}