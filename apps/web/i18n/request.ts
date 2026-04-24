import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { locales, type Locale } from "@/lib/locales";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = (locales as readonly string[]).includes(requested ?? "")
    ? (requested as Locale)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
