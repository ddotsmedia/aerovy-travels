import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Star, Check, Users, Calendar, Share2, Heart } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { ExperienceCard } from "@/components/experience-card";
import { getExperienceBySlug, relatedExperiences } from "@/lib/catalog";
import { fmtAED, fmtDuration } from "@/lib/site";

// Lazy-render so Next doesn't prefetch image metadata for every slug at build.
// Re-enable static generation once images are proxied through our own CDN.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getExperienceBySlug(slug);
  if (!e) return { title: "Experience not found" };
  return {
    title: e.titleEn,
    description: e.summaryEn,
    openGraph: { images: e.images[0] ? [e.images[0].url] : [] },
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = getExperienceBySlug(slug);
  if (!e) notFound();

  const related = relatedExperiences(e);
  const minPrice = Math.min(...e.variants.map((v) => v.basePriceAED));
  const maxPax = Math.max(...e.variants.map((v) => v.maxPax));

  // Fake 4 future slots spaced 7 days apart (seed script does the same).
  const now = new Date();
  const slots = [7, 14, 21, 28].map((d) => {
    const date = new Date(now);
    date.setDate(date.getDate() + d);
    date.setHours(9, 0, 0, 0);
    return date;
  });

  return (
    <>
      {/* Breadcrumb + gallery */}
      <section className="bg-bg">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="text-muted text-sm" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/experiences" className="hover:text-brand-primary">
              Experiences
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/experiences?category=${e.categorySlug}`}
              className="hover:text-brand-primary"
            >
              {e.categorySlug.replace(/-/g, " ")}
            </Link>
          </nav>
        </div>

        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-2 sm:grid-cols-4 sm:grid-rows-2">
            {e.images[0] && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:col-span-2 sm:row-span-2 sm:aspect-auto">
                <Image
                  src={e.images[0].url}
                  alt={e.images[0].altEn}
                  fill
                  priority
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            {e.images.slice(1, 5).map((img) => (
              <div
                key={img.url}
                className="relative hidden aspect-square overflow-hidden rounded-xl sm:block"
              >
                <Image src={img.url} alt={img.altEn} fill sizes="25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Title + meta */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {e.featured && (
                <span className="bg-brand-primary text-brand-secondary rounded-full px-3 py-1 font-semibold">
                  Featured
                </span>
              )}
              <span className="border-border text-muted rounded-full border px-3 py-1 capitalize">
                {e.categorySlug.replace(/-/g, " ")}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{e.titleEn}</h1>
            <p className="text-muted mt-3 text-lg">{e.summaryEn}</p>

            <div className="text-text/80 mt-5 flex flex-wrap items-center gap-6 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Star className="fill-brand-primary text-brand-primary size-4" aria-hidden="true" />
                <strong>4.{6 + (e.titleEn.length % 3)}</strong>
                <span className="text-muted">({100 + (e.titleEn.length % 400)} reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {fmtDuration(e.durationMinutes)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden="true" />
                {e.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4" aria-hidden="true" />
                Up to {maxPax} guests
              </span>
            </div>

            <div className="mt-5 flex gap-3">
              <Button variant="outline" size="sm">
                <Heart className="size-4" aria-hidden="true" />
                Save
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="size-4" aria-hidden="true" />
                Share
              </Button>
            </div>

            {/* Overview */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold">About this experience</h2>
              <div className="prose prose-neutral text-text/90 mt-4 max-w-none whitespace-pre-line">
                {e.descriptionEn}
              </div>
            </div>

            {/* Variants */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold">Choose your option</h2>
              <div className="mt-4 space-y-4">
                {e.variants.map((v) => (
                  <Card key={v.nameEn}>
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                      <div className="max-w-xl">
                        <h3 className="text-lg font-semibold">{v.nameEn}</h3>
                        <p className="text-muted mt-1 text-sm">Up to {v.maxPax} guests</p>
                        <ul className="text-text/90 mt-3 grid gap-2 text-sm sm:grid-cols-2">
                          {v.includes.map((inc) => (
                            <li key={inc} className="flex items-start gap-2">
                              <Check
                                className="text-brand-primary mt-0.5 size-4 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col items-end gap-2 whitespace-nowrap">
                        <div className="text-right">
                          <p className="text-muted text-xs">From</p>
                          <p className="text-text text-2xl font-bold">{fmtAED(v.basePriceAED)}</p>
                          <p className="text-muted text-xs">per person</p>
                        </div>
                        <Button>Select</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming slots */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold">Upcoming dates</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {slots.map((d, i) => (
                  <button
                    key={d.toISOString()}
                    type="button"
                    className={[
                      "flex min-w-[140px] flex-col items-start gap-1 rounded-lg border px-4 py-3 text-left transition-colors",
                      i === 0
                        ? "border-brand-primary bg-brand-primary/10"
                        : "border-border hover:border-brand-primary",
                    ].join(" ")}
                  >
                    <span className="text-muted text-xs">
                      {d.toLocaleDateString("en", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-sm font-semibold">9:00 am</span>
                    {i === 0 && (
                      <span className="text-brand-primary text-xs font-medium">
                        Early bird −10%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Meeting point / includes summary */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="border-border bg-surface rounded-xl border p-6">
                <h3 className="text-muted text-sm font-semibold tracking-wide uppercase">
                  Meeting point
                </h3>
                <p className="mt-2 font-medium">{e.location}</p>
                <p className="text-muted mt-1 text-sm">
                  Private transfers available on all variants.
                </p>
              </div>
              <div className="border-border bg-surface rounded-xl border p-6">
                <h3 className="text-muted text-sm font-semibold tracking-wide uppercase">
                  Cancellation
                </h3>
                <p className="mt-2 font-medium">Free up to 24 hours before</p>
                <p className="text-muted mt-1 text-sm">
                  Full refund if cancelled more than 24h in advance.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="relative lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted text-xs tracking-wide uppercase">From</p>
                <p className="mt-1 text-3xl font-bold">{fmtAED(minPrice)}</p>
                <p className="text-muted text-xs">per person · taxes included</p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted inline-flex items-center gap-2">
                      <Calendar className="size-4" aria-hidden="true" />
                      Date
                    </span>
                    <span className="font-medium">
                      {slots[0]?.toLocaleDateString("en", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted inline-flex items-center gap-2">
                      <Users className="size-4" aria-hidden="true" />
                      Guests
                    </span>
                    <span className="font-medium">2 adults</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted inline-flex items-center gap-2">
                      <Clock className="size-4" aria-hidden="true" />
                      Duration
                    </span>
                    <span className="font-medium">{fmtDuration(e.durationMinutes)}</span>
                  </div>
                </div>

                <Button size="lg" fullWidth className="mt-6">
                  Reserve now
                </Button>
                <p className="text-muted mt-3 text-center text-xs">
                  You won&rsquo;t be charged until confirmed.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ExperienceCard key={r.slug} experience={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
