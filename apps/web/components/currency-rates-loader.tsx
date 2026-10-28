"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/lib/store/currency";

const SIX_HOURS = 6 * 60 * 60 * 1000;

// Refreshes AED-per-unit rates from open.er-api.com (USD base) at most every 6h.
export function CurrencyRatesLoader() {
  useEffect(() => {
    const last = useCurrencyStore.getState().ratesUpdatedAt;
    if (last && Date.now() - new Date(last).getTime() < SIX_HOURS) return;

    const ctrl = new AbortController();
    fetch("https://open.er-api.com/v6/latest/USD", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data: { result?: string; rates?: Record<string, number> }) => {
        const r = data.rates;
        if (data.result !== "success" || !r?.AED || !r.EUR || !r.GBP || !r.INR) return;
        useCurrencyStore.getState().setRates({
          AED: 1,
          USD: r.AED,
          EUR: r.AED / r.EUR,
          GBP: r.AED / r.GBP,
          INR: r.AED / r.INR,
        });
      })
      .catch(() => {
        // Offline or blocked: keep the stored / fallback rates.
      });

    return () => ctrl.abort();
  }, []);

  return null;
}
