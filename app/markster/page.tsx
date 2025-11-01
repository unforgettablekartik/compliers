"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Search, FileText, AlertTriangle, Globe2, Scale, Clock, BellRing, CheckCircle2, XCircle, ChevronRight, Mail, MessageSquare, CircleDollarSign } from "lucide-react";
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
  const PRO_SINGLE = 9900;
  const PRO_PLUS = 17900;
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
              { "@type": "Offer", name: "Markster Plus", priceCurrency: "INR", price: PRO_PLUS },
              { "@type": "Offer", name: "Scale (starting)", priceCurrency: "INR", price: PRO_SCALE }
            ],
          }),
        }}
      />

      {/* Hero */}
      <Section className="bg-gradient-to-b from-sky-50 to-white">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs md:text-sm shadow-sm">
                  <ShieldCheck className="h-4 w-4" /> Markster™ by The Compliers
                </div>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
                  File today. Defend early. <span className="text-sky-700">Own your brand.</span>
                </h1>
                <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
                  Lawyer‑led, fixed‑fee trademark package for Indian startups &amp; MSMEs: deep search &amp; risk opinion, smart class specs, filing (TM‑A), one examination reply, and 60‑day watch—wrapped in clear timelines and a status dashboard.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button size="lg" className="rounded-2xl px-6 py-6 text-base" asChild>
                    <a href="#start">Get started</a>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-2xl px-6 py-6 text-base" asChild>
                    <a href="#pricing">See pricing</a>
                  </Button>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Search memo in 48 hrs</div>
                  <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> Filing drafts in 72 hrs</div>
                  <div className="flex items-center gap-2"><BellRing className="h-4 w-4" /> Monthly status updates</div>
                </div>
              </motion.div>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="relative mx-auto w-full max-w-md rounded-3xl border bg-white p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-100 p-3"><Search className="h-6 w-6 text-sky-700" /></div>
                  <div>
                    <p className="text-sm font-medium">Deep Search &amp; Risk Opinion</p>
                    <p className="text-xs text-gray-600">Identical/phonetic/visual · Related classes · Strategy memo</p>
                  </div>
                </div>
                <div className="my-4 h-px bg-gray-100" />
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-100 p-3"><FileText className="h-6 w-6 text-emerald-700" /></div>
                  <div>
                    <p className="text-sm font-medium">Smart Filing (TM‑A)</p>
                    <p className="text-xs text-gray-600">Spec drafting that balances breadth with survivability</p>
                  </div>
                </div>
                <div className="my-4 h-px bg-gray-100" />
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-amber-100 p-3"><AlertTriangle className="h-6 w-6 text-amber-700" /></div>
                  <div>
                    <p className="text-sm font-medium">1 Examination Reply Included</p>
                    <p className="text-xs text-gray-600">Arguments &amp; evidence; hearing brief if listed</p>
                  </div>
                </div>
                <div className="my-4 h-px bg-gray-100" />
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-indigo-100 p-3"><BellRing className="h-6 w-6 text-indigo-700" /></div>
                  <div>
                    <p className="text-sm font-medium">60‑day Trademark Watch</p>
                    <p className="text-xs text-gray-600">Weekly bulletin scan · Early warnings · Action plan</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Bar */}
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-600 md:grid-cols-4">
            <div className="flex items-center gap-2"><Scale className="h-4 w-4" /> Services by Licensed Lawyers</div>
            <div className="flex items-center gap-2"><Globe2 className="h-4 w-4" /> Fixed‑fee · Transparent timelines</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Dossier &amp; status dashboard access</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Priority turnaround options</div>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section>
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">What you get inside Markster™</h2>
            <p className="mt-2 text-gray-600">From search to filing to early defence—everything required to launch without brand anxiety.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Search, title: "Search & Risk Opinion", desc: "Identical/phonetic/visual search across target & related classes with a clear availability rating." },
              { icon: FileText, title: "Filing Strategy & TM-A", desc: "Class mapping, specification drafting, TM-48, and clean e-filing with stamped acknowledgments." },
              { icon: AlertTriangle, title: "Examination Reply (1 round)", desc: "Substantive reply with case-law where useful; hearing brief if listed." },
              { icon: BellRing, title: "60‑day Watch", desc: "Weekly bulletins scanned for conflicting marks; early-warning alerts." },
              { icon: ShieldCheck, title: "Use & Policing Kit", desc: "™/® usage guide, website/footer specimens, brand policing SOP for your team." },
              { icon: Globe2, title: "Scale Options", desc: "Extra classes, device/logo filing, oppositions, & Madrid coordination as add-ons." },
            ].map((f, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="rounded-2xl bg-gray-100 p-3"><f.icon className="h-6 w-6" aria-hidden /></div>
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="bg-gray-50">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">How it works</h2>
            <p className="mt-2 text-gray-600">Clear steps. Clear ownership. Clear outcomes.</p>
          </div>
          <div className="grid items-start gap-6 md:grid-cols-3">
            {[
              { title: "Kickoff & Brand Audit", desc: "30–40 min discovery; map classes, flag risks, documents checklist.", icon: ChevronRight },
              { title: "Search → Strategy", desc: "Deep search across mark variants; availability rating & recommendations.", icon: Search },
              { title: "File & Defend Early", desc: "Draft specs, file TM‑A, track; one exam reply included; 60‑day watch.", icon: ShieldCheck },
            ].map((s, i) => (
              <div key={i} className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-gray-600">
                  <s.icon className="h-4 w-4" aria-hidden /> Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Inclusions & Exclusions */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold">Included</h3>
              <ul className="mt-4 space-y-3">
                <ListItem>Kickoff call &amp; class mapping</ListItem>
                <ListItem>Identical/phonetic/visual searches with risk memo</ListItem>
                <ListItem>Specification drafting &amp; TM‑A filing (word or device)</ListItem>
                <ListItem>One examination reply (arguments/evidence)</ListItem>
                <ListItem>60‑day trademark watch &amp; early‑warning alerts</ListItem>
                <ListItem>™/® usage guide, policing SOP, monthly status updates</ListItem>
                <ListItem>Dossier access &amp; time‑stamped filings</ListItem>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Not Included (add‑ons available)</h3>
              <ul className="mt-4 space-y-3">
                <CrossItem>Government/statutory fees (charged at cost)</CrossItem>
                <CrossItem>Hearing appearances/arguing before Registry</CrossItem>
                <CrossItem>Oppositions (filing/defence beyond counter‑statement)</CrossItem>
                <CrossItem>Multiple examination cycles, affidavits, appeals/rectifications</CrossItem>
                <CrossItem>Foreign/Madrid filings (available separately)</CrossItem>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-gradient-to-b from-white to-sky-50">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Transparent, fixed‑fee pricing</h2>
            <p className="mt-2 text-gray-600">Official government fees vary by entity &amp; per class—billed at cost. Professional fees below are for our work.</p>
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

            {/* Plus */}
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
                  <ListItem>+ Device/logo filing</ListItem>
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
                <p className="mt-2 text-gray-600">Multi‑class or word + device, priority turnaround, hearing brief. Madrid/foreign filings, oppositions &amp; hearings are quoted separately.</p>
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
              <AccordionTrigger>How many classes should I choose?</AccordionTrigger>
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

      {/* Start / Contact */}
      <Section id="start" className="bg-sky-50">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Ready to file your mark this week?</h2>
              <p className="mt-2 text-gray-700">We’ll run the search, map classes, and file cleanly—then watch the journals for conflicts. You get clear timelines and a status dashboard.</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <ListItem>Search memo in 48 hours</ListItem>
                <ListItem>Drafts ready in 72 hours post‑docs</ListItem>
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
              <p className="mt-3 text-xs text-gray-600">Ethical note: We provide factual, educational information and fixed‑fee options—no comparative claims or solicitations.</p>
            </div>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Quick intake (what we’ll ask)</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700">
                <li>Applicant details &amp; fee category (Individual/Startup/MSME/Company)</li>
                <li>Brand name/logo &amp; high‑res asset (for device marks)</li>
                <li>Goods/services &amp; first‑use date (if any)</li>
                <li>TM‑48 (Authorization) and KYC (as applicable)</li>
              </ol>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-700">
                <Mail className="h-4 w-4" />
                <a className="underline" href="mailto:markster@thecompliers.info">markster@thecompliers.info</a>
                <MessageSquare className="h-4 w-4" />
                <a className="underline" href="https://wa.me/91XXXXXXXXXX">WhatsApp</a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} The Compliers · Markster™</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <a href="/privacy" className="underline">Privacy</a>
              <a href="/terms" className="underline">Terms</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
