"use client";

import { useState } from "react";
import { Card, CardContent, Button } from "@aerovy/ui";
import { Search, Eye } from "lucide-react";

const mockEnquiries = [
  {
    id: 1,
    name: "Priya M.",
    email: "priya@email.com",
    phone: "+971 50 123 4567",
    subject: "Group booking inquiry",
    date: "2024-09-28",
    status: "New",
  },
  {
    id: 2,
    name: "Sebastian K.",
    email: "sebastian@email.com",
    phone: "+971 50 234 5678",
    subject: "Visa assistance",
    date: "2024-09-27",
    status: "Replied",
  },
  {
    id: 3,
    name: "Layla T.",
    email: "layla@email.com",
    phone: "+971 50 345 6789",
    subject: "Honeymoon package",
    date: "2024-09-26",
    status: "New",
  },
  {
    id: 4,
    name: "Ahmed R.",
    email: "ahmed@email.com",
    phone: "+971 50 456 7890",
    subject: "Corporate travel",
    date: "2024-09-25",
    status: "Replied",
  },
  {
    id: 5,
    name: "Jessica H.",
    email: "jessica@email.com",
    phone: "+971 50 567 8901",
    subject: "Price inquiry",
    date: "2024-09-24",
    status: "Closed",
  },
  {
    id: 6,
    name: "Fatima A.",
    email: "fatima@email.com",
    phone: "+971 50 678 9012",
    subject: "Customized itinerary",
    date: "2024-09-23",
    status: "New",
  },
  {
    id: 7,
    name: "Marco R.",
    email: "marco@email.com",
    phone: "+971 50 789 0123",
    subject: "Family activities",
    date: "2024-09-22",
    status: "Replied",
  },
];

export default function EnquiriesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockEnquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) || e.email.includes(search);
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "text-blue-400";
      case "Replied":
        return "text-green-400";
      case "Closed":
        return "text-white/60";
      default:
        return "text-white/60";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Enquiries</h1>
        <p className="mt-1 text-sm text-white/60">Manage customer inquiries</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or email..."
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
          <option>New</option>
          <option>Replied</option>
          <option>Closed</option>
        </select>
      </div>

      {/* Table */}
      <Card className="border border-white/10 bg-[#161B22]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs font-medium tracking-wide text-white/60 uppercase">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">{enquiry.name}</td>
                    <td className="px-6 py-4 text-white/70">{enquiry.email}</td>
                    <td className="px-6 py-4 text-white/70">{enquiry.phone}</td>
                    <td className="px-6 py-4 text-white">{enquiry.subject}</td>
                    <td className="px-6 py-4 text-xs text-white/70">{enquiry.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-white/60 hover:text-[#CDA020]">
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
