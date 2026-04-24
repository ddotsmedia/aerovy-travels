import { Search, CalendarCheck, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse or let AI plan",
    description:
      "Pick from 200+ vetted experiences, or answer 4 questions and get a day-by-day itinerary in seconds.",
  },
  {
    icon: CalendarCheck,
    title: "Book in 60 seconds",
    description:
      "Instant confirmation, flexible cancellation up to 24h before, and digital vouchers straight to your wallet.",
  },
  {
    icon: PartyPopper,
    title: "Show up and enjoy",
    description:
      "Your concierge is one WhatsApp away the whole trip — for directions, changes, or upgrades.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From &ldquo;maybe&rdquo; to &ldquo;can&rsquo;t wait&rdquo; in three steps.
          </h2>
        </header>

        <ol className="mt-12 grid gap-8 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border-border bg-surface relative rounded-2xl border p-8">
              <span className="bg-brand-primary text-brand-secondary absolute -top-4 left-8 rounded-full px-3 py-1 text-xs font-bold">
                Step {i + 1}
              </span>
              <div className="bg-brand-primary/10 text-brand-primary flex size-14 items-center justify-center rounded-xl">
                <s.icon className="size-7" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="text-muted mt-2">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
