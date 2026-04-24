import type { Metadata } from "next";
import Link from "next/link";
import { Globe2, Shield, Star, Users, Leaf, Award } from "lucide-react";
import { Button } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "About us",
  description: "Aerovy Travels — a premium Abu Dhabi travel platform built by locals.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-surface relative overflow-hidden">
        <div className="bg-brand-primary/10 pointer-events-none absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
            About Aerovy
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Premium travel, locally owned.
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg">
            We started Aerovy because the best of Abu Dhabi was getting lost behind
            over-commoditized booking marketplaces. Every supplier we list is visited, priced, and
            graded in person.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
              Our story
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">From dhow to digital.</h2>
          </div>
          <div className="text-text/90 space-y-4 text-lg">
            <p>
              Aerovy Travels was founded in 2025 by a team of Abu Dhabi-born hospitality operators —
              two former hotel concierges, a desert-safari operator with 14 years in Liwa, and a
              software engineer who once built booking systems for Etihad.
            </p>
            <p>
              The thesis is simple: the best travel experiences in the UAE are small, family-run,
              and rarely well-represented online. Global marketplaces favour the largest suppliers,
              not the best ones. We&rsquo;re here to change that — with a curated catalog, an AI
              planner that surfaces real inventory, and an in-house concierge that picks up the
              phone at 11pm on a Friday.
            </p>
            <p>
              We&rsquo;re registered in Abu Dhabi, licensed by the Department of Culture & Tourism,
              and a member of the UAE Travel Agents Association.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">
              What we believe
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Six commitments.</h2>
          </header>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Real vetting",
                body: "Every supplier visited in person; no third-hand listings.",
              },
              {
                icon: Star,
                title: "Best-rate guarantee",
                body: "Find it cheaper elsewhere and we match it, or refund the difference.",
              },
              {
                icon: Users,
                title: "Real concierge",
                body: "A human on WhatsApp during your trip, not a chatbot.",
              },
              {
                icon: Leaf,
                title: "Sustainable suppliers",
                body: "Preferred partners: electric fleet, mangrove-positive operators.",
              },
              {
                icon: Globe2,
                title: "Multi-lingual always",
                body: "Service in EN / AR / HI / RU / ZH at every touchpoint.",
              },
              {
                icon: Award,
                title: "AI with integrity",
                body: "The planner only books real inventory, not hallucinated attractions.",
              },
            ].map((v) => (
              <div key={v.title} className="border-border bg-bg rounded-xl border p-6">
                <v.icon className="text-brand-primary size-6" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="text-muted mt-2 text-sm">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-brand-primary text-sm font-medium tracking-wide uppercase">Team</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">A small, senior team.</h2>
        </header>
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {[
            { name: "Omar Al Mazrouei", role: "CEO, ex-Etihad Guest" },
            { name: "Mariam Fahd", role: "Head of Experiences" },
            { name: "Ravi Menon", role: "CTO, ex-Booking.com" },
            { name: "Yulia Nazarova", role: "Head of Concierge" },
          ].map((p) => (
            <div
              key={p.name}
              className="border-border bg-surface rounded-xl border p-6 text-center"
            >
              <div className="from-brand-primary/30 to-brand-secondary/30 mx-auto size-20 rounded-full bg-gradient-to-br" />
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="text-muted mt-1 text-sm">{p.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-border bg-brand-secondary text-bg border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to explore?</h2>
          <p className="text-bg/80 mt-4">
            Start with the AI planner or browse our curated catalog.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/plan">Plan with AI</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-bg/30 text-bg hover:bg-bg/10"
            >
              <Link href="/experiences">Browse experiences</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
