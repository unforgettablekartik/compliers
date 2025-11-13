import Head from 'next/head';

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer | The Compliers</title>
        <meta name="description" content="Legal disclaimer for The Compliers website and services." />
      </Head>
      <section className="legal-page">
        <div className="container">
          <h1>Disclaimer</h1>
          <p>The information provided on The Compliers website is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
          <h2>No Legal Advice</h2>
          <p>The content on this website does not constitute legal advice. For specific legal advice tailored to your situation, please consult with a qualified attorney.</p>
          <h2>Bar Council of India Rules</h2>
          <p>As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising. This website is meant solely for informational purposes and does not constitute solicitation or legal advice.</p>
          <h2>Limitation of Liability</h2>
          <p>In no event will The Compliers be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
        </div>
      </section>
    </>
  );
}
