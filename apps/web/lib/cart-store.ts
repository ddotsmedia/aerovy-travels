"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  image: string;
  variantId: string;
  variantName: string;
  dateISO: string;
  adults: number;
  children: number;
  pricePerAdultAED: number;
  pricePerChildAED: number;
};

export type CartState = {
  items: CartItem[];
  hydrated: boolean;
  add: (item: Omit<CartItem, "id">) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<Pick<CartItem, "adults" | "children" | "dateISO">>) => void;
  clear: () => void;
  setHydrated: () => void;
};

export const lineSubtotal = (i: CartItem) =>
  i.adults * i.pricePerAdultAED + i.children * i.pricePerChildAED;

export const cartSubtotal = (items: CartItem[]) => items.reduce((s, i) => s + lineSubtotal(i), 0);

export const cartCount = (items: CartItem[]) =>
  items.reduce((s, i) => s + i.adults + i.children, 0);

export const SERVICE_FEE_PCT = 0.05;

export const cartTotals = (items: CartItem[], discountPct = 0) => {
  const subtotal = cartSubtotal(items);
  const discount = Math.round((subtotal * discountPct) / 100);
  const net = subtotal - discount;
  const fees = Math.round(net * SERVICE_FEE_PCT);
  return { subtotal, discount, fees, total: net + fees };
};

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,
      add: (item) =>
        set((s) => {
          const existing = s.items.find(
            (i) =>
              i.slug === item.slug && i.variantId === item.variantId && i.dateISO === item.dateISO,
          );
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === existing.id
                  ? { ...i, adults: i.adults + item.adults, children: i.children + item.children }
                  : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, id: newId() }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      update: (id, patch) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),
      clear: () => set({ items: [] }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "aerovy.cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);
