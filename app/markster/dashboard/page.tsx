\"use client\";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ShieldCheck, Search, CreditCard, Clock, CheckCircle2, AlertTriangle, HelpCircle, Ticket, MessageSquare, Filter } from "lucide-react";

// Minimal types
type Order = {
  id: string;
  applicationNo?: string;
  mark: string;
  classes: number[];
  tier: "Individual/Startup/MSME" | "Company/LLP";
  professionalFee: number;
  govtFee: number; // total govt fee across classes
  paymentStatus: "Unpaid" | "Paid" | "Refunded";
  filingStatus: "Drafting" | "Filed" | "Objected" | "Accepted" | "Registered";
  watchStatus: "Inactive" | "Active" | "Alerted";
  createdAt: string; // ISO
};

const mockOrders: Order[] = [
  {
    id: "ORD-2025-001",
    applicationNo: "TM-1234567",
    mark: "MARKSTER",
    classes: [35, 42],
    tier: "Company/LLP",
    professionalFee: 22900,
    govtFee: 18000, // 2 classes × 9000
    paymentStatus: "Paid",
    filingStatus: "Filed",
    watchStatus: "Active",
    createdAt: "2025-10-25T10:00:00Z",
  },
  {
    id: "ORD-2025-002",
    mark: "HELIO",
    classes: [25],
    tier: "Individual/Startup/MSME",
    professionalFee: 14900,
    govtFee: 4500,
    paymentStatus: "Unpaid",
    filingStatus: "Drafting",
    watchStatus: "Inactive",
    createdAt: "2025-10-28T14:30:00Z",
  },
];

