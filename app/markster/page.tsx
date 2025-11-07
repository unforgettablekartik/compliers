"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Search, FileText, AlertTriangle, Globe2, Scale, Clock, BellRing, CheckCircle2, XCircle, ChevronRight, Mail, MessageSquare, Target, Zap, Eye } from "lucide-react";
import { FaSearch, FaRegFileAlt, FaExclamationTriangle, FaBell, FaShieldAlt, FaGlobe } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// --- Utility components ---
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`w-full py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 md:px-6 ${className}`}>{children}</div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-5 w-5 flex-none" aria-hidden /><span>{children}</span></li>
);

const CrossItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3"><XCircle className="mt-1 h-5 w-5 flex-none" aria-hidden /><span>{children}</span></li>
);

// --- Markster Benefits Section ---
function MarksterBenefits() {
  const benefits = [
    {
      icon: <FaSearch className="text-2xl md:text-3xl" />, 
      title: "Search & Risk Opinion",
      desc: "Identical/phonetic/visual search across target & related classes with a clear availability rating."
    },
    {
      icon: <FaRegFileAlt className="text-2xl md:text-3xl" />, 
      title: "Filing Strategy & TM-A",
      desc: "Class mapping, specification drafting, TM-48, and clean e-filing with stamped acknowledgments."
    },
    {
      icon: <FaExclamationTriangle className="text-2xl md:text-3xl" />, 
      title: "Examination Reply (1 round)",
      desc: "Substantive reply with case-law where useful; hearing brief if listed."
    },
    {
      icon: <FaBell className="text-2xl md:text-3xl" />, 
      title: "60-day Watch",
      desc: "Weekly bulletins scanned for conflicting marks; early-warning alerts."
    },
    {
      icon: <FaShieldAlt className="text-2xl md:text-3xl" />, 
      title: "Use & Policing Kit",
      desc: "™/® usage guide, website/footer specimens, brand policing SOP for your team."
    },
    {
      icon: <FaGlobe className="text-2xl md:text-3xl" />, 
      title: "Scale Options",
      desc: "Extra classes, device/logo filing, oppositions, & Madrid coordination as add-ons."
    }
  ];
  return (
    <section className="mb-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">What you get from Markster™</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-7 flex flex-col items-start">
              <div className="mb-3 p-3 bg-gray-100 rounded-xl">{b.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{b.title}</h3>
              <p className="text-gray-700">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
              { "@type": "Offer", name: "Markster Plus", priceCurrency: "INR", price: 17900 },
              { "@type": "Offer", name: "Scale (starting)", priceCurrency: "INR", price: 34900 }
            ],
          }),
        }}
      />
      {/* Hero and other sections ... */}
      <Section className="markster-hero">
        <Container>
          {/* ...existing hero markup... */}
        </Container>
      </Section>
      
      {/* Insert new Markster Benefits cards section here */}
      <MarksterBenefits />

      {/* Trust Bar */}
      {/* ...rest of the file continues unchanged... */}
      {/* (all other sections remain as-is) */}
    </div>
  );
}