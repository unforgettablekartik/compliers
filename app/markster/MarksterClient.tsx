"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Search, FileText, AlertTriangle, Globe2, Scale, Clock, BellRing, 
  CheckCircle2, XCircle, ChevronRight, Mail, Target, Zap, Eye, CheckCircle, 
  XCircle as XCircleIcon, Bell, Shield, ChevronDown 
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Utility components ---
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`w-full py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 md:px-6 ${className}`}>{children}</div>
);

// --- FAQ Components ---
function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: React.ReactNode; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
      <button className="faq-question" onClick={onClick} type="button" aria-expanded={isOpen}>
        <span className="faq-question-text">{question}</span>
        <ChevronDown className={`faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`} size={20} />
      </button>
      <div className={`faq-answer ${isOpen ? 'faq-answer-open' : ''}`}>
        <div className="faq-answer-content">
          {answer}
        </div>
      </div>
    </div>
  );
}

function MarksterFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Can I use ™ right after filing?",
      answer: "Yes. You may use ™ immediately after filing. Switch to ® only after registration is granted."
    },
    {
      question: "Do I need use evidence to file?",
      answer: "Not necessarily. You can file on a \"proposed to be used\" basis. Use evidence strengthens examination/opposition stages."
    },
    {
      question: "How many classes should I choose?",
      answer: "Select classes that reflect actual/near term (3–12 months) goods/services. We map this during kickoff to avoid waste."
    },
    {
      question: "Will you attend hearings?",
      answer: "Hearing appearance is an add on. We include a hearing brief and can appear/brief counsel upon request."
    },
    {
      question: "Can you help with global protection?",
      answer: "Yes. We coordinate Madrid Protocol and national filings with partner counsel and timeline planning."
    }
  ];

  return (
    <div className="faq-container">
      {faqData.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => toggleFAQ(index)}
        />
      ))}
    </div>
  );
}

