import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join a small senior team building the UAE's best travel platform.",
};

const roles = [
  {
    title: "Senior Full-Stack Engineer",
    loc: "Abu Dhabi",
    type: "Full-time · on-site",
    team: "Engineering",
  },
  { title: "Product Designer", loc: "Abu Dhabi / remote", type: "Full-time", team: "Design" },
  { title: "AI / ML Engineer", loc: "Remote (GMT ±3)", type: "Full-time", team: "AI" },
  {
    title: "Concierge Agent · Arabic + English",
    loc: "Abu Dhabi",
    type: "Full-time · on-site",
    team: "Operations",
  },
  {
    title: "Concierge Agent · Hindi + English",
    loc: "Abu Dhabi",
    type: "Full-time · on-site",
    team: "Operations",
  },
  { title: "Supplier Partnerships Lead", loc: "Abu Dhabi", type: "Full-time", team: "BD" },
  { title: "Finance & Admin Manager", loc: "Abu Dhabi", type: "Full-time", team: "G&A" },
  {
    title: "Marketing Copywriter (EN / AR)",
    loc: "Abu Dhabi / remote",
    type: "Full-time",
    team: "Marketing",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Careers</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Work with us.</h1>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            A small, senior team — 18 humans across Abu Dhabi and remote. We ship weekly, we care
            about craft, and we&rsquo;re on a mission to make UAE travel genuinely delightful.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              { k: "18", v: "Humans on the team" },
              { k: "AED 360K+", v: "Median compensation" },
              { k: "32d", v: "Annual leave" },
              { k: "100%", v: "Visa + health cover" },
            ].map((s) => (
              <div key={s.v} className="border-border bg-bg rounded-xl border p-4">
                <p className="text-brand-primary text-2xl font-bold">{s.k}</p>
                <p className="text-muted mt-1 text-xs">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">Open roles</h2>
        <div className="divide-border border-border bg-surface mt-6 divide-y rounded-2xl border">
          {roles.map((r) => (
            <Link
              key={r.title}
              href={`/careers/${r.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              className="hover:bg-bg flex flex-wrap items-center justify-between gap-4 px-6 py-5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-brand-primary text-xs font-medium tracking-wide uppercase">
                  {r.team}
                </p>
                <p className="mt-1 text-lg font-semibold">{r.title}</p>
                <p className="text-muted mt-1 flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3" aria-hidden="true" />
                    {r.loc}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="size-3" aria-hidden="true" />
                    {r.type}
                  </span>
                </p>
              </div>
              <ArrowRight className="text-muted size-5 shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-brand-secondary text-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Don&rsquo;t see your role?
          </h2>
          <p className="text-bg/80 mt-2">
            We&rsquo;re always curious to meet exceptional people. Send us a short note and a link
            to something you&rsquo;re proud of.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/contact?topic=careers">Get in touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
