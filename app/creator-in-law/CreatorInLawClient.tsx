"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Shield, 
  FileText, 
  Scale, 
  AlertTriangle, 
  Users, 
  HandshakeIcon,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Mail,
  CircleHelp
} from "lucide-react";
import { FaWhatsapp, FaYoutube, FaInstagram, FaLinkedin, FaTiktok, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RiskOMeter from "@/components/RiskOMeter";

// --- Utility components ---
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`w-full py-12 md:py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 md:px-6 lg:px-8 ${className}`}>{children}</div>
);

// FAQ Accordion Item Component
function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
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

// --- Main Page ---
export default function CreatorInLawLanding() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919540101740';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="creator-in-law-page-container relative min-h-screen bg-white text-gray-900">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Creator in Law — Legal Support for Brands Running Influencer Campaigns",
            provider: { "@type": "LegalService", name: "The Compliers" },
            areaServed: "IN",
            serviceType: "Contract reviews, compliance guidance, campaign protection for brands and agencies",
          }),
        }}
      />

      {/* 1. HERO SECTION */}
      <Section className="creator-hero">
        <Container>
          <div className="creator-hero-grid">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="creator-hero-left"
            >
              <div className="creator-brand-chip">
                <Shield className="h-4 w-4" aria-hidden />
                <span><span className="creator-brand-name">Creator in Law</span> by The Compliers</span>
              </div>
              <h1 className="creator-hero-title">
                Legal Protection for Brands Sponsoring Influencers
              </h1>

              <p className="creator-hero-description">
                The Compliers helps brands, sponsors, and agencies navigate influencer partnerships with confidence — ensuring compliance, protecting your investment, and minimizing legal risks in creator collaborations.
              </p>

              <div className="creator-hero-buttons">
                <Button className="creator-btn-primary btn-caribbean-green" asChild>
                  <a href="/book-a-call">Connect Now</a>
                </Button>
              </div>
              
              <p className="creator-hero-caption">
                Free 20-minute discovery call. No obligations, just clarity.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="creator-hero-right"
            >
              <RiskOMeter />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 2. PROBLEM / PAIN POINTS SECTION */}
      <Section className="bg-gray-50">
        <Container>
          <div className="creator-problem-grid">
            <div className="creator-problem-left">
              <h2 className="creator-section-heading mb-4">
                Influencer campaigns are scaling. So are the risks.
              </h2>
              <p className="creator-section-paragraph">
                We help brands navigate influencer agreements, disclosure requirements, and platform policies. Running campaigns without proper legal oversight exposes you to significant risks. That's where we come in.
              </p>
              
              <div className="creator-social-icons">
                <FaYoutube size={24} role="img" aria-label="YouTube" />
                <FaInstagram size={24} role="img" aria-label="Instagram" />
                <FaLinkedin size={24} role="img" aria-label="LinkedIn" />
                <FaTiktok size={24} role="img" aria-label="TikTok" />
                <FaFacebook size={24} role="img" aria-label="Facebook" />
                <FaXTwitter size={24} role="img" aria-label="X (Twitter)" />
              </div>
              
              <p className="creator-support-text text-center">
                Whether you're running micro-influencer campaigns or partnering with top-tier talent, you're under tremendous risk.
              </p>
            </div>
            
            <div className="creator-problem-cards">
              <div className="creator-problem-card">
                <h3 className="creator-problem-title creator-problem-title-with-icon">
                  <CircleHelp className="creator-problem-icon-glyph" aria-hidden />
                  <span>Campaign liability risks</span>
                </h3>
                <p className="creator-problem-description">Unclear deliverables, missing compliance clauses, and inadequate brand protection in influencer agreements.</p>
              </div>
              
              <div className="creator-problem-card creator-legal-counsel-card">
                <h3 className="creator-problem-title creator-problem-title-with-icon">
                  <HandshakeIcon className="creator-counsel-icon" aria-hidden />
                  <span>Legal Counsel for:</span>
                </h3>
                <ul className="creator-legal-counsel-list">
                  <li>Brands &amp; Sponsors</li>
                  <li>Marketing Agencies</li>
                  <li>Talent Management Firms</li>
                  <li>PR Agencies</li>
                  <li>Digital Marketing Teams</li>
                  <li>E-commerce Brands</li>
                  <li>Advertising Agencies</li>
                  <li>Campaign Managers</li>
                  <li>Media Buying Agencies</li>
                  <li>Brand Partnerships Teams</li>
                </ul>
              </div>
              
              <div className="creator-problem-card">
                <h3 className="creator-problem-title creator-problem-title-with-icon">
                  <CircleHelp className="creator-problem-icon-glyph" aria-hidden />
                  <span>Regulatory compliance</span>
                </h3>
                <p className="creator-problem-description">Navigating ASCI guidelines, disclosure requirements, and advertising standards across influencer partnerships.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. WHY THE COMPLIERS – TRUST & DIFFERENTIATION */}
      <Section className="creator-trust-section">
        <Container>
          <div className="text-center mb-12">
            <h2 className="creator-section-heading text-white mb-8">
              Why brands &amp; agencies choose The Compliers
            </h2>
          </div>
          
          <div className="creator-trust-grid">
            <div className="creator-trust-card">
              <Users className="creator-trust-icon" aria-hidden />
              <h3 className="creator-trust-title">Brand protection without friction</h3>
              <p className="creator-trust-description">
                We protect your investment, reputation, and campaign outcomes while maintaining positive influencer relationships.
              </p>
            </div>

            <div className="creator-trust-card">
              <Shield className="creator-trust-icon" aria-hidden />
              <h3 className="creator-trust-title">Deep focus on influencer marketing law</h3>
              <p className="creator-trust-description">
                We specialize in brand-influencer partnerships, campaign compliance, platform policies, and advertising regulations.
              </p>
            </div>

            <div className="creator-trust-card">
              <Lightbulb className="creator-trust-icon" aria-hidden />
              <h3 className="creator-trust-title">Plain-language, actionable advice</h3>
              <p className="creator-trust-description">
                No 20-page memos. You get clear summaries, redlined contracts, and ready-to-send responses.
              </p>
            </div>

            <div className="creator-trust-card">
              <HandshakeIcon className="creator-trust-icon" aria-hidden />
              <h3 className="creator-trust-title">Scalable partnership support</h3>
              <p className="creator-trust-description">
                Think of us as your external legal team — supporting you from pilot campaigns to multi-platform influencer programs.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. SERVICES OVERVIEW – CARDS GRID */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="creator-section-heading mb-3">
              What we do for brands &amp; agencies
            </h2>
          </div>
          
          <div className="creator-services-grid">
            <div className="creator-service-card">
              <div className="creator-service-header">
                <FileText className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Influencer Contract Drafting &amp; Review</h3>
              </div>
              <p className="creator-service-description">
                We draft and review influencer agreements to protect your brand, ensure clear deliverables, and include proper compliance safeguards.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <HandshakeIcon className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Partnership Negotiation Support</h3>
              </div>
              <p className="creator-service-description">
                We support your team in negotiating favorable terms on usage rights, exclusivity, deliverables, and payment structures with influencers.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <Shield className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Campaign Compliance &amp; Risk Management</h3>
              </div>
              <p className="creator-service-description">
                Ensure your influencer campaigns meet ASCI guidelines, disclosure requirements, and advertising standards to avoid regulatory penalties.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <Scale className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Content Rights &amp; Usage Management</h3>
              </div>
              <p className="creator-service-description">
                Secure appropriate usage rights for campaign content, manage licensing terms, and protect your brand's interests in creator-generated material.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <AlertTriangle className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Dispute Resolution &amp; Brand Protection</h3>
              </div>
              <p className="creator-service-description">
                Handle contract breaches, underdelivery, compliance violations, or reputational issues with influencer partners professionally and legally.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <TrendingUp className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Program Structuring &amp; Policy Development</h3>
              </div>
              <p className="creator-service-description">
                Build scalable influencer marketing programs with proper legal frameworks, standard templates, and compliance policies.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. HOW IT WORKS – STEP TIMELINE */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="creator-section-heading mb-3">
              Legal support designed for influencer marketing programs
            </h2>
          </div>
          
          <div className="creator-steps-timeline">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="creator-step"
            >
              <div className="creator-step-number">1</div>
              <h3 className="creator-step-title">Share your campaign details or contract</h3>
              <p className="creator-step-description">
                Share your influencer agreements or campaign requirements. We maintain strict confidentiality with NDAs as needed.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="creator-step"
            >
              <div className="creator-step-number">2</div>
              <h3 className="creator-step-title">We analyze &amp; identify gaps</h3>
              <p className="creator-step-description">
                Our team reviews contracts for brand protection gaps, compliance risks, and optimization opportunities.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="creator-step"
            >
              <div className="creator-step-number">3</div>
              <h3 className="creator-step-title">Receive actionable recommendations</h3>
              <p className="creator-step-description">
                Get clear guidance on contract improvements, compliance requirements, and risk mitigation strategies.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="creator-step"
            >
              <div className="creator-step-number">4</div>
              <h3 className="creator-step-title">Scale with ongoing support</h3>
              <p className="creator-step-description">
                Establish a retainer for continuous support across campaigns, contracts, and compliance as your program grows.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <div className="creator-colorful-box">
              <p className="creator-colorful-text">
                Explore how ongoing legal support protects your brand and keeps you harmless.
              </p>
            </div>
            <div className="creator-share-btn-container">
              <Button className="creator-btn-primary" asChild>
                <a href="/book-a-call">Share your requirements</a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. RETAINERSHIP MODEL SECTION */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-8">
            <h2 className="creator-section-heading mb-4">
              Flexible retainers aligned with your campaign scale.
            </h2>
            <p className="creator-section-paragraph max-w-4xl mx-auto mb-8">
              Instead of one-size-fits-all fees, we work with brands and agencies on customized retainers that match your campaign volume, complexity, and growth stage.
              Whether you're running a few influencer partnerships per month or managing large-scale multi-platform programs, we design a plan that provides predictable legal support without surprise invoices.
            </p>
          </div>

          <div className="creator-retainer-card">
            <ul className="creator-retainer-list">
              <li className="creator-retainer-item">
                <CheckCircle2 className="creator-retainer-icon" aria-hidden />
                <span>Fixed monthly retainers calibrated to your campaign volume</span>
              </li>
              <li className="creator-retainer-item">
                <CheckCircle2 className="creator-retainer-icon" aria-hidden />
                <span>Comprehensive support: contract drafting, compliance review &amp; advisory</span>
              </li>
              <li className="creator-retainer-item">
                <CheckCircle2 className="creator-retainer-icon" aria-hidden />
                <span>Priority turnaround on time-sensitive influencer partnerships</span>
              </li>
              <li className="creator-retainer-item">
                <CheckCircle2 className="creator-retainer-icon" aria-hidden />
                <span>Scalable support including dispute resolution &amp; program structuring</span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>



      {/* 9. FAQ SECTION */}
      <Section id="faq" className="faq-section">
        <Container>
          <div className="text-center mb-12">
            <h2 className="faq-headline">Frequently asked questions</h2>
          </div>
          
          <div className="faq-container">
            <FAQItem
              question="Do you only work with large brands?"
              answer="No. We support startups, mid-sized companies, and large enterprises. What matters is that you're running influencer campaigns professionally and want proper legal protection."
              isOpen={openFaqIndex === 0}
              onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
            />
            
            <FAQItem
              question="Can you help if we work with international influencers?"
              answer="Yes, we regularly handle cross-border influencer partnerships. We'll identify jurisdiction-specific compliance requirements and suggest appropriate contractual protections."
              isOpen={openFaqIndex === 1}
              onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
            />
            
            <FAQItem
              question="What if we just need a one-time contract review?"
              answer="Absolutely. We can start with a single campaign or contract review. Once you see the value, we can discuss an ongoing retainer for your regular influencer partnerships."
              isOpen={openFaqIndex === 2}
              onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
            />
            
            <FAQItem
              question="How fast can you review influencer contracts?"
              answer="For retainer clients, we provide priority turnaround on urgent campaigns. Typical turnaround is 24-48 hours. We'll confirm specific timelines on our discovery call."
              isOpen={openFaqIndex === 3}
              onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
            />
            
            <FAQItem
              question="Will you communicate directly with influencers or their management?"
              answer="When needed and with your approval, we can handle legal communications with influencers or their representatives, ensuring professional and legally sound negotiations."
              isOpen={openFaqIndex === 4}
              onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
            />
          </div>
        </Container>
      </Section>

      {/* 10. FINAL CTA / CLOSING SECTION */}
      <Section id="contact" className="creator-final-cta">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="creator-final-cta-heading">
              Protect your brand. Protect your investment.
            </h2>
            <p className="creator-final-cta-subheading">
              One poorly structured influencer contract or compliance violation can damage your brand reputation and budget. Let's ensure your campaigns are legally sound and strategically protected.
            </p>
            
            <div className="creator-final-cta-buttons">
              <Button className="creator-btn-primary creator-btn-large btn-caribbean-green" asChild>
                <a href="/book-a-call">Appointment</a>
              </Button>
              <Button 
                className="creator-btn-primary creator-btn-large" 
                onClick={() => window.dispatchEvent(new Event('openCompliersBot'))}
              >
                Let's Chat
              </Button>
            </div>

            <div className="creator-contact-methods">
              <div className="creator-contact-item">
                <Mail className="creator-contact-icon" aria-hidden />
                <a href="mailto:connect@thecompliers.com" className="creator-contact-link">
                  connect@thecompliers.com
                </a>
              </div>
              <div className="creator-contact-item">
                <FaWhatsapp className="creator-contact-icon" aria-hidden />
                <a href={`https://wa.me/${whatsappNumber}`} className="creator-contact-link">
                  Connect on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
