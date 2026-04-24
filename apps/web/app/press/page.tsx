import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, ExternalLink } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";

export const metadata: Metadata = {
  title: "Press & media",
  description: "News, assets, and media enquiries.",
};

const news = [
  {
    date: "14 Mar 2026",
    source: "Arabian Business",
    title: "Aerovy Travels raises $6M seed to scale UAE concierge-first travel",
  },
  {
    date: "02 Mar 2026",
    source: "Khaleej Times",
    title: "An AI trip planner that only suggests what&rsquo;s actually bookable",
  },
  {
    date: "18 Feb 2026",
    source: "The National",
    title: "How Aerovy is re-curating Abu Dhabi for the post-tourist era",
  },
  {
    date: "04 Feb 2026",
    source: "Gulf News",
    title: "Abu Dhabi&rsquo;s newest travel startup focuses on small suppliers",
  },
];

export default function PressPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Press</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Press & media</h1>
          <p className="text-muted mt-2 max-w-2xl">
            For media enquiries, interview requests, and speaker bookings — email{" "}
            <a
              href="mailto:press@aerovy.travel"
              className="text-brand-primary font-medium hover:underline"
            >
              press@aerovy.travel
            </a>
            . UK/EU press line: +44 20 7946 0018.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Recent coverage</h2>
            <div className="divide-border border-border bg-surface mt-4 divide-y rounded-2xl border">
              {news.map((n) => (
                <a
                  key={n.title}
                  href="#"
                  className="hover:bg-bg flex items-start justify-between gap-4 px-6 py-5"
                >
                  <div>
                    <p className="text-brand-primary text-xs font-medium tracking-wide uppercase">
                      {n.source} · {n.date}
                    </p>
                    <p className="mt-1 font-medium">{n.title}</p>
                  </div>
                  <ExternalLink className="text-muted size-4 shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <aside>
            <h2 className="text-xl font-bold tracking-tight">Press kit</h2>
            <div className="mt-4 space-y-3">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <FileText className="text-brand-primary size-5 shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-medium">Company one-pager</p>
                    <p className="text-muted text-xs">PDF · 260 KB</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="size-4" aria-hidden="true" />
                    Download
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <FileText className="text-brand-primary size-5 shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-medium">Founder bios + headshots</p>
                    <p className="text-muted text-xs">ZIP · 12 MB</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="size-4" aria-hidden="true" />
                    Download
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <FileText className="text-brand-primary size-5 shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-medium">Logos (PNG, SVG, EPS)</p>
                    <p className="text-muted text-xs">ZIP · 4 MB</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="size-4" aria-hidden="true" />
                    Download
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <FileText className="text-brand-primary size-5 shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-medium">Product screenshots (high-res)</p>
                    <p className="text-muted text-xs">ZIP · 48 MB</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="size-4" aria-hidden="true" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