export default function MarksterDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [query, setQuery] = useState("");
  const [activeView, setActiveView] = useState<"orders" | "applications" | "payments" | "status" | "help">("orders");
  const [showTicketFor, setShowTicketFor] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query) return orders;
    const q = query.toLowerCase();
    return orders.filter((o) =>
      o.id.toLowerCase().includes(q) ||
      o.mark.toLowerCase().includes(q) ||
      (o.applicationNo || "").toLowerCase().includes(q)
    );
  }, [orders, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Markster Dashboard</h1>
          <p className="text-gray-600">Track your trademark orders, filings, payments, and alerts. Raise a help ticket any time.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Input placeholder="Search by Order ID / Mark / Application No" value={query} onChange={(e) => setQuery(e.target.value)} className="pr-10" />
            <Filter className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
          </div>
          <Button onClick={() => setActiveView("help")} variant="outline"><HelpCircle className="mr-2 h-4 w-4" /> Help</Button>
        </div>
      </div>

      {/* Nav */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant={activeView === "orders" ? "default" : "outline"} onClick={() => setActiveView("orders")}>
          <FileText className="mr-2 h-4 w-4" /> Orders
        </Button>
        <Button variant={activeView === "applications" ? "default" : "outline"} onClick={() => setActiveView("applications")}>
          <ShieldCheck className="mr-2 h-4 w-4" /> Applications
        </Button>
        <Button variant={activeView === "payments" ? "default" : "outline"} onClick={() => setActiveView("payments")}>
          <CreditCard className="mr-2 h-4 w-4" /> Payments
        </Button>
        <Button variant={activeView === "status" ? "default" : "outline"} onClick={() => setActiveView("status")}>
          <Clock className="mr-2 h-4 w-4" /> Status
        </Button>
        <Button variant={activeView === "help" ? "default" : "outline"} onClick={() => setActiveView("help")}>
          <HelpCircle className="mr-2 h-4 w-4" /> Help
        </Button>
      </div>

      {/* Views */}
      {activeView === "orders" && <OrdersView rows={filtered} onHelp={(id) => setShowTicketFor(id)} />}
      {activeView === "applications" && <ApplicationsView rows={filtered} onHelp={(id) => setShowTicketFor(id)} />}
      {activeView === "payments" && <PaymentsView rows={filtered} onHelp={(id) => setShowTicketFor(id)} />}
      {activeView === "status" && <StatusView rows={filtered} onHelp={(id) => setShowTicketFor(id)} />}
      {activeView === "help" && <HelpCenter orders={orders} />}

      {/* Ticket Drawer (simple inline panel) */}
      {showTicketFor && (
        <TicketPanel order={orders.find((o) => o.id === showTicketFor)!} onClose={() => setShowTicketFor(null)} />
      )}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700">{children}</span>;
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-12">{children}</div>;
}

function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-sm text-gray-800 ${className}`}>{children}</div>;
}

function OrdersView({ rows, onHelp }: { rows: Order[]; onHelp: (id: string) => void }) {
  return (
    <div className="mt-6 space-y-4">
      {rows.map((o) => (
        <Row key={o.id}>
          <Cell className="md:col-span-3">
            <div className="font-semibold">{o.id}</div>
            <div className="text-xs text-gray-600">Created {new Date(o.createdAt).toLocaleString("en-IN")}</div>
          </Cell>
          <Cell className="md:col-span-3">
            <div className="font-medium">{o.mark}</div>
            <div className="text-xs text-gray-600">Classes: {o.classes.join(", ")}</div>
          </Cell>
          <Cell className="md:col-span-2">
            <div className="text-xs text-gray-600">Tier</div>
            <Pill>{o.tier}</Pill>
          </Cell>
          <Cell className="md:col-span-2">
            <div className="text-xs text-gray-600">Fees</div>
            <div>Pro: ₹{o.professionalFee.toLocaleString("en-IN")}</div>
            <div>Govt: ₹{o.govtFee.toLocaleString("en-IN")}</div>
          </Cell>
          <Cell className="md:col-span-2 flex items-center justify-end gap-2">
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" onClick={() => onHelp(o.id)}><HelpCircle className="mr-1 h-4 w-4" /> Raise Ticket</Button>
          </Cell>
        </Row>
      ))}
    </div>
  );
}

function ApplicationsView({ rows, onHelp }: { rows: Order[]; onHelp: (id: string) => void }) {
  return (
    <div className="mt-6 space-y-4">
      {rows.map((o) => (
        <Row key={o.id}>
          <Cell className="md:col-span-4">
            <div className="text-xs text-gray-600">Order</div>
            <div className="font-semibold">{o.id}</div>
          </Cell>
          <Cell className="md:col-span-4">
            <div className="text-xs text-gray-600">Application No</div>
            <div className="font-medium">{o.applicationNo || "—"}</div>
          </Cell>
          <Cell className="md:col-span-2">
            <div className="text-xs text-gray-600">Filing Status</div>
            <StatusBadge state={o.filingStatus} />
          </Cell>
          <Cell className="md:col-span-2 flex items-center justify-end gap-2">
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" onClick={() => onHelp(o.id)}><HelpCircle className="mr-1 h-4 w-4" /> Ticket</Button>
          </Cell>
        </Row>
      ))}
    </div>
  );
}

function PaymentsView({ rows, onHelp }: { rows: Order[]; onHelp: (id: string) => void }) {
  return (
    <div className="mt-6 space-y-4">
      {rows.map((o) => (
        <Row key={o.id}>
          <Cell className="md:col-span-3">
            <div className="text-xs text-gray-600">Order</div>
            <div className="font-semibold">{o.id}</div>
          </Cell>
          <Cell className="md:col-span-3">
            <div className="text-xs text-gray-600">Amount</div>
            <div className="font-medium">₹{(o.professionalFee + o.govtFee).toLocaleString("en-IN")}</div>
          </Cell>
          <Cell className="md:col-span-3">
            <div className="text-xs text-gray-600">Payment Status</div>
            <Pill>{o.paymentStatus}</Pill>
          </Cell>
          <Cell className="md:col-span-3 flex items-center justify-end gap-2">
            <Button size="sm" variant="outline">Invoice</Button>
            <Button size="sm" onClick={() => onHelp(o.id)}><HelpCircle className="mr-1 h-4 w-4" /> Help</Button>
          </Cell>
        </Row>
      ))}
    </div>
  );
}

function StatusView({ rows, onHelp }: { rows: Order[]; onHelp: (id: string) => void }) {
  return (
    <div className="mt-6 space-y-4">
      {rows.map((o) => (
        <Row key={o.id}>
          <Cell className="md:col-span-3">
            <div className="text-xs text-gray-600">Order</div>
            <div className="font-semibold">{o.id}</div>
          </Cell>
          <Cell className="md:col-span-3">
            <div className="text-xs text-gray-600">Filing</div>
            <StatusBadge state={o.filingStatus} />
          </Cell>
          <Cell className="md:col-span-3">
            <div className="text-xs text-gray-600">Watch</div>
            <Pill>{o.watchStatus}</Pill>
          </Cell>
          <Cell className="md:col-span-3 flex items-center justify-end gap-2">
            <Button size="sm" variant="outline">Timeline</Button>
            <Button size="sm" onClick={() => onHelp(o.id)}><HelpCircle className="mr-1 h-4 w-4" /> Ticket</Button>
          </Cell>
        </Row>
      ))}
    </div>
  );
}

function StatusBadge({ state }: { state: Order["filingStatus"] }) {
  const map: Record<Order["filingStatus"], string> = {
    Drafting: "bg-gray-100 text-gray-800",
    Filed: "bg-blue-100 text-blue-800",
    Objected: "bg-amber-100 text-amber-800",
    Accepted: "bg-emerald-100 text-emerald-800",
    Registered: "bg-purple-100 text-purple-800",
  };
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${map[state]}`}>{state}</span>;
}

