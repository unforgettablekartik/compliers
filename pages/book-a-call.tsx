import Head from 'next/head';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookACall() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"20min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Book A Call | The Compliers</title>
        <meta name="description" content="Schedule a consultation with The Compliers." />
      </Head>
      <section className="legal-page">
        <div className="container">
          <h1>Book A Call</h1>
          <p style={{ textAlign: "center" }}>Schedule a consultation with our legal experts. Choose a convenient time from the availability calendar below.</p>
          <div style={{ width: "100%", height: "600px", marginTop: "2rem", border: "2px solid #708090", borderRadius: "8px", overflow: "hidden" }}>
            <Cal 
              namespace="20min"
              calLink="thecompliers/20min"
              style={{width:"100%",height:"100%",overflow:"scroll"}}
              config={{"layout":"month_view"}}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem", color: "#555" }}>
            Share relevant documents & information at <a href="mailto:connect@thecompliers.info" style={{ color: "#0077cc", textDecoration: "underline" }}>connect@thecompliers.info</a>
          </p>
        </div>
      </section>
    </>
  );
}
