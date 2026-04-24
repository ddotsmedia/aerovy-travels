import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Button, Input } from "@aerovy/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Aerovy." };

export default function ContactPage() {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">Contact</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Talk to a human.</h1>
          <p className="text-muted mt-2 max-w-2xl">
            Our Abu Dhabi concierge desk is reachable 7 days a week. Average reply time on WhatsApp:
            4 minutes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <form
            action="/api/contact"
            method="post"
            className="border-border bg-surface space-y-5 rounded-2xl border p-8"
          >
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Name</span>
                <Input name="name" className="mt-1" required />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <Input type="email" name="email" className="mt-1" required />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium">Phone / WhatsApp (optional)</span>
              <Input type="tel" name="phone" className="mt-1" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">I&rsquo;m asking about</span>
              <select
                name="topic"
                className="border-border bg-bg mt-1 h-10 w-full rounded-md border px-3 text-sm"
                required
              >
                <option value="">Select a topic…</option>
                <option>Custom itinerary</option>
                <option>Group booking (10+)</option>
                <option>Corporate travel</option>
                <option>Existing reservation</option>
                <option>Becoming a supplier</option>
                <option>Press & partnerships</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Message</span>
              <textarea
                name="message"
                rows={5}
                required
                className="border-border bg-bg mt-1 w-full rounded-md border px-3 py-2 text-sm"
              />
            </label>
            <Button type="submit" size="lg" fullWidth>
              Send message
            </Button>
          </form>

          <aside className="space-y-4">
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp concierge"
              value={site.whatsapp}
              hint="Fastest · avg 4 min reply"
              href={`https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}`}
            />
            <ContactCard
              icon={Phone}
              title="Call us"
              value={site.phone}
              hint={site.hours}
              href={`tel:${site.phone.replace(/\s/g, "")}`}
            />
            <ContactCard
              icon={Mail}
              title="Email"
              value={site.email}
              hint="We respond within 2 hours"
              href={`mailto:${site.email}`}
            />
            <div className="border-border bg-surface rounded-2xl border p-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-primary size-5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Visit us</h3>
                  <p className="text-muted mt-1 text-sm">{site.address}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Clock className="text-brand-primary size-5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <p className="text-muted mt-1 text-sm">{site.hours}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  hint,
  href,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  hint: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="border-border bg-surface hover:border-brand-primary block rounded-2xl border p-6 transition-colors"
    >
      <div className="flex items-start gap-3">
        <Icon className="text-brand-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-text mt-1 text-lg">{value}</p>
          <p className="text-muted mt-1 text-xs">{hint}</p>
        </div>
      </div>
    </a>
  );
}
