"use client";

import React from "react";
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
  TrendingUp,
  Building2,
  UserCheck,
  Home,
  Palette,
  Globe,
  Mail,
  CircleHelp
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import RiskOMeter from "@/components/RiskOMeter";

// --- Utility components ---
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`w-full py-12 md:py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 md:px-6 lg:px-8 ${className}`}>{children}</div>
);

// Service Coverage Card Component
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  colorClass: string;
}

const ServiceCoverageCard = ({ icon, title, items, colorClass }: ServiceCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`agreementor-coverage-card ${colorClass}`}
  >
    <div className="agreementor-coverage-icon">{icon}</div>
    <h3 className="agreementor-coverage-title">{title}</h3>
    <ul className="agreementor-coverage-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </motion.div>
);

// --- Main Page ---
export default function AgreementorClient() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919540101740';

  // Service coverage data - arranged as per the sequence requirement
  const serviceCoverages = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Founders",
      items: [
        "Co-founders Agreement",
        "ESOPs & Vesting Structure",
        "VC Term Sheets",
        "Investment Contracts",
        "Startup Compliances"
      ],
      colorClass: "agreementor-card-founders"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Growing Businesses",
      items: [
        "Cross-border Deals",
        "Shareholders' Agreement",
        "NDA & Confidentiality",
        "JV, MSA & SOW",
        "Vendor Contracts"
      ],
      colorClass: "agreementor-card-business"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "HR & Recruiters",
      items: [
        "Employment Agreements",
        "Labour Law Compliance",
        "Sexual Harassment Policy",
        "Work Ethics Standards",
        "Employee Handbook"
      ],
      colorClass: "agreementor-card-hr"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Real Estate Stakeholders",
      items: [
        "Agreement to Sell",
        "Title Assurance & Indemnity",
        "RERA Compliance",
        "Builder-Buyer Agreement",
        "Joint Development Contract"
      ],
      colorClass: "agreementor-card-realestate"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creators & Brands",
      items: [
        "Collaboration Agreement",
        "Influencer Contracts",
        "Sponsorship Terms",
        "Content Guidelines",
        "Usage Policy"
      ],
      colorClass: "agreementor-card-creators"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Digital Businesses",
      items: [
        "Privacy Policy",
        "Terms of Service",
        "GDPR, CCPA, DPDP Compliance",
        "Privacy Risk Assessment",
        "DPIA & Legal Notices"
      ],
      colorClass: "agreementor-card-digital"
    }
  ];

  return (
    <div className="agreementor-page-container relative min-h-screen bg-white text-gray-900">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Agreementor™ — Contracts & Agreements by The Compliers",
            provider: { "@type": "LegalService", name: "The Compliers" },
            areaServed: "IN",
            serviceType: "Contract drafting, review, compliance, and risk assessment for businesses",
          }),
        }}
      />

      {/* 1. HERO SECTION */}
      <Section className="agreementor-hero">
        <Container>
          <div className="agreementor-hero-grid">
            {/* Content on Left */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="agreementor-hero-left"
            >
              <div className="agreementor-brand-chip">
                <FileText className="h-4 w-4" aria-hidden />
                <span><span className="agreementor-brand-name">Agreementor™</span> by The Compliers</span>
              </div>
              <h1 className="agreementor-hero-title">
                A Contract Specialist for Risk-Free Business Growth.
              </h1>

              <p className="agreementor-hero-description">
                From founders' agreements to privacy policies — we draft, review, and protect your contracts. Expert legal support tailored for growing businesses, entrepreneurs, and modern enterprises.
              </p>

              <div className="agreementor-hero-buttons">
                <Button className="agreementor-btn-primary" asChild>
                  <a href="/book-a-call">Connect Now</a>
                </Button>
              </div>
              
              <p className="agreementor-hero-caption">
                Free 20-minute discovery call. No obligations, just clarity.
              </p>
            </motion.div>

            {/* RiskOMeter on Right */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="agreementor-hero-right"
            >
              <RiskOMeter />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 2. PROBLEM / PAIN POINTS SECTION */}
      <Section className="bg-gray-50">
        <Container>
          <div className="agreementor-problem-grid">
            <div className="agreementor-problem-left">
              <h2 className="agreementor-section-heading mb-4">
                Contracts can make or break your business.
              </h2>
              <p className="agreementor-section-paragraph">
                <span className="agreementor-highlight-text">Your growth is your expertise! Contracts are ours.</span>
                <br />
                Most businesses sign agreements without understanding the risks. Poor contracts lead to disputes, financial losses, and missed opportunities. We help you navigate the legal complexities.
              </p>
              
              <p className="agreementor-support-text text-center">
                Whether you're a startup founder, established business, or a creator — your contracts need to protect your interests at every stage.
              </p>
            </div>
            
            <div className="agreementor-problem-cards">
              <div className="agreementor-problem-card">
                <h3 className="agreementor-problem-title agreementor-problem-title-with-icon">
                  <CircleHelp className="agreementor-problem-icon-glyph" aria-hidden />
                  <span>Hidden Risks</span>
                </h3>
                <p className="agreementor-problem-description">One-sided clauses, unlimited liability, unfavorable terms buried in legal jargon.</p>
              </div>
              
              <div className="agreementor-problem-card agreementor-expertise-card">
                <h3 className="agreementor-problem-title agreementor-problem-title-with-icon">
                  <HandshakeIcon className="agreementor-counsel-icon" aria-hidden />
                  <span>We Serve:</span>
                </h3>
                <ul className="agreementor-expertise-list">
                  <li>Founders & Startups</li>
                  <li>Growing Businesses</li>
                  <li>HR & Recruiters</li>
                  <li>Real Estate Stakeholders</li>
                  <li>Creators & Brands</li>
                  <li>Digital Businesses</li>
                  <li>Agencies & Companies</li>
                </ul>
              </div>
              
              <div className="agreementor-problem-card">
                <h3 className="agreementor-problem-title agreementor-problem-title-with-icon">
                  <CircleHelp className="agreementor-problem-icon-glyph" aria-hidden />
                  <span>Compliance Gaps</span>
                </h3>
                <p className="agreementor-problem-description">Regulatory requirements, data privacy laws, and industry-specific compliances often overlooked.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. SERVICE COVERAGE SECTION - 6 Cards */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="agreementor-section-heading mb-3">
              Comprehensive Contract Coverage for Every Need
            </h2>
            <p className="agreementor-section-paragraph max-w-3xl mx-auto">
              Whatever your industry or stage of growth, we have the expertise to protect your interests with tailored contracts and agreements.
            </p>
          </div>
          
          <div className="agreementor-coverage-grid">
            {serviceCoverages.map((service, index) => (
              <ServiceCoverageCard
                key={index}
                icon={service.icon}
                title={service.title}
                items={service.items}
                colorClass={service.colorClass}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. WHY THE COMPLIERS – TRUST & DIFFERENTIATION */}
      <Section className="agreementor-trust-section">
        <Container>
          <div className="text-center mb-12">
            <h2 className="agreementor-section-heading text-white mb-8">
              Why businesses trust The Compliers for contracts
            </h2>
          </div>
          
          <div className="agreementor-trust-grid">
            <div className="agreementor-trust-card">
              <Users className="agreementor-trust-icon" aria-hidden />
              <h3 className="agreementor-trust-title">Business-first, not billable-hour-first</h3>
              <p className="agreementor-trust-description">
                Fixed fees and clear scope. Your growth is our success, not your legal bills.
              </p>
            </div>

            <div className="agreementor-trust-card">
              <Shield className="agreementor-trust-icon" aria-hidden />
              <h3 className="agreementor-trust-title">Deep specialization in contract law</h3>
              <p className="agreementor-trust-description">
                From investment deals to privacy policies — we live and breathe commercial contracts.
              </p>
            </div>

            <div className="agreementor-trust-card">
              <Lightbulb className="agreementor-trust-icon" aria-hidden />
              <h3 className="agreementor-trust-title">Plain-language explanations</h3>
              <p className="agreementor-trust-description">
                No 50-page legal memos. Clear risk reports, redlined contracts, and actionable advice.
              </p>
            </div>

            <div className="agreementor-trust-card">
              <HandshakeIcon className="agreementor-trust-icon" aria-hidden />
              <h3 className="agreementor-trust-title">Long-term partnership approach</h3>
              <p className="agreementor-trust-description">
                Think of us as your external legal desk — reliable support as your business scales.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. SERVICES OVERVIEW – WHAT WE DO */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="agreementor-section-heading mb-3">
              What we do for you
            </h2>
          </div>
          
          <div className="agreementor-services-grid">
            <div className="agreementor-service-card">
              <div className="agreementor-service-header">
                <FileText className="agreementor-service-icon" style={{ color: '#10b981' }} aria-hidden />
                <h3 className="agreementor-service-title">Contract Drafting</h3>
              </div>
              <p className="agreementor-service-description">
                Custom contracts tailored to your business needs — from NDAs to complex investment agreements.
              </p>
            </div>

            <div className="agreementor-service-card">
              <div className="agreementor-service-header">
                <AlertTriangle className="agreementor-service-icon" style={{ color: '#10b981' }} aria-hidden />
                <h3 className="agreementor-service-title">Risk Assessment & Review</h3>
              </div>
              <p className="agreementor-service-description">
                Comprehensive review of contracts you receive. We highlight red flags and suggest protective edits.
              </p>
            </div>

            <div className="agreementor-service-card">
              <div className="agreementor-service-header">
                <HandshakeIcon className="agreementor-service-icon" style={{ color: '#10b981' }} aria-hidden />
                <h3 className="agreementor-service-title">Negotiation Support</h3>
              </div>
              <p className="agreementor-service-description">
                Smart pushback on unfavorable terms. We help you negotiate from a position of strength.
              </p>
            </div>

            <div className="agreementor-service-card">
              <div className="agreementor-service-header">
                <Shield className="agreementor-service-icon" style={{ color: '#10b981' }} aria-hidden />
                <h3 className="agreementor-service-title">Compliance Advisory</h3>
              </div>
              <p className="agreementor-service-description">
                GDPR, CCPA, DPDP, labour laws, RERA — we ensure your agreements meet regulatory requirements.
              </p>
            </div>

            <div className="agreementor-service-card">
              <div className="agreementor-service-header">
                <Scale className="agreementor-service-icon" style={{ color: '#10b981' }} aria-hidden />
                <h3 className="agreementor-service-title">Legal Documentation</h3>
              </div>
              <p className="agreementor-service-description">
                Privacy policies, terms of service, employee handbooks, and all business documentation needs.
              </p>
            </div>

            <div className="agreementor-service-card">
              <div className="agreementor-service-header">
                <TrendingUp className="agreementor-service-icon" style={{ color: '#10b981' }} aria-hidden />
                <h3 className="agreementor-service-title">Retainership Packages</h3>
              </div>
              <p className="agreementor-service-description">
                Ongoing legal support with fixed monthly fees. Be covered for all your contract needs.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. HOW IT WORKS – STEP TIMELINE */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="agreementor-section-heading mb-3">
              Simple Process. Expert Delivery.
            </h2>
          </div>
          
          <div className="agreementor-steps-timeline">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="agreementor-step"
            >
              <div className="agreementor-step-number">1</div>
              <h3 className="agreementor-step-title">Share your requirements</h3>
              <p className="agreementor-step-description">
                Book a call or email us with your contract needs. Upload documents securely.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="agreementor-step"
            >
              <div className="agreementor-step-number">2</div>
              <h3 className="agreementor-step-title">We analyze & quote</h3>
              <p className="agreementor-step-description">
                Fixed fee proposal with clear scope, timeline, and deliverables. No hidden costs.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="agreementor-step"
            >
              <div className="agreementor-step-number">3</div>
              <h3 className="agreementor-step-title">Draft & Review</h3>
              <p className="agreementor-step-description">
                Expert drafting with risk assessment. Redlined contracts with plain-English explanations.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="agreementor-step"
            >
              <div className="agreementor-step-number">4</div>
              <h3 className="agreementor-step-title">Finalize & Support</h3>
              <p className="agreementor-step-description">
                Revisions based on your feedback. Ongoing support for negotiations and queries.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <div className="agreementor-colorful-box">
              <p className="agreementor-colorful-text">
                Get a comprehensive risk report for your contracts. Protect your business interests.
              </p>
            </div>
            <div className="agreementor-share-btn-container">
              <Button className="agreementor-btn-primary" asChild>
                <a href="/book-a-call">Share your requirements</a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. RETAINERSHIP MODEL SECTION */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-8">
            <h2 className="agreementor-section-heading mb-4">
              Flexible Retainership Packages
            </h2>
            <p className="agreementor-section-paragraph max-w-4xl mx-auto mb-8">
              Instead of per-contract billing, we offer customized retainership packages that match your business volume. Predictable costs, priority support, and comprehensive coverage.
            </p>
          </div>

          <div className="agreementor-retainer-card">
            <ul className="agreementor-retainer-list">
              <li className="agreementor-retainer-item">
                <CheckCircle2 className="agreementor-retainer-icon" aria-hidden />
                <span>Fixed monthly retainers calibrated to your contract volume</span>
              </li>
              <li className="agreementor-retainer-item">
                <CheckCircle2 className="agreementor-retainer-icon" aria-hidden />
                <span>Clear scope: drafting, reviews, compliance advisory & negotiations</span>
              </li>
              <li className="agreementor-retainer-item">
                <CheckCircle2 className="agreementor-retainer-icon" aria-hidden />
                <span>Priority turnaround on urgent contracts and time-sensitive deals</span>
              </li>
              <li className="agreementor-retainer-item">
                <CheckCircle2 className="agreementor-retainer-icon" aria-hidden />
                <span>Option to add specialized services: IP protection, due diligence, and more</span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* 8. FAQ SECTION */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="agreementor-section-heading">Frequently asked questions</h2>
          </div>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What types of contracts do you handle?</AccordionTrigger>
              <AccordionContent>
                We handle all commercial contracts including NDAs, MSAs, employment agreements, vendor contracts, investment documents, privacy policies, terms of service, real estate agreements, and more. If it's a business contract, we can help.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How quickly can you review or draft a contract?</AccordionTrigger>
              <AccordionContent>
                Standard turnaround is 3-5 business days for most contracts. For urgent requests, we offer priority service with same-day or next-day delivery at a rush fee. Retainer clients get priority turnaround included.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you work with startups and small businesses?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We work with businesses of all sizes — from early-stage startups to established enterprises. Our retainership packages are designed to scale with your growth and budget.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What about cross-border contracts and international deals?</AccordionTrigger>
              <AccordionContent>
                Yes, we regularly handle cross-border contracts and can advise on jurisdiction-specific issues. For highly specialized international matters, we collaborate with our network of global legal partners.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How do your fixed fees work?</AccordionTrigger>
              <AccordionContent>
                We assess scope during initial consultation and provide a fixed fee quote upfront. No hourly billing, no surprise invoices. If scope changes significantly, we discuss and agree on adjustments before proceeding.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Can you help with regulatory compliance like GDPR, DPDP?</AccordionTrigger>
              <AccordionContent>
                Yes, we specialize in privacy and data protection compliance including GDPR, CCPA, and India's DPDP Act. We can draft compliant privacy policies, conduct privacy risk assessments, and ensure your contracts meet regulatory requirements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Container>
      </Section>

      {/* 9. FINAL CTA / CLOSING SECTION */}
      <Section id="contact" className="agreementor-final-cta">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="agreementor-final-cta-heading">
              Protect your business. Secure your contracts.
            </h2>
            <p className="agreementor-final-cta-subheading">
              One poorly drafted contract can cost you months of revenue and endless headaches. Let's ensure every agreement moves your business forward — safely.
            </p>
            
            <div className="agreementor-final-cta-buttons">
              <Button className="agreementor-btn-primary agreementor-btn-large" asChild>
                <a href="/book-a-call">Book A Call</a>
              </Button>
              <Button 
                className="agreementor-btn-primary agreementor-btn-large" 
                onClick={() => window.dispatchEvent(new CustomEvent('openCompliersBot'))}
              >
                Let's Chat
              </Button>
            </div>

            <div className="agreementor-contact-methods">
              <div className="agreementor-contact-item">
                <Mail className="agreementor-contact-icon" aria-hidden />
                <a href="mailto:connect@thecompliers.com" className="agreementor-contact-link">
                  connect@thecompliers.com
                </a>
              </div>
              <div className="agreementor-contact-item">
                <FaWhatsapp className="agreementor-contact-icon" aria-hidden />
                <a href={`https://wa.me/${whatsappNumber}`} className="agreementor-contact-link">
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
