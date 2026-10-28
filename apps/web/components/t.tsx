"use client";

import { useT, type TKey } from "@/lib/i18n";

// Translated text for server components that need a client-side language switch.
export function T({ k }: { k: TKey }) {
  const t = useT();
  return <>{t(k)}</>;
}