function TicketPanel({ order, onClose }: { order: Order; onClose: () => void }) {
  const [category, setCategory] = useState("Status Update");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 w-full border-t bg-white shadow-xl">
      <div className="mx-auto max-w-3xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-600">Raise Ticket for</div>
            <div className="font-semibold">{order.id} · {order.mark} {order.applicationNo ? `· ${order.applicationNo}` : ""}</div>
          </div>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <Label htmlFor="category">Category</Label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
              <option>Status Update</option>
              <option>Billing/Invoice</option>
              <option>Govt Fee Proof</option>
              <option>Change Request</option>
              <option>Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Short summary" />
          </div>
          <div className="md:col-span-3">
            <Label htmlFor="message">Message</Label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe the issue or question..." className="mt-1 h-28 w-full rounded-md border px-3 py-2 text-sm"></textarea>
            <p className="mt-2 text-xs text-gray-600">Attachments can be emailed to <a className="underline" href="mailto:hello@thecompliers.com">hello@thecompliers.com</a> with the subject “{order.id} Ticket”.</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button>
            <Ticket className="mr-2 h-4 w-4" /> Submit Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}

function HelpCenter({ orders }: { orders: Order[] }) {
  return (
    <div className="mt-8">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5" /> Help Center</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <p>Welcome to the Markster Help Center. Choose an order from the list in any tab and click <strong>Raise Ticket</strong> to open a support request tied to that specific order/application.</p>
          <ul className="list-disc space-y-1 pl-6">
            <li><strong>Turnaround:</strong> We aim to respond within 1 business day.</li>
            <li><strong>Where to track:</strong> Tickets appear in the order’s timeline (coming soon).</li>
            <li><strong>Emergency:</strong> If a hearing is listed, email <a className="underline" href="mailto:hello@thecompliers.com">hello@thecompliers.com</a> with subject <em>URGENT – Hearing</em>.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" /> Where is my application?</CardTitle></CardHeader>
          <CardContent className="text-sm text-gray-700">
            You’ll see statuses like <em>Drafting</em>, <em>Filed</em>, <em>Objected</em>, <em>Accepted</em>, or <em>Registered</em> in the <strong>Status</strong> tab. Raise a ticket if something looks off.
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment & Invoices</CardTitle></CardHeader>
          <CardContent className="text-sm text-gray-700">
            Professional fees and official fees are shown per order under the <strong>Payments</strong> tab. Click <em>Invoice</em> to download. Govt fee proofs are provided at cost.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
