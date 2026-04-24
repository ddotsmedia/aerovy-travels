import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { hotels } from "@/lib/mock-hotels";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hotels",
  description: "Handpicked 5-star hotels and resorts across Abu Dhabi.",
};

export default function HotelsPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Hotels</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hotels & resorts</h1>
          <p className="text-muted mt-2 max-w-2xl">
            Every property below has been vetted by our Abu Dhabi team. Best-rate guarantee matched,
            flexible cancellation, and complimentary airport transfers on stays of 3+ nights.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((h) => (
            <Link
              key={h.slug}
              href={`/hotels/${h.slug}`}
              className="group focus-visible:ring-ring focus-visible:ring-offset-bg block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={h.image}
                    alt={h.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="bg-bg/90 absolute top-3 left-3 flex gap-1 rounded-full px-3 py-1">
                    {Array.from({ length: h.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="fill-brand-primary text-brand-primary size-3"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="text-muted flex items-center gap-1 text-xs">
                    <MapPin className="size-3" aria-hidden="true" />
                    {h.district}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{h.name}</h3>
                  <p className="text-muted mt-2 line-clamp-2 text-sm">{h.description}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-muted text-xs">From</p>
                      <p className="text-base font-bold">{fmtAED(h.priceFrom)}/night</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View rooms
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
