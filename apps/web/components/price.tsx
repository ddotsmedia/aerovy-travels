"use client";

import { useEffect, useState } from "react";
import { fmtAED } from "@/lib/site";
import { formatCurrency, useCurrencyStore } from "@/lib/store/currency";

// Shows an AED amount in the selected currency. Renders AED until mounted so
// the persisted choice can't cause a hydration mismatch.
export function Price({ aed, className }: { aed: number; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const selected = useCurrencyStore((s) => s.selected);
  const convert = useCurrencyStore((s) => s.convert);

  useEffect(() => setMounted(true), []);

  if (!mounted || selected === "AED") {
    return <span className={className}>{fmtAED(aed)}</span>;
  }
  return (
    <span className={className}>{formatCurrency(convert(aed, "AED", selected), selected)}</span>
  );
}
