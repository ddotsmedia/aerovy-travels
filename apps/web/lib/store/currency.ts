"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Currency = "AED" | "USD" | "EUR" | "GBP" | "INR";

export type CurrencyRates = {
  [key in Currency]: number;
};

const EXCHANGE_RATES: CurrencyRates = {
  AED: 1,
  USD: 3.67,
  EUR: 4.04,
  GBP: 4.61,
  INR: 0.044,
};

export type CurrencyState = {
  selected: Currency;
  rates: CurrencyRates;
  setCurrency: (currency: Currency) => void;
  convert: (amount: number, fromCurrency: Currency, toCurrency: Currency) => number;
  getRate: (currency: Currency) => number;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      selected: "AED",
      rates: EXCHANGE_RATES,
      setCurrency: (currency) => set({ selected: currency }),
      convert: (amount, from, to) => {
        const fromRate = EXCHANGE_RATES[from];
        const toRate = EXCHANGE_RATES[to];
        return Math.round((amount / fromRate) * toRate * 100) / 100;
      },
      getRate: (currency) => EXCHANGE_RATES[currency],
    }),
    {
      name: "aerovy.currency",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useCurrency = () => {
  const store = useCurrencyStore();
  return {
    currency: store.selected,
    setCurrency: store.setCurrency,
    convert: store.convert,
    format: (amount: number, from: Currency = "AED") => {
      const converted =
        from === store.selected ? amount : store.convert(amount, from, store.selected);
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: store.selected,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(converted);
    },
  };
};
