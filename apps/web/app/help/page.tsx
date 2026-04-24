import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  CalendarCheck,
  CreditCard,
  RefreshCw,
  FileText,
  Luggage,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Button, Card, CardContent, Input } from "@aerovy/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Help centre", description: "Get answers fast." };

const topics = [
  { icon: CalendarCheck, title: "Bookings", count: 18, href: "/help/bookings" },
  { icon: CreditCard, title: "Payments & refunds", count: 12, href: "/help/payments" },
  { icon: RefreshCw, title: "Cancellations & changes", count: 9, href: "/help/cancellations" },
  { icon: FileText, title: "Vouchers & tickets", count: 7, href: "/help/vouchers" },
  { icon: Luggage, title: "During your trip", count: 15, href: "/help/during-trip" },
  { icon: Phone, title: "Contact us", count: 4, href: "/contact" },
];

const popular = [
  "How do I cancel a booking and get a refund?",
  "Can I change the date of an experience after booking?",
  "My voucher didn&rsquo;t arrive — what do I do?",
  "How does the WhatsApp concierge work?",
  "Do children need a visa?",
  "What&rsquo;s included in the &lsquo;free cancellation&rsquo; policy?",
  "Can I add a transfer to an existing booking?",
  "My flight is delayed — will my transfer wait?",
];

export default function HelpPage() {
  return (
    <>
      <section className="bg-brand-secondary text-bg relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How can we help?</h1>
          <p className="text-bg/80 mt-3">
            Browse by topic, search our knowledge base, or contact our concierge directly.
          </p>
          <form className="relative mx-auto mt-8 max-w-2xl">
            <Search
              className="text-muted absolute top-1/2 left-4 size-5 -translate-y-1/2"
              aria-hidden="true"
            />
            <Input
              className="bg-bg h-14 rounded-xl pr-4 pl-12 text-base"
              placeholder="Search — e.g. &lsquo;cancel booking&rsquo;"
            />
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight">Browse by topic</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="border-border bg-surface hover:border-brand-primary flex items-center gap-4 rounded-xl border p-5 transition-colors"
            >
              <div className="bg-brand-primary/10 text-brand-primary flex size-10 items-center justify-center rounded-lg">
                <t.icon className="size-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{t.title}</p>
                <p className="text-muted text-xs">{t.count} articles</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-bold tracking-tight">Most asked</h2>
        <Card className="mt-4">
          <CardContent className="divide-border divide-y p-0">
            {popular.map((q) => (
              <Link
                key={q}
                href={`/help/search?q=${encodeURIComponent(q)}`}
                className="hover:bg-surface flex items-center justify-between gap-4 px-6 py-4 text-sm"
              >
                <span>{q}</span>
                <span className="text-muted">→</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Still need help?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <a
              href={`https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}`}
              className="border-border bg-bg hover:border-brand-primary rounded-xl border p-6"
            >
              <MessageCircle className="text-brand-primary size-5" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">WhatsApp concierge</h3>
              <p className="text-muted mt-1 text-sm">Fastest · avg 4 min reply</p>
              <p className="mt-3 font-medium">{site.whatsapp}</p>
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="border-border bg-bg hover:border-brand-primary rounded-xl border p-6"
            >
              <Phone className="text-brand-primary size-5" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Call us</h3>
              <p className="text-muted mt-1 text-sm">{site.hours}</p>
              <p className="mt-3 font-medium">{site.phone}</p>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="border-border bg-bg hover:border-brand-primary rounded-xl border p-6"
            >
              <Mail className="text-brand-primary size-5" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Email support</h3>
              <p className="text-muted mt-1 text-sm">Reply within 2 hours</p>
              <p className="mt-3 font-medium">{site.email}</p>
            </a>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild>
              <Link href="/track">Track a booking</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Open a ticket</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
