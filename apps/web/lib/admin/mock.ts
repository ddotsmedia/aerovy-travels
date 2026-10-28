// Shared mock data for the admin panel. Seeded so every admin page shows the same records.
import { experiences } from "@/lib/catalog";

export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";
export type PaymentStatus = "paid" | "pending" | "refunded";

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
};

export type AdminBooking = {
  id: string;
  customerId: string;
  customer: string;
  phone: string;
  experience: string;
  dateISO: string;
  createdAtISO: string;
  pax: number;
  amount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  staffId: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  commissionPct: number;
};

// mulberry32 — small seeded PRNG so mock records are stable across renders.
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const NAMES: [string, string, string][] = [
  ["Fatima Al Mansouri", "UAE", "+971 50 412 7731"],
  ["Raj Patel", "India", "+91 98200 44182"],
  ["Emma Watson", "United Kingdom", "+44 7700 900412"],
  ["Ahmed Al Mansoori", "UAE", "+971 55 310 9084"],
  ["Sarah Johnson", "United States", "+1 415 555 0182"],
  ["Priya Menon", "India", "+91 90040 22761"],
  ["Sebastian Keller", "Germany", "+49 151 2233 4455"],
  ["Layla Taleb", "Jordan", "+962 79 555 0121"],
  ["Mohammed Al Shamsi", "UAE", "+971 52 877 1230"],
  ["Aisha Al Hashmi", "Oman", "+968 9911 4402"],
  ["Khalid Al Dhaheri", "UAE", "+971 56 201 6677"],
  ["Noura Al Ketbi", "UAE", "+971 50 698 3341"],
  ["Vikram Nair", "India", "+91 97410 88035"],
  ["Maria Santos", "Philippines", "+63 917 555 0148"],
  ["Omar Haddad", "Lebanon", "+961 70 123 456"],
  ["Hessa Al Suwaidi", "UAE", "+971 54 432 9019"],
  ["James O'Connor", "Ireland", "+353 87 555 0190"],
  ["Yuki Tanaka", "Japan", "+81 90 5555 0137"],
  ["Saeed Al Qubaisi", "UAE", "+971 55 644 0280"],
  ["Meera Krishnan", "India", "+91 99400 31277"],
];

export const customers: AdminCustomer[] = NAMES.map(([name, country, phone], i) => ({
  id: `C${String(i + 1).padStart(3, "0")}`,
  name,
  email: `${name
    .toLowerCase()
    .replace(/[^a-z]+/g, ".")
    .replace(/^\.|\.$/g, "")}@example.com`,
  phone,
  country,
}));

export const staff: StaffMember[] = [
  { id: "S1", name: "Hala Al Nuaimi", role: "Sales lead", commissionPct: 8 },
  { id: "S2", name: "Tariq Mansoor", role: "Concierge", commissionPct: 6 },
  { id: "S3", name: "Julia Brandt", role: "Reservations", commissionPct: 6 },
  { id: "S4", name: "Ravi Shankar", role: "Partnerships", commissionPct: 5 },
  { id: "S5", name: "Mariam Saleh", role: "Support", commissionPct: 4 },
];

const STATUSES: BookingStatus[] = ["Confirmed", "Confirmed", "Confirmed", "Pending", "Cancelled"];

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;

const pickFrom = <T>(list: readonly T[], r: number): T => {
  const item = list[Math.floor(r * list.length)];
  if (item === undefined) throw new Error("pickFrom: empty list");
  return item;
};

const buildBookings = (): AdminBooking[] => {
  const rand = rng(20260601);
  const now = Date.now();
  return Array.from({ length: 60 }, (_, i) => {
    const c = pickFrom(customers, rand());
    const exp = experiences[Math.floor(rand() * experiences.length)];
    const status = STATUSES[Math.floor(rand() * STATUSES.length)] ?? "Confirmed";
    const pending = status === "Pending";
    const createdAgo = pending ? HOUR * (0.2 + rand() * 60) : DAY * (1 + rand() * 80);
    const dateISO = new Date(now - rand() * 90 * DAY).toISOString();
    const paymentStatus: PaymentStatus =
      status === "Cancelled" ? "refunded" : pending ? "pending" : "paid";
    return {
      id: `AER-${5000 - i}`,
      customerId: c.id,
      customer: c.name,
      phone: c.phone,
      experience: exp?.titleEn ?? "Experience",
      dateISO,
      createdAtISO: new Date(now - createdAgo).toISOString(),
      pax: 1 + Math.floor(rand() * 5),
      amount: 200 + Math.floor(rand() * 1800),
      status,
      paymentStatus,
      staffId: staff[Math.floor(rand() * staff.length)]?.id ?? "S1",
    };
  });
};

export const bookings: AdminBooking[] = buildBookings();

export const isAbandoned = (b: AdminBooking, now = Date.now()) =>
  b.paymentStatus === "pending" && now - new Date(b.createdAtISO).getTime() > HOUR;

export const customerBookings = (customerId: string) =>
  bookings.filter((b) => b.customerId === customerId);

// Spend counts non-cancelled bookings; points follow the 1 point / AED rule.
export const customerStats = (customerId: string) => {
  const list = customerBookings(customerId);
  const paid = list.filter((b) => b.status !== "Cancelled");
  const totalSpent = paid.reduce((s, b) => s + b.amount, 0);
  return {
    bookings: list.length,
    totalSpent,
    points: Math.floor(totalSpent),
    lastBooking: list.reduce<string | null>(
      (latest, b) => (!latest || b.dateISO > latest ? b.dateISO : latest),
      null,
    ),
  };
};

export const monthKey = (iso: string) => iso.slice(0, 7);

export const monthLabel = (key: string) =>
  new Date(`${key}-01T00:00:00Z`).toLocaleDateString("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

// Last 12 calendar months with synthetic revenue, for the reports chart.
export const monthlyRevenue = (() => {
  const rand = rng(7);
  const out: { month: string; revenue: number }[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    out.push({
      month: d.toLocaleDateString("en", { month: "short", timeZone: "UTC" }),
      revenue: 40000 + Math.round(rand() * 45000),
    });
  }
  return out;
})();
