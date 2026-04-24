import Link from "next/link";
import { site, footerNav } from "@/lib/site";
import { BrandLogo } from "./brand-logo";
import { Mail, Phone, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
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

          <FooterColumn title="Discover" links={footerNav.discover} />
          <FooterColumn title="Plan" links={footerNav.plan} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        <div className="border-border text-muted mt-12 flex flex-col items-start justify-between gap-4 border-t pt-8 text-sm sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs">
            Registered in Abu Dhabi · Trade License pending · A member of the UAE Travel Agents
            Association.
          </p>
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
      <h3 className="text-text text-sm font-semibold tracking-wide uppercase">{title}</h3>
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
