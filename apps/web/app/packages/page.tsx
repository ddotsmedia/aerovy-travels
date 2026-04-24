import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, Sparkles, ArrowRight } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Curated packages",
  description: "Multi-day bundles combining experiences, hotels, and transfers.",
};

type Pkg = {
  slug: string;
  title: string;
  nights: number;
  price: number;
  includes: string[];
  image: string;
  tagline: string;
};

const packages: Pkg[] = [
  {
    slug: "essential-abu-dhabi-3n",
    title: "Essential Abu Dhabi — 3 nights",
    nights: 3,
    price: 4850,
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80",
    tagline: "First-timers, short trips, maximum icons.",
    includes: [
      "3 nights at Rosewood Abu Dhabi",
      "Grand Mosque guided tour",
      "Louvre Abu Dhabi curator visit",
      "Qasr Al Watan evening",
      "All airport transfers",
    ],
  },
  {
    slug: "desert-and-culture-5n",
    title: "Desert & Culture — 5 nights",
    nights: 5,
    price: 9200,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
    tagline: "Dunes, mosques, museums, mangroves.",
    includes: [
      "4 nights city + 1 night Liwa bubble tent",
      "Louvre + Guggenheim preview",
      "Liwa overnight with stargazing",
      "Mangrove kayak at dawn",
      "Private chauffeur throughout",
    ],
  },
  {
    slug: "family-yas-week",
    title: "Family Week on Yas Island — 7 nights",
    nights: 7,
    price: 14500,
    image:
      "https://images.unsplash.com/photo-1503416997304-7f8bf166c121?auto=format&fit=crop&w=1600&q=80",
    tagline: "All four parks, beach days, family dining.",
    includes: [
      "7 nights at W Abu Dhabi Yas",
      "Ferrari World + Yas Waterworld + SeaWorld + Warner Bros",
      "Yas Marina Circuit driving day",
      "Saadiyat Beach Club weekday",
      "All transfers + concierge",
    ],
  },
  {
    slug: "luxury-honeymoon-6n",
    title: "Luxury Honeymoon — 6 nights",
    nights: 6,
    price: 18400,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80",
    tagline: "Emirates Palace, private dhow, private chef.",
    includes: [
      "6 nights Emirates Palace Mandarin Oriental",
      "Private dhow sunset with chef",
      "Anantara Spa couples ritual",
      "Falconry masterclass",
      "Chauffeured Range Rover throughout",
    ],
  },
];

export default function PackagesPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Packages</span>
          </nav>
          <div className="flex items-center gap-2">
            <Sparkles className="text-brand-primary size-5" aria-hidden="true" />
            <span className="text-brand-primary text-sm font-medium tracking-wide uppercase">
              Curated bundles
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready-to-book journeys, designed by locals.
          </h1>
          <p className="text-muted mt-2 max-w-2xl">
            Hotel + experiences + transfers, bundled at up to 15% off the à la carte price. Every
            package is fully re-sequenceable — our concierge tailors the day-by-day on request.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {packages.map((p) => (
            <Card key={p.slug} className="overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="bg-brand-primary text-brand-secondary absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold">
                  {p.nights} nights
                </span>
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="text-muted mt-1 text-sm">{p.tagline}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2">
                      <ArrowRight
                        className="text-brand-primary mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-end justify-between">
                  <div className="text-muted flex gap-4 text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" aria-hidden="true" />
                      {p.nights + 1} days
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3" aria-hidden="true" />2 adults
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3" aria-hidden="true" />
                      Abu Dhabi
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-muted text-xs">From</p>
                    <p className="text-2xl font-bold">{fmtAED(p.price)}</p>
                    <p className="text-muted text-xs">per couple</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <Button fullWidth>Customise & book</Button>
                  <Button variant="outline">Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
