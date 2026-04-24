import type { Metadata } from "next";
import Link from "next/link";
import { Users, Heart, GraduationCap, Megaphone, Gift, Sparkles } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "Group bookings",
  description: "Weddings, incentives, school trips, family reunions — all handled.",
};

const types = [
  {
    icon: Heart,
    title: "Weddings & honeymoons",
    desc: "Intimate 20-pax ceremonies to 300-pax destination weddings.",
  },
  {
    icon: Megaphone,
    title: "Corporate incentives",
    desc: "Reward trips for top performers — private yachts, F1 hospitality.",
  },
  {
    icon: GraduationCap,
    title: "School trips",
    desc: "Educational tours with dedicated chaperones and risk assessments.",
  },
  {
    icon: Users,
    title: "Family reunions",
    desc: "Multi-generational trips with kid-friendly pacing and grandparent-friendly villas.",
  },
  {
    icon: Gift,
    title: "Bachelor & bachelorette",
    desc: "Desert glamping, spa days, yacht parties — discreet & fun.",
  },
  {
    icon: Sparkles,
    title: "Milestone birthdays",
    desc: "60-person villa takeovers, private chefs, DJ + light shows.",
  },
];

export default function GroupsPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Groups</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Group & event bookings.</h1>
          <p className="text-muted mt-2 max-w-2xl">
            10–300 guests? We&rsquo;re your single point of contact. From venue sourcing to
            on-ground coordination on the day itself.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((t) => (
            <Card key={t.title}>
              <CardContent className="p-6">
                <t.icon className="text-brand-primary size-6" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-semibold">{t.title}</h2>
                <p className="text-muted mt-2 text-sm">{t.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Tell us about your group</h2>
          <form className="border-border bg-bg mt-6 space-y-4 rounded-2xl border p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Your name" required />
              <Input placeholder="Email" type="email" required />
              <Input placeholder="Phone / WhatsApp" type="tel" />
              <Input placeholder="Company (optional)" />
              <label className="sm:col-span-2">
                <span className="text-sm font-medium">Occasion</span>
                <select className="border-border bg-bg mt-1 h-10 w-full rounded-md border px-3 text-sm">
                  <option>Corporate incentive</option>
                  <option>Wedding</option>
                  <option>Family reunion</option>
                  <option>School trip</option>
                  <option>Bachelor / bachelorette</option>
                  <option>Milestone birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <Input placeholder="Group size" type="number" />
              <Input placeholder="Approximate dates" />
              <label className="sm:col-span-2">
                <span className="text-sm font-medium">Tell us more</span>
                <textarea
                  rows={4}
                  className="border-border bg-bg mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Preferred district, accommodation type, budget ballpark, special requirements..."
                />
              </label>
            </div>
            <Button size="lg" fullWidth type="submit">
              Request proposal
            </Button>
            <p className="text-muted text-xs">
              A senior planner will respond within 1 business day with a tailored proposal.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
