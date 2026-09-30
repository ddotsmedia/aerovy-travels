"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Customer = {
  id: string;
  name: string;
  email: string;
  bookings: number;
  totalSpend: number;
  lastBooking: string;
};

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Sarah Al-Mazrouei",
    email: "sarah@example.com",
    bookings: 5,
    totalSpend: 8500,
    lastBooking: "2024-09-20",
  },
  {
    id: "2",
    name: "Ahmed Khalifa",
    email: "ahmed@example.com",
    bookings: 3,
    totalSpend: 4200,
    lastBooking: "2024-09-15",
  },
  {
    id: "3",
    name: "Layla Al-Ketbi",
    email: "layla@example.com",
    bookings: 8,
    totalSpend: 15600,
    lastBooking: "2024-09-25",
  },
  {
    id: "4",
    name: "Mohammed Al-Shamsi",
    email: "mohammed@example.com",
    bookings: 2,
    totalSpend: 2100,
    lastBooking: "2024-08-10",
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("admin-customers");
    setCustomers(stored ? JSON.parse(stored) : MOCK_CUSTOMERS);
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="mt-2 text-gray-600">Manage customer information and bookings</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Total Spend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Last Booking
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((customer, idx) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                    {customer.bookings}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-gray-900">
                    AED {customer.totalSpend.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                    {customer.lastBooking}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white py-12 text-center">
            <p className="text-gray-600">No customers found matching your search.</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Total Customers",
              value: customers.length,
              color: "from-blue-600 to-blue-700",
            },
            {
              label: "Total Bookings",
              value: customers.reduce((sum, c) => sum + c.bookings, 0),
              color: "from-green-600 to-green-700",
            },
            {
              label: "Total Revenue",
              value: `AED ${customers.reduce((sum, c) => sum + c.totalSpend, 0).toLocaleString()}`,
              color: "from-purple-600 to-purple-700",
            },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white`}>
              <p className="mb-2 text-sm opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
