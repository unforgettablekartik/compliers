"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Search, FileText, AlertTriangle, Globe2, Scale, Clock, BellRing, CheckCircle2, XCircle, ChevronRight, Mail, Target, Zap, Eye, CheckCircle, XCircle as XCircleIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// --- Utility components ---
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`w-full py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 md:px-6 ${className}`}>{children}</div>
);

// --- Main Page ---
export default function MarksterLanding() {
  const PRO_SINGLE = 9900;
  const PRO_PLUS = 17900;
  const PRO_SCALE = 34900; // starting

  return (
    <div className="markster-page-container relative min-h-screen bg-white text-gray-900">
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
            offers: [
              { "@type": "Offer", name: "Single Class (Word)", priceCurrency: "INR", price: 9900 },
              { "@type": "Offer", name: "Markster™ Plus", priceCurrency: "INR", price: 17900 },
              { "@type": "Offer", name: "Scale (starting)", priceCurrency: "INR", price: 34900 }
            ],
          }),
        }}
      />
      {/* Hero and other sections ... */}
      <Section className="markster-hero">
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
                Lawyer‑led, fixed‑fee trademark package for Indian startups &amp; MSMEs: deep search &amp; risk opinion, smart class specs, filing (TM‑A), one examination reply, and 60‑day watch—wrapped in clear timelines and a status dashboard.
              </p>
              <div className="markster-hero-buttons">
                <Button className="markster-btn-primary" asChild>
                  <a href="#start">Get started</a>
                </Button>
                <Button variant="outline" className="markster-btn-secondary" asChild>
                  <a href="#pricing">See pricing</a>
                </Button>
              </div>
              <div className="markster-hero-benefits">
                <div className="markster-benefit-item">
                  <Search className="h-4 w-4" aria-hidden />
                  <span>Search memo in 48 hours</span>
                </div>
                <div className="markster-benefit-item">
                  <FileText className="h-4 w-4" aria-hidden />
                  <span>TM-A filing in 72 hours</span>
                </div>
                <div className="markster-benefit-item">
                  <BellRing className="h-4 w-4" aria-hidden />
                  <span>Monthly status updates</span>
                </div>
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

      {/* Trust Bar - Single Line */}
      <Section className="py-8 md:py-12">
        <Container>
          <div className="markster-trust-bar-single-line">
            <div className="markster-trust-item-compact">
              <Scale className="h-4 w-4 flex-none" aria-hidden />
              <span>Services by Licensed Lawyers</span>
            </div>
            <div className="markster-trust-item-compact">
              <Globe2 className="h-4 w-4 flex-none" aria-hidden />
              <span>Fixed‑fee · Transparent timelines</span>
            </div>
            <div className="markster-trust-item-compact">
              <ShieldCheck className="h-4 w-4 flex-none" aria-hidden />
              <span>Dossier &amp; status dashboard access</span>
            </div>
            <div className="markster-trust-item-compact">
              <Clock className="h-4 w-4 flex-none" aria-hidden />
              <span>Priority turnaround options</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features - What you get from Markster™ - Updated */}
      <Section className="bg-gray-50">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-2xl font-bold md:text-3xl mb-2">What you get from Markster™</h2>
            <p className="mt-2 text-gray-600">From search to filing to early defence—everything required to launch without brand anxiety.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            <Card className="rounded-2xl border-2 border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all p-6">
              <div className="flex flex-col items-start">
                <div className="rounded-2xl bg-gray-100 p-3 mb-4">
                  <Search className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-semibold text-lg mb-2">Trademark Search</h3>
                <p className="text-gray-600">Comprehensive conflict check across identical, similar, and phonetically alike marks in relevant classes.</p>
              </div>
            </Card>

            <Card className="rounded-2xl border-2 border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all p-6">
              <div className="flex flex-col items-start">
                <div className="rounded-2xl bg-gray-100 p-3 mb-4">
                  <FileText className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-semibold text-lg mb-2">TM-A Filing</h3>
                <p className="text-gray-600">Clean application with correct class mapping, goods/services descriptions, and Vienna codes (for device marks).</p>
              </div>
            </Card>

            <Card className="rounded-2xl border-2 border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all p-6">
              <div className="flex flex-col items-start">
                <div className="rounded-2xl bg-gray-100 p-3 mb-4">
                  <AlertTriangle className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-semibold text-lg mb-2">Examination Reply</h3>
                <p className="text-gray-600">One comprehensive response to objections raised by the examiner. Hearing brief also provided.</p>
              </div>
            </Card>

            <Card className="rounded-2xl border-2 border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all p-6">
              <div className="flex flex-col items-start">
                <div className="rounded-2xl bg-gray-100 p-3 mb-4">
                  <Eye className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-semibold text-lg mb-2">Journal Watch</h3>
                <p className="text-gray-600">60 or 90-day monitoring of the TM Journal for conflicting marks filed by third parties.</p>
              </div>
            </Card>

            <Card className="rounded-2xl border-2 border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all p-6">
              <div className="flex flex-col items-start">
                <div className="rounded-2xl bg-gray-100 p-3 mb-4">
                  <ShieldCheck className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-semibold text-lg mb-2">Status Dashboard</h3>
                <p className="text-gray-600">Live dashboard with timelines, application status, and any alerts or action items.</p>
              </div>
            </Card>

            <Card className="rounded-2xl border-2 border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all p-6">
              <div className="flex flex-col items-start">
                <div className="rounded-2xl bg-gray-100 p-3 mb-4">
                  <Target className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dossier Access</h3>
                <p className="text-gray-600">All correspondence, forms, and evidence compiled in one place—yours to keep.</p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section className="markster-how-it-works-section">
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
              <p className="markster-card-paragraph-hiw">Deep search across mark variants; availability rating &amp; recommendations.</p>
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
        </Container>
      </Section>

      {/* Inclusions / Exclusions - Rebuilt */}
      <Section className="markster-included-not-included-section">
        <Container>
          <div className="markster-included-not-included-grid">
            {/* Left Column: Included */}
            <div className="markster-column">
              <h3 className="markster-column-heading">Included</h3>
              <ul className="markster-list">
                <li className="markster-list-item">
                  <CheckCircle className="markster-icon markster-icon-check" aria-hidden="true" />
                  <span className="markster-list-text">Kickoff call &amp; class mapping</span>
                </li>
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
                <li className="markster-list-item">
                  <CheckCircle className="markster-icon markster-icon-check" aria-hidden="true" />
                  <span className="markster-list-text">Dossier access &amp; time-stamped filings</span>
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

      {/* Pricing */}
      <Section id="pricing" className="bg-gradient-to-b from-white to-sky-50">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-2xl font-bold md:text-3xl mb-2">Transparent, fixed‑fee pricing</h2>
            <p className="mt-2 text-gray-600">Official government fees vary by entity & per class—billed at cost. Professional fees below are for our work.</p>
          </div>
          <div className="markster-pricing-grid">
            {/* Single Class */}
            <Card className="markster-pricing-card">
              <div className="markster-pricing-card-content">
                <CardHeader>
                  <CardTitle>Single Class – Word Mark</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="markster-pricing-amount">₹{PRO_SINGLE.toLocaleString("en-IN")}</p>
                  <p className="mt-2 text-gray-600">Professional fee · Search + TM‑A filing + 1 exam reply + 60‑day watch</p>
                  <div className="markster-govt-fee-card">
                    <div className="markster-govt-fee-heading">Government fee (per class, at cost)</div>
                    <div className="markster-govt-fee-slabs">
                      <div className="markster-govt-fee-row">
                        <div>Individual/Startup/MSME</div>
                        <div className="markster-govt-fee-value">₹4,500</div>
                      </div>
                      <div className="markster-govt-fee-row">
                        <div>Company/LLP/Others</div>
                        <div className="markster-govt-fee-value">₹9,000</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
              <div className="markster-pricing-cta">
                <a href="#start">Book Now</a>
              </div>
            </Card>

            {/* Plus (Markster) */}
            <Card className="markster-pricing-card markster-pricing-card-popular">
              <div className="markster-popular-badge-top">Most Popular</div>
              <div className="markster-pricing-card-content">
                <CardHeader>
                  <CardTitle>Markster™ Plus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="markster-pricing-amount">₹{PRO_PLUS.toLocaleString("en-IN")}</p>
                  <ul className="markster-pricing-list">
                    <li><strong>Everything in Single Class</strong></li>
                    <li>+ One extra class (same mark) <span className="text-gray-500">(govt fee per extra class)</span></li>
                    <li>+ Device/logo filing (Vienna coding)</li>
                    <li>+ Extended watch (90 days)</li>
                  </ul>
                </CardContent>
              </div>
              <div className="markster-pricing-cta">
                <a href="#start">Choose Plus</a>
              </div>
            </Card>

            {/* Scale/Global */}
            <Card className="markster-pricing-card">
              <div className="markster-pricing-card-content">
                <CardHeader>
                  <CardTitle>Scale &amp; Global</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="markster-pricing-amount-scale">From ₹{PRO_SCALE.toLocaleString("en-IN")}</p>
                  <p className="mt-2 text-gray-600">Multi‑class or word + device, priority turnaround, hearing brief. Madrid/foreign filings, oppositions &amp; hearings are quoted separately.</p>
                </CardContent>
              </div>
              <div className="markster-pricing-cta markster-pricing-cta-outline">
                <a href="#contact">Talk to us</a>
              </div>
            </Card>
          </div>
          <p className="mt-12 text-center text-xs text-gray-600">*Official fees per IP India First Schedule. We pass them at actuals. Taxes extra on professional fees.</p>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center" style={{ marginBottom: "24px" }}>
            <h2
              className="font-bold"
              style={{ 
                fontFamily: 'Times New Roman, Times, serif',
                fontSize: "clamp(24px, 5vw, 36px)",
                fontWeight: "800"
              }}
            >
              Frequently asked questions (FAQs)
            </h2>
          </div>
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I use ™ right after filing?</AccordionTrigger>
                <AccordionContent>
                  Yes. You may use ™ immediately after filing. Switch to ® only after registration is granted.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Do I need use evidence to file?</AccordionTrigger>
                <AccordionContent>
                  Not necessarily. You can file on a "proposed to be used" basis. Use evidence strengthens examination/opposition stages.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How many classes should I choose?</AccordionTrigger>
                <AccordionContent>
                  Select classes that reflect actual/near term (3–12 months) goods/services. We map this during kickoff to avoid waste.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Will you attend hearings?</AccordionTrigger>
                <AccordionContent>
                  Hearing appearance is an add on. We include a hearing brief and can appear/brief counsel upon request.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can you help with global protection?</AccordionTrigger>
                <AccordionContent>
                  Yes. We coordinate Madrid Protocol and national filings with partner counsel and timeline planning.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* Start / Contact - "Ready to file your mark this week?" */}
      <Section id="start" className="markster-cta-section">
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
                <a href="/contact" className="markster-cta-btn markster-cta-btn-solid">
                  Book a FREE consultation with Trademark Lawyer
                </a>
              </div>
              
              {/* Ethical note */}
              <p className="markster-cta-ethical">
                Ethical note: We provide factual, educational information and fixed-fee options—no comparative claims or solicitations.
              </p>
            </div>
            
            {/* Right Column: Quick intake card */}
            <div className="markster-quick-intake-card">
              <h3 className="markster-intake-title">Quick intake (what we'll ask)</h3>
              <ol className="markster-intake-list">
                <li>Applicant details &amp; fee category (Individual/Startup/MSME/Company)</li>
                <li>Brand name/logo &amp; high-res asset (for device marks)</li>
                <li>Goods/services &amp; first-use date (if any)</li>
                <li>TM-48 (Authorization) and KYC (as applicable)</li>
              </ol>
              <div className="markster-intake-contact">
                <div className="markster-contact-item">
                  <Mail className="markster-contact-icon" aria-hidden="true" />
                  <a href="mailto:markster@thecompliers.info" className="markster-contact-link">
                    markster@thecompliers.info
                  </a>
                </div>
                <div className="markster-contact-item">
                  <FaWhatsapp className="markster-contact-icon" aria-hidden="true" />
                  <a href="https://wa.me/91XXXXXXXXXXX" className="markster-contact-link">
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
