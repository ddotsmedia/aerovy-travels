import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, MapPin, Wifi, Waves, UtensilsCrossed, Car } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { hotels, getHotelBySlug } from "@/lib/mock-hotels";
import { fmtAED } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = getHotelBySlug(slug);
  if (!h) return { title: "Hotel not found" };
  return { title: h.name, description: h.description, openGraph: { images: [h.image] } };
}

export default async function HotelDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  const amenities = [
    { icon: Waves, label: "Beach / infinity pool" },
    { icon: UtensilsCrossed, label: "Multiple restaurants" },
    { icon: Wifi, label: "High-speed Wi-Fi" },
    { icon: Car, label: "Airport transfers" },
  ];

  return (
    <>
      <section className="bg-bg">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="text-muted text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/hotels" className="hover:text-brand-primary">
              Hotels
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">{hotel.name}</span>
          </nav>
        </div>

        <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="text-brand-primary flex gap-1">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{hotel.name}</h1>
            <p className="text-muted mt-2 inline-flex items-center gap-1.5 text-sm">
              <MapPin className="size-4" aria-hidden="true" />
              {hotel.district}
            </p>
            <p className="text-muted mt-6 text-lg">{hotel.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {hotel.highlights.map((h) => (
                <div
                  key={h}
                  className="border-border bg-surface flex items-center gap-3 rounded-lg border px-4 py-3"
                >
                  <Star
                    className="fill-brand-primary text-brand-primary size-4"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium">{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold">Amenities</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {amenities.map((a) => (
                  <div
                    key={a.label}
                    className="border-border flex items-center gap-3 rounded-lg border p-4"
                  >
                    <a.icon className="text-brand-primary size-5" aria-hidden="true" />
                    <span className="text-sm">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold">Rooms & suites</h2>
              <div className="mt-4 space-y-4">
                {(
                  [
                    { name: "Deluxe room", size: 40, extra: "Garden view", mult: 1 },
                    { name: "Executive suite", size: 65, extra: "Lounge", mult: 1.6 },
                    { name: "Signature villa", size: 120, extra: "Plunge pool", mult: 2.8 },
                  ] as const
                ).map((r) => (
                  <Card key={r.name}>
                    <CardContent className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{r.name}</h3>
                        <p className="text-muted mt-1 text-sm">
                          {r.size}m² · King bed · {r.extra}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-muted text-xs">From</p>
                          <p className="text-lg font-bold">{fmtAED(hotel.priceFrom * r.mult)}</p>
                        </div>
                        <Button>Reserve</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <aside className="relative lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted text-xs tracking-wide uppercase">From</p>
                <p className="mt-1 text-3xl font-bold">{fmtAED(hotel.priceFrom)}</p>
                <p className="text-muted text-xs">per night · all taxes included</p>
                <Button size="lg" fullWidth className="mt-6">
                  Check availability
                </Button>
                <p className="text-muted mt-3 text-center text-xs">
                  Best-rate guarantee · free cancellation
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">Other hotels you may like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hotels
            .filter((h) => h.slug !== hotel.slug)
            .slice(0, 4)
            .map((h) => (
              <Link key={h.slug} href={`/hotels/${h.slug}`}>
                <Card className="h-full overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image src={h.image} alt={h.name} fill sizes="25vw" className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted text-xs">{h.district}</p>
                    <p className="mt-1 line-clamp-1 font-semibold">{h.name}</p>
                    <p className="mt-1 text-sm font-medium">{fmtAED(h.priceFrom)}/night</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
