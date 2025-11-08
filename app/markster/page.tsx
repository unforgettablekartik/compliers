"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Search, FileText, AlertTriangle, Globe2, Scale, Clock, BellRing, CheckCircle2, XCircle, ChevronRight, Mail, MessageSquare, Target, Zap, Eye } from "lucide-react";
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
  <li className="flex items-start"><span>{children}</span></li>
);

const CrossItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start"><span>{children}</span></li>
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

      {/* Process */}
      <Section className="bg-gray-50">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-2xl font-bold md:text-3xl mb-2">How it works</h2>
            <p className="mt-2 text-gray-600">Three simple steps from kickoff to filing and ongoing watch.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-3 text-xs text-gray-600">Step 1</div>
              <h3 className="text-lg font-semibold">Kickoff &amp; Search</h3>
              <p className="mt-2 text-sm text-gray-600">We collect applicant details, the mark, classes, and run a comprehensive search. You receive a memo in 48 hours.</p>
            </div>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-3 text-xs text-gray-600">Step 2</div>
              <h3 className="text-lg font-semibold">Review &amp; File</h3>
              <p className="mt-2 text-sm text-gray-600">Draft application shared for your approval. Once confirmed, we file the TM-A and share the application number within 72 hours.</p>
            </div>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-3 text-xs text-gray-600">Step 3</div>
              <h3 className="text-lg font-semibold">Monitor &amp; Defend</h3>
              <p className="mt-2 text-sm text-gray-600">Journal watch active for 60 or 90 days. We alert you to conflicts and handle the first examination reply.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Inclusions / Exclusions */}
      <Section>
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-2xl font-bold md:text-3xl mb-2">What's covered, what's not</h2>
            <p className="mt-2 text-gray-600">Clear scope so you know exactly what's covered.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold flex items-center gap-4">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                What's Included
              </h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <ListItem>Comprehensive trademark search &amp; conflict report</ListItem>
                <ListItem>TM-A application drafting &amp; filing</ListItem>
                <ListItem>One examination reply (objection response)</ListItem>
                <ListItem>Hearing brief (attendance is add-on)</ListItem>
                <ListItem>60 or 90-day journal watch</ListItem>
                <ListItem>Status dashboard &amp; dossier access</ListItem>
                <ListItem>Fixed professional fee + govt fee at cost</ListItem>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold flex items-center gap-4">
                <XCircle className="h-5 w-5 text-red-600 mt-1" />
                Not Included (available on request)
              </h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <CrossItem>Hearing appearance (counsel briefing available)</CrossItem>
                <CrossItem>Opposition proceedings (defensive or offensive)</CrossItem>
                <CrossItem>Madrid Protocol / foreign filings</CrossItem>
                <CrossItem>Multiple examination replies beyond the first</CrossItem>
                <CrossItem>Rectification or cancellation actions</CrossItem>
                <CrossItem>Renewal after 10 years (we'll remind you)</CrossItem>
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
          <div className="grid gap-6 md:grid-cols-3">
            {/* Single Class */}
            <Card className="rounded-3xl border-2">
              <CardHeader>
                <CardTitle>Single Class – Word Mark</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold tracking-tight">₹{PRO_SINGLE.toLocaleString("en-IN")}</p>
                <p className="mt-2 text-gray-600">Professional fee · Search + TM‑A filing + 1 exam reply + 60‑day watch</p>
                <div className="mt-4 rounded-2xl border bg-white p-3 text-sm">
                  <div className="mb-1 font-medium">Government fee (per class, at cost)</div>
                  <div className="grid grid-cols-2 gap-2 text-gray-700">
                    <div>Individual/Startup/MSME</div>
                    <div className="text-right">₹4,500</div>
                    <div>Company/LLP/Others</div>
                    <div className="text-right">₹9,000</div>
                  </div>
                </div>
                <div className="mt-6"><Button className="w-full rounded-2xl" asChild><a href="#start">Start now</a></Button></div>
              </CardContent>
            </Card>

            {/* Plus (Markster) */}
            <Card className="rounded-3xl border-2 border-sky-600 shadow-xl">
              <CardHeader>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-800">Most Popular</div>
                <CardTitle>Markster™ Plus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold tracking-tight">₹{PRO_PLUS.toLocaleString("en-IN")}</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <ListItem>Everything in Single Class</ListItem>
                  <ListItem>+ One extra class (same mark) <span className="text-gray-500">(govt fee per extra class)</span></ListItem>
                  <ListItem>+ Device/logo filing (Vienna coding)</ListItem>
                  <ListItem>+ Extended watch (90 days)</ListItem>
                </ul>
                <div className="mt-6"><Button className="w-full rounded-2xl" asChild><a href="#start">Choose Plus</a></Button></div>
              </CardContent>
            </Card>

            {/* Scale/Global */}
            <Card className="rounded-3xl border-2">
              <CardHeader>
                <CardTitle>Scale &amp; Global</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold tracking-tight">From ₹{PRO_SCALE.toLocaleString("en-IN")}</p>
                <p className="mt-2 text-gray-600">Multi‑class or word + device, priority turnaround, hearing brief. Madrid/foreign filings, oppositions & hearings are quoted separately.</p>
                <div className="mt-6"><Button variant="outline" className="w-full rounded-2xl" asChild><a href="#contact">Talk to us</a></Button></div>
              </CardContent>
            </Card>
          </div>
          <p className="mt-6 text-center text-xs text-gray-600">*Official fees per IP India First Schedule. We pass them at actuals. Taxes extra on professional fees.</p>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Frequently asked questions (FAQs)</h2>
          </div>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            <AccordionItem value="q1" className="border-b border-gray-200">
              <AccordionTrigger>Can I use ™ right after filing?</AccordionTrigger>
              <AccordionContent>Yes. You may use ™ immediately after filing. Switch to ® only after registration is granted.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-b border-gray-200">
              <AccordionTrigger>Do I need use evidence to file?</AccordionTrigger>
              <AccordionContent>Not necessarily. You can file on a "proposed to be used" basis. Use evidence strengthens examination/opposition stages.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border-b border-gray-200">
              <AccordionTrigger>How many classes should I choose?</AccordionTrigger>
              <AccordionContent>Select classes that reflect actual/near term (3–12 months) goods/services. We map this during kickoff to avoid waste.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="border-b border-gray-200">
              <AccordionTrigger>Will you attend hearings?</AccordionTrigger>
              <AccordionContent>Hearing appearance is an add on. We include a hearing brief and can appear/brief counsel upon request.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5" className="border-b border-gray-200">
              <AccordionTrigger>Can you help with global protection?</AccordionTrigger>
              <AccordionContent>Yes. We coordinate Madrid Protocol and national filings with partner counsel and timeline planning.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Container>
      </Section>

      {/* Start / Contact */}
      <Section id="start" className="bg-sky-50">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Ready to file your mark this week?</h2>
              <p className="mt-2 text-gray-700">We'll run the search, map classes, and file cleanly—then watch the journals for conflicts. You get clear timelines and a status dashboard.</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <ListItem>Search memo in 48 hours</ListItem>
                <ListItem>Drafts ready in 72 hours post-docs</ListItem>
                <ListItem>Monthly status updates + early alerts</ListItem>
              </ul>
              <p className="mt-4 text-sm text-gray-700">Still have a query? Speak to a lawyer over a 20‑min call.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-2xl px-6 py-6 text-base" asChild>
                  <a href="/contact">Book a FREE consultation</a>
                </Button>
                <Button variant="outline" className="rounded-2xl px-6 py-6 text-base" asChild>
                  <a href="/checkout/markster">Start with Markster™</a>
                </Button>
              </div>
              <p className="mt-3 text-xs text-gray-600">Ethical note: We provide factual, educational information and fixed-fee options—no comparative claims or solicitations.</p>
            </div>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Quick intake (what we'll ask)</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700">
                <li>Applicant details & fee category (Individual/Startup/MSME/Company)</li>
                <li>Brand name/logo & high-res asset (for device marks)</li>
                <li>Goods/services & first-use date (if any)</li>
                <li>TM-48 (Authorization) and KYC (as applicable)</li>
              </ol>
              <div className="mt-6 flex flex-col gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><a className="underline" href="mailto:markster@thecompliers.info">markster@thecompliers.info</a></div>
                <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /><a className="underline" href="https://wa.me/91XXXXXXXXXXX">WhatsApp</a></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

    </div>
  );
}