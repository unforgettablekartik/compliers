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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

export default function HRLegalCounsel() {
  const [activeTab, setActiveTab] = useState<"handbook" | "posh">("handbook");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCustomReviewModal, setShowCustomReviewModal] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

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
        <title>HR's Legal Counsel for Handbooks & Workplace Policies | The Compliers</title>
        <meta
          name="description"
          content="Get the most effective employee handbooks and policies. Optional custom lawyer review available on request. India-focused HR Compliance by The Compliers."
        />
        <meta
          name="keywords"
          content="hr legal counsel, hr legal counsel india, employee handbook builder, employee handbook for startups, hr policies and procedures india, posh policy drafting, workplace policy suite, hr compliance toolkit, hr legal templates, hr legal documentation india"
        />
        <link rel="canonical" href="https://thecompliers.com/hr-legal-counsel" />
      </Head>

      <div className="hr-legal-container">
        {/* Hero Section */}
        <section className="hr-hero">
          <h1 className="hr-hero-title">
            HR's Legal Counsel for Handbooks & Workplace Policies
          </h1>
          <p className="hr-hero-subtitle">
            Get the most effective employee handbooks and policies.<br />
            Optional custom lawyer review available on request.
          </p>

          <div className="hr-hero-benefits">
            <div className="hr-benefit-item">
              <CheckCircle className="hr-benefit-icon" size={20} />
              <span>
                Employee handbooks drafted around your policies, not generic templates.
              </span>
            </div>
            <div className="hr-benefit-item">
              <CheckCircle className="hr-benefit-icon" size={20} />
              <span>
                POSH & workplace policies aligned with Indian law and HR realities.
              </span>
            </div>
            <div className="hr-benefit-item">
              <CheckCircle className="hr-benefit-icon" size={20} />
              <span>
                AI-powered drafts + optional upgrade for customised legal review.
              </span>
            </div>
          </div>

          <div className="hr-hero-ctas">
            <Button size="lg" className="hr-primary-button" onClick={scrollToWizard}>
              Get Started with HR Tool
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/book-a-call">Book a Call with a Startup Lawyer</Link>
            </Button>
          </div>

          <div className="hr-trust-badge-note">
            India-focused HR Compliance by The Compliers
          </div>
        </section>

        {/* How It Works Section */}
        <section className="hr-how-it-works">
          <h2 className="hr-section-title">How It Works</h2>
          <div className="hr-steps">
            <div className="hr-step">
              <div className="hr-step-number">1</div>
              <h3 className="hr-step-title">Choose what you need</h3>
              <p className="hr-step-description">
                Employee Handbook or POSH & Workplace Policy Suite.
              </p>
            </div>
            <div className="hr-step">
              <div className="hr-step-number">2</div>
              <h3 className="hr-step-title">Answer a few HR-focused questions</h3>
              <p className="hr-step-description">
                Company size, work model, leave structure, risk profile.
              </p>
            </div>
            <div className="hr-step">
              <div className="hr-step-number">3</div>
              <h3 className="hr-step-title">Get your AI draft + optional lawyer upgrade</h3>
              <p className="hr-step-description">
                Download an HR-ready draft and, if you wish, request a customised review by
                The Compliers.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Button size="lg" className="hr-primary-button" onClick={scrollToWizard}>
              Launch HR Legal Counsel Tool
            </Button>
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
                  Employee Handbook Builder for HR & People Ops
                </CardTitle>
                <p className="hr-product-tagline">
                  Codify your culture, policies and expectations in a clear, compliant
                  handbook.
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
                  className="w-full"
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
                  POSH & Workplace Policy Suite for Indian Employers
                </CardTitle>
                <p className="hr-product-tagline">
                  Build a clear, accessible POSH policy and supporting workplace policies.
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
                  className="w-full"
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
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "handbook" | "posh")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="handbook">Employee Handbook</TabsTrigger>
                <TabsTrigger value="posh">POSH & Policies</TabsTrigger>
              </TabsList>

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

              {/* Employee Handbook Tab */}
              <TabsContent value="handbook">
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
              </TabsContent>

              {/* POSH & Policies Tab */}
              <TabsContent value="posh">
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
              </TabsContent>

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
            </Tabs>
          </Card>
        </section>

        {/* Why HR Teams Trust The Compliers */}
        <section className="hr-trust">
          <h2 className="hr-section-title">Why HR Teams Trust The Compliers</h2>
          <div className="hr-trust-cards">
            <div className="hr-trust-card">
              <Users size={40} style={{ color: "#0ea5e9", margin: "0 auto 1rem" }} />
              <h3 className="hr-trust-card-title">HR & startup-first legal expertise</h3>
              <p className="hr-trust-card-description">
                We understand the unique challenges of building HR policies for growing
                teams.
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
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is this enough without a lawyer?</AccordionTrigger>
                <AccordionContent>
                  AI drafts are starting points. For high-risk issues (POSH, terminations,
                  etc.) we recommend The Compliers' customised legal review to ensure full
                  compliance with your specific state laws and industry requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Is the HR legal counsel tool India-specific?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, it is optimised for Indian employers and HR teams. The tool
                  considers the Sexual Harassment of Women at Workplace Act 2013, Shops
                  and Establishments Acts, and other relevant Indian employment laws.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I edit the draft employee handbook or POSH policy?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you'll receive an editable version that you can refine before
                  rollout. You can copy the content and make any necessary adjustments to
                  fit your company's specific needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can we request a fully customised handbook / POSH policy?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, via the "Request Custom Review" option. You'll get a quote and
                  timeline from our legal team. This includes a thorough review by an
                  experienced employment lawyer who will customise the document for your
                  exact requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Will this work for remote / hybrid teams?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, the wizard asks about your work model and adjusts the draft
                  accordingly. Whether you're fully remote, hybrid, or office-based, the
                  policies will reflect your work arrangement.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
            Launch HR Legal Counsel Tool
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
