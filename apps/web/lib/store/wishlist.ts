"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type WishlistState = {
  items: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  clear: () => void;
  isInWishlist: (slug: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (slug) =>
        set((state) => ({
          items: [...new Set([...state.items, slug])],
        })),
      remove: (slug) =>
        set((state) => ({
          items: state.items.filter((s) => s !== slug),
        })),
      toggle: (slug) =>
        set((state) => ({
          items: state.items.includes(slug)
            ? state.items.filter((s) => s !== slug)
            : [...state.items, slug],
        })),
      clear: () => set({ items: [] }),
      isInWishlist: (slug) => get().items.includes(slug),
    }),
    {
      name: "aerovy.wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
