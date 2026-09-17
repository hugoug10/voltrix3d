"use client";

import { useCart } from "@/lib/cart/cart-context";
import { CartLineItem } from "@/components/cart/cart-line-item";

export function CartLinesList() {
  const { cart } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <ul className="divide-y divide-border rounded-2xl border border-border bg-surface px-6">
      {lines.map((line) => (
        <CartLineItem key={line.id} line={line} />
      ))}
    </ul>
  );
}
