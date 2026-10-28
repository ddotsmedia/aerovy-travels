"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, Button } from "@aerovy/ui";
import { Search, Download, Eye, Trash2, MessageCircle } from "lucide-react";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";
import { fmtAED } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { bookings, isAbandoned, type AdminBooking } from "@/lib/admin/mock";

const reminderMessage = (b: AdminBooking) =>
  `Hi ${b.customer.split(" ")[0]}, you started booking ${b.experience} with Aerovy (ref ${b.id}) but didn't finish. Reply here and we'll hold your slot.`;

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [abandonedOnly, setAbandonedOnly] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Captured once per mount so the abandoned cut-off doesn't shift while the page is open.
  const [now] = useState(() => Date.now());

  const abandoned = useMemo(() => bookings.filter((b) => isAbandoned(b, now)), [now]);

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search);
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const matchesAbandoned = !abandonedOnly || isAbandoned(b, now);
    return matchesSearch && matchesStatus && matchesAbandoned;
  });

  const paginatedBookings = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const exportCSV = () => {
    const csv = [
      ["ID", "Customer", "Experience", "Date", "Amount (AED)", "Status", "Payment"],
      ...filtered.map((b) => [
        b.id,
        b.customer,
        b.experience,
        b.dateISO.slice(0, 10),
        b.amount,
        b.status,
        b.paymentStatus,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Bookings</h1>
          <p className="mt-1 text-sm text-white/60">Manage all customer bookings</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setShowBulk((v) => !v)}
            disabled={abandoned.length === 0}
          >
            <MessageCircle className="mr-2 size-4" aria-hidden="true" />
            Reminders for abandoned ({abandoned.length})
          </Button>
          <Button className="bg-[#CDA020] text-black hover:bg-[#CDA020]/90" onClick={exportCSV}>
            <Download className="mr-2 size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {showBulk && (
        <Card className="border border-white/10 bg-[#161B22]">
          <CardContent className="p-6">
            <p className="text-sm text-white/70">
              Pending payments older than 1 hour. Each link opens a WhatsApp chat with a pre-filled
              reminder.
            </p>
            <ul className="mt-4 divide-y divide-white/10">
              {abandoned.map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="text-white">
                    {b.customer} <span className="text-white/50">· {b.id}</span>
                  </span>
                  <a
                    href={waLink(reminderMessage(b))}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#CDA020] hover:underline"
                  >
                    Open WhatsApp
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-md border border-white/10 bg-[#161B22] py-2 pr-4 pl-10 text-white placeholder:text-white/40 focus:border-[#CDA020] focus:outline-none"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="rounded-md border border-white/10 bg-[#161B22] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
        >
          <option>All</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={abandonedOnly}
            onChange={(e) => {
              setAbandonedOnly(e.target.checked);
              setCurrentPage(1);
            }}
            className="accent-[#CDA020]"
          />
          Abandoned only
        </label>
      </div>

      {/* Table */}
      <Card className="border border-white/10 bg-[#161B22]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs font-medium tracking-wide text-white/60 uppercase">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Experience</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Pax</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedBookings.map((booking) => {
                  const isAband = isAbandoned(booking, now);
                  return (
                    <tr key={booking.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 font-mono text-xs text-white/70">{booking.id}</td>
                      <td className="px-6 py-4 text-white">{booking.customer}</td>
                      <td className="px-6 py-4 text-white/70">{booking.experience}</td>
                      <td className="px-6 py-4 text-white/70">{booking.dateISO.slice(0, 10)}</td>
                      <td className="px-6 py-4 text-white">{booking.pax}</td>
                      <td className="px-6 py-4 text-right font-semibold text-white">
                        {fmtAED(booking.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <BookingStatusBadge status={booking.status} />
                        {isAband && <span className="ml-2 text-xs text-yellow-400">Abandoned</span>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          {isAband && (
                            <a
                              href={waLink(reminderMessage(booking))}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[#25D366] hover:underline"
                            >
                              <MessageCircle className="size-3.5" aria-hidden="true" />
                              Send reminder
                            </a>
                          )}
                          <button
                            type="button"
                            aria-label={`View ${booking.id}`}
                            className="text-white/60 hover:text-[#CDA020]"
                          >
                            <Eye className="size-4" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${booking.id}`}
                            className="text-white/60 hover:text-red-400"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
            <div className="text-sm text-white/60">
              Page {currentPage} of {totalPages} ({filtered.length} results)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
