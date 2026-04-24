import Link from "next/link";
import Image from "next/image";
import { Button } from "@aerovy/ui";
import { Sparkles, Search } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-bg relative overflow-hidden">
      <div className="from-brand-accent/25 via-brand-accent/5 pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] bg-gradient-to-b to-transparent" />
      <div className="bg-brand-primary/10 pointer-events-none absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full blur-3xl" />
      <div className="bg-brand-secondary/10 pointer-events-none absolute top-96 -left-40 -z-10 size-[28rem] rounded-full blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <span className="border-border bg-surface text-text inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase">
            <Sparkles className="text-brand-primary size-3" aria-hidden="true" />
            Abu Dhabi · handcrafted travel
          </span>

          <h1 className="text-text mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Discover Abu Dhabi, <span className="text-brand-primary">your way.</span>
          </h1>
          <p className="text-muted mt-6 max-w-xl text-lg">
            200+ vetted experiences — desert safaris, cultural tours, theme-park adventures, premium
            hotels and airport transfers — curated by locals, booked in minutes, and available in
            one tap.
          </p>

          <form action="/experiences" className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="border-border bg-bg flex flex-1 items-center gap-2 rounded-md border px-4">
              <Search className="text-muted size-4" aria-hidden="true" />
              <input
                name="q"
                placeholder="Try 'desert safari' or 'mangroves'"
                className="text-text placeholder:text-muted h-12 w-full bg-transparent text-sm focus:outline-none"
              />
            </label>
            <Button size="lg" type="submit">
              Search
            </Button>
          </form>

          <div className="text-muted mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span>Popular:</span>
            {["Sheikh Zayed Mosque", "Ferrari World", "Liwa safari", "Louvre"].map((k) => (
              <Link
                key={k}
                href={`/experiences?q=${encodeURIComponent(k)}`}
                className="border-border hover:border-brand-primary hover:text-brand-primary rounded-full border px-3 py-1"
              >
                {k}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="bg-brand-primary/20 absolute inset-0 rotate-3 rounded-3xl"
            aria-hidden="true"
          />
          <div className="bg-surface relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80"
              alt="Sheikh Zayed Grand Mosque at dusk"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="border-border bg-bg absolute -bottom-4 -left-6 rounded-xl border p-4 shadow-lg">
            <p className="text-brand-primary text-xs font-medium tracking-wide uppercase">
              AI planner
            </p>
            <p className="text-text mt-1 text-sm font-semibold">
              Build a 5-day trip in 60 seconds.
            </p>
            <Link
              href="/plan"
              className="text-brand-secondary mt-2 inline-flex text-xs font-medium underline-offset-4 hover:underline"
            >
              Try it now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
