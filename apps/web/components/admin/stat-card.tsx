import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@aerovy/ui";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend: string;
  isPositive: boolean;
}

export function StatCard({ icon: Icon, label, value, trend, isPositive }: StatCardProps) {
  return (
    <Card className="border border-white/10 bg-[#161B22]">
      <CardContent className="p-5">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>{label}</span>
          <Icon className="size-4 text-[#CDA020]" aria-hidden="true" />
        </div>
        <p className="mt-2 text-2xl font-bold text-white">{value}</p>
        <p
          className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}
        >
          {isPositive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}
