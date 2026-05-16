"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore, cartCount } from "@/lib/cart-store";

export function CartIconButton({ className = "hidden md:flex" }: { className?: string }) {
  const items = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.hydrated);
  const count = hydrated ? cartCount(items) : 0;

  return (
    <Link
      href="/cart"
      className={`text-text hover:bg-surface relative h-10 w-10 items-center justify-center rounded-md ${className}`}
      aria-label={count > 0 ? `Cart, ${count} guest${count === 1 ? "" : "s"}` : "Cart"}
    >
      <ShoppingBag className="size-4" aria-hidden="true" />
      {count > 0 && (
        <span
          className="bg-brand-primary text-brand-secondary absolute -top-1 -right-1 inline-flex min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold"
          style={{ height: 18 }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
