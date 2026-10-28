"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Button } from "@aerovy/ui";
import { Download } from "lucide-react";
import { bookings, monthlyRevenue } from "@/lib/admin/mock";
import { exportBookingsXlsx } from "@/lib/admin/export";
import { fmtAED } from "@/lib/site";

export default function ReportsPage() {
  const [exporting, setExporting] = useState(false);

  const paid = bookings.filter((b) => b.status !== "Cancelled");
  const revenue = paid.reduce((s, b) => s + b.amount, 0);
  const avg = paid.length ? Math.round(revenue / paid.length) : 0;

  const onExport = async () => {
    setExporting(true);
    try {
      await exportBookingsXlsx(bookings);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="mt-1 text-sm text-white/60">Revenue and booking exports</p>
        </div>
        <Button className="admin-button" onClick={onExport} disabled={exporting}>
          <Download className="mr-2 size-4" aria-hidden="true" />
          {exporting ? "Preparing…" : "Export to Excel"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Revenue (90 days)" value={fmtAED(revenue)} />
        <Stat label="Bookings" value={String(bookings.length)} />
        <Stat label="Average order" value={fmtAED(avg)} />
      </div>

      <Card className="admin-card admin-border border">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Monthly revenue · last 12 months
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CDA020" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#CDA020" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: "#161B22", border: "1px solid #30363d" }}
                formatter={(v) => fmtAED(Number(v))}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#CDA020"
                strokeWidth={2}
                fill="url(#revGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="admin-card admin-border border">
      <CardContent className="p-5">
        <p className="text-xs tracking-wide text-white/60 uppercase">{label}</p>
        <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  );
}
