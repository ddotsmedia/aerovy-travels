export const locales = ["en", "ar", "hi", "ru", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const rtlLocales: ReadonlySet<Locale> = new Set(["ar"]);

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  hi: "हिन्दी",
  ru: "Русский",
  zh: "中文",
};

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}
