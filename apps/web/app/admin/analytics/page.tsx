"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@aerovy/ui";

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

const bookingsByDestination = [
  { destination: "Abu Dhabi", bookings: 450 },
  { destination: "Dubai", bookings: 380 },
  { destination: "Ras Al Khaimah", bookings: 220 },
  { destination: "Fujairah", bookings: 180 },
  { destination: "Other", bookings: 170 },
];

const nationality = [
  { name: "Indian", value: 35, color: "#CDA020" },
  { name: "Emirati", value: 20, color: "#D4AF37" },
  { name: "British", value: 15, color: "#AA8C2C" },
  { name: "American", value: 10, color: "#9B7E1F" },
  { name: "Other", value: 20, color: "#6B5818" },
];

const funnel = [
  { name: "Visits", value: 15000 },
  { name: "Search", value: 8500 },
  { name: "View", value: 4200 },
  { name: "Book", value: 1247 },
];

const topExperiences = [
  { name: "Dune Bashing", bookings: 285, trend: "▄▄▄▄▄" },
  { name: "Yacht Cruise", bookings: 215, trend: "▄▄▄▄" },
  { name: "Grand Mosque", bookings: 198, trend: "▄▄▄▄" },
  { name: "Desert Camp", bookings: 156, trend: "▄▄▄" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-white/60">Performance insights and trends</p>
      </div>

      {/* Revenue Chart */}
      <Card className="border border-white/10 bg-[#161B22]">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Monthly Revenue</h2>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bookings by Destination */}
        <Card className="border border-white/10 bg-[#161B22]">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Bookings by Destination</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsByDestination}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="destination" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D1117",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <Bar dataKey="bookings" fill="#CDA020" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Nationality */}
        <Card className="border border-white/10 bg-[#161B22]">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Customer Nationality</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nationality}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nationality.map((entry, index) => (
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

      {/* Conversion Funnel */}
      <Card className="border border-white/10 bg-[#161B22]">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Conversion Funnel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart data={funnel}>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0D1117",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <Funnel dataKey="value" data={funnel} fill="#CDA020" stroke="rgba(255,255,255,0.1)">
                {funnel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#CDA020" opacity={1 - index * 0.15} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Experiences */}
      <Card className="border border-white/10 bg-[#161B22]">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Top Performing Experiences</h2>
          <div className="space-y-4">
            {topExperiences.map((exp, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-white">{exp.name}</p>
                  <div className="mt-1 text-xs text-[#CDA020]">{exp.trend}</div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{exp.bookings}</p>
                  <p className="text-xs text-white/60">bookings</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
