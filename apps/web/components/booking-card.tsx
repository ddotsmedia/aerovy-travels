"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  Clock,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import { Button, Card, CardContent } from "@aerovy/ui";
import type { Experience } from "@/lib/catalog";
import { useCartStore, lineSubtotal, type CartItem } from "@/lib/cart-store";
import { fmtDuration } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { Price } from "@/components/price";

type Props = { experience: Experience };

const CHILD_PRICE_MULT = 0.6;

function slotsFromNow(): Date[] {
  const now = new Date();
  return [7, 14, 21, 28].map((d) => {
    const date = new Date(now);
    date.setDate(date.getDate() + d);
    date.setHours(9, 0, 0, 0);
    return date;
  });
}

export function BookingCard({ experience }: Props) {
  const slots = useMemo(() => slotsFromNow(), []);
  const router = useRouter();
  const add = useCartStore((s) => s.add);

  const [variantIdx, setVariantIdx] = useState(0);
  const [slotIdx, setSlotIdx] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const variant = experience.variants[variantIdx] ?? experience.variants[0];
  const slot = slots[slotIdx] ?? slots[0];
  if (!variant || !slot) return null;
  const maxPax = variant.maxPax;

  const pricePerAdultAED = variant.basePriceAED;
  const pricePerChildAED = Math.round(variant.basePriceAED * CHILD_PRICE_MULT);

  const draftItem: Omit<CartItem, "id"> = {
    slug: experience.slug,
    title: experience.titleEn,
    image: experience.images[0]?.url ?? "",
    variantId: `${experience.slug}-${variantIdx}`,
    variantName: variant.nameEn,
    dateISO: slot.toISOString(),
    adults,
    children,
    pricePerAdultAED,
    pricePerChildAED,
  };

  const subtotal = lineSubtotal({ ...draftItem, id: "draft" });
  const totalGuests = adults + children;
  const overCapacity = totalGuests > maxPax;

  const handleAdd = (goToCart: boolean) => {
    if (totalGuests < 1 || overCapacity) return;
    setAdding(true);
    add(draftItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    setAdding(false);
    if (goToCart) router.push("/cart");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-muted text-xs tracking-wide uppercase">From</p>
        <Price aed={pricePerAdultAED} className="mt-1 block text-3xl font-bold" />
        <p className="text-muted text-xs">per adult · taxes included</p>

        {/* Variant */}
        <fieldset className="mt-6">
          <legend className="text-muted text-xs font-semibold tracking-wide uppercase">
            Option
          </legend>
          <div className="mt-2 space-y-2">
            {experience.variants.map((v, i) => (
              <label
                key={v.nameEn}
                className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm transition-colors ${
                  i === variantIdx
                    ? "border-brand-primary bg-brand-primary/10"
                    : "border-border hover:border-brand-primary/60"
                }`}
              >
                <input
                  type="radio"
                  name="variant"
                  className="mt-1"
                  checked={i === variantIdx}
                  onChange={() => setVariantIdx(i)}
                />
                <span className="flex-1">
                  <span className="font-medium">{v.nameEn}</span>
                  <span className="text-muted ml-2">
                    <Price aed={v.basePriceAED} />
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Date */}
        <fieldset className="mt-5">
          <legend className="text-muted text-xs font-semibold tracking-wide uppercase">Date</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {slots.map((d, i) => (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => setSlotIdx(i)}
                className={`rounded-md border px-3 py-2 text-left text-xs transition-colors ${
                  i === slotIdx
                    ? "border-brand-primary bg-brand-primary/10"
                    : "border-border hover:border-brand-primary/60"
                }`}
              >
                <span className="block font-semibold">
                  {d.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
                </span>
                <span className="text-muted">9:00 am</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Pax */}
        <div className="mt-5 space-y-3">
          <PaxRow
            label="Adults"
            sublabel="13+"
            value={adults}
            min={1}
            max={maxPax}
            onChange={setAdults}
          />
          <PaxRow
            label="Children"
            sublabel="2–12 · 40% off"
            value={children}
            min={0}
            max={maxPax}
            onChange={setChildren}
          />
        </div>

        {/* Summary */}
        <dl className="border-border mt-5 space-y-2 border-t pt-4 text-sm">
          {adults > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted">{adults} × adult</dt>
              <dd>
                <Price aed={adults * pricePerAdultAED} />
              </dd>
            </div>
          )}
          {children > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted">{children} × child</dt>
              <dd>
                <Price aed={children * pricePerChildAED} />
              </dd>
            </div>
          )}
          <div className="flex justify-between border-t pt-2 text-base font-semibold">
            <dt>Total</dt>
            <dd>
              <Price aed={subtotal} />
            </dd>
          </div>
        </dl>

        {overCapacity && (
          <p className="text-danger mt-3 text-xs">
            Max {maxPax} guests per booking for this option.
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <Button
            size="lg"
            fullWidth
            disabled={overCapacity || totalGuests < 1 || adding}
            onClick={() => handleAdd(true)}
          >
            Reserve now
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            disabled={overCapacity || totalGuests < 1 || adding}
            onClick={() => handleAdd(false)}
          >
            {justAdded ? (
              <>
                <Check className="size-4" aria-hidden="true" />
                Added to cart
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" aria-hidden="true" />
                Add to cart
              </>
            )}
          </Button>
          <Button variant="outline" size="lg" fullWidth asChild>
            <a
              href={waLink(
                `Hi, I want to book ${experience.titleEn} on ${slot.toLocaleDateString("en", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}`,
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Book via WhatsApp
            </a>
          </Button>
        </div>

        <ul className="text-muted mt-5 space-y-1.5 text-xs">
          <li className="inline-flex items-center gap-2">
            <Calendar className="size-3.5" aria-hidden="true" />
            Free cancellation up to 24 h before
          </li>
          <li className="inline-flex items-center gap-2">
            <Users className="size-3.5" aria-hidden="true" />
            Up to {maxPax} guests · instant confirmation
          </li>
          <li className="inline-flex items-center gap-2">
            <Clock className="size-3.5" aria-hidden="true" />
            Duration · {fmtDuration(experience.durationMinutes)}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

function PaxRow({
  label,
  sublabel,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-muted text-xs">{sublabel}</p>
      </div>
      <div className="border-border inline-flex items-center rounded-md border">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="hover:bg-surface flex size-9 items-center justify-center disabled:opacity-40"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <span className="w-8 text-center text-sm font-medium">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          className="hover:bg-surface flex size-9 items-center justify-center disabled:opacity-40"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
