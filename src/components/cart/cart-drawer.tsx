"use client";

import { useEffect, useRef } from "react";
import { X, ShoppingBag, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/lib/cart/cart-context";
import { CartLineItem } from "./cart-line-item";
import { Price } from "@/components/product/price";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cart, isOpen, closeCart } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const lines = cart?.lines ?? [];

  return (
    <div
      className={cn("fixed inset-0 z-50", !isOpen && "pointer-events-none")}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={cn(
          "absolute inset-0 bg-fg/30 backdrop-blur-[2px] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compra"
        tabIndex={-1}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-lg outline-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-base font-medium text-fg">Tu carrito</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
          >
            <X size={18} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-subtle text-fg-faint">
              <ShoppingBag size={22} weight="light" />
            </div>
            <p className="text-sm text-fg-muted">Tu carrito esta vacio por ahora.</p>
            <Button href="/tienda" variant="outline" size="sm" onClick={closeCart}>
              Ver la tienda
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-fg-muted">Subtotal</span>
                <Price
                  amount={cart!.cost.subtotalAmount.amount}
                  currencyCode={cart!.cost.subtotalAmount.currencyCode}
                  className="text-base font-medium text-fg"
                />
              </div>
              <p className="mb-4 text-xs text-fg-faint">
                Impuestos y envio se calculan en el checkout de Shopify.
              </p>
              <Button href={cart!.checkoutUrl} fullWidth>
                Finalizar compra
                <ArrowRight size={16} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
