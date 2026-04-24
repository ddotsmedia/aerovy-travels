import type { Metadata } from "next";
import Link from "next/link";
import { Stamp, ShieldCheck, Clock, FileText, ArrowRight, Check } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "UAE Visa",
  description: "UAE tourist visa, transit visa, and visa-on-arrival — processed in 48 hours.",
};

const types = [
  {
    name: "Tourist visa · 30 days (single entry)",
    price: 370,
    processing: "48–72 hours",
    stay: "30 days",
    entries: "Single",
    eligibility: "Nationals from non-visa-on-arrival countries.",
  },
  {
    name: "Tourist visa · 30 days (multi-entry)",
    price: 690,
    processing: "48–72 hours",
    stay: "30 days",
    entries: "Multiple",
    eligibility: "Frequent visitors — business trips, multi-leg UAE + Oman trips.",
  },
  {
    name: "Tourist visa · 60 days (single entry)",
    price: 790,
    processing: "72–96 hours",
    stay: "60 days",
    entries: "Single",
    eligibility: "Long-stay visitors, students, researchers.",
  },
  {
    name: "Transit visa · 96 hours",
    price: 210,
    processing: "24 hours",
    stay: "96 hours",
    entries: "Single",
    eligibility: "Travellers transiting through AUH or DXB.",
  },
];

const steps = [
  { t: "Fill the form", d: "Passport scan, flight details, recent photo — takes 4 minutes." },
  { t: "Pay securely", d: "AED, USD, EUR, GBP, INR. Stripe-protected." },
  { t: "Get your e-visa", d: "Delivered to your email within the processing window." },
  { t: "Show on arrival", d: "Immigration scans the QR — most travellers clear in under 10 min." },
];

export default function VisaPage() {
  return (
    <>
      <section className="bg-bg relative overflow-hidden">
        <div className="bg-brand-primary/10 pointer-events-none absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Visa</span>
          </nav>
          <div className="text-brand-primary flex items-center gap-2">
            <Stamp className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">UAE e-visa</span>
          </div>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Your UAE visa, in 48 hours.
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            We&rsquo;re a Department of Culture & Tourism-accredited visa agent. Every application
            is reviewed by a human before submission — near-zero rejection rate since 2023.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="#apply">Start my application</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/visa/check">Check my status</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Clock, t: "48h avg turnaround", d: "Standard single-entry tourist visas" },
              { icon: ShieldCheck, t: "Human-reviewed", d: "Before submission to the UAE ICP" },
              { icon: FileText, t: "Refund if rejected", d: "Minus the ICP government fee" },
            ].map((b) => (
              <div
                key={b.t}
                className="border-border bg-surface flex items-start gap-3 rounded-xl border p-4"
              >
                <b.icon className="text-brand-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{b.t}</p>
                  <p className="text-muted text-sm">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">Pick your visa type</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {types.map((t) => (
            <Card key={t.name}>
              <CardContent className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-start">
                <div className="max-w-md">
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-muted mt-2 text-sm">{t.eligibility}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="text-brand-primary size-4" aria-hidden="true" />
                      Stay up to {t.stay}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-brand-primary size-4" aria-hidden="true" />
                      {t.entries} entry
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-brand-primary size-4" aria-hidden="true" />
                      Processing: {t.processing}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-muted text-xs">From</p>
                  <p className="text-2xl font-bold">{fmtAED(t.price)}</p>
                  <p className="text-muted text-xs">all-in, taxes & ICP fee</p>
                  <Button>Apply</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="apply" className="bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="border-border bg-bg rounded-xl border p-5">
                <span className="bg-brand-primary/15 text-brand-primary inline-flex size-7 items-center justify-center rounded-full text-sm font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold">{s.t}</h3>
                <p className="text-muted mt-1 text-sm">{s.d}</p>
              </li>
            ))}
          </ol>

          <form className="border-border bg-bg mt-10 space-y-4 rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">Quick eligibility check</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Nationality (e.g. India)" />
              <Input placeholder="Passport expiry" type="date" />
              <Input placeholder="Planned arrival date" type="date" />
              <Input placeholder="Trip purpose (tourism / business / family)" />
            </div>
            <Button size="lg" fullWidth>
              Check eligibility
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
