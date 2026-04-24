import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@aerovy/ui";

export const metadata: Metadata = { title: "Journal", description: "Stories from Abu Dhabi." };

export const posts = [
  {
    slug: "liwa-overnight-safari",
    title: "Why Liwa beats Dubai's deserts — a local operator's take",
    excerpt:
      "Dubai's dunes are accessible. Liwa's are vertical. Here's why the 2.5-hour drive south is worth it for at least one night.",
    date: "2026-04-12",
    readMinutes: 6,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    author: "Mariam Fahd",
  },
  {
    slug: "louvre-curator-picks",
    title: "A Louvre Abu Dhabi curator picks her top 10 — in 90 minutes",
    excerpt: "You don&rsquo;t have 3 hours. You have 90 minutes. Here&rsquo;s what to see.",
    date: "2026-04-05",
    readMinutes: 8,
    image:
      "https://images.unsplash.com/photo-1583265266-66a988e63d0c?auto=format&fit=crop&w=1200&q=80",
    author: "Nadia Hosseini",
  },
  {
    slug: "grand-mosque-etiquette",
    title: "Sheikh Zayed Grand Mosque: 12 etiquette tips no one tells you",
    excerpt:
      "Dress code, photography, prayer times, where to stand — everything a first-time visitor gets wrong.",
    date: "2026-03-28",
    readMinutes: 5,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    author: "Omar Al Mazrouei",
  },
  {
    slug: "yas-island-family-itinerary",
    title: "Yas Island with under-10s: the realistic 3-day itinerary",
    excerpt: "Ferrari World, Warner Bros, SeaWorld, Waterworld — survivable order + break days.",
    date: "2026-03-18",
    readMinutes: 10,
    image:
      "https://images.unsplash.com/photo-1503416997304-7f8bf166c121?auto=format&fit=crop&w=1200&q=80",
    author: "Ravi Menon",
  },
  {
    slug: "corniche-sunset-walk",
    title: "The Corniche sunset walk: 45 minutes of pure magic",
    excerpt: "Where to start, where to stop for coffee, where the light hits the Etihad Towers.",
    date: "2026-03-02",
    readMinutes: 4,
    image:
      "https://images.unsplash.com/photo-1512453979-8ed44d2a3b07?auto=format&fit=crop&w=1200&q=80",
    author: "Yulia Nazarova",
  },
  {
    slug: "ramadan-in-abu-dhabi",
    title: "Traveling to Abu Dhabi during Ramadan — what changes, what doesn't",
    excerpt: "Restaurant hours, nightly iftar spreads, cultural etiquette for visitors.",
    date: "2026-02-18",
    readMinutes: 7,
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    author: "Mariam Fahd",
  },
];

export default function BlogPage() {
  const [feature, ...rest] = posts;

  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Journal</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">The Aerovy Journal</h1>
          <p className="text-muted mt-2 max-w-2xl">
            Stories, guides and behind-the-scenes notes from our Abu Dhabi team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {feature && (
          <Link href={`/blog/${feature.slug}`} className="group block">
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <CardContent className="p-8 lg:p-10">
                  <span className="text-brand-primary text-xs font-medium tracking-wide uppercase">
                    Featured ·{" "}
                    {new Date(feature.date).toLocaleDateString("en", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    {feature.title}
                  </h2>
                  <p className="text-muted mt-4">{feature.excerpt}</p>
                  <div className="text-muted mt-6 flex items-center gap-4 text-xs">
                    <span>By {feature.author}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" aria-hidden="true" /> {feature.readMinutes} min
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <Card className="h-full overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <CardContent className="p-5">
                  <span className="text-brand-primary text-xs font-medium tracking-wide uppercase">
                    {new Date(p.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                  </span>
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold">{p.title}</h3>
                  <p className="text-muted mt-2 line-clamp-2 text-sm">{p.excerpt}</p>
                  <div className="text-muted mt-4 flex items-center gap-3 text-xs">
                    <Calendar className="size-3" aria-hidden="true" />
                    {p.author}
                    <span>·</span>
                    <Clock className="size-3" aria-hidden="true" />
                    {p.readMinutes} min
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
