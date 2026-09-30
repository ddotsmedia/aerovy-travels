"use client";

import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "@aerovy/ui";
import { DollarSign, Users, CalendarCheck, MessageSquare } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";
import { experiences } from "@/lib/catalog";
import { fmtAED } from "@/lib/site";

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 68000 },
  { month: "Jul", revenue: 75000 },
  { month: "Aug", revenue: 82000 },
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 92000 },
  { month: "Nov", revenue: 88000 },
  { month: "Dec", revenue: 105000 },
];

const categoryData = [
  { name: "Desert Safari", value: 35, color: "#CDA020" },
  { name: "Cultural Tour", value: 25, color: "#D4AF37" },
  { name: "Theme Parks", value: 20, color: "#AA8C2C" },
  { name: "Water Sports", value: 15, color: "#9B7E1F" },
  { name: "Other", value: 5, color: "#6B5818" },
];

const recentBookings = [
  {
    ref: "AER-5001",
    name: "Fatima Al Mansouri",
    experience: "Dune Bashing Adventure",
    date: "2024-09-28",
    amount: 850,
    status: "Confirmed" as const,
  },
  {
    ref: "AER-5000",
    name: "Raj Patel",
    experience: "Sheikh Zayed Grand Mosque Tour",
    date: "2024-09-28",
    amount: 240,
    status: "Confirmed" as const,
  },
  {
    ref: "AER-4999",
    name: "Emma Watson",
    experience: "Sunset Yacht Cruise",
    date: "2024-09-27",
    amount: 1200,
    status: "Pending" as const,
  },
  {
    ref: "AER-4998",
    name: "Ahmed Al Mansoori",
    experience: "Camel Trekking",
    date: "2024-09-27",
    amount: 450,
    status: "Confirmed" as const,
  },
  {
    ref: "AER-4997",
    name: "Sarah Johnson",
    experience: "Desert Camping",
    date: "2024-09-26",
    amount: 680,
    status: "Cancelled" as const,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/60">Welcome to the Aerovy admin panel</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label="Total Bookings"
          value="1,247"
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          icon={DollarSign}
          label="Revenue (AED)"
          value={fmtAED(892340)}
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={CalendarCheck}
          label="Active Experiences"
          value={experiences.length}
          trend="All active"
          isPositive={true}
        />
        <StatCard
          icon={MessageSquare}
          label="Pending Enquiries"
          value="23"
          trend="-3.1%"
          isPositive={false}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue chart */}
        <Card className="admin-card">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Revenue · Last 12 Months</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CDA020" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#CDA020" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D1117",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#CDA020"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category pie chart */}
        <Card className="admin-card">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Bookings by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D1117",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent bookings table */}
      <Card className="admin-card">
        <CardContent className="p-0">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs font-medium tracking-wide text-white/60 uppercase">
                  <th className="px-6 py-3">Ref</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Experience</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentBookings.map((booking) => (
                  <tr key={booking.ref} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-mono text-xs text-white/70">{booking.ref}</td>
                    <td className="px-6 py-4 text-white">{booking.name}</td>
                    <td className="px-6 py-4 text-white/70">{booking.experience}</td>
                    <td className="px-6 py-4 text-white/70">{booking.date}</td>
                    <td className="px-6 py-4 font-semibold text-white">{fmtAED(booking.amount)}</td>
                    <td className="px-6 py-4">
                      <BookingStatusBadge status={booking.status} />
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
