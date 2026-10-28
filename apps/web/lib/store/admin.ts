"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TemplateKey = "confirmation" | "reminder24h" | "cancellation" | "reviewRequest";

export const TEMPLATE_LABELS: Record<TemplateKey, string> = {
  confirmation: "Booking confirmation",
  reminder24h: "Reminder · 24h before",
  cancellation: "Cancellation",
  reviewRequest: "Review request",
};

export const DEFAULT_TEMPLATES: Record<TemplateKey, string> = {
  confirmation:
    "Hi {{name}}, your Aerovy booking {{bookingId}} for {{experience}} on {{date}} is confirmed. Total paid: {{amount}}. See you soon!",
  reminder24h:
    "Hi {{name}}, a reminder that {{experience}} starts tomorrow ({{date}}). Meeting point details are on your voucher.",
  cancellation:
    "Hi {{name}}, booking {{bookingId}} for {{experience}} has been cancelled. Any eligible refund will reach you within 7 working days.",
  reviewRequest:
    "Hi {{name}}, thanks for travelling with Aerovy! How was {{experience}}? Leave us a review: {{reviewLink}}",
};

export const SAMPLE_VARS = {
  name: "Fatima",
  bookingId: "AER-5001",
  experience: "Desert Safari & BBQ",
  date: "Sat 14 Nov",
  amount: "AED 480",
  reviewLink: "aerovy.ae/reviews",
};

export const renderTemplate = (text: string, vars: Record<string, string>) =>
  text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? `{{${key}}}`);

export type AdminState = {
  templates: Record<TemplateKey, string>;
  customerNotes: Record<string, string>;
  setTemplate: (key: TemplateKey, text: string) => void;
  setCustomerNote: (customerId: string, note: string) => void;
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      templates: DEFAULT_TEMPLATES,
      customerNotes: {},
      setTemplate: (key, text) => set((s) => ({ templates: { ...s.templates, [key]: text } })),
      setCustomerNote: (customerId, note) =>
        set((s) => ({ customerNotes: { ...s.customerNotes, [customerId]: note } })),
    }),
    {
      name: "aerovy.admin",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
