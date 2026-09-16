"use client";

import { ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/lib/cart/cart-context";
import { cn } from "@/lib/utils";

export function CartButton({ className }: { className?: string }) {
  const { cart, openCart } = useCart();
  const quantity = cart?.totalQuantity ?? 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carrito, ${quantity} articulos`}
      className={cn(
        "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors duration-150 hover:bg-surface-hover hover:text-fg",
        className
      )}
    >
      <ShoppingBag size={19} weight="light" />
      {quantity > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-fg">
          {quantity}
        </span>
      )}
    </button>
  );
}
