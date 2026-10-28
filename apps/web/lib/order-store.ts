"use client";

import type { CartItem } from "./cart-store";

export type StoredOrder = {
  id: string;
  createdAtISO: string;
  items: CartItem[];
  subtotalAED: number;
  discountAED?: number;
  promoCode?: string;
  feesAED: number;
  totalAED: number;
  pointsEarned?: number;
  traveler: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    notes?: string;
  };
};

const KEY = "aerovy.orders";

const readAll = (): Record<string, StoredOrder> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredOrder>) : {};
  } catch {
    return {};
  }
};

const writeAll = (map: Record<string, StoredOrder>) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // ignore quota / privacy mode errors
  }
};

export const saveOrder = (order: StoredOrder) => {
  const map = readAll();
  map[order.id] = order;
  writeAll(map);
};

export const getOrder = (id: string): StoredOrder | undefined => readAll()[id];

export const newOrderId = () => {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `AV-${stamp}${rand}`;
};
