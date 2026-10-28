"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/lib/store/language";

// Mirrors the chosen language onto <html> (lang + dir). Tajawal is already first
// in the font stack, so Arabic text picks it up without a font switch.
export function LangSync() {
  const lang = useLanguageStore((s) => s.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return null;
}
