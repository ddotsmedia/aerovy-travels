"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarCheck, CheckCircle2, Download, Mail, MapPin, Users } from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import { getOrder, type StoredOrder } from "@/lib/order-store";
import { lineSubtotal } from "@/lib/cart-store";
import { pointsForAED } from "@/lib/store/loyalty";
import { fmtAED } from "@/lib/site";

export function ConfirmationContent({ id }: { id: string }) {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOrder(getOrder(id) ?? null);
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-border bg-surface/40 h-64 animate-pulse rounded-xl border" />
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Booking not found</h1>
        <p className="text-muted mt-2 text-sm">
          We couldn&rsquo;t locate booking{" "}
          <code className="bg-surface rounded px-1.5 py-0.5 text-xs">{id}</code> in this browser. If
          you booked on another device, please check the email confirmation for a direct link.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/experiences">Back to experiences</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/track">Track a booking</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="bg-brand-primary/15 text-brand-primary flex size-16 items-center justify-center rounded-full">
              <CheckCircle2 className="size-8" aria-hidden="true" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight">You&rsquo;re booked.</h1>
            <p className="text-muted mt-2 max-w-md text-sm">
              Booking <strong className="text-text">{order.id}</strong> confirmed for{" "}
              {order.traveler.firstName} {order.traveler.lastName}. A voucher is on its way to{" "}
              {order.traveler.email}.
            </p>
            <p className="bg-brand-primary/10 text-text mt-4 rounded-full px-4 py-2 text-sm font-medium">
              You earned {order.pointsEarned ?? pointsForAED(order.totalAED)} Aerovy Reward Points
              for this booking!
            </p>
          </div>

          <div className="border-border mt-8 grid gap-4 rounded-xl border p-5 sm:grid-cols-3">
            <Stat icon={CalendarCheck} label="Items" value={`${order.items.length}`} />
            <Stat
              icon={Users}
              label="Guests"
              value={`${order.items.reduce((s, i) => s + i.adults + i.children, 0)}`}
            />
            <Stat icon={MapPin} label="Total paid" value={fmtAED(order.totalAED)} />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold">Your itinerary</h2>
            <ul className="mt-4 space-y-4">
              {order.items.map((it) => {
                const dateLabel = new Date(it.dateISO).toLocaleDateString("en", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                return (
                  <li
                    key={it.id}
                    className="border-border flex flex-col gap-4 rounded-xl border p-4 sm:flex-row"
                  >
                    {it.image && (
                      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg sm:w-40">
                        <Image
                          src={it.image}
                          alt={it.title}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Link
                        href={`/experiences/${it.slug}`}
                        className="hover:text-brand-primary text-base font-semibold"
                      >
                        {it.title}
                      </Link>
                      <p className="text-muted mt-1 text-sm">{it.variantName}</p>
                      <p className="text-muted mt-1 text-sm">{dateLabel} · 9:00 am</p>
                      <p className="text-muted mt-1 text-sm">
                        {it.adults} adult{it.adults === 1 ? "" : "s"}
                        {it.children > 0
                          ? ` · ${it.children} child${it.children === 1 ? "" : "ren"}`
                          : ""}
                      </p>
                    </div>
                    <p className="text-base font-semibold whitespace-nowrap sm:self-center">
                      {fmtAED(lineSubtotal(it))}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <dl className="border-border mt-8 space-y-2 border-t pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{fmtAED(order.subtotalAED)}</dd>
            </div>
            {(order.discountAED ?? 0) > 0 && (
              <div className="text-brand-primary flex justify-between">
                <dt>Promo {order.promoCode ? `(${order.promoCode})` : ""}</dt>
                <dd>−{fmtAED(order.discountAED ?? 0)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted">Service fee</dt>
              <dd>{fmtAED(order.feesAED)}</dd>
            </div>
            <div className="border-border mt-2 flex justify-between border-t pt-2 text-base font-semibold">
              <dt>Total paid</dt>
              <dd>{fmtAED(order.totalAED)}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => window.print()}>
              <Download className="size-4" aria-hidden="true" />
              Print voucher
            </Button>
            <Button variant="outline" asChild>
              <Link href={`mailto:${order.traveler.email}?subject=Aerovy booking ${order.id}`}>
                <Mail className="size-4" aria-hidden="true" />
                Email me a copy
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/experiences">Browse more experiences</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">
      <Icon className="text-brand-primary mx-auto size-5" aria-hidden={true} />
      <p className="text-muted mt-2 text-xs tracking-wide uppercase">{label}</p>
      <p className="mt-1 text-base font-semibold">{value}</p>
    </div>
  );
}
