"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent, Button, Input } from "@aerovy/ui";
import { Trash2 } from "lucide-react";
import {
  generatePromoCode,
  promoStatus,
  usePromoStore,
  type PromoStatus,
} from "@/lib/store/promos";

const STATUS_LABEL: Record<PromoStatus, string> = {
  active: "Active",
  expired: "Expired",
  used: "Used up",
};

export default function PromotionsPage() {
  const codes = usePromoStore((s) => s.codes);
  const add = usePromoStore((s) => s.add);
  const remove = usePromoStore((s) => s.remove);

  const [discount, setDiscount] = useState("10");
  const [maxUses, setMaxUses] = useState("50");
  const [expiry, setExpiry] = useState(() => {
    const d = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  });
  const [error, setError] = useState<string | null>(null);

  const onGenerate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pct = Number(discount);
    const uses = Number(maxUses);
    if (!Number.isFinite(pct) || pct < 1 || pct > 90) return setError("Discount must be 1–90%.");
    if (!Number.isInteger(uses) || uses < 1) return setError("Max uses must be at least 1.");
    if (!expiry) return setError("Pick an expiry date.");
    setError(null);

    const existing = new Set(codes.map((c) => c.code));
    let code = generatePromoCode();
    while (existing.has(code)) code = generatePromoCode();

    add({
      code,
      discountPct: pct,
      maxUses: uses,
      uses: 0,
      expiresAt: new Date(`${expiry}T23:59:59`).toISOString(),
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Promo codes</h1>
        <p className="mt-1 text-sm text-white/60">Generate codes customers can apply at checkout</p>
      </div>

      <Card className="admin-card admin-border border">
        <CardContent className="p-6">
          <form onSubmit={onGenerate} className="grid items-end gap-4 sm:grid-cols-4">
            <label className="block">
              <span className="text-xs text-white/60">Discount %</span>
              <Input
                type="number"
                min={1}
                max={90}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="admin-input mt-1"
              />
            </label>
            <label className="block">
              <span className="text-xs text-white/60">Max uses</span>
              <Input
                type="number"
                min={1}
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                className="admin-input mt-1"
              />
            </label>
            <label className="block">
              <span className="text-xs text-white/60">Expires on</span>
              <Input
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="admin-input mt-1"
              />
            </label>
            <Button type="submit" className="admin-button">
              Generate code
            </Button>
          </form>
          {error && (
            <p role="alert" className="mt-3 text-sm text-red-400">
              {error}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="admin-card admin-border border">
        <CardContent className="p-0">
          {codes.length === 0 ? (
            <p className="p-8 text-center text-sm text-white/60">No codes yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs tracking-wide text-white/60 uppercase">
                    <th className="px-6 py-3">Code</th>
                    <th className="px-6 py-3">Discount</th>
                    <th className="px-6 py-3">Uses</th>
                    <th className="px-6 py-3">Expires</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {codes.map((c) => {
                    const status = promoStatus(c);
                    return (
                      <tr key={c.code} className="hover:bg-white/5">
                        <td className="px-6 py-4 font-mono text-white">{c.code}</td>
                        <td className="px-6 py-4 text-white">{c.discountPct}%</td>
                        <td className="px-6 py-4 text-white/70">
                          {c.uses} / {c.maxUses}
                        </td>
                        <td className="px-6 py-4 text-white/70">{c.expiresAt.slice(0, 10)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              status === "active"
                                ? "bg-green-500/15 text-green-400"
                                : status === "used"
                                  ? "bg-yellow-500/15 text-yellow-400"
                                  : "bg-red-500/15 text-red-400"
                            }`}
                          >
                            {STATUS_LABEL[status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            aria-label={`Remove ${c.code}`}
                            onClick={() => remove(c.code)}
                            className="text-white/60 hover:text-red-400"
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
