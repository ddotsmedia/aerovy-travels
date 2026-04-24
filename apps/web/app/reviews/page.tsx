import type { Metadata } from "next";
import Link from "next/link";
import { Star, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "Reviews",
  description: "5,400+ verified reviews · 4.9 average rating.",
};

const dist = [
  { stars: 5, pct: 88 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 0.6 },
  { stars: 1, pct: 0.4 },
];

const reviews = [
  {
    name: "Amal H.",
    loc: "Dubai → Liwa",
    rating: 5,
    date: "2 days ago",
    body: "The bubble-tent upgrade was worth every dirham. Stargazing was surreal, breakfast at dawn outdoors. Driver Rashid was a legend.",
  },
  {
    name: "Oliver P.",
    loc: "London → Abu Dhabi",
    rating: 5,
    date: "4 days ago",
    body: "Booked the Louvre curator tour + Grand Mosque in one day. The logistics were flawless — felt like a VIP the whole way.",
  },
  {
    name: "Sunita K.",
    loc: "Mumbai → Abu Dhabi",
    rating: 5,
    date: "1 week ago",
    body: "Family of 6, stayed at Rosewood through Aerovy. Bundle saved us a full night&rsquo;s stay vs booking direct.",
  },
  {
    name: "Dimitri V.",
    loc: "Moscow → Abu Dhabi",
    rating: 4,
    date: "1 week ago",
    body: "Solid. Dune buggy tour was a highlight. One minor: pickup was 20 min late from Yas Marina hotel — they refunded 10% without me asking.",
  },
  {
    name: "Priya & Rohan",
    loc: "Bengaluru → Abu Dhabi",
    rating: 5,
    date: "2 weeks ago",
    body: "Honeymoon package. The private dhow with chef = most romantic evening of our lives. Concierge Yulia was WhatsApp-available the whole trip.",
  },
  {
    name: "Jurgen B.",
    loc: "Munich → Sir Bani Yas",
    rating: 5,
    date: "3 weeks ago",
    body: "Wildlife reserve stay at Anantara, oryx drive at dawn. Aerovy got us an upgrade to a beach villa. Flawless.",
  },
  {
    name: "Layla F.",
    loc: "Abu Dhabi resident",
    rating: 4,
    date: "1 month ago",
    body: "Used them for my dad&rsquo;s 70th — Emirates Palace high tea + chauffeur for the day. Tidy little operation, clear pricing.",
  },
  {
    name: "Marc C.",
    loc: "Paris → Abu Dhabi",
    rating: 5,
    date: "1 month ago",
    body: "Ferrari World + Warner Bros tickets via Aerovy were 15% less than gate price. And skip-the-line was real.",
  },
  {
    name: "Noor A.",
    loc: "Jeddah → Liwa",
    rating: 5,
    date: "1 month ago",
    body: "The Bedouin camp was the real deal — no plastic floors, no fake sheikh-tent aesthetic. Falconer was an actual master.",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Reviews</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">What travellers say</h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-brand-primary flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-2xl font-bold">4.9</span>
                <span className="text-muted">· 5,400+ verified reviews</span>
              </div>
              <p className="text-muted mt-4 inline-flex items-center gap-2 text-sm">
                <ShieldCheck className="text-brand-primary size-4" aria-hidden="true" />
                Verified: reviewers must complete a booking to post. No incentivized reviews, ever.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <ul className="space-y-2">
                {dist.map((d) => (
                  <li key={d.stars} className="flex items-center gap-3 text-sm">
                    <span className="text-muted w-8">{d.stars}★</span>
                    <div className="bg-border h-2 flex-1 overflow-hidden rounded-full">
                      <div className="bg-brand-primary h-full" style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="text-muted w-12 text-right font-mono text-xs">{d.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name + r.date}>
              <CardContent className="flex h-full flex-col gap-3 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-brand-primary flex gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-muted text-xs">{r.date}</span>
                </div>
                <p className="flex-1 text-sm leading-relaxed">{r.body}</p>
                <div className="border-border text-muted border-t pt-3 text-xs">
                  <span className="text-text font-semibold">{r.name}</span> · {r.loc}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
