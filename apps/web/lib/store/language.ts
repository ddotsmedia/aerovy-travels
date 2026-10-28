"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Lang = "en" | "ar";

export type LanguageState = {
  lang: Lang;
  toggle: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: "en",
      toggle: () => set({ lang: get().lang === "en" ? "ar" : "en" }),
    }),
    {
      name: "aerovy.lang",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
