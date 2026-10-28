"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/lib/store/language";

export function LangToggle() {
  const lang = useLanguageStore((s) => s.lang);
  const toggle = useLanguageStore((s) => s.toggle);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? lang : "en";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={current === "en" ? "Switch to Arabic" : "Switch to English"}
      className="border-border bg-bg hover:border-brand-primary h-9 rounded-md border px-3 text-sm font-medium"
    >
      {current === "en" ? "عربي" : "EN"}
    </button>
  );
}
