use client;

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Search, FileText, AlertTriangle, Globe2, Scale, Clock, BellRing, CheckCircle2, XCircle, ChevronRight, Mail, MessageSquare } from "lucide-react";
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

// --- Main Page ---
export default function MarksterLanding() {
  const PRO_SINGLE = 14900;
  const PRO_PLUS = 22900;
  const PRO_SCALE = 34900; // starting

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
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
              { "@type": "Offer", name: "Single Class (Word)", priceCurrency: "INR", price: PRO_SINGLE },
              { "@type": "Offer", name: "BrandShield Plus", priceCurrency: "INR", price: PRO_PLUS },
              { "@type": "Offer", name: "Scale (starting)", priceCurrency: "INR", price: PRO_SCALE }
            ],
          }),
        }}
      />

      {/* ... keep hero/trust/features/process/inclusions sections as is ... */}

      {/* Pricing */}
      <Section id="pricing" className="bg-gradient-to-b from-white to-sky-50">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Transparent, fixed‑fee pricing</h2>
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

            {/* Plus (BrandShield) */}
            <Card className="rounded-3xl border-2 border-sky-600 shadow-xl">
              <CardHeader>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-800">Most Popular</div>
                <CardTitle>BrandShield™ Plus</CardTitle>
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
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            <AccordionItem value="q1">
              <AccordionTrigger>Can I use ™ right after filing?</AccordionTrigger>
              <AccordionContent>Yes. You may use ™ immediately after filing. Switch to ® only after registration is granted.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Do I need use evidence to file?</AccordionTrigger>
              <AccordionContent>Not necessarily. You can file on a “proposed to be used” basis. Use evidence strengthens examination/opposition stages.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger><span className="underline">How many classes should I choose?</span></AccordionTrigger>
              <AccordionContent>Select classes that reflect actual/near‑term (3–12 months) goods/services. We map this during kickoff to avoid waste.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Will you attend hearings?</AccordionTrigger>
              <AccordionContent>Hearing appearance is an add‑on. We include a hearing brief and can appear/brief counsel upon request.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>Can you help with global protection?</AccordionTrigger>
              <AccordionContent>Yes. We coordinate Madrid Protocol and national filings with partner counsel and timeline planning.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Container>
      </Section>

      {/* Recommendation & Contact */}
      <Section id="start" className="bg-sky-50">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Ready to file your mark this week?</h2>
              <p className="mt-2 text-gray-700">We’ll run the search, map classes, and file cleanly—then watch the journals for conflicts. You get clear timelines and a status dashboard.</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <ListItem>Search memo in 48 hours</ListItem>
                <ListItem>Drafts ready in 72 hours post-docs</ListItem>
                <ListItem>Monthly status updates + early alerts</ListItem>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-2xl px-6 py-6 text-base" asChild>
                  <a href="/contact">Book a 20-min consult</a>
                </Button>
                <Button variant="outline" className="rounded-2xl px-6 py-6 text-base" asChild>
                  <a href="/checkout/markster">Start with BrandShield™</a>
                </Button>
              </div>
              <p className="mt-3 text-xs text-gray-600">Ethical note: We provide factual, educational information and fixed-fee options—no comparative claims or solicitations.</p>
            </div>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Quick intake (what we’ll ask)</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700">
                <li>Applicant details & fee category (Individual/Startup/MSME/Company)</li>
                <li>Brand name/logo & high-res asset (for device marks)</li>
                <li>Goods/services & first-use date (if any)</li>
                <li>TM-48 (Authorization) and KYC (as applicable)</li>
              </ol>
              <div className="mt-6 flex flex-col gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2"><span role="img" aria-label="telephone">📞</span> +91-XXXXXXXXXXX</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><a className="underline" href="mailto:hello@thecompliers.com">hello@thecompliers.com</a></div>
                <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /><a className="underline" href="https://wa.me/91XXXXXXXXXXX">WhatsApp</a></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      {/* Footer as is ... */}
    </div>
  );
}