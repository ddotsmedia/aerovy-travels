import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Heart, Plane, Luggage, FileText, Check } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Travel insurance",
  description: "Medical, cancellation, baggage and adventure cover for your UAE trip.",
};

const plans = [
  {
    name: "Essential",
    pricePerDay: 14,
    tagline: "Medical + baggage — the minimum you should have.",
    cover: [
      "Medical expenses up to AED 750,000",
      "Hospitalisation + repatriation",
      "Lost baggage up to AED 3,000",
      "Passport / travel doc loss",
    ],
  },
  {
    name: "Comfort",
    pricePerDay: 24,
    tagline: "Most-popular · adds cancellation & delay cover.",
    cover: [
      "Everything in Essential",
      "Trip cancellation up to AED 25,000",
      "Trip curtailment & interruption",
      "Flight delay cash payouts (after 4h)",
      "Personal liability up to AED 1M",
    ],
    featured: true,
  },
  {
    name: "Adventure",
    pricePerDay: 38,
    tagline: "For desert safaris, watersports, skydiving.",
    cover: [
      "Everything in Comfort",
      "Hazardous sports cover (dune buggy, kite, hot-air balloon)",
      "Search & rescue up to AED 200,000",
      "Equipment loss up to AED 15,000",
    ],
  },
];

export default function InsurancePage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Insurance</span>
          </nav>
          <div className="text-brand-primary flex items-center gap-2">
            <Shield className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">Travel insurance</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Cover from AED 14 / day.
          </h1>
          <p className="text-muted mt-2 max-w-2xl">
            Underwritten by AIG Middle East · 24/7 Arabic + English + Hindi claims line · instant
            policy certificate for your visa application.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={"overflow-hidden " + (p.featured ? "ring-brand-primary ring-2" : "")}
            >
              <CardContent className="p-6">
                {p.featured && (
                  <span className="bg-brand-primary text-brand-secondary mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold">
                    Most popular
                  </span>
                )}
                <h2 className="text-xl font-bold">{p.name}</h2>
                <p className="text-muted mt-1 text-sm">{p.tagline}</p>
                <p className="mt-4 text-3xl font-bold">
                  {fmtAED(p.pricePerDay)}
                  <span className="text-muted text-sm font-normal"> / day</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.cover.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <Check
                        className="text-brand-primary mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6" fullWidth>
                  Select {p.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Heart, t: "Medical first", d: "Direct-billed hospitals across UAE." },
            { icon: Plane, t: "Flight delay cash", d: "Automated payouts after 4h delay." },
            { icon: Luggage, t: "Baggage tracking", d: "We work with airline lost-baggage teams." },
            { icon: FileText, t: "Visa-ready certificate", d: "Instant PDF for your embassy." },
          ].map((p) => (
            <div key={p.t} className="border-border bg-surface rounded-xl border p-5">
              <p.icon className="text-brand-primary size-5" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">{p.t}</h3>
              <p className="text-muted mt-1 text-sm">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
