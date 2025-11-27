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
  Mail,
  CircleHelp
} from "lucide-react";
import { FaWhatsapp, FaYoutube, FaInstagram, FaLinkedin, FaTiktok, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// --- Utility components ---
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`w-full py-12 md:py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 md:px-6 lg:px-8 ${className}`}>{children}</div>
);

// --- Main Page ---
export default function CreatorInLawLanding() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919540101740';

  return (
    <div className="creator-in-law-page-container relative min-h-screen bg-white text-gray-900">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Creator in Law — Legal Support for Influencers & Creators",
            provider: { "@type": "LegalService", name: "The Compliers" },
            areaServed: "IN",
            serviceType: "Contract reviews, compliance guidance, IP protection for creators",
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
                Legal armour for content creators &amp; influencers.
              </h1>

              <p className="creator-hero-description">
                The Compliers helps you decode brand deals, protect your content, and stay compliant — so you can focus on content creation and not contracts and legal verification.
              </p>

              <div className="creator-hero-buttons">
                <Button className="creator-btn-primary" asChild>
                  <a href="#contact">Connect Now</a>
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
              <div className="creator-hero-card">
                <div className="creator-card-item">
                  <div className="creator-card-icon indigo">
                    <FileText className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="creator-card-title">Minimize legal risks</h3>
                    <p className="creator-card-text">Riskproof contracts · Easy interpretations · Red flags highlighted</p>
                  </div>
                </div>
                <div className="creator-card-divider" />
                <div className="creator-card-item">
                  <div className="creator-card-icon pink">
                    <Scale className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="creator-card-title">Flexible Retainership</h3>
                    <p className="creator-card-text">Fixed monthly fees · Priority turnaround · No surprise invoices</p>
                  </div>
                </div>
                <div className="creator-card-divider" />
                <div className="creator-card-item">
                  <div className="creator-card-icon emerald">
                    <Shield className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="creator-card-title">IP Support</h3>
                    <p className="creator-card-text">Trademark & Copyright · IP infringement protection · Defence on disputes</p>
                  </div>
                </div>
              </div>
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
                Brand deals are getting bigger. So are the risks.
              </h2>
              <p className="creator-section-paragraph">
                <span style={{ color: '#D9A3A5', fontWeight: 'bold' }}>To act is your expertise! Contract is ours.</span>
                <br />
                Let us handle complex contracts, disclosure rules, and content policies. Most creators still sign whatever is sent to them. That's where we come in.
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
                Whether you're at 50k or 5M followers, your contracts and compliance need to evolve with your growth.
              </p>
            </div>
            
            <div className="creator-problem-cards">
              <div className="creator-problem-card">
                <h3 className="creator-problem-title creator-problem-title-with-icon">
                  <CircleHelp className="creator-problem-icon-glyph" aria-hidden />
                  <span>Unclear contracts</span>
                </h3>
                <p className="creator-problem-description">Complex legalese. Vague terms. Safety compromised. No idea what you are signing up for.</p>
              </div>
              
              <div className="creator-problem-card creator-legal-counsel-card">
                <h3 className="creator-problem-title creator-problem-title-with-icon">
                  <HandshakeIcon className="creator-counsel-icon" aria-hidden />
                  <span>Legal Counsel for:</span>
                </h3>
                <ul className="creator-legal-counsel-list">
                  <li>Content Creators</li>
                  <li>Influencers</li>
                  <li>Managers and Agencies</li>
                  <li>YouTubers</li>
                  <li>Artists</li>
                  <li>Celebrities</li>
                  <li>Podcasters</li>
                  <li>Freelancers</li>
                  <li>Media Intermediaries</li>
                  <li>Anchors or Collaborators</li>
                </ul>
              </div>
              
              <div className="creator-problem-card">
                <h3 className="creator-problem-title creator-problem-title-with-icon">
                  <CircleHelp className="creator-problem-icon-glyph" aria-hidden />
                  <span>Compliance anxiety</span>
                </h3>
                <p className="creator-problem-description">Worried over content censorship, disclosures, guidelines, regulations, and legal provisions.</p>
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
              Why creators choose The Compliers
            </h2>
          </div>
          
          <div className="creator-trust-grid">
            <div className="creator-trust-card">
              <Users className="creator-trust-icon" aria-hidden />
              <h3 className="creator-trust-title">Creator-first, not brand-first</h3>
              <p className="creator-trust-description">
                Our job is to protect your interests — your content, your time, your reputation.
              </p>
            </div>

            <div className="creator-trust-card">
              <Shield className="creator-trust-icon" aria-hidden />
              <h3 className="creator-trust-title">Deep focus on influencer &amp; digital law</h3>
              <p className="creator-trust-description">
                We live in the world of brand deals, endorsements, platform policies and evolving regulations.
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
              <h3 className="creator-trust-title">Reliable, long-term partnership</h3>
              <p className="creator-trust-description">
                Think of us as your external legal desk — on your side as you grow from your first deal to your fiftieth.
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
              What we do for influencers &amp; creators
            </h2>
          </div>
          
          <div className="creator-services-grid">
            <div className="creator-service-card">
              <div className="creator-service-header">
                <FileText className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Brand Deal Contract Review</h3>
              </div>
              <p className="creator-service-description">
                We review your collaboration and campaign agreements, highlight red flags in plain English, and suggest edits you can use directly with brands or agencies.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <HandshakeIcon className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Negotiation Support</h3>
              </div>
              <p className="creator-service-description">
                Don't want to sound "difficult"? We help you push back smartly on usage rights, exclusivity, payment terms, and penalties — without burning relationships.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <Shield className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Risk &amp; Compliance</h3>
              </div>
              <p className="creator-service-description">
                Guidance on disclosures, endorsements, and advertising rules so you don't accidentally violate ASCI or consumer guidelines while promoting products.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <Scale className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">IP &amp; Content Ownership</h3>
              </div>
              <p className="creator-service-description">
                Clarify who owns your videos, photos, scripts, and likeness. Protect your creator name and ensure brands don't overreach on perpetual or global rights.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <AlertTriangle className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Disputes &amp; Claims Support</h3>
              </div>
              <p className="creator-service-description">
                From strongly worded legal notices to strategy on resolving non-payment, misrepresentation, or breach issues — we help you respond with confidence.
              </p>
            </div>

            <div className="creator-service-card">
              <div className="creator-service-header">
                <TrendingUp className="creator-service-icon" style={{ color: '#d9a3a5' }} aria-hidden />
                <h3 className="creator-service-title">Business Structuring Advice</h3>
              </div>
              <p className="creator-service-description">
                Light-touch guidance on when and how to formalise your creator business so you're set up for long-term growth.
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
              Simple, streamlined, and built around your content schedule.
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
              <h3 className="creator-step-title">Share your contract or concern</h3>
              <p className="creator-step-description">
                Upload your agreement or tell us what's worrying you. We sign an NDA if needed.
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
              <h3 className="creator-step-title">We review &amp; map the risks</h3>
              <p className="creator-step-description">
                Our team breaks down key clauses, risks, and opportunities in an easy-to-read format.
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
              <h3 className="creator-step-title">Discuss practical next steps</h3>
              <p className="creator-step-description">
                Get on a call to walk through our recommendations and your negotiation options.
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
              <h3 className="creator-step-title">Ongoing retainership support</h3>
              <p className="creator-step-description">
                Keep us in your corner for future contracts, disputes, and legal questions as your creator business grows.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <div className="creator-colorful-box">
              <p className="creator-colorful-text">
                Talk through your current contracts and see if a retainership makes sense for you.
              </p>
            </div>
            <p className="creator-requirements-text">
              Let's have a word about what you need and what we offer.
            </p>
            <Button className="creator-btn-primary" asChild>
              <a href="https://forms.gle/ZFwD1sQJyCRGmnfP6" target="_blank" rel="noopener noreferrer">Share your requirements</a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6. RETAINERSHIP MODEL SECTION */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-8">
            <h2 className="creator-section-heading mb-4">
              Reasonable, customised retainers — aligned with your creator journey.
            </h2>
            <p className="creator-section-paragraph max-w-4xl mx-auto mb-8">
              Instead of one-size-fits-all fees, we work with influencers and agencies on customised retainers that match your deal flow, complexity, and stage of growth.
              Whether you need support on a couple of deals a month or a steady stream of campaigns across platforms, we design a plan that covers you without surprise invoices or billable-hour anxiety.
            </p>
          </div>

          <div className="creator-retainer-card">
            <ul className="creator-retainer-list">
              <li className="creator-retainer-item">
                <CheckCircle2 className="creator-retainer-icon" aria-hidden />
                <span>Fixed monthly retainers calibrated to your volume of contracts</span>
              </li>
              <li className="creator-retainer-item">
                <CheckCircle2 className="creator-retainer-icon" aria-hidden />
                <span>Clear scope: contract reviews, calls, negotiation support &amp; advisory</span>
              </li>
              <li className="creator-retainer-item">
                <CheckCircle2 className="creator-retainer-icon" aria-hidden />
                <span>Priority turnaround on time-sensitive brand deals</span>
              </li>
              <li className="creator-retainer-item">
                <CheckCircle2 className="creator-retainer-icon" aria-hidden />
                <span>Option to add IP &amp; dispute support as you scale</span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>



      {/* 9. FAQ SECTION */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="creator-section-heading">Frequently asked questions</h2>
          </div>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Do you only work with big influencers?</AccordionTrigger>
              <AccordionContent>
                No. We work with micro, mid-tier, and top creators. What matters is that you treat your creator work as a serious business.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Can you help if the brand is outside India?</AccordionTrigger>
              <AccordionContent>
                Yes, we frequently review cross-border contracts. We'll flag jurisdiction-specific issues and suggest practical protections.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>What if I just need a one-time review?</AccordionTrigger>
              <AccordionContent>
                We can start with a single engagement and, if it makes sense, move to an ongoing retainership once you see the value.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How fast can you review a contract?</AccordionTrigger>
              <AccordionContent>
                For retainership clients, we typically offer priority turnaround on time-sensitive deals. We'll confirm timelines on our first call.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Will you talk directly to the brand or agency?</AccordionTrigger>
              <AccordionContent>
                Where appropriate and with your consent, we can coordinate or draft responses so you don't have to handle the legal back-and-forth alone.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Container>
      </Section>

      {/* 10. FINAL CTA / CLOSING SECTION */}
      <Section id="contact" className="creator-final-cta">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="creator-final-cta-heading">
              Protect your content. Protect your deals.
            </h2>
            <p className="creator-final-cta-subheading">
              One confusing contract or risky endorsement can undo months of hard work. Let's make sure your next deal moves you forward — safely.
            </p>
            
            <div className="creator-final-cta-buttons">
              <Button className="creator-btn-primary creator-btn-large" asChild>
                <a href="/book-a-call">Book A Call</a>
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
                <a href="mailto:hello@thecompliers.info" className="creator-contact-link">
                  hello@thecompliers.info
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
