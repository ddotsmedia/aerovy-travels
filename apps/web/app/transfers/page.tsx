import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Car, Bus, Crown, Users, Clock, Check } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transfers",
  description: "Airport transfers, chauffeur-driven cars, intercity shuttles — all across the UAE.",
};

const services = [
  {
    icon: Plane,
    title: "Airport transfers",
    tagline: "AUH / DXB / DWC · 24/7 meet-and-greet",
    description:
      "Licensed drivers, flight-tracked pickup, complimentary child seats and 30 min of free waiting time.",
    price: 185,
    unit: "per journey",
    tiers: [
      { name: "Comfort (Camry)", pax: 3, price: 185 },
      { name: "Premium (E-Class)", pax: 3, price: 295 },
      { name: "SUV (GLS)", pax: 6, price: 445 },
      { name: "Executive van", pax: 7, price: 520 },
    ],
  },
  {
    icon: Car,
    title: "Chauffeur by the hour",
    tagline: "Minimum 3 hours · bilingual drivers",
    description:
      "For shopping runs, supplier meetings, or a day of wandering. English + Arabic + Hindi + Russian.",
    price: 210,
    unit: "per hour",
    tiers: [
      { name: "Comfort", pax: 3, price: 210 },
      { name: "Premium", pax: 3, price: 330 },
      { name: "Executive van", pax: 7, price: 510 },
    ],
  },
  {
    icon: Bus,
    title: "Intercity shuttles",
    tagline: "Abu Dhabi ↔ Dubai · Al Ain · Liwa",
    description: "Private one-way or return journeys across the UAE. Perfect for multi-city trips.",
    price: 425,
    unit: "one way",
    tiers: [
      { name: "Abu Dhabi ↔ Dubai", pax: 3, price: 425 },
      { name: "Abu Dhabi ↔ Al Ain", pax: 3, price: 640 },
      { name: "Abu Dhabi ↔ Liwa", pax: 3, price: 890 },
    ],
  },
  {
    icon: Crown,
    title: "VIP & armored",
    tagline: "Range Rover, G-Class, or armored B6",
    description:
      "For VIPs, executives, or families requiring elevated discretion. By private quote.",
    price: 1850,
    unit: "per day",
    tiers: [
      { name: "Range Rover LWB", pax: 4, price: 1850 },
      { name: "G-Class", pax: 4, price: 2200 },
      { name: "Armored B6 suburban", pax: 4, price: 4800 },
    ],
  },
];

export default function TransfersPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Transfers</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Transfers & chauffeurs</h1>
          <p className="text-muted mt-2 max-w-2xl">
            Licensed fleet partners, RTA-compliant drivers, and flight-tracked pickups. Every driver
            speaks English; most speak Arabic, Hindi, or Russian too.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <Card key={s.title}>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary/10 text-brand-primary flex size-12 shrink-0 items-center justify-center rounded-lg">
                    <s.icon className="size-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{s.title}</h2>
                    <p className="text-muted text-sm">{s.tagline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted text-xs">From</p>
                    <p className="text-lg font-bold">{fmtAED(s.price)}</p>
                    <p className="text-muted text-xs">{s.unit}</p>
                  </div>
                </div>
                <p className="text-text/90 mt-4 text-sm">{s.description}</p>

                <ul className="divide-border border-border bg-surface mt-5 divide-y rounded-lg border">
                  {s.tiers.map((t) => (
                    <li
                      key={t.name}
                      className="flex items-center justify-between px-4 py-3 text-sm"
                    >
                      <span className="flex items-center gap-3">
                        <Users className="text-muted size-4" aria-hidden="true" />
                        <span>
                          <span className="font-medium">{t.name}</span>
                          <span className="text-muted ml-2">· up to {t.pax} pax</span>
                        </span>
                      </span>
                      <span className="font-semibold">{fmtAED(t.price)}</span>
                    </li>
                  ))}
                </ul>

                <Button className="mt-6" fullWidth>
                  Request quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="border-border bg-surface mt-12 grid gap-4 rounded-2xl border p-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Check, text: "Licensed, insured, RTA-compliant fleet" },
            { icon: Clock, text: "30 min free waiting · flight-tracked" },
            { icon: Check, text: "Child seats complimentary" },
            { icon: Check, text: "Cancel up to 12h before for free" },
          ].map((t) => (
            <div key={t.text} className="flex items-start gap-3">
              <t.icon className="text-brand-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <span className="text-sm">{t.text}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
