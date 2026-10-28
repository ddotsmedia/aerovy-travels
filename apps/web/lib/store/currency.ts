"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Currency = "AED" | "USD" | "EUR" | "GBP" | "INR";

// Units of AED per 1 unit of each currency (fallback when live rates are unavailable).
export type CurrencyRates = {
  [key in Currency]: number;
};

export const FALLBACK_RATES: CurrencyRates = {
  AED: 1,
  USD: 3.67,
  EUR: 4.04,
  GBP: 4.61,
  INR: 0.044,
};

export type CurrencyState = {
  selected: Currency;
  rates: CurrencyRates;
  ratesUpdatedAt: string | null;
  setCurrency: (currency: Currency) => void;
  setRates: (rates: CurrencyRates) => void;
  convert: (amount: number, fromCurrency: Currency, toCurrency: Currency) => number;
  getRate: (currency: Currency) => number;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      selected: "AED",
      rates: FALLBACK_RATES,
      ratesUpdatedAt: null,
      setCurrency: (currency) => set({ selected: currency }),
      setRates: (rates) => set({ rates, ratesUpdatedAt: new Date().toISOString() }),
      // Amount in `from` → amount in `to`, via AED as the pivot.
      convert: (amount, from, to) => {
        const { rates } = get();
        const aed = amount * rates[from];
        return Math.round((aed / rates[to]) * 100) / 100;
      },
      getRate: (currency) => get().rates[currency],
    }),
    {
      name: "aerovy.currency",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const formatCurrency = (amount: number, currency: Currency) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export const useCurrency = () => {
  const store = useCurrencyStore();
  return {
    currency: store.selected,
    setCurrency: store.setCurrency,
    convert: store.convert,
    format: (amount: number, from: Currency = "AED") => {
      const converted =
        from === store.selected ? amount : store.convert(amount, from, store.selected);
      return formatCurrency(converted, store.selected);
    },
  };
};
