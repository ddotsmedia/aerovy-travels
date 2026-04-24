import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Card } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Guides to Abu Dhabi's emirates, districts and day-trip destinations.",
};

const emirates = [
  {
    slug: "abu-dhabi-city",
    name: "Abu Dhabi City",
    lede: "The capital · Grand Mosque, Louvre, Corniche, Qasr Al Watan.",
    image:
      "https://images.unsplash.com/photo-1512453979-8ed44d2a3b07?auto=format&fit=crop&w=1600&q=80",
    attractions: 68,
  },
  {
    slug: "yas-island",
    name: "Yas Island",
    lede: "Entertainment hub · Ferrari World, Waterworld, Warner Bros, SeaWorld, F1 circuit.",
    image:
      "https://images.unsplash.com/photo-1503416997304-7f8bf166c121?auto=format&fit=crop&w=1600&q=80",
    attractions: 24,
  },
  {
    slug: "saadiyat-island",
    name: "Saadiyat Island",
    lede: "Cultural district · Louvre, Guggenheim, Natural History Museum, turtle beaches.",
    image:
      "https://images.unsplash.com/photo-1583265266-66a988e63d0c?auto=format&fit=crop&w=1600&q=80",
    attractions: 18,
  },
  {
    slug: "al-ain",
    name: "Al Ain",
    lede: "The Garden City · UNESCO oasis, Jebel Hafeet, Al Jahili Fort.",
    image:
      "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=1600&q=80",
    attractions: 22,
  },
  {
    slug: "liwa-desert",
    name: "Liwa & Empty Quarter",
    lede: "Vertical dunes, Bedouin camps, Moreeb Dune.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
    attractions: 9,
  },
  {
    slug: "sir-bani-yas",
    name: "Sir Bani Yas Island",
    lede: "Wildlife reserve · oryx, giraffe, cheetah, Arabian Wildlife Park.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    attractions: 12,
  },
  {
    slug: "dubai-daytrip",
    name: "Dubai day trip",
    lede: "1h drive · Burj Khalifa, Dubai Mall, Old Town, Palm Jumeirah.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    attractions: 42,
  },
  {
    slug: "oman-daytrip",
    name: "Oman (Musandam) day trip",
    lede: "Cross-border · Khasab fjords, dhow cruises, Arabian Sea snorkel.",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
    attractions: 7,
  },
];

export default function DestinationsPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Destinations</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Destinations guide</h1>
          <p className="text-muted mt-2 max-w-2xl">
            Eight hand-curated guides covering every emirate and the two most-booked cross-border
            day trips. Each includes things-to-do, best-time-to-visit, and signature experiences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {emirates.map((e) => (
            <Link key={e.slug} href={`/destinations/${e.slug}`} className="group block">
              <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-lg">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={e.image}
                    alt={e.name}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="from-brand-secondary/90 via-brand-secondary/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                  <div className="text-bg absolute inset-x-0 bottom-0 p-4">
                    <p className="inline-flex items-center gap-1 text-xs opacity-80">
                      <MapPin className="size-3" aria-hidden="true" />
                      {e.attractions} attractions
                    </p>
                    <h3 className="mt-1 text-lg leading-tight font-bold">{e.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs opacity-90">{e.lede}</p>
                    <span className="text-brand-primary mt-3 inline-flex items-center gap-1 text-xs font-medium">
                      Explore
                      <ArrowRight className="size-3" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
