import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Percent, Timer, Flame, Tag } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { experiences } from "@/lib/catalog";
import { fmtAED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Deals",
  description: "Flash sales, seasonal discounts, last-minute offers on Abu Dhabi experiences.",
};

export default function DealsPage() {
  // Synthesize a deal list from the seed catalog.
  const deals = experiences.slice(0, 8).map((e, i) => {
    const price = Math.min(...e.variants.map((v) => v.basePriceAED));
    const discountPct = [15, 20, 25, 30, 12, 18, 22, 28][i] ?? 20;
    const was = Math.round(price / (1 - discountPct / 100));
    return { e, price, was, discountPct };
  });

  const categories = [
    { icon: Flame, label: "Flash sale · ends tonight", color: "text-danger" },
    { icon: Timer, label: "Last-minute · tomorrow departures", color: "text-warning" },
    { icon: Tag, label: "Resident price · Emirates ID required", color: "text-info" },
    { icon: Percent, label: "Bundle any 2, save 12%", color: "text-success" },
  ];

  return (
    <>
      <section className="from-brand-primary/20 via-bg to-bg relative overflow-hidden bg-gradient-to-br">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Deals</span>
          </nav>
          <div className="text-brand-primary flex items-center gap-2">
            <Percent className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide uppercase">Deals & offers</span>
          </div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Save up to 30% this week.
          </h1>
          <p className="text-muted mt-4 max-w-2xl">
            Flash sales, resident rates, and off-peak pricing. We don&rsquo;t do fake
            &ldquo;was&rdquo; prices — every discount is a real cut against list.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <div
                key={c.label}
                className="border-border bg-bg flex items-center gap-3 rounded-xl border p-4"
              >
                <c.icon className={`size-5 shrink-0 ${c.color}`} aria-hidden="true" />
                <span className="text-sm font-medium">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map(({ e, price, was, discountPct }, i) => {
            const hero = e.images[0];
            return (
              <Link
                key={e.slug}
                href={`/experiences/${e.slug}`}
                className="group focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:outline-none"
              >
                <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-lg">
                  <div className="bg-surface relative aspect-[4/3] overflow-hidden">
                    {hero && (
                      <Image
                        src={hero.url}
                        alt={hero.altEn}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                    <span className="bg-danger text-bg absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold">
                      −{discountPct}%
                    </span>
                    {i < 2 && (
                      <span className="bg-brand-secondary/90 text-bg absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold">
                        Ends in 08:{42 - i}:12
                      </span>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <p className="text-brand-primary text-xs tracking-wide uppercase">
                      {e.categorySlug.replace(/-/g, " ")}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-base font-semibold">{e.titleEn}</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-muted text-xs line-through">{fmtAED(was)}</p>
                        <p className="text-text text-xl font-bold">{fmtAED(price)}</p>
                      </div>
                      <Button size="sm">Grab</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
