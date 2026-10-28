"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@aerovy/ui";
import { bookings, monthKey, monthLabel, staff } from "@/lib/admin/mock";
import { fmtAED } from "@/lib/site";

// Commission = staff rate × revenue from their non-cancelled bookings.
export default function StaffPage() {
  const months = useMemo(
    () =>
      Array.from(new Set(bookings.map((b) => monthKey(b.dateISO))))
        .sort()
        .reverse(),
    [],
  );
  const [month, setMonth] = useState(months[0] ?? "");

  const rows = useMemo(() => {
    const scoped = bookings.filter((b) => monthKey(b.dateISO) === month);
    const total = scoped.length || 1;
    return staff.map((s) => {
      const handled = scoped.filter((b) => b.staffId === s.id);
      const revenue = handled
        .filter((b) => b.status !== "Cancelled")
        .reduce((sum, b) => sum + b.amount, 0);
      return {
        ...s,
        count: handled.length,
        share: Math.round((handled.length / total) * 1000) / 10,
        revenue,
        commission: Math.round((revenue * s.commissionPct) / 100),
      };
    });
  }, [month]);

  const totalCommission = rows.reduce((s, r) => s + r.commission, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Staff commissions</h1>
          <p className="mt-1 text-sm text-white/60">
            Bookings handled and commission earned · {fmtAED(totalCommission)} this month
          </p>
        </div>
        <label className="text-sm">
          <span className="sr-only">Month</span>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="admin-input rounded-md border px-3 py-2"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Card className="admin-card admin-border border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs tracking-wide text-white/60 uppercase">
                  <th className="px-6 py-3">Staff</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Bookings</th>
                  <th className="px-6 py-3">Share</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Rate</th>
                  <th className="px-6 py-3 text-right">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">{r.name}</td>
                    <td className="px-6 py-4 text-white/70">{r.role}</td>
                    <td className="px-6 py-4 text-white">{r.count}</td>
                    <td className="px-6 py-4 text-white/70">{r.share}%</td>
                    <td className="px-6 py-4 text-white/70">{fmtAED(r.revenue)}</td>
                    <td className="px-6 py-4 text-white/70">{r.commissionPct}%</td>
                    <td className="admin-accent px-6 py-4 text-right font-semibold">
                      {fmtAED(r.commission)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="admin-card admin-border border">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Commission by staff</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={rows.map((r) => ({ name: r.name.split(" ")[0], commission: r.commission }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: "#161B22", border: "1px solid #30363d" }}
                formatter={(v) => fmtAED(Number(v))}
              />
              <Bar dataKey="commission" fill="#CDA020" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
