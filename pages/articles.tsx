import Head from 'next/head';

export default function Articles() {
  return (
    <>
      <Head>
        <title>Learning Center | The Compliers</title>
        <meta name="description" content="Explore educational resources across Artificial Intelligence, Data Privacy, Information Technology, and Contracts & Disputes." />
      </Head>
      <main className="articles-page">
        <div className="container">
          <h1>Learning Center</h1>
          <p className="articles-intro">
            Explore resources across key topics to stay informed and compliant.
          </p>
          <div className="articles-categories">
            <div className="article-category">
              <h2>Artificial Intelligence</h2>
              <p>Latest articles on AI regulations, ethics and the impact of AI on society.</p>
            </div>
            <div className="article-category">
              <h2>Data Privacy</h2>
              <p>Insights into data protection laws and best practices for privacy compliance.</p>
            </div>
            <div className="article-category">
              <h2>Information Technology</h2>
              <p>Updates on IT law, cybersecurity, digital transformation and emerging technologies.</p>
            </div>
            <div className="article-category">
              <h2>Contracts & Disputes</h2>
              <p>Guidance on drafting agreements, contract law, risk mitigation and dispute resolution.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
