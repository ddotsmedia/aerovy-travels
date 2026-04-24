import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "@/lib/locales";

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "as-needed",
});
