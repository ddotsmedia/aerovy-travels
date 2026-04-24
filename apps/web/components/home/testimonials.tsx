import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The AI planner nailed the balance of culture and adventure for our 4-day trip. Louvre + Liwa overnight safari + Ferrari World = never felt rushed, always felt curated.",
    name: "Priya M.",
    role: "Traveller from Mumbai",
  },
  {
    quote:
      "Concierge rebooked our desert safari by WhatsApp when a sandstorm rolled in. Clients got the experience anyway — Aerovy is now our default UAE partner.",
    name: "Sebastian K.",
    role: "Travel agent, Berlin",
  },
  {
    quote:
      "The private dhow cruise for our anniversary was beyond anything we&rsquo;d imagined. Exceptional attention to every detail.",
    name: "Layla & Tom",
    role: "Residents of Abu Dhabi",
  },
];

export function Testimonials() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
            Traveller stories
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            4.9 average across 5,400+ verified reviews.
          </h2>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="border-border bg-surface flex h-full flex-col justify-between rounded-2xl border p-8"
            >
              <div>
                <div className="text-brand-primary flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-text mt-4 text-base leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="border-border mt-6 border-t pt-4 text-sm">
                <p className="text-text font-semibold">{t.name}</p>
                <p className="text-muted">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
