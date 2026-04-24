import Link from "next/link";
import { Button } from "@aerovy/ui";
import { Sparkles, Check } from "lucide-react";

const bullets = [
  "Tell us dates, budget, group size, interests",
  "We draft a day-by-day plan with real bookable slots",
  "Accept, tweak, or reshuffle — we re-plan in seconds",
];

export function AiTeaser() {
  return (
    <section className="bg-brand-secondary text-bg">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="bg-brand-primary/20 text-brand-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase">
            <Sparkles className="size-3" aria-hidden="true" />
            AI Trip Planner
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Your perfect Abu Dhabi trip, drafted in 60 seconds.
          </h2>
          <p className="text-bg/80 mt-4 max-w-lg">
            Powered by Claude, grounded in our vetted catalog. No hallucinated hotels, no fake
            attractions — only real inventory with real prices.
          </p>
          <ul className="mt-8 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check className="text-brand-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <span className="text-bg/90">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/plan">Try the AI planner</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-bg/30 text-bg hover:bg-bg/10"
            >
              <Link href="/packages">Or browse curated packages</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-bg/5 ring-bg/10 rounded-2xl p-6 ring-1 backdrop-blur">
            <div className="space-y-4 font-mono text-sm">
              <div className="bg-bg/10 rounded-lg px-4 py-3">
                <span className="text-brand-primary">You:</span> 4 days in Abu Dhabi, family of
                four, love culture + one wow-moment.
              </div>
              <div className="bg-brand-primary/20 text-bg rounded-lg px-4 py-3">
                <span className="text-brand-accent">Aerovy:</span> Day 1 — Grand Mosque 09:00,
                Louvre timed entry 14:00. Day 2 — Liwa overnight safari with stargazing. Day 3 —
                Ferrari World + Yas Waterworld. Day 4 — Mangroves + Corniche dhow sunset.
              </div>
              <div className="bg-bg/10 rounded-lg px-4 py-3">
                <span className="text-brand-primary">You:</span> Swap day 3 for something calmer.
              </div>
              <div className="bg-brand-primary/20 text-bg rounded-lg px-4 py-3">
                <span className="text-brand-accent">Aerovy:</span> Day 3 becomes Saadiyat beach club
                → Heritage Village → Emirates Palace high tea. All re-booked.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
