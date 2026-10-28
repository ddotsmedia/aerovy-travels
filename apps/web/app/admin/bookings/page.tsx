"use client";

import { useState } from "react";
import { Card, CardContent, Button } from "@aerovy/ui";
import { Search, Download, Eye, Trash2 } from "lucide-react";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";
import { fmtAED } from "@/lib/site";
import { experiences } from "@/lib/catalog";

const customers = [
  "Fatima Al Mansouri",
  "Raj Patel",
  "Emma Watson",
  "Ahmed Al Mansoori",
  "Sarah Johnson",
  "Priya M.",
  "Sebastian K.",
  "Layla T.",
];

const mockBookings = Array.from({ length: 30 }, (_, i) => ({
  id: `AER-${5000 - i}`,
  customer: customers[i % customers.length] ?? "Guest",
  experience: experiences[i % experiences.length]?.titleEn || "Experience",
  date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  pax: Math.floor(Math.random() * 6) + 1,
  amount: Math.floor(Math.random() * 2000) + 200,
  status: ["Confirmed", "Pending", "Cancelled"][Math.floor(Math.random() * 3)] as
    | "Confirmed"
    | "Pending"
    | "Cancelled",
}));

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = mockBookings.filter((b) => {
    const matchesSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search);
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedBookings = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const exportCSV = () => {
    const csv = [
      ["ID", "Customer", "Experience", "Date", "Pax", "Amount (AED)", "Status"],
      ...filtered.map((b) => [b.id, b.customer, b.experience, b.date, b.pax, b.amount, b.status]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bookings</h1>
          <p className="mt-1 text-sm text-white/60">Manage all customer bookings</p>
        </div>
        <Button className="bg-[#CDA020] text-black hover:bg-[#CDA020]/90" onClick={exportCSV}>
          <Download className="mr-2 size-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-[#161B22] py-2 pr-4 pl-10 text-white placeholder:text-white/40 focus:border-[#CDA020] focus:outline-none"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-white/10 bg-[#161B22] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
        >
          <option>All</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
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
                {paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-mono text-xs text-white/70">{booking.id}</td>
                    <td className="px-6 py-4 text-white">{booking.customer}</td>
                    <td className="px-6 py-4 text-white/70">{booking.experience}</td>
                    <td className="px-6 py-4 text-white/70">{booking.date}</td>
                    <td className="px-6 py-4 text-white">{booking.pax}</td>
                    <td className="px-6 py-4 text-right font-semibold text-white">
                      {fmtAED(booking.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-white/60 hover:text-[#CDA020]">
                          <Eye className="size-4" />
                        </button>
                        <button className="text-white/60 hover:text-red-400">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                disabled={currentPage === totalPages}
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
