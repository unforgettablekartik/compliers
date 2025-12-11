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
              Connect Now
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
                <h3 className="hr-step-title">Choose Package</h3>
                <p className="hr-step-description">
                  Select the POSH compliance package that fits your organization's needs.
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
                <h3 className="hr-step-title">Fill Information</h3>
                <p className="hr-step-description">
                  Provide your company details and specific compliance requirements.
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
                <h3 className="hr-step-title">Make Payment</h3>
                <p className="hr-step-description">
                  Complete secure checkout with your preferred payment method.
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
                <h3 className="hr-step-title">Get It Delivered</h3>
                <p className="hr-step-description">
                  Receive your complete POSH compliance documents instantly via email.
                </p>
              </motion.div>
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Button size="lg" className="hr-primary-button" onClick={scrollToPricing}>
                Get POSH Compliance Suite
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
              <div className="posh-recommended-badge posh-recommended-badge-gold">
                <Sparkles size={16} />
                BEST VALUE
              </div>
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
              <h3 className="posh-included-title">Training Presentation</h3>
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
                name: "Can I get help customizing the documents?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. While the Pro and Expert packages are designed to be self-sufficient, you can book a consultation with The Compliers for personalized guidance on customization, ICC setup, or training delivery. This is available as an add-on service.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer refunds?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Due to the digital nature of the products, all sales are final. However, if you face any technical issues with downloads or file access, our support team will assist you immediately.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
