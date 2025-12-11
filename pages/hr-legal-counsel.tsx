"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  FileText,
  Shield,
  Users,
  ArrowRight,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ChevronDown,
  Download,
  Presentation,
  ClipboardList,
  Star,
  Clock,
  Lock,
  Sparkles,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import "@/styles/hr-legal-counsel.css";

// Types
interface CompanyProfile {
  legalName: string;
  brandName: string;
  state: string;
  industry: string;
  sizeBand: string;
  workModel: string;
}

interface HandbookConfig {
  tone: "strict" | "balanced" | "startup";
  workingDays: string[];
  workingHours: string;
  leaveSummary: string;
  probationRules: string;
  extraPolicies: string;
}

interface PoshConfig {
  poshRequired: boolean;
  hasICC: boolean;
  iccDetails: string;
  riskLevel: "low" | "medium" | "high";
  workforceMix: string[];
  interactsWithPublic: boolean;
  specialCircumstances: string;
}

interface GeneratedDoc {
  document: string;
  type: string;
  estimatedPages: number;
  companyName: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

// FAQ Item Component
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

export default function HRLegalCounsel() {
  const [activeTab, setActiveTab] = useState<"handbook" | "posh">("handbook");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCustomReviewModal, setShowCustomReviewModal] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Company Profile State
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    legalName: "",
    brandName: "",
    state: "",
    industry: "",
    sizeBand: "",
    workModel: "",
  });

  // Handbook Config State
  const [handbookConfig, setHandbookConfig] = useState<HandbookConfig>({
    tone: "balanced",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: "9:00 AM - 6:00 PM",
    leaveSummary: "",
    probationRules: "",
    extraPolicies: "",
  });

  // POSH Config State
  const [poshConfig, setPoshConfig] = useState<PoshConfig>({
    poshRequired: true,
    hasICC: false,
    iccDetails: "",
    riskLevel: "medium",
    workforceMix: ["Full-time employees"],
    interactsWithPublic: false,
    specialCircumstances: "",
  });

  // Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    requirement: "",
  });

  const scrollToWizard = () => {
    const wizardSection = document.getElementById("hr-wizard");
    if (wizardSection) {
      wizardSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("posh-pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGenerateDraft = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      // Validate required fields
      if (
        !companyProfile.legalName ||
        !companyProfile.state ||
        !companyProfile.industry ||
        !companyProfile.sizeBand ||
        !companyProfile.workModel
      ) {
        throw new Error("Please fill in all required company profile fields");
      }

      const response = await fetch("/api/generate-hr-doc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: activeTab,
          companyProfile,
          handbookConfig: activeTab === "handbook" ? handbookConfig : undefined,
          poshConfig: activeTab === "posh" ? poshConfig : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate document");
      }

      const data = await response.json();
      setGeneratedDoc(data);
      setShowLeadForm(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (generatedDoc) {
      navigator.clipboard.writeText(generatedDoc.document);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the lead data to your CRM/backend
    alert("Thank you! We'll email you the draft and checklist shortly.");
    setShowLeadForm(false);
  };

  const handleCustomReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the request to your CRM/backend
    alert("Thank you! Our legal team will contact you within 24 hours with a quote.");
    setShowCustomReviewModal(false);
  };

  return (
    <>
      <Head>
        <title>POSH Compliance Policy & Training Package | Ready-to-Use Documents | The Compliers</title>
        <meta
          name="description"
          content="Download professional POSH workplace policy and training presentation decks. Instant compliance with the 2013 Act. Editable documents from ₹3,499. Start protecting your workplace today."
        />
        <meta
          name="keywords"
          content="hr legal counsel, hr legal counsel india, employee handbook builder, employee handbook for startups, hr policies and procedures india, posh policy drafting, workplace policy suite, hr compliance toolkit, hr legal templates, hr legal documentation india, posh compliance package, posh policy template, posh training materials"
        />
        <link rel="canonical" href="https://thecompliers.com/hr-legal-counsel" />
      </Head>

      <div className="hr-legal-container">
        {/* Hero Section */}
        <section className="hr-hero">
          <Badge variant="warning" className="hero-launch-badge">
            <Rocket size={16} className="mr-1" />
            NEW LAUNCH 🚀
          </Badge>
          
          <h1 className="hr-hero-title hr-hero-title-large">
            Launch-Ready POSH Compliance Suite
          </h1>
          <p className="hr-hero-subtitle">
            Professionally crafted policy documents and training materials.<br />
            Download instantly, implement immediately.
          </p>

          <div className="hr-trust-pills">
            <span className="hr-trust-pill">
              <CheckCircle size={16} />
              Legally Vetted
            </span>
            <span className="hr-trust-pill">
              <CheckCircle size={16} />
              2013 Act Compliant
            </span>
            <span className="hr-trust-pill">
              <CheckCircle size={16} />
              Instant Download
            </span>
          </div>

          <div className="hr-hero-ctas">
            <Button size="lg" className="hr-primary-button" onClick={scrollToPricing}>
              Get POSH Compliance Suite
              <ArrowRight size={20} />
            </Button>
            <Button size="lg" className="hr-secondary-button" onClick={scrollToWizard}>
              Use HR Customization Tool
            </Button>
          </div>

          <div className="hr-trust-badge-note">
            India-focused HR Compliance by The Compliers
          </div>
        </section>

        {/* How It Works Section */}
        <section className="hr-how-it-works">
          <div className="hr-how-it-works-container">
            <div className="text-center mb-12">
              <h2 className="hr-section-title mb-3">
                Simple Process. Expert Delivery.
              </h2>
            </div>
            
            <div className="hr-steps-timeline">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="hr-step"
              >
                <div className="hr-step-number">1</div>
                <h3 className="hr-step-title">Choose your document type</h3>
                <p className="hr-step-description">
                  Select Employee Handbook or Workplace Policy Suite based on your needs.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hr-step"
              >
                <div className="hr-step-number">2</div>
                <h3 className="hr-step-title">Answer HR-focused questions</h3>
                <p className="hr-step-description">
                  Provide company profile, work model, leave structure, and policy preferences.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hr-step"
              >
                <div className="hr-step-number">3</div>
                <h3 className="hr-step-title">Generate & Download</h3>
                <p className="hr-step-description">
                  Get your customised draft instantly with clear, compliant language.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hr-step"
              >
                <div className="hr-step-number">4</div>
                <h3 className="hr-step-title">Optional Legal Review</h3>
                <p className="hr-step-description">
                  Request customised legal review by The Compliers for full compliance assurance.
                </p>
              </motion.div>
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Button size="lg" className="hr-primary-button" onClick={scrollToWizard}>
                Launch HR Legal Counsel Tool
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </section>

        {/* POSH Pricing Cards Section */}
        <section className="posh-pricing-section" id="posh-pricing">
          <div className="posh-pricing-header">
            <h2 className="hr-section-title">Choose Your POSH Compliance Package</h2>
            <p className="posh-pricing-subtitle">
              Everything you need to meet legal mandates and protect your workplace
            </p>
          </div>

          <div className="posh-pricing-cards">
            {/* Essential Kit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="posh-pricing-card"
            >
              <div className="posh-card-badge posh-badge-blue">For Small Teams</div>
              <h3 className="posh-card-title">Essential Kit</h3>
              
              <div className="posh-price-container">
                <div className="posh-price-main">
                  <span className="posh-price">₹3,499</span>
                  <span className="posh-price-original">₹4,999</span>
                </div>
                <div className="posh-price-savings">Save 30%</div>
              </div>

              <p className="posh-card-description">
                Perfect for startups and small businesses needing basic compliance documentation.
              </p>

              <ul className="posh-features-list">
                <li><CheckCircle size={18} /> POSH Policy Document (PDF)</li>
                <li><CheckCircle size={18} /> 20+ Slide Training Deck (PDF)</li>
                <li><CheckCircle size={18} /> Watermarked for internal use</li>
                <li><CheckCircle size={18} /> Legally compliant framework</li>
                <li><CheckCircle size={18} /> Instant digital download</li>
              </ul>

              <p className="posh-card-note">*Includes plain PDF files for immediate compliance</p>

              <Button className="posh-cta-button posh-cta-secondary">
                Get Essential Kit
              </Button>
            </motion.div>

            {/* Pro Bundle - RECOMMENDED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="posh-pricing-card posh-card-recommended"
            >
              <div className="posh-recommended-badge">
                <Sparkles size={16} />
                MOST POPULAR
              </div>
              <div className="posh-card-badge posh-badge-purple">For Growing Companies</div>
              <h3 className="posh-card-title">Pro Bundle</h3>
              
              <div className="posh-price-container">
                <div className="posh-price-main">
                  <span className="posh-price">₹4,999</span>
                  <span className="posh-price-original">₹8,499</span>
                </div>
                <div className="posh-price-savings">Save 41% • Best Value</div>
              </div>

              <p className="posh-card-description">
                Fully editable documents you can customize and brand for your organization.
              </p>

              <ul className="posh-features-list">
                <li><CheckCircle size={18} /> Editable POSH Policy (.docx)</li>
                <li><CheckCircle size={18} /> Editable Training Deck (.pptx)</li>
                <li><CheckCircle size={18} /> Customize with your branding</li>
                <li><CheckCircle size={18} /> Modify as per your company needs</li>
                <li><CheckCircle size={18} /> Legally compliant foundation</li>
                <li><CheckCircle size={18} /> No watermarks</li>
                <li><CheckCircle size={18} /> Instant digital download</li>
              </ul>

              <p className="posh-card-note">*Full editing rights for internal customization</p>

              <Button className="posh-cta-button posh-cta-primary">
                Get Pro Bundle
              </Button>
            </motion.div>

            {/* Expert Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="posh-pricing-card posh-card-premium"
            >
              <div className="posh-card-badge posh-badge-gold">For Complete Solutions</div>
              <h3 className="posh-card-title">Expert Package</h3>
              
              <div className="posh-price-container">
                <div className="posh-price-main">
                  <span className="posh-price">₹9,999</span>
                  <span className="posh-price-original">₹16,999</span>
                </div>
                <div className="posh-price-savings">Save 41% • Enterprise Ready</div>
              </div>

              <p className="posh-card-description">
                Presentation-ready materials with interactive training tools for professional rollout.
              </p>

              <ul className="posh-features-list">
                <li><CheckCircle size={18} /> Professionally designed POSH Policy</li>
                <li><CheckCircle size={18} /> Ready-to-present Training Deck</li>
                <li><CheckCircle size={18} /> Interactive Training Questionnaire</li>
                <li><CheckCircle size={18} /> Yes/No response format for engagement</li>
                <li><CheckCircle size={18} /> Premium visual design</li>
                <li><CheckCircle size={18} /> Fully editable formats</li>
                <li><CheckCircle size={18} /> Instant digital download</li>
                <li><CheckCircle size={18} /> Suitable for 200+ employees</li>
              </ul>

              <p className="posh-card-note">*Includes practical assessment tools</p>

              <Button className="posh-cta-button posh-cta-primary">
                Get Expert Package
              </Button>
            </motion.div>
          </div>

          <div className="posh-pricing-footer">
            <p className="posh-footer-text">
              All packages include lifetime access. One-time payment, no subscriptions.
            </p>
            <div className="posh-trust-badges">
              <span className="posh-trust-item">
                <Lock size={16} />
                Secure checkout
              </span>
              <span className="posh-trust-item">
                <Download size={16} />
                Instant delivery
              </span>
              <span className="posh-trust-item">
                <Shield size={16} />
                Email support
              </span>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="posh-whats-included">
          <h2 className="hr-section-title">What You're Getting</h2>
          
          <div className="posh-included-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="posh-included-card"
            >
              <FileText size={40} className="posh-included-icon" />
              <h3 className="posh-included-title">Comprehensive POSH Policy</h3>
              <ul className="posh-included-list">
                <li>Complete Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 compliance</li>
                <li>Internal Complaints Committee (ICC) framework and structure</li>
                <li>Clear complaint filing and investigation procedures</li>
                <li>Penalty clauses and disciplinary actions</li>
                <li>Employee rights and employer obligations</li>
                <li>Industry-agnostic, easily adaptable template</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="posh-included-card"
            >
              <Presentation size={40} className="posh-included-icon" />
              <h3 className="posh-included-title">Employee Training Presentation</h3>
              <ul className="posh-included-list">
                <li>20+ professionally designed slides</li>
                <li>Definition and types of workplace harassment</li>
                <li>Real-world scenarios and case studies</li>
                <li>Employee rights and reporting mechanisms</li>
                <li>Employer responsibilities and ICC process</li>
                <li>Q&A guidance for facilitators</li>
                <li>Visual aids for better retention</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="posh-included-card posh-included-center"
          >
            <ClipboardList size={40} className="posh-included-icon" />
            <h3 className="posh-included-title">Interactive Training Questionnaire</h3>
            <p className="posh-included-subtitle">(Included in Expert Package)</p>
            <ul className="posh-included-list">
              <li>Scenario-based assessment questions</li>
              <li>Yes/No response format for easy facilitation</li>
              <li>Tests understanding of POSH concepts</li>
              <li>Can be used in training sessions or self-assessment</li>
              <li>Helps gauge employee awareness levels</li>
            </ul>
          </motion.div>
        </section>

        {/* Social Proof & Urgency Section */}
        <section className="posh-social-proof">
          <div className="posh-proof-banner">
            <div className="posh-proof-item">
              <Star size={24} className="posh-proof-icon" />
              <p className="posh-proof-text">
                Join 500+ Indian businesses who've downloaded our POSH compliance suite
              </p>
            </div>
            <div className="posh-proof-item">
              <Clock size={24} className="posh-proof-icon" />
              <p className="posh-proof-text">
                Instant download • Implementation in hours, not weeks
              </p>
            </div>
            <div className="posh-proof-item">
              <Shield size={24} className="posh-proof-icon" />
              <p className="posh-proof-text">
                Legally reviewed by employment law experts
              </p>
            </div>
          </div>
          <div className="posh-urgency-banner">
            <Sparkles size={20} />
            Launch offer: Save up to 41% • Limited time pricing
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="posh-comparison">
          <h2 className="hr-section-title">Compare Packages</h2>
          <div className="posh-comparison-table-wrapper">
            <table className="posh-comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Essential Kit</th>
                  <th className="posh-table-recommended">Pro Bundle</th>
                  <th>Expert Package</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>POSH Policy Document</td>
                  <td><Check size={20} className="posh-check" /> PDF</td>
                  <td><Check size={20} className="posh-check" /> Editable .docx</td>
                  <td><Check size={20} className="posh-check" /> Premium Design</td>
                </tr>
                <tr>
                  <td>Training Presentation</td>
                  <td><Check size={20} className="posh-check" /> PDF (20+ slides)</td>
                  <td><Check size={20} className="posh-check" /> Editable .pptx</td>
                  <td><Check size={20} className="posh-check" /> Presentation-Ready</td>
                </tr>
                <tr>
                  <td>Training Questionnaire</td>
                  <td className="posh-no-check">✗</td>
                  <td className="posh-no-check">✗</td>
                  <td><Check size={20} className="posh-check" /> Interactive</td>
                </tr>
                <tr>
                  <td>Editable/Customizable</td>
                  <td className="posh-no-check">✗</td>
                  <td><Check size={20} className="posh-check" /></td>
                  <td><Check size={20} className="posh-check" /></td>
                </tr>
                <tr>
                  <td>Watermarks</td>
                  <td>Yes</td>
                  <td>No</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Best For</td>
                  <td>10-50 employees</td>
                  <td>50-200 employees</td>
                  <td>200+ employees</td>
                </tr>
                <tr className="posh-table-price-row">
                  <td>Price</td>
                  <td><strong>₹3,499</strong></td>
                  <td><strong>₹4,999</strong></td>
                  <td><strong>₹9,999</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Product Cards Section */}
        <section className="hr-products">
          <h2 className="hr-section-title">Choose Your HR Legal Document</h2>
          <div className="hr-product-cards">
            {/* Employee Handbook Card */}
            <Card className="hr-product-card">
              <CardHeader>
                <FileText size={32} style={{ color: "#0ea5e9", marginBottom: "1rem" }} />
                <CardTitle className="hr-product-title">
                  Employee Handbook Manual
                </CardTitle>
                <p className="hr-product-tagline">
                  Codify your culture, practices, and expectations in a clear, compliant
                  handbook, as an explanatory guide.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="hr-product-bullets">
                  <li>Customised to your working days, hours and leave policy.</li>
                  <li>Tone options: strict, balanced or startup-friendly.</li>
                  <li>
                    India-specific compliance considerations for shops & establishments.
                  </li>
                </ul>
                <div className="hr-product-sections">
                  <p className="hr-product-sections-title">Sections generated:</p>
                  <p className="hr-product-sections-list">
                    Company overview & values • Employment classifications • Working hours
                    & remote/hybrid rules • Leave & holidays • Attendance & overtime •
                    Behaviour, ethics & conduct
                  </p>
                </div>
                <Button
                  className="hr-generate-button"
                  onClick={() => {
                    setActiveTab("handbook");
                    scrollToWizard();
                  }}
                >
                  Generate Employee Handbook
                </Button>
              </CardContent>
            </Card>

            {/* POSH & Policy Suite Card */}
            <Card className="hr-product-card">
              <CardHeader>
                <Shield size={32} style={{ color: "#0ea5e9", marginBottom: "1rem" }} />
                <CardTitle className="hr-product-title">
                  Workplace Policy Suite
                </CardTitle>
                <p className="hr-product-tagline">
                  Clear, accessible and compliant workplace policies customized to company
                  objectives, values, and mission.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="hr-product-bullets">
                  <li>POSH policy framework aligned with Indian law.</li>
                  <li>
                    Configurable based on your ICC, workforce and risk profile.
                  </li>
                  <li>
                    Includes code of conduct, anti-discrimination and complaint handling.
                  </li>
                </ul>
                <div className="hr-product-sections">
                  <p className="hr-product-sections-title">Policies included:</p>
                  <p className="hr-product-sections-list">
                    POSH policy (ICC, process, timelines) • Code of conduct &
                    anti-harassment • Anti-discrimination & equal opportunity •
                    Whistleblower & complaint escalation
                  </p>
                </div>
                <Button
                  className="hr-generate-button"
                  onClick={() => {
                    setActiveTab("posh");
                    scrollToWizard();
                  }}
                >
                  Generate POSH & Policy Suite
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Wizard Section */}
        <section className="hr-wizard" id="hr-wizard">
          <h2 className="hr-section-title">HR Legal Counsel Tool</h2>
          <Card className="hr-wizard-card">
            {/* Document Type Selector */}
            <div className="hr-doc-type-selector">
              <label htmlFor="docType" className="hr-doc-type-label">
                I WANT:
              </label>
              <select
                id="docType"
                className="hr-doc-type-dropdown"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as "handbook" | "posh")}
              >
                <option value="handbook">Employee Handbook</option>
                <option value="posh">Workplace Policies</option>
              </select>
            </div>

            {/* Common Company Profile Section */}
            <div className="hr-form-section">
              <h3 className="hr-form-section-title">Company Profile</h3>
                <div className="hr-form-grid hr-form-grid-2">
                  <div className="hr-form-field">
                    <Label htmlFor="legalName">
                      Company Legal Name <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      id="legalName"
                      value={companyProfile.legalName}
                      onChange={(e) =>
                        setCompanyProfile({ ...companyProfile, legalName: e.target.value })
                      }
                      placeholder="Acme Technologies Private Limited"
                      required
                    />
                  </div>

                  <div className="hr-form-field">
                    <Label htmlFor="brandName">Brand Name (Optional)</Label>
                    <Input
                      id="brandName"
                      value={companyProfile.brandName}
                      onChange={(e) =>
                        setCompanyProfile({ ...companyProfile, brandName: e.target.value })
                      }
                      placeholder="Acme Tech"
                    />
                  </div>

                  <div className="hr-form-field">
                    <Label htmlFor="state">
                      Registered State <span style={{ color: "red" }}>*</span>
                    </Label>
                    <select
                      id="state"
                      value={companyProfile.state}
                      onChange={(e) =>
                        setCompanyProfile({ ...companyProfile, state: e.target.value })
                      }
                      className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="hr-form-field">
                    <Label htmlFor="industry">
                      Industry <span style={{ color: "red" }}>*</span>
                    </Label>
                    <select
                      id="industry"
                      value={companyProfile.industry}
                      onChange={(e) =>
                        setCompanyProfile({ ...companyProfile, industry: e.target.value })
                      }
                      className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    >
                      <option value="">Select Industry</option>
                      <option value="SaaS / Tech">SaaS / Tech</option>
                      <option value="Services">Services</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="hr-form-field">
                    <Label htmlFor="sizeBand">
                      Team Size <span style={{ color: "red" }}>*</span>
                    </Label>
                    <select
                      id="sizeBand"
                      value={companyProfile.sizeBand}
                      onChange={(e) =>
                        setCompanyProfile({ ...companyProfile, sizeBand: e.target.value })
                      }
                      className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    >
                      <option value="">Select Team Size</option>
                      <option value="0-20">0-20</option>
                      <option value="21-50">21-50</option>
                      <option value="51-250">51-250</option>
                      <option value="251-1000">251-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>

                  <div className="hr-form-field">
                    <Label htmlFor="workModel">
                      Work Model <span style={{ color: "red" }}>*</span>
                    </Label>
                    <div className="hr-radio-group">
                      {["Office", "Hybrid", "Remote-first"].map((model) => (
                        <div key={model} className="hr-radio-item">
                          <input
                            type="radio"
                            id={`workModel-${model}`}
                            name="workModel"
                            value={model}
                            checked={companyProfile.workModel === model}
                            onChange={(e) =>
                              setCompanyProfile({
                                ...companyProfile,
                                workModel: e.target.value,
                              })
                            }
                          />
                          <label htmlFor={`workModel-${model}`}>{model}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Handbook Configuration */}
              {activeTab === "handbook" && (
                <div className="hr-form-section">
                  <h3 className="hr-form-section-title">Handbook Configuration</h3>
                  <div className="hr-form-grid">
                    <div className="hr-form-field">
                      <Label>Tone of Handbook</Label>
                      <div className="hr-radio-group">
                        {[
                          { value: "strict", label: "Strict" },
                          { value: "balanced", label: "Balanced" },
                          { value: "startup", label: "Startup-friendly" },
                        ].map((option) => (
                          <div key={option.value} className="hr-radio-item">
                            <input
                              type="radio"
                              id={`tone-${option.value}`}
                              name="tone"
                              value={option.value}
                              checked={handbookConfig.tone === option.value}
                              onChange={(e) =>
                                setHandbookConfig({
                                  ...handbookConfig,
                                  tone: e.target.value as "strict" | "balanced" | "startup",
                                })
                              }
                            />
                            <label htmlFor={`tone-${option.value}`}>{option.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="hr-form-field">
                      <Label>Working Days</Label>
                      <div className="hr-checkbox-group">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ].map((day) => (
                          <div key={day} className="hr-checkbox-item">
                            <input
                              type="checkbox"
                              id={`day-${day}`}
                              checked={handbookConfig.workingDays.includes(day)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setHandbookConfig({
                                    ...handbookConfig,
                                    workingDays: [...handbookConfig.workingDays, day],
                                  });
                                } else {
                                  setHandbookConfig({
                                    ...handbookConfig,
                                    workingDays: handbookConfig.workingDays.filter(
                                      (d) => d !== day
                                    ),
                                  });
                                }
                              }}
                            />
                            <label htmlFor={`day-${day}`}>{day}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="hr-form-field">
                      <Label htmlFor="workingHours">Working Hours</Label>
                      <Input
                        id="workingHours"
                        value={handbookConfig.workingHours}
                        onChange={(e) =>
                          setHandbookConfig({
                            ...handbookConfig,
                            workingHours: e.target.value,
                          })
                        }
                        placeholder="9:00 AM - 6:00 PM"
                      />
                    </div>

                    <div className="hr-form-field">
                      <Label htmlFor="leaveSummary">Leave Structure Summary</Label>
                      <Textarea
                        id="leaveSummary"
                        value={handbookConfig.leaveSummary}
                        onChange={(e) =>
                          setHandbookConfig({
                            ...handbookConfig,
                            leaveSummary: e.target.value,
                          })
                        }
                        placeholder="Summarise your planned leave types (CL/SL/EL, maternity, paternity, etc)"
                      />
                      <span className="hr-form-helper">
                        E.g., "12 CL, 12 SL, 15 EL per year, 26 weeks maternity leave"
                      </span>
                    </div>

                    <div className="hr-form-field">
                      <Label htmlFor="probationRules">Probation & Confirmation Rules</Label>
                      <Textarea
                        id="probationRules"
                        value={handbookConfig.probationRules}
                        onChange={(e) =>
                          setHandbookConfig({
                            ...handbookConfig,
                            probationRules: e.target.value,
                          })
                        }
                        placeholder="E.g., 3-month probation with performance review"
                      />
                    </div>

                    <div className="hr-form-field">
                      <Label htmlFor="extraPolicies">
                        Any non-standard policies to include? (Optional)
                      </Label>
                      <Textarea
                        id="extraPolicies"
                        value={handbookConfig.extraPolicies}
                        onChange={(e) =>
                          setHandbookConfig({
                            ...handbookConfig,
                            extraPolicies: e.target.value,
                          })
                        }
                        placeholder="E.g., Work-from-anywhere month, wellness day, sabbatical policy"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* POSH & Policies Configuration */}
              {activeTab === "posh" && (
                <div className="hr-form-section">
                  <h3 className="hr-form-section-title">POSH Policy Configuration</h3>
                  <div className="hr-form-grid">
                    <div className="hr-form-field">
                      <Label>POSH Policy Required?</Label>
                      <div className="hr-radio-group">
                        <div className="hr-radio-item">
                          <input
                            type="radio"
                            id="posh-yes"
                            name="poshRequired"
                            checked={poshConfig.poshRequired}
                            onChange={() =>
                              setPoshConfig({ ...poshConfig, poshRequired: true })
                            }
                          />
                          <label htmlFor="posh-yes">Yes</label>
                        </div>
                        <div className="hr-radio-item">
                          <input
                            type="radio"
                            id="posh-no"
                            name="poshRequired"
                            checked={!poshConfig.poshRequired}
                            onChange={() =>
                              setPoshConfig({ ...poshConfig, poshRequired: false })
                            }
                          />
                          <label htmlFor="posh-no">No</label>
                        </div>
                      </div>
                    </div>

                    <div className="hr-form-field">
                      <Label>Do you already have an ICC?</Label>
                      <div className="hr-radio-group">
                        <div className="hr-radio-item">
                          <input
                            type="radio"
                            id="icc-yes"
                            name="hasICC"
                            checked={poshConfig.hasICC}
                            onChange={() => setPoshConfig({ ...poshConfig, hasICC: true })}
                          />
                          <label htmlFor="icc-yes">Yes</label>
                        </div>
                        <div className="hr-radio-item">
                          <input
                            type="radio"
                            id="icc-no"
                            name="hasICC"
                            checked={!poshConfig.hasICC}
                            onChange={() => setPoshConfig({ ...poshConfig, hasICC: false })}
                          />
                          <label htmlFor="icc-no">No</label>
                        </div>
                      </div>
                      {!poshConfig.hasICC && (
                        <Alert variant="default" style={{ marginTop: "0.5rem" }}>
                          <AlertDescription>
                            We'll include a generic ICC framework and you can plug in names
                            later.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    {poshConfig.hasICC && (
                      <div className="hr-form-field">
                        <Label htmlFor="iccDetails">ICC Members (Simple text)</Label>
                        <Textarea
                          id="iccDetails"
                          value={poshConfig.iccDetails}
                          onChange={(e) =>
                            setPoshConfig({ ...poshConfig, iccDetails: e.target.value })
                          }
                          placeholder="E.g., Presiding Officer: Jane Doe, Members: John Smith, etc."
                        />
                      </div>
                    )}

                    <div className="hr-form-field">
                      <Label htmlFor="riskLevel">Industry Risk Level</Label>
                      <select
                        id="riskLevel"
                        value={poshConfig.riskLevel}
                        onChange={(e) =>
                          setPoshConfig({
                            ...poshConfig,
                            riskLevel: e.target.value as "low" | "medium" | "high",
                          })
                        }
                        className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High public interaction</option>
                      </select>
                    </div>

                    <div className="hr-form-field">
                      <Label>Workforce Mix</Label>
                      <div className="hr-checkbox-group">
                        {[
                          "Full-time employees",
                          "Interns",
                          "Contract staff",
                          "Vendors & third-party workers on site",
                        ].map((type) => (
                          <div key={type} className="hr-checkbox-item">
                            <input
                              type="checkbox"
                              id={`workforce-${type}`}
                              checked={poshConfig.workforceMix.includes(type)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPoshConfig({
                                    ...poshConfig,
                                    workforceMix: [...poshConfig.workforceMix, type],
                                  });
                                } else {
                                  setPoshConfig({
                                    ...poshConfig,
                                    workforceMix: poshConfig.workforceMix.filter(
                                      (t) => t !== type
                                    ),
                                  });
                                }
                              }}
                            />
                            <label htmlFor={`workforce-${type}`}>{type}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="hr-form-field">
                      <Label>Do employees interact with customers/public on-site?</Label>
                      <div className="hr-radio-group">
                        <div className="hr-radio-item">
                          <input
                            type="radio"
                            id="interact-yes"
                            name="interactsWithPublic"
                            checked={poshConfig.interactsWithPublic}
                            onChange={() =>
                              setPoshConfig({ ...poshConfig, interactsWithPublic: true })
                            }
                          />
                          <label htmlFor="interact-yes">Yes</label>
                        </div>
                        <div className="hr-radio-item">
                          <input
                            type="radio"
                            id="interact-no"
                            name="interactsWithPublic"
                            checked={!poshConfig.interactsWithPublic}
                            onChange={() =>
                              setPoshConfig({ ...poshConfig, interactsWithPublic: false })
                            }
                          />
                          <label htmlFor="interact-no">No</label>
                        </div>
                      </div>
                    </div>

                    <div className="hr-form-field">
                      <Label htmlFor="specialCircumstances">
                        Any special circumstances to mention? (Optional)
                      </Label>
                      <Textarea
                        id="specialCircumstances"
                        value={poshConfig.specialCircumstances}
                        onChange={(e) =>
                          setPoshConfig({
                            ...poshConfig,
                            specialCircumstances: e.target.value,
                          })
                        }
                        placeholder="E.g., late-night shifts, field teams, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Buttons */}
              <div className="hr-form-buttons">
                <Button
                  size="lg"
                  className="hr-primary-button"
                  onClick={handleGenerateDraft}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Generating...
                    </>
                  ) : (
                    "Generate Draft Now"
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="hr-secondary-button"
                  onClick={() => setShowCustomReviewModal(true)}
                >
                  Talk to a Lawyer
                </Button>
              </div>

              {/* Error Display */}
              {error && (
                <Alert variant="error" style={{ marginTop: "1.5rem" }}>
                  <AlertCircle size={20} />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="hr-loading">
                  <div className="hr-loading-spinner"></div>
                  <p className="hr-loading-text">
                    We're preparing your HR legal draft. This usually takes less than a
                    minute.
                  </p>
                </div>
              )}

              {/* Output Panel */}
              {generatedDoc && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hr-output"
                >
                  <div className="hr-output-header">
                    <div className="hr-output-meta">
                      <h3 className="hr-output-title">
                        {generatedDoc.type === "handbook"
                          ? "Employee Handbook Draft"
                          : "POSH & Workplace Policy Suite Draft"}
                      </h3>
                      <div className="hr-output-summary">
                        <span className="hr-output-summary-item">
                          <strong>Pages:</strong> ~{generatedDoc.estimatedPages}
                        </span>
                        <span className="hr-output-summary-item">
                          <strong>Company:</strong> {generatedDoc.companyName}
                        </span>
                        <span className="hr-output-summary-item">
                          <strong>Tone:</strong>{" "}
                          {activeTab === "handbook"
                            ? handbookConfig.tone.charAt(0).toUpperCase() +
                              handbookConfig.tone.slice(1)
                            : "Professional"}
                        </span>
                      </div>
                    </div>
                    <Button onClick={handleCopyToClipboard}>
                      {copied ? (
                        <>
                          <Check size={16} className="mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="mr-2" />
                          Copy to Clipboard
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="hr-output-content">
                    {generatedDoc.document.split("\n").map((line, idx) => {
                      if (line.startsWith("## ")) {
                        return <h2 key={idx}>{line.replace("## ", "")}</h2>;
                      } else if (line.startsWith("### ")) {
                        return <h3 key={idx}>{line.replace("### ", "")}</h3>;
                      } else if (line.trim().startsWith("- ")) {
                        return <li key={idx}>{line.replace("- ", "")}</li>;
                      } else if (line.trim()) {
                        return <p key={idx}>{line}</p>;
                      }
                      return <br key={idx} />;
                    })}
                  </div>

                  {/* Lead Form */}
                  {showLeadForm && (
                    <div className="hr-lead-form">
                      <h4 className="hr-lead-form-title">
                        Get this draft & checklist via email
                      </h4>
                      <form onSubmit={handleLeadFormSubmit}>
                        <div className="hr-form-grid hr-form-grid-2">
                          <div className="hr-form-field">
                            <Label htmlFor="leadName">Name</Label>
                            <Input
                              id="leadName"
                              value={leadForm.name}
                              onChange={(e) =>
                                setLeadForm({ ...leadForm, name: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="hr-form-field">
                            <Label htmlFor="leadEmail">Work Email</Label>
                            <Input
                              id="leadEmail"
                              type="email"
                              value={leadForm.email}
                              onChange={(e) =>
                                setLeadForm({ ...leadForm, email: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="hr-form-field">
                            <Label htmlFor="leadCompany">Company Size</Label>
                            <select
                              id="leadCompany"
                              value={leadForm.company}
                              onChange={(e) =>
                                setLeadForm({ ...leadForm, company: e.target.value })
                              }
                              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                              required
                            >
                              <option value="">Select</option>
                              <option value="0-20">0-20</option>
                              <option value="21-50">21-50</option>
                              <option value="51-250">51-250</option>
                              <option value="251+">251+</option>
                            </select>
                          </div>
                          <div className="hr-form-field" style={{ gridColumn: "1 / -1" }}>
                            <Button type="submit" className="w-full">
                              Email Me This Draft & Checklist
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Upgrade Banner */}
                  <div className="hr-upgrade-banner">
                    <p className="hr-upgrade-text">
                      Want a lawyer to review & customise this for your exact state laws and
                      risks?
                    </p>
                    <Button
                      size="lg"
                      style={{ background: "white", color: "#0ea5e9" }}
                      onClick={() => setShowCustomReviewModal(true)}
                    >
                      Request Custom Review
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>
          </section>

        {/* Why HR Teams Trust The Compliers */}
        <section className="hr-trust">
          <h2 className="hr-section-title">Why HR Teams Trust The Compliers</h2>
          <div className="hr-trust-cards">
            <div className="hr-trust-card">
              <Download size={40} style={{ color: "#0ea5e9", margin: "0 auto 1rem" }} />
              <h3 className="hr-trust-card-title">
                Ready-to-deploy compliance packages
              </h3>
              <p className="hr-trust-card-description">
                Download professionally crafted POSH policies and training decks instantly. No waiting, no back-and-forth—just compliant documentation ready to implement.
              </p>
            </div>
            <div className="hr-trust-card">
              <Shield size={40} style={{ color: "#0ea5e9", margin: "0 auto 1rem" }} />
              <h3 className="hr-trust-card-title">
                Templates guided by real employment mandates
              </h3>
              <p className="hr-trust-card-description">
                Our AI is trained on Indian labor laws and POSH requirements.
              </p>
            </div>
            <div className="hr-trust-card">
              <CheckCircle size={40} style={{ color: "#0ea5e9", margin: "0 auto 1rem" }} />
              <h3 className="hr-trust-card-title">
                Balanced between compliance and culture
              </h3>
              <p className="hr-trust-card-description">
                Legal protection without sacrificing your startup's unique culture.
              </p>
            </div>
            <div className="hr-trust-card">
              <FileText size={40} style={{ color: "#0ea5e9", margin: "0 auto 1rem" }} />
              <h3 className="hr-trust-card-title">
                Optional retainers and ongoing HR legal support
              </h3>
              <p className="hr-trust-card-description">
                Go beyond drafts with continuous legal counsel for your HR team.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="hr-faq">
          <div className="hr-faq-container">
            <h2 className="hr-section-title">FAQs on HR Legal Documentation</h2>
            <div className="faq-container">
              {[
                {
                  question: "What's the difference between the Essential Kit and Pro Bundle?",
                  answer: "The Essential Kit provides watermarked PDF files suitable for immediate compliance and internal reference. The Pro Bundle gives you fully editable Word and PowerPoint files that you can customize with your company branding, modify content to match your specific needs, and present without watermarks. Pro Bundle is ideal if you want to adapt the documents to your organization's unique requirements."
                },
                {
                  question: "Can we use these documents for companies of any size?",
                  answer: "Yes. The Essential Kit and Pro Bundle work for companies from 10 to 500+ employees. The Expert Package is specifically designed for larger organizations (200+ employees) that need presentation-ready materials and interactive training tools for comprehensive rollout."
                },
                {
                  question: "Are these documents legally compliant with the POSH Act 2013?",
                  answer: "Absolutely. All documents have been reviewed by employment law experts and align with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. However, we recommend consulting with legal counsel for company-specific customizations or if you have unique industry requirements."
                },
                {
                  question: "How quickly will I receive the documents after purchase?",
                  answer: "Instantly. Upon successful payment, you'll receive an email with download links within 2-3 minutes. All files are delivered digitally, so you can start implementing immediately."
                },
                {
                  question: "Can I get help customizing the documents?",
                  answer: "Yes. While the Pro and Expert packages are designed to be self-sufficient, you can book a consultation with The Compliers for personalized guidance on customization, ICC setup, or training delivery. This is available as an add-on service."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "Due to the digital nature of the products, all sales are final. However, if you face any technical issues with downloads or file access, our support team will assist you immediately."
                },
                {
                  question: "Is this enough without a lawyer?",
                  answer: "AI drafts are starting points. For high-risk issues (POSH, terminations, etc.) we recommend The Compliers' customised legal review to ensure full compliance with your specific state laws and industry requirements."
                },
                {
                  question: "Is the HR legal counsel tool India-specific?",
                  answer: "Yes, it is optimised for Indian employers and HR teams. The tool considers the Sexual Harassment of Women at Workplace Act 2013, Shops and Establishments Acts, and other relevant Indian employment laws."
                },
                {
                  question: "Can I edit the draft employee handbook or POSH policy?",
                  answer: "Yes, you'll receive an editable version that you can refine before rollout. You can copy the content and make any necessary adjustments to fit your company's specific needs."
                },
                {
                  question: "Can we request a fully customised handbook / POSH policy?",
                  answer: "Yes, via the \"Request Custom Review\" option. You'll get a quote and timeline from our legal team. This includes a thorough review by an experienced employment lawyer who will customise the document for your exact requirements."
                },
                {
                  question: "Will this work for remote / hybrid teams?",
                  answer: "Yes, the wizard asks about your work model and adjusts the draft accordingly. Whether you're fully remote, hybrid, or office-based, the policies will reflect your work arrangement."
                }
              ].map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="hr-final-cta">
          <h2 className="hr-final-cta-title">
            Ready to give your HR team real legal counsel?
          </h2>
          <p className="hr-final-cta-subtitle">
            Use the HR legal counsel tool to get instant drafts, then upgrade to a fully
            customised handbook and POSH policy with The Compliers.
          </p>
          <Button size="lg" className="hr-primary-button" onClick={scrollToWizard}>
            Book FREE consultation
            <ArrowRight size={20} />
          </Button>
        </section>
      </div>

      {/* Custom Review Modal */}
      <Dialog open={showCustomReviewModal} onOpenChange={setShowCustomReviewModal}>
        <DialogContent>
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Request Custom Legal Review</DialogTitle>
            <DialogDescription>
              Our legal team will review and customise the document for your exact
              requirements. Fill in the details below and we'll get back to you within 24
              hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCustomReviewSubmit}>
            <div className="hr-form-grid" style={{ gap: "1rem" }}>
              <div className="hr-form-field">
                <Label htmlFor="customName">Name</Label>
                <Input
                  id="customName"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="hr-form-field">
                <Label htmlFor="customEmail">Email</Label>
                <Input
                  id="customEmail"
                  type="email"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="hr-form-field">
                <Label htmlFor="customPhone">Phone</Label>
                <Input
                  id="customPhone"
                  type="tel"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  required
                />
              </div>
              <div className="hr-form-field">
                <Label htmlFor="customCompany">Company</Label>
                <Input
                  id="customCompany"
                  value={leadForm.company}
                  onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                  required
                />
              </div>
              <div className="hr-form-field">
                <Label htmlFor="customRequirement">What do you need?</Label>
                <Textarea
                  id="customRequirement"
                  value={leadForm.requirement}
                  onChange={(e) =>
                    setLeadForm({ ...leadForm, requirement: e.target.value })
                  }
                  placeholder="E.g., Custom employee handbook review, POSH policy with ICC setup, etc."
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What's the difference between the Essential Kit and Pro Bundle?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Essential Kit provides watermarked PDF files suitable for immediate compliance and internal reference. The Pro Bundle gives you fully editable Word and PowerPoint files that you can customize with your company branding, modify content to match your specific needs, and present without watermarks. Pro Bundle is ideal if you want to adapt the documents to your organization's unique requirements.",
                },
              },
              {
                "@type": "Question",
                name: "Can we use these documents for companies of any size?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The Essential Kit and Pro Bundle work for companies from 10 to 500+ employees. The Expert Package is specifically designed for larger organizations (200+ employees) that need presentation-ready materials and interactive training tools for comprehensive rollout.",
                },
              },
              {
                "@type": "Question",
                name: "Are these documents legally compliant with the POSH Act 2013?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. All documents have been reviewed by employment law experts and align with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. However, we recommend consulting with legal counsel for company-specific customizations or if you have unique industry requirements.",
                },
              },
              {
                "@type": "Question",
                name: "How quickly will I receive the documents after purchase?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Instantly. Upon successful payment, you'll receive an email with download links within 2-3 minutes. All files are delivered digitally, so you can start implementing immediately.",
                },
              },
              {
                "@type": "Question",
                name: "Is this enough without a lawyer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI drafts are starting points. For high-risk issues (POSH, terminations, etc.) we recommend The Compliers' customised legal review to ensure full compliance with your specific state laws and industry requirements.",
                },
              },
              {
                "@type": "Question",
                name: "Is the HR legal counsel tool India-specific?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, it is optimised for Indian employers and HR teams. The tool considers the Sexual Harassment of Women at Workplace Act 2013, Shops and Establishments Acts, and other relevant Indian employment laws.",
                },
              },
              {
                "@type": "Question",
                name: "Can I edit the draft employee handbook or POSH policy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you'll receive an editable version that you can refine before rollout. You can copy the content and make any necessary adjustments to fit your company's specific needs.",
                },
              },
              {
                "@type": "Question",
                name: "Can we request a fully customised handbook / POSH policy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, via the 'Request Custom Review' option. You'll get a quote and timeline from our legal team. This includes a thorough review by an experienced employment lawyer who will customise the document for your exact requirements.",
                },
              },
              {
                "@type": "Question",
                name: "Will this work for remote / hybrid teams?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the wizard asks about your work model and adjusts the draft accordingly. Whether you're fully remote, hybrid, or office-based, the policies will reflect your work arrangement.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
