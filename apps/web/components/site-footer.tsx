import Link from "next/link";
import { site, footerNav } from "@/lib/site";
import { BrandLogo } from "./brand-logo";
import { Mail, Phone, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div>
            <BrandLogo />
            <p className="text-muted mt-4 max-w-sm text-sm">{site.description}</p>

            <div className="text-muted mt-6 space-y-2 text-sm">
              <a href={`mailto:${site.email}`} className="hover:text-text flex items-center gap-2">
                <Mail className="size-4" aria-hidden="true" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="hover:text-text flex items-center gap-2"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-text flex items-center gap-2"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp concierge
              </a>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={site.socials.instagram}
                aria-label="Instagram"
                className="border-border text-muted hover:border-brand-primary hover:text-brand-primary flex size-9 items-center justify-center rounded-full border"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={site.socials.facebook}
                aria-label="Facebook"
                className="border-border text-muted hover:border-brand-primary hover:text-brand-primary flex size-9 items-center justify-center rounded-full border"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={site.socials.x}
                aria-label="X"
                className="border-border text-muted hover:border-brand-primary hover:text-brand-primary flex size-9 items-center justify-center rounded-full border"
              >
                <Twitter className="size-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Book" links={footerNav.book} />
          <FooterColumn title="Discover" links={footerNav.discover} />
          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Support" links={footerNav.support} />
          <FooterColumn title="Company" links={footerNav.company} />
        </div>

        <div className="border-border text-muted mt-10 flex flex-col gap-4 border-t pt-6 text-sm">
          <div className="flex flex-wrap gap-4">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-brand-primary text-xs">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs">
              © {year} {site.name} FZ-LLC. Registered in Abu Dhabi · Trade License pending · Member,
              UAE Travel Agents Association · Department of Culture & Tourism accredited.
            </p>
            <div className="flex items-center gap-3 text-xs">
              <span className="border-border rounded-md border px-2 py-1">
                Stripe · PCI-DSS Level 1
              </span>
              <span className="border-border rounded-md border px-2 py-1">SSL / TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-text text-xs font-semibold tracking-wide uppercase">{title}</h3>
      <ul className="text-muted mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-brand-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
