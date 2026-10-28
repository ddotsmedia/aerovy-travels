"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type NotificationKind = "booking" | "cancellation" | "payment" | "review";

export type AdminNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  createdAtISO: string;
  read: boolean;
};

const MIN = 60 * 1000;

// Ten mock events, newest first, spaced 17 minutes apart.
const seed = (): AdminNotification[] => {
  const now = Date.now();
  const rows: Omit<AdminNotification, "createdAtISO" | "read">[] = [
    {
      id: "n10",
      kind: "booking",
      title: "New booking",
      message: "AER-4968 · Desert Safari & BBQ · 2 pax",
    },
    { id: "n9", kind: "payment", title: "Payment received", message: "AED 1,240 from Layla Taleb" },
    {
      id: "n8",
      kind: "review",
      title: "New review posted",
      message: "5★ for Sheikh Zayed Mosque tour",
    },
    { id: "n7", kind: "booking", title: "New booking", message: "AER-4965 · Yacht Cruise · 6 pax" },
    {
      id: "n6",
      kind: "cancellation",
      title: "Booking cancelled",
      message: "AER-4961 · Ferrari World · refund queued",
    },
    { id: "n5", kind: "payment", title: "Payment received", message: "AED 395 from Raj Patel" },
    {
      id: "n4",
      kind: "booking",
      title: "New booking",
      message: "AER-4958 · Liwa Desert Safari · 4 pax",
    },
    {
      id: "n3",
      kind: "review",
      title: "New review posted",
      message: "4★ for Louvre Abu Dhabi day trip",
    },
    {
      id: "n2",
      kind: "payment",
      title: "Payment received",
      message: "AED 2,050 from Sarah Johnson",
    },
    {
      id: "n1",
      kind: "booking",
      title: "New booking",
      message: "AER-4951 · Mangrove kayaking · 2 pax",
    },
  ];
  return rows.map((r, i) => ({
    ...r,
    createdAtISO: new Date(now - i * 17 * MIN).toISOString(),
    read: i > 3,
  }));
};

export type NotificationState = {
  items: AdminNotification[];
  markRead: (id: string) => void;
  markAllRead: () => void;
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      items: seed(),
      markRead: (id) =>
        set((s) => ({ items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
      markAllRead: () => set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
    }),
    {
      name: "aerovy.admin.notifications",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const unreadCount = (items: AdminNotification[]) => items.filter((n) => !n.read).length;
