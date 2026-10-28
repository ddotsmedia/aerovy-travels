"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type LoyaltyState = {
  points: number;
  addPoints: (points: number) => void;
};

export const useLoyaltyStore = create<LoyaltyState>()(
  persist(
    (set) => ({
      points: 0,
      addPoints: (points) => set((s) => ({ points: s.points + points })),
    }),
    {
      name: "aerovy.loyalty",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// 1 Aerovy Reward Point per AED paid.
export const pointsForAED = (aed: number) => Math.floor(aed);
