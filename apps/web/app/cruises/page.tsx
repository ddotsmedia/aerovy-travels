import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Anchor, MapPin, Calendar, Users, Star } from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cruises",
  description: "Arabian Gulf cruises, luxury yacht charters, and sunset dhow journeys.",
};

type Cruise = {
  slug: string;
  title: string;
  operator: string;
  nights: number;
  priceFrom: number;
  image: string;
  ports: string[];
  tagline: string;
};

const cruises: Cruise[] = [
  {
    slug: "msc-arabian-sea-7n",
    title: "Arabian Sea — 7 nights",
    operator: "MSC Cruises",
    nights: 7,
    priceFrom: 3200,
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
    ports: ["Abu Dhabi", "Sir Bani Yas", "Khasab", "Muscat", "Doha"],
    tagline: "Flagship route · 13-deck ship, 3 pools, 11 bars.",
  },
  {
    slug: "celestyal-mystique-5n",
    title: "Gulf Mystique — 5 nights",
    operator: "Celestyal",
    nights: 5,
    priceFrom: 2180,
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=80",
    ports: ["Abu Dhabi", "Dubai", "Bahrain", "Doha"],
    tagline: "Round-trip from AUH · all-inclusive dining.",
  },
  {
    slug: "luxury-yacht-charter-1d",
    title: "Private yacht day charter",
    operator: "Aerovy Fleet",
    nights: 0,
    priceFrom: 8900,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    ports: ["Yas Marina", "Saadiyat reef", "Louvre bay"],
    tagline: "80-foot Sunseeker · captain, chef, swimwear towels included.",
  },
  {
    slug: "dhow-sunset-90m",
    title: "Dhow sunset cruise · 90 minutes",
    operator: "Local operator",
    nights: 0,
    priceFrom: 195,
    image:
      "https://images.unsplash.com/photo-1512453979-8ed44d2a3b07?auto=format&fit=crop&w=1600&q=80",
    ports: ["Corniche"],
    tagline: "Arabic coffee + dates, Etihad Towers at golden hour.",
  },
  {
    slug: "ms-prima-10n",
    title: "Gulf & Oman — 10 nights",
    operator: "Norwegian",
    nights: 10,
    priceFrom: 4890,
    image:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1600&q=80",
    ports: ["Abu Dhabi", "Muscat", "Salalah", "Musandam", "Dubai", "Khor Fakkan"],
    tagline: "Freestyle cruising · dress code is &lsquo;whatever you brought&rsquo;.",
  },
  {
    slug: "superyacht-overnight",
    title: "Superyacht overnight · 1 night",
    operator: "Aerovy Fleet",
    nights: 1,
    priceFrom: 28500,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    ports: ["Yas Marina", "Saadiyat anchorage"],
    tagline: "140-foot vessel · 4 cabins · private chef, butler, tender.",
  },
];

export default function CruisesPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Cruises</span>
          </nav>
          <div className="text-brand-primary flex items-center gap-2">
            <Anchor className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">Cruises & yachts</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Sail the Arabian Gulf.
          </h1>
          <p className="text-muted mt-2 max-w-2xl">
            From 90-minute sunset dhow cruises to 10-night voyages around Oman. Full-service cruise
            operators plus private yacht and superyacht charters from our own fleet.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cruises.map((c) => (
            <Card key={c.slug} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover"
                />
                <span className="bg-brand-primary text-brand-secondary absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold">
                  {c.nights === 0 ? "Day trip" : `${c.nights} nights`}
                </span>
              </div>
              <CardContent className="p-5">
                <p className="text-muted text-xs tracking-wide uppercase">{c.operator}</p>
                <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                <p className="text-muted mt-1 line-clamp-2 text-sm">{c.tagline}</p>
                <ul className="mt-4 flex flex-wrap gap-1 text-xs">
                  {c.ports.slice(0, 4).map((p) => (
                    <li
                      key={p}
                      className="border-border inline-flex items-center gap-1 rounded-full border px-2 py-0.5"
                    >
                      <MapPin className="size-3" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                  {c.ports.length > 4 && <li className="text-muted">+{c.ports.length - 4} more</li>}
                </ul>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-muted text-xs">From</p>
                    <p className="text-lg font-bold">{fmtAED(c.priceFrom)}</p>
                  </div>
                  <Button size="sm">View itinerary</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Private yacht charter</h2>
            <p className="text-muted mt-3">
              For groups, incentive trips, proposals, and anniversary milestones. Our fleet spans
              45-foot day cruisers to 140-foot superyachts with full crew.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "Captain, deckhands, chef, butler",
                "DMCA-compliant alcohol licence",
                "Swimwear, towels, snorkel gear included",
                "Seaplane or helicopter transfer on request",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Star className="text-brand-primary mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link href="/contact?topic=yacht-charter">Request private charter</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="Date" type="date" className="col-span-1" />
            <Input placeholder="Guests" type="number" className="col-span-1" />
            <Input placeholder="Hours / nights" className="col-span-1" />
            <Input placeholder="Starting port (e.g. Yas Marina)" className="col-span-3" />
            <textarea
              placeholder="Notes — special occasion, dietary, dress code..."
              rows={4}
              className="border-border bg-bg col-span-3 rounded-md border p-3 text-sm"
            />
            <div className="text-muted col-span-3 flex items-center gap-3 text-xs">
              <Users className="size-4" aria-hidden="true" />
              Max 12 guests on our largest yacht · groups of 25+ use tender-shuttle layouts.
            </div>
            <Button className="col-span-3">
              <Calendar className="size-4" aria-hidden="true" />
              Request quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
