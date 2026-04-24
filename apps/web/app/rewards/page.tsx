import type { Metadata } from "next";
import Link from "next/link";
import { Star, Gift, TrendingUp, Users, Crown } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "Aerovy Rewards",
  description: "Earn points on every booking. Redeem for upgrades, free nights, and experiences.",
};

const tiers = [
  {
    name: "Sand",
    spend: "AED 0",
    perks: ["1 point per AED 10", "Free cancellation 24h before", "Priority WhatsApp support"],
    color: "bg-muted/20",
  },
  {
    name: "Gold",
    spend: "AED 10,000 / year",
    perks: [
      "1.5 points per AED 10",
      "Complimentary hotel upgrade (subject to availability)",
      "Early-access to flash sales",
      "Airport meet-and-greet on any booking",
    ],
    color: "bg-brand-primary/30",
    featured: true,
  },
  {
    name: "Platinum",
    spend: "AED 50,000 / year",
    perks: [
      "2 points per AED 10",
      "Guaranteed hotel upgrade",
      "Dedicated concierge (by name)",
      "Invitation-only events",
      "Annual 2-night stay on us",
    ],
    color: "bg-brand-secondary/30",
  },
];

export default function RewardsPage() {
  return (
    <>
      <section className="bg-brand-secondary text-bg relative overflow-hidden">
        <div className="bg-brand-primary/30 pointer-events-none absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="text-bg/70 mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Rewards</span>
          </nav>
          <div className="text-brand-primary flex items-center gap-2">
            <Crown className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">Aerovy Rewards</span>
          </div>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Every trip gets you closer to the next one.
          </h1>
          <p className="text-bg/80 mt-4 max-w-2xl">
            Earn points on flights, hotels, experiences, and transfers. Redeem them for upgrades,
            free nights, and exclusive experiences. Always free to join, never expiring.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/signup">Join Rewards — free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-bg/30 text-bg hover:bg-bg/10"
            >
              <Link href="/rewards/how-it-works">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">Three tiers, clear benefits.</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <Card
              key={t.name}
              className={"overflow-hidden " + (t.featured ? "ring-brand-primary ring-2" : "")}
            >
              <div className={`h-20 ${t.color}`} />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className="text-muted mt-1 text-sm">Unlocks at {t.spend}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Star
                        className="text-brand-primary mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Ways to earn & redeem</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                t: "1.5–2× bonus on experiences",
                d: "Double points on AI planner bookings.",
              },
              {
                icon: Gift,
                t: "Redeem for upgrades",
                d: "From AED 250 of points = 1 room-category upgrade.",
              },
              {
                icon: Users,
                t: "Refer a friend",
                d: "You both get 500 points on their first booking.",
              },
            ].map((p) => (
              <div key={p.t} className="border-border bg-bg rounded-xl border p-6">
                <p.icon className="text-brand-primary size-5" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{p.t}</h3>
                <p className="text-muted mt-1 text-sm">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
