import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | The Compliers</title>
        <meta name="description" content="Learn how The Compliers handle your data." />
      </Head>
      <section className="legal-page">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy is important to us. This policy explains how we collect, use and protect your personal information when you interact with The Compliers.</p>
          <h2>Information We Collect</h2>
          <p>We may collect personal information such as your name, email address and company details when you contact us or use our services.</p>
          <h2>How We Use Information</h2>
          <p>Information is used to respond to inquiries, provide services, improve our offerings and comply with legal obligations. We do not sell your personal data.</p>
        </div>
      </section>
    </>
  );
}
