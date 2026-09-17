"use client";

import { createContext, useContext, useMemo, useState, useTransition, type ReactNode } from "react";
import { addLineToCart, removeLineFromCart, updateLineQuantity } from "./actions";
import type { Cart } from "@/lib/shopify";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  isPending: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    merchandiseId: string,
    quantity?: number,
    attributes?: { key: string; value: string }[]
  ) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      isPending,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: async (merchandiseId, quantity = 1, attributes) => {
        await new Promise<void>((resolve, reject) => {
          startTransition(async () => {
            try {
              const updated = await addLineToCart(merchandiseId, quantity, attributes);
              setCart(updated);
              setIsOpen(true);
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        });
      },
      updateItem: async (lineId, quantity) => {
        await new Promise<void>((resolve, reject) => {
          startTransition(async () => {
            try {
              const updated = await updateLineQuantity(lineId, quantity);
              setCart(updated);
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        });
      },
      removeItem: async (lineId) => {
        await new Promise<void>((resolve, reject) => {
          startTransition(async () => {
            try {
              const updated = await removeLineFromCart(lineId);
              setCart(updated);
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        });
      },
    }),
    [cart, isOpen, isPending]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