// --- Main Page ---
export default function MarksterLanding() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919540101740';

  return (
    <div className="markster-page-container relative min-h-screen bg-white text-gray-900 markster-snap-container">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Markster™ — Trademark Filing & Early Defence (India)",
            provider: { "@type": "LegalService", name: "The Compliers" },
            areaServed: "IN",
            serviceType: "Trademark search, filing, examination reply, watch alerts",
          }),
        }}
      />
      {/* Hero and other sections ... */}
      <Section className="markster-hero markster-snap-section">
        <Container>
          <div className="markster-hero-grid">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="markster-hero-left">
              <div className="markster-brand-chip">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                <span><span className="markster-brand-name">Markster™</span> by The Compliers</span>
              </div>
              <h1 className="markster-hero-title">
                <span className="markster-title-line1">File today.</span>
                <span className="markster-title-line2">Defend early.</span>
                <span className="markster-title-line3">Own your brand.</span>
              </h1>
              <p className="markster-hero-description">
                Lawyer‑led, specialized trademark package for Indian startups &amp; MSMEs: with deep search &amp; risk opinion, form filing, examination reply, and 60‑day watch—wrapped with transparency.
              </p>
              <div className="markster-hero-buttons">
                <Button className="markster-btn-primary btn-caribbean-green" asChild>
                  <a href="#start">Connect Now</a>
                </Button>
                <p className="markster-hero-consult-note">Have questions? Let's connect over a FREE call.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="markster-hero-right">
              <div className="markster-hero-card-new">
                <div className="markster-card-item">
                  <div className="markster-card-icon indigo">
                    <Search className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="markster-card-title">Comprehensive Search</h3>
                    <p className="markster-card-text">Identical/phonetic/visual · Related classes · Strategy memo</p>
                  </div>
                </div>
                <div className="markster-card-divider" />
                <div className="markster-card-item">
                  <div className="markster-card-icon emerald">
                    <FileText className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="markster-card-title">Smart Filing (TM‑A)</h3>
                    <p className="markster-card-text">Spec drafting that balances breadth with survivability</p>
                  </div>
                </div>
                <div className="markster-card-divider" />
                <div className="markster-card-item">
                  <div className="markster-card-icon amber">
                    <AlertTriangle className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="markster-card-title">1 Examination Reply Included</h3>
                    <p className="markster-card-text">Arguments &amp; evidence; hearing brief if listed</p>
                  </div>
                </div>
                <div className="markster-card-divider" />
                <div className="markster-card-item">
                  <div className="markster-card-icon sky">
                    <ShieldCheck className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="markster-card-title">60‑day Trademark Watch</h3>
                    <p className="markster-card-text">Weekly bulletin scan · Early warnings · Action plan</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Features - What you get from Markster™ */}
      <Section className="markster-features-section markster-snap-section">
        <Container>
          <div className="markster-features-header">
            <h2 className="markster-features-title">What you get from Markster™</h2>
            <p className="markster-features-subtitle">From search to filing to early defence—everything required to launch without brand anxiety.</p>
          </div>
          <div className="markster-features-grid">
            {/* Card 1: Search & Analysis */}
            <div className="markster-feature-card">
              <div className="markster-feature-card-row">
                <div className="markster-feature-icon-pill">
                  <Search className="markster-feature-icon" aria-hidden="true" />
                </div>
                <h3 className="markster-feature-title">Search &amp; Analysis</h3>
              </div>
              <p className="markster-feature-description">Identical/phonetic/visual search across target &amp; related classes with a clear availability rating.</p>
            </div>

            {/* Card 2: Strategic Filing */}
            <div className="markster-feature-card">
              <div className="markster-feature-card-row">
                <div className="markster-feature-icon-pill">
                  <FileText className="markster-feature-icon" aria-hidden="true" />
                </div>
                <h3 className="markster-feature-title">Strategic Filing</h3>
              </div>
              <p className="markster-feature-description">Class mapping, specification drafting, TM-48, and e-filing with stamped acknowledgments.</p>
            </div>

            {/* Card 3: Drafting Reply */}
            <div className="markster-feature-card">
              <div className="markster-feature-card-row">
                <div className="markster-feature-icon-pill">
                  <AlertTriangle className="markster-feature-icon" aria-hidden="true" />
                </div>
                <h3 className="markster-feature-title">Drafting Reply</h3>
              </div>
              <p className="markster-feature-description">Substantive reply on Examination Report. Winnable inputs. Assistance for hearings.</p>
            </div>

            {/* Card 4: 60-day Watch */}
            <div className="markster-feature-card">
              <div className="markster-feature-card-row">
                <div className="markster-feature-icon-pill">
                  <Bell className="markster-feature-icon" aria-hidden="true" />
                </div>
                <h3 className="markster-feature-title">60-day Watch</h3>
              </div>
              <p className="markster-feature-description">Weekly bulletins scanned for conflicting marks; early-warning alerts.</p>
            </div>

            {/* Card 5: Use & Policing Kit */}
            <div className="markster-feature-card">
              <div className="markster-feature-card-row">
                <div className="markster-feature-icon-pill">
                  <Shield className="markster-feature-icon" aria-hidden="true" />
                </div>
                <h3 className="markster-feature-title">Use &amp; Policing Kit</h3>
              </div>
              <p className="markster-feature-description">™/® usage guide, website/footer specimens, brand policing SOP for your team.</p>
            </div>

            {/* Card 6: Scale Options */}
            <div className="markster-feature-card">
              <div className="markster-feature-card-row">
                <div className="markster-feature-icon-pill">
                  <Globe2 className="markster-feature-icon" aria-hidden="true" />
                </div>
                <h3 className="markster-feature-title">Scale Options</h3>
              </div>
              <p className="markster-feature-description">Extra classes, device/logo filing, oppositions, &amp; Madrid coordination as add-ons.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section className="markster-how-it-works-section markster-snap-section">
        <Container>
          <div className="markster-how-it-works-header">
            <h2 className="markster-how-it-works-title">How it works</h2>
            <p className="markster-how-it-works-subtitle">Clear steps. Clear ownership. Clear outcomes.</p>
          </div>
          <div className="markster-how-it-works-grid">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="markster-how-it-works-card"
            >
              <div className="markster-step-chip">
                <ChevronRight className="markster-step-icon" aria-hidden="true" />
                <span>Step 1</span>
              </div>
              <h3 className="markster-card-title-hiw">Kickoff &amp; Brand Audit</h3>
              <p className="markster-card-paragraph-hiw">30–40 min discovery; map classes, flag risks, documents checklist.</p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="markster-how-it-works-card"
            >
              <div className="markster-step-chip">
                <Search className="markster-step-icon" aria-hidden="true" />
                <span>Step 2</span>
              </div>
              <h3 className="markster-card-title-hiw">Search → Strategy</h3>
              <p className="markster-card-paragraph-hiw">Deep search across mark variants; availability &amp; recommendations.</p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="markster-how-it-works-card"
            >
              <div className="markster-step-chip">
                <ShieldCheck className="markster-step-icon" aria-hidden="true" />
                <span>Step 3</span>
              </div>
              <h3 className="markster-card-title-hiw">File &amp; Defend Early</h3>
              <p className="markster-card-paragraph-hiw">Draft specs, file TM-A, track; one exam reply included; 60-day watch.</p>
            </motion.div>
          </div>
          
          {/* Six feature icons below the cards */}
          <div className="markster-how-it-works-features">
            <div className="markster-hiw-feature-item">
              <Scale aria-hidden />
              <span>Services by Licensed Lawyers</span>
            </div>
            <div className="markster-hiw-feature-item">
              <Globe2 aria-hidden />
              <span>Fixed‑fee · Transparent timelines</span>
            </div>
            <div className="markster-hiw-feature-item">
              <Clock aria-hidden />
              <span>Priority turnaround options</span>
            </div>
            <div className="markster-hiw-feature-item">
              <Search aria-hidden />
              <span>Search memo in 48 hours</span>
            </div>
            <div className="markster-hiw-feature-item">
              <FileText aria-hidden />
              <span>TM-A filing in 72 hours</span>
            </div>
            <div className="markster-hiw-feature-item">
              <BellRing aria-hidden />
              <span>Monthly status updates</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Inclusions / Exclusions - Rebuilt */}
      <Section className="markster-included-not-included-section markster-snap-section">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-2xl font-bold md:text-3xl mb-2">Transparent, fixed‑fee pricing</h2>
            <p className="mt-2 text-gray-600">Official government fees vary by entity & class, billed at actual rates. We offer committed expertise for a fixed professional fee.</p>
          </div>
          <div className="markster-included-not-included-grid">
            {/* Left Column: Included */}
            <div className="markster-column">
              <h3 className="markster-column-heading">Included</h3>
              <ul className="markster-list">
                <li className="markster-list-item">
                  <CheckCircle className="markster-icon markster-icon-check" aria-hidden="true" />
                  <span className="markster-list-text">Identical/phonetic/visual searches with risk memo</span>
                </li>
                <li className="markster-list-item">
                  <CheckCircle className="markster-icon markster-icon-check" aria-hidden="true" />
                  <span className="markster-list-text">Specification drafting &amp; TM-A filing (word or device)</span>
                </li>
                <li className="markster-list-item">
                  <CheckCircle className="markster-icon markster-icon-check" aria-hidden="true" />
                  <span className="markster-list-text">One examination reply (arguments/evidence)</span>
                </li>
                <li className="markster-list-item">
                  <CheckCircle className="markster-icon markster-icon-check" aria-hidden="true" />
                  <span className="markster-list-text">60-day trademark watch &amp; early-warning alerts</span>
                </li>
                <li className="markster-list-item">
                  <CheckCircle className="markster-icon markster-icon-check" aria-hidden="true" />
                  <span className="markster-list-text">™/® usage guide, policing SOP, monthly status updates</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Not Included */}
            <div className="markster-column">
              <h3 className="markster-column-heading">Not Included (add-ons available)</h3>
              <ul className="markster-list">
                <li className="markster-list-item">
                  <XCircleIcon className="markster-icon markster-icon-cross" aria-hidden="true" />
                  <span className="markster-list-text">Government/statutory fees (charged at cost)</span>
                </li>
                <li className="markster-list-item">
                  <XCircleIcon className="markster-icon markster-icon-cross" aria-hidden="true" />
                  <span className="markster-list-text">Hearing appearances/arguing before Registry</span>
                </li>
                <li className="markster-list-item">
                  <XCircleIcon className="markster-icon markster-icon-cross" aria-hidden="true" />
                  <span className="markster-list-text">Oppositions (filing/defence beyond counter-statement)</span>
                </li>
                <li className="markster-list-item">
                  <XCircleIcon className="markster-icon markster-icon-cross" aria-hidden="true" />
                  <span className="markster-list-text">Multiple examination cycles, affidavits, appeals/rectifications</span>
                </li>
                <li className="markster-list-item">
                  <XCircleIcon className="markster-icon markster-icon-cross" aria-hidden="true" />
                  <span className="markster-list-text">Foreign/Madrid filings (available separately)</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="faq-section markster-snap-section">
        <Container>
          <h2 className="faq-headline">Frequently asked questions (FAQs)</h2>
          <MarksterFAQSection />
        </Container>
      </Section>

      {/* Start / Contact - "Ready to file your mark this week?" */}
      <Section id="start" className="markster-cta-section markster-snap-section">
        <Container className="markster-cta-container">
          <div className="markster-cta-grid">
            {/* Left Column: Copy + Bullets + CTAs */}
            <div className="markster-cta-left">
              <h2 className="markster-cta-headline">Ready to file your mark this week?</h2>
              <p className="markster-cta-paragraph">
                We'll run the search, map classes, and file cleanly—then watch the journals for conflicts. You get clear timelines and a status dashboard.
              </p>
              
              {/* Checklist with check icon chips */}
              <ul className="markster-cta-checklist">
                <li className="markster-checklist-item">
                  <div className="markster-check-chip">
                    <CheckCircle2 className="markster-check-icon" aria-hidden="true" />
                  </div>
                  <span>Search memo in 48 hours</span>
                </li>
                <li className="markster-checklist-item">
                  <div className="markster-check-chip">
                    <CheckCircle2 className="markster-check-icon" aria-hidden="true" />
                  </div>
                  <span>Drafts ready in 72 hours post-docs</span>
                </li>
                <li className="markster-checklist-item">
                  <div className="markster-check-chip">
                    <CheckCircle2 className="markster-check-icon" aria-hidden="true" />
                  </div>
                  <span>Monthly status updates + early alerts</span>
                </li>
              </ul>
              
              {/* Helper line */}
              <p className="markster-cta-helper">Still have a query? Speak to a lawyer over a 20‑min call.</p>
              
              {/* CTA Buttons - pill shaped */}
              <div className="markster-cta-buttons">
                <a href="/book-a-call" className="markster-cta-btn markster-cta-btn-solid btn-caribbean-green">
                  Appointment
                </a>
                <button 
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('openCompliersBot'))}
                  className="markster-cta-btn markster-cta-btn-solid"
                  aria-label="Open chat to speak with a trademark lawyer"
                >
                  Let's Chat
                </button>
              </div>
              
              {/* Ethical note */}
              <p className="markster-cta-ethical">
                Ethical Note: We provide factual educational information — no comparative claims or solicitations.
              </p>
            </div>
            
            {/* Right Column: Quick intake card */}
            <div className="markster-quick-intake-card">
              <h3 className="markster-intake-title">Quick intake (we ask):</h3>
              <ol className="markster-intake-list">
                <li>Applicant details &amp; fee category (Individual/Startup/MSME/Company)</li>
                <li>Brand name/logo &amp; high-resolution asset (for device marks)</li>
                <li>Goods/services &amp; first-use date (if any)</li>
                <li>TM-48 (Authorization) and KYC (as applicable)</li>
                <li>Declaration of use and ownership</li>
              </ol>
              <div className="markster-intake-contact">
                <div className="markster-contact-item">
                  <Mail className="markster-contact-icon" aria-hidden="true" />
                  <a href="mailto:markster@thecompliers.com" className="markster-contact-link">
                    markster@thecompliers.com
                  </a>
                </div>
                <div className="markster-contact-item">
                  <FaWhatsapp className="markster-contact-icon" aria-hidden="true" />
                  <a href={`https://wa.me/${whatsappNumber}`} className="markster-contact-link">
                    Connect on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

    </div>
  );
}
