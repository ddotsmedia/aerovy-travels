"use client";

import Link from "next/link";
import { primaryNav } from "@/lib/site";
import { useT, type TKey } from "@/lib/i18n";

export const navKeys: Record<string, TKey> = {
  "/flights": "nav.flights",
  "/hotels": "nav.hotels",
  "/experiences": "nav.experiences",
  "/cruises": "nav.cruises",
  "/packages": "nav.packages",
  "/deals": "nav.deals",
  "/plan": "nav.planner",
};

export function SiteNav() {
  const t = useT();
  return (
    <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
      {primaryNav.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="text-text/80 hover:text-brand-primary text-sm font-medium transition-colors"
        >
          {t(navKeys[l.href] ?? "nav.planner")}
        </Link>
      ))}
    </nav>
  );
}
