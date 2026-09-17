"use client";

import { useMemo, useState } from "react";
import { Check, ShoppingBagOpen } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/lib/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Price } from "./price";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/lib/shopify";

function findVariant(variants: ProductVariant[], selected: Record<string, string>) {
  return variants.find((variant) =>
    variant.selectedOptions.every((opt) => selected[opt.name] === opt.value)
  );
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem, isPending } = useCart();
  const [added, setAdded] = useState(false);

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const option of product.options) {
      const firstAvailable = product.variants.find(
        (v) => v.availableForSale && v.selectedOptions.some((o) => o.name === option.name)
      );
      initial[option.name] =
        firstAvailable?.selectedOptions.find((o) => o.name === option.name)?.value ??
        option.values[0];
    }
    return initial;
  });

  const selectedVariant = useMemo(
    () => findVariant(product.variants, selected),
    [product.variants, selected]
  );

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const canBuy = Boolean(selectedVariant?.availableForSale);

  async function handleAddToCart() {
    if (!selectedVariant) return;
    await addItem(selectedVariant.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-7">
      <Price amount={price.amount} currencyCode={price.currencyCode} className="text-2xl text-fg" />

      {product.options
        .filter((option) => !(option.values.length === 1 && option.values[0] === "Default Title"))
        .map((option) => (
          <div key={option.id} className="flex flex-col gap-2.5">
            <span className="text-sm font-medium text-fg">
              {option.name}
              <span className="ml-2 font-normal text-fg-muted">{selected[option.name]}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selected[option.name] === value;
                const wouldBeVariant = findVariant(product.variants, {
                  ...selected,
                  [option.name]: value,
                });
                const isAvailable = wouldBeVariant?.availableForSale ?? true;

                return (
                  <button
                    key={value}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelected((prev) => ({ ...prev, [option.name]: value }))}
                    className={cn(
                      "min-w-11 cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                      isSelected
                        ? "border-fg bg-fg text-bg"
                        : "border-border-strong text-fg hover:border-fg",
                      !isAvailable && "cursor-not-allowed border-border text-fg-faint line-through"
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      <Button
        type="button"
        onClick={handleAddToCart}
        disabled={!canBuy || isPending}
        size="lg"
        fullWidth
      >
        {added ? (
          <>
            <Check size={18} /> Anadido
          </>
        ) : canBuy ? (
          <>
            <ShoppingBagOpen size={18} /> Anadir al carrito
          </>
        ) : (
          "Agotado"
        )}
      </Button>
    </div>
  );
}
