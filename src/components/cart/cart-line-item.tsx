"use client";

import Image from "next/image";
import { Minus, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/lib/cart/cart-context";
import { Price } from "@/components/product/price";
import type { CartLine } from "@/lib/shopify";

export function CartLineItem({ line }: { line: CartLine }) {
  const { updateItem, removeItem, isPending } = useCart();
  const variantLabel = line.merchandise.selectedOptions
    .filter((o) => o.value && o.name !== "Title")
    .map((o) => o.value)
    .join(" / ");

  const customAttrs = line.attributes.filter((a) => !a.key.startsWith("_"));

  return (
    <li className="flex gap-4 py-5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-bg-subtle">
        {line.merchandise.image ? (
          <Image
            src={line.merchandise.image.url}
            alt={line.merchandise.image.altText ?? line.merchandise.product.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-fg">{line.merchandise.product.title}</p>
            {variantLabel && <p className="text-xs text-fg-muted">{variantLabel}</p>}
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            disabled={isPending}
            aria-label="Eliminar artículo"
            className="cursor-pointer p-1 text-fg-faint transition-colors hover:text-danger disabled:cursor-not-allowed"
          >
            <Trash size={16} />
          </button>
        </div>

        {customAttrs.length > 0 && (
          <ul className="mt-0.5 space-y-0.5">
            {customAttrs.map((attr) => (
              <li key={attr.key} className="text-xs text-fg-faint">
                {attr.key}: {attr.value}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-full border border-border-strong">
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity - 1)}
              disabled={isPending}
              aria-label="Reducir cantidad"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg disabled:cursor-not-allowed"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center text-sm tabular-nums text-fg">{line.quantity}</span>
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity + 1)}
              disabled={isPending}
              aria-label="Aumentar cantidad"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg disabled:cursor-not-allowed"
            >
              <Plus size={12} />
            </button>
          </div>
          <Price
            amount={line.cost.totalAmount.amount}
            currencyCode={line.cost.totalAmount.currencyCode}
            className="text-sm font-medium text-fg"
          />
        </div>
      </div>
    </li>
  );
}
