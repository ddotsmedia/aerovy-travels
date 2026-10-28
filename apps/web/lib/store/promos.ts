"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type PromoCode = {
  code: string;
  discountPct: number;
  maxUses: number;
  uses: number;
  expiresAt: string;
  createdAt: string;
};

export type PromoStatus = "active" | "expired" | "used";

export const promoStatus = (p: PromoCode, now = Date.now()): PromoStatus => {
  if (p.uses >= p.maxUses) return "used";
  if (new Date(p.expiresAt).getTime() < now) return "expired";
  return "active";
};

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const generatePromoCode = () => {
  const bytes = new Uint32Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
};

export type PromoState = {
  codes: PromoCode[];
  add: (promo: PromoCode) => void;
  remove: (code: string) => void;
  recordUse: (code: string) => void;
};

export const usePromoStore = create<PromoState>()(
  persist(
    (set) => ({
      codes: [],
      add: (promo) => set((s) => ({ codes: [promo, ...s.codes] })),
      remove: (code) => set((s) => ({ codes: s.codes.filter((c) => c.code !== code) })),
      recordUse: (code) =>
        set((s) => ({
          codes: s.codes.map((c) => (c.code === code ? { ...c, uses: c.uses + 1 } : c)),
        })),
    }),
    {
      name: "aerovy.promos",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Returns the promo if it can be applied right now.
export const findUsablePromo = (input: string): PromoCode | undefined => {
  const code = input.trim().toUpperCase();
  return usePromoStore.getState().codes.find((c) => c.code === code && promoStatus(c) === "active");
};
