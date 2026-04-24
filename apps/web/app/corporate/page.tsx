import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Plane, Building2, BarChart3, Shield, CreditCard } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "Corporate travel",
  description: "B2B travel desk — flights, hotels, MICE, consolidated invoicing.",
};

export default function CorporatePage() {
  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Corporate</span>
          </nav>
          <div className="text-brand-primary flex items-center gap-2">
            <Briefcase className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">Corporate travel</span>
          </div>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            One desk for every business trip to the UAE.
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            Dedicated account managers, consolidated monthly invoicing in AED or USD, custom policy
            enforcement, and a portal built for finance teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="#request">Request a demo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact?topic=corporate">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">What&rsquo;s included</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Plane,
              t: "Flight management",
              d: "Preferred airline agreements, pre-approval workflows, OBT integration.",
            },
            {
              icon: Building2,
              t: "Hotel + serviced apartments",
              d: "Negotiated corporate rates across 400+ UAE properties.",
            },
            {
              icon: BarChart3,
              t: "Reporting & analytics",
              d: "Monthly spend, CO₂ footprint, policy compliance dashboards.",
            },
            {
              icon: CreditCard,
              t: "Consolidated invoicing",
              d: "One invoice per month, per entity. VAT-compliant.",
            },
            {
              icon: Shield,
              t: "Duty of care",
              d: "24/7 traveller tracking, emergency-ops desk, risk alerts.",
            },
            {
              icon: Briefcase,
              t: "MICE & incentives",
              d: "Venue sourcing, group bookings, full event management.",
            },
          ].map((p) => (
            <Card key={p.t}>
              <CardContent className="p-6">
                <p.icon className="text-brand-primary size-6" aria-hidden="true" />
                <h3 className="mt-4 font-semibold">{p.t}</h3>
                <p className="text-muted mt-2 text-sm">{p.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="request" className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Request a demo</h2>
          <p className="text-muted mt-2">
            A dedicated account manager will reach out within 1 business day with a tailored
            proposal.
          </p>
          <form className="border-border bg-bg mt-6 space-y-4 rounded-2xl border p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Company" required />
              <Input placeholder="Your role" />
              <Input placeholder="Work email" type="email" required />
              <Input placeholder="Phone / WhatsApp" type="tel" />
              <label className="sm:col-span-2">
                <span className="text-sm font-medium">Approximate annual travel volume</span>
                <select className="border-border bg-bg mt-1 h-10 w-full rounded-md border px-3 text-sm">
                  <option>&lt; AED 500K</option>
                  <option>AED 500K – 2M</option>
                  <option>AED 2M – 10M</option>
                  <option>AED 10M+</option>
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="text-sm font-medium">Tell us about your needs</span>
                <textarea
                  rows={4}
                  className="border-border bg-bg mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="MICE events? Traveller tracking? Specific destinations?"
                />
              </label>
            </div>
            <Button size="lg" fullWidth type="submit">
              Request demo
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
