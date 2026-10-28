"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent, Button } from "@aerovy/ui";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";
import { customers, customerBookings, customerStats, type AdminCustomer } from "@/lib/admin/mock";
import { useAdminStore } from "@/lib/store/admin";
import { fmtAED } from "@/lib/site";

const MIN_OPTIONS = [
  { label: "Any bookings", value: 0 },
  { label: "1+ bookings", value: 1 },
  { label: "3+ bookings", value: 3 },
  { label: "5+ bookings", value: 5 },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [minBookings, setMinBookings] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      customers
        .map((c) => ({ ...c, ...customerStats(c.id) }))
        .filter((c) => {
          const q = search.trim().toLowerCase();
          const matches =
            !q ||
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""));
          return matches && c.bookings >= minBookings;
        }),
    [search, minBookings],
  );

  const selected = customers.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <p className="mt-1 text-sm text-white/60">
          {customers.length} customers · click a row for details
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-white/10 bg-[#161B22] px-4 py-2 text-white placeholder:text-white/40 focus:border-[#CDA020] focus:outline-none"
        />
        <select
          value={minBookings}
          onChange={(e) => setMinBookings(Number(e.target.value))}
          className="rounded-md border border-white/10 bg-[#161B22] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
        >
          {MIN_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <Card className="border border-white/10 bg-[#161B22]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs tracking-wide text-white/60 uppercase">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Bookings</th>
                  <th className="px-6 py-3">Total spent</th>
                  <th className="px-6 py-3">Points</th>
                  <th className="px-6 py-3">Last booking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className="cursor-pointer hover:bg-white/5"
                  >
                    <td className="px-6 py-4 font-medium text-white">{c.name}</td>
                    <td className="px-6 py-4 text-white/70">{c.email}</td>
                    <td className="px-6 py-4 text-white">{c.bookings}</td>
                    <td className="px-6 py-4 font-semibold text-white">{fmtAED(c.totalSpent)}</td>
                    <td className="px-6 py-4 text-white/70">{c.points.toLocaleString()}</td>
                    <td className="px-6 py-4 text-white/70">
                      {c.lastBooking ? c.lastBooking.slice(0, 10) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && (
            <p className="p-8 text-center text-sm text-white/60">
              No customers match these filters.
            </p>
          )}
        </CardContent>
      </Card>

      {selected && (
        <CustomerDrawer key={selected.id} customer={selected} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}

function CustomerDrawer({ customer, onClose }: { customer: AdminCustomer; onClose: () => void }) {
  const stats = customerStats(customer.id);
  const history = customerBookings(customer.id);
  const savedNote = useAdminStore((s) => s.customerNotes[customer.id] ?? "");
  const setNote = useAdminStore((s) => s.setCustomerNote);
  const [draft, setDraft] = useState(savedNote);
  const [saved, setSaved] = useState(false);

  const saveNote = () => {
    setNote(customer.id, draft.trim());
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/60" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Customer ${customer.name}`}
        className="h-full w-full max-w-lg overflow-y-auto border-l border-white/10 bg-[#0D1117] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{customer.name}</h2>
            <p className="mt-1 text-sm text-white/60">
              {customer.email} · {customer.phone}
            </p>
            <p className="text-xs text-white/40">{customer.country}</p>
          </div>
          <button
            type="button"
            aria-label="Close customer details"
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Mini label="Total spent" value={fmtAED(stats.totalSpent)} />
          <Mini label="Bookings" value={String(stats.bookings)} />
          <Mini label="Points" value={stats.points.toLocaleString()} />
        </div>

        <section className="mt-8">
          <h3 className="text-sm font-semibold text-white">Booking history</h3>
          {history.length === 0 ? (
            <p className="mt-2 text-sm text-white/60">No bookings yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-white/10 rounded-lg border border-white/10">
              {history.map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-3 p-3 text-sm">
                  <div>
                    <p className="text-white">{b.experience}</p>
                    <p className="text-xs text-white/50">
                      {b.id} · {b.dateISO.slice(0, 10)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{fmtAED(b.amount)}</p>
                    <BookingStatusBadge status={b.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <label htmlFor="customer-note" className="text-sm font-semibold text-white">
            Internal notes
          </label>
          <textarea
            id="customer-note"
            rows={4}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setSaved(false);
            }}
            placeholder="Preferences, dietary needs, VIP handling…"
            className="admin-input mt-2 w-full rounded-md border px-3 py-2 text-sm"
          />
          <div className="mt-3 flex items-center gap-3">
            <Button className="admin-button" onClick={saveNote} disabled={saved}>
              Save note
            </Button>
            {saved && <span className="text-xs text-white/60">Saved</span>}
          </div>
        </section>
      </aside>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#161B22] p-3">
      <p className="text-[11px] tracking-wide text-white/50 uppercase">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
