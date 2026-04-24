import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: "F1 Grand Prix, art fairs, concerts, and festivals across Abu Dhabi.",
};

type Event = {
  slug: string;
  title: string;
  date: string;
  venue: string;
  category: string;
  priceFrom: number;
  image: string;
  tagline: string;
};

const events: Event[] = [
  {
    slug: "abu-dhabi-grand-prix",
    title: "Formula 1 Etihad Airways Abu Dhabi Grand Prix",
    date: "5–7 Dec 2026",
    venue: "Yas Marina Circuit",
    category: "Motorsport",
    priceFrom: 1450,
    image:
      "https://images.unsplash.com/photo-1551527146-b43c55286450?auto=format&fit=crop&w=1600&q=80",
    tagline: "Season finale · 3 days of racing + nightly concerts on Yas Island.",
  },
  {
    slug: "abu-dhabi-art-fair",
    title: "Abu Dhabi Art Fair",
    date: "18–22 Nov 2026",
    venue: "Manarat Al Saadiyat",
    category: "Art & design",
    priceFrom: 85,
    image:
      "https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?auto=format&fit=crop&w=1600&q=80",
    tagline: "100+ galleries from across MENA, South Asia and Europe.",
  },
  {
    slug: "etihad-park-concerts",
    title: "Coldplay · Music of the Spheres",
    date: "14 Jan 2027",
    venue: "Etihad Arena, Yas Island",
    category: "Live music",
    priceFrom: 495,
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1600&q=80",
    tagline: "One-night stadium show · VIP hospitality packages available.",
  },
  {
    slug: "louvre-nomad",
    title: "Nomad at Louvre Abu Dhabi",
    date: "Ongoing · through Jun 2027",
    venue: "Louvre Abu Dhabi",
    category: "Exhibition",
    priceFrom: 95,
    image:
      "https://images.unsplash.com/photo-1583265266-66a988e63d0c?auto=format&fit=crop&w=1600&q=80",
    tagline: "Special exhibition on cross-cultural movement.",
  },
  {
    slug: "qasr-al-hosn-festival",
    title: "Qasr Al Hosn Festival",
    date: "1–10 Feb 2027",
    venue: "Qasr Al Hosn",
    category: "Cultural festival",
    priceFrom: 0,
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80",
    tagline: "Emirati heritage, falconry, traditional dances. Free entry.",
  },
  {
    slug: "mubadala-tennis",
    title: "Mubadala World Tennis Championship",
    date: "17–19 Dec 2026",
    venue: "Zayed Sports City",
    category: "Sport",
    priceFrom: 295,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1600&q=80",
    tagline: "Season-opening exhibition · top 8 ATP players.",
  },
];

export default function EventsPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Events</span>
          </nav>
          <div className="text-brand-primary flex items-center gap-2">
            <Ticket className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">Events & shows</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What&rsquo;s on in Abu Dhabi.
          </h1>
          <p className="text-muted mt-2 max-w-2xl">
            Official ticket partner for the season headline acts. Bundle with hotels for up to 22%
            off list price.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            {[
              "All",
              "Motorsport",
              "Live music",
              "Sport",
              "Art & design",
              "Cultural festival",
              "Exhibition",
            ].map((t, i) => (
              <button
                key={t}
                className={`rounded-full border px-4 py-1.5 font-medium transition-colors ${
                  i === 0
                    ? "border-brand-primary bg-brand-primary text-brand-secondary"
                    : "border-border bg-bg text-text hover:border-brand-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <Card key={e.slug} className="overflow-hidden transition-shadow hover:shadow-md">
              <div className="relative aspect-[16/10]">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover"
                />
                <span className="bg-bg/90 absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold">
                  {e.category}
                </span>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="text-muted mt-1 text-sm">{e.tagline}</p>
                <ul className="text-muted mt-4 space-y-1 text-xs">
                  <li className="flex items-center gap-2">
                    <Calendar className="size-3" aria-hidden="true" />
                    {e.date}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="size-3" aria-hidden="true" />
                    {e.venue}
                  </li>
                </ul>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-muted text-xs">From</p>
                    <p className="text-lg font-bold">
                      {e.priceFrom === 0 ? "Free" : fmtAED(e.priceFrom)}
                    </p>
                  </div>
                  <Button size="sm">Get tickets</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
