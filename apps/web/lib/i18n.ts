"use client";

import { useEffect, useState } from "react";
import { useLanguageStore, type Lang } from "./store/language";

const en = {
  "nav.flights": "Flights",
  "nav.hotels": "Hotels",
  "nav.experiences": "Experiences",
  "nav.cruises": "Cruises",
  "nav.packages": "Packages",
  "nav.deals": "Deals",
  "nav.planner": "AI Planner",
  "hero.badge": "Abu Dhabi · handcrafted travel",
  "hero.title": "Discover Abu Dhabi,",
  "hero.titleAccent": "your way.",
  "hero.subtitle":
    "200+ vetted experiences — desert safaris, cultural tours, theme-park adventures, premium hotels and airport transfers — curated by locals, booked in minutes.",
  "hero.searchPlaceholder": "Try 'desert safari' or 'mangroves'",
  "hero.search": "Search",
  "hero.popular": "Popular:",
  "footer.book": "Book",
  "footer.discover": "Discover",
  "footer.services": "Services",
  "footer.support": "Support",
  "footer.company": "Company",
  "footer.legal": "Legal",
};

export type TKey = keyof typeof en;

const ar: Record<TKey, string> = {
  "nav.flights": "الرحلات الجوية",
  "nav.hotels": "الفنادق",
  "nav.experiences": "التجارب",
  "nav.cruises": "الرحلات البحرية",
  "nav.packages": "الباقات",
  "nav.deals": "العروض",
  "nav.planner": "مخطط الرحلات",
  "hero.badge": "أبوظبي · سفر مصنوع بعناية",
  "hero.title": "اكتشف أبوظبي،",
  "hero.titleAccent": "على طريقتك.",
  "hero.subtitle":
    "أكثر من 200 تجربة موثوقة — سفاري الصحراء، والجولات الثقافية، ومدن الملاهي، والفنادق الفاخرة، وخدمات النقل من المطار — يختارها سكان المدينة، وتُحجز في دقائق.",
  "hero.searchPlaceholder": "جرّب 'سفاري الصحراء' أو 'المانغروف'",
  "hero.search": "بحث",
  "hero.popular": "الأكثر طلبًا:",
  "footer.book": "احجز",
  "footer.discover": "اكتشف",
  "footer.services": "الخدمات",
  "footer.support": "الدعم",
  "footer.company": "الشركة",
  "footer.legal": "قانوني",
};

export const dict: Record<Lang, Record<TKey, string>> = { en, ar };

// Renders English until mounted so the persisted language can't cause a hydration mismatch.
export function useT() {
  const stored = useLanguageStore((s) => s.lang);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const lang: Lang = mounted ? stored : "en";
  return (key: TKey) => dict[lang][key];
}
