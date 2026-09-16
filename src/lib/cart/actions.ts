"use server";

import { cookies } from "next/headers";
import {
  addCartLines,
  createCart,
  getCart,
  removeCartLines,
  updateCartLines,
  type Cart,
  type CartLineInput,
} from "@/lib/shopify";
import { CART_COOKIE } from "@/lib/constants";

async function getOrCreateCart(lines: CartLineInput[]): Promise<Cart> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (cartId) {
    const existing = await getCart(cartId);
    if (existing) {
      return addCartLines(cartId, lines);
    }
  }

  const cart = await createCart(lines);
  cookieStore.set(CART_COOKIE, cart.id, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return cart;
}

export async function getCurrentCart(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return getCart(cartId);
}

export async function addLineToCart(
  merchandiseId: string,
  quantity = 1,
  attributes?: { key: string; value: string }[]
): Promise<Cart> {
  return getOrCreateCart([{ merchandiseId, quantity, attributes }]);
}

export async function updateLineQuantity(lineId: string, quantity: number): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;

  if (quantity <= 0) {
    return removeCartLines(cartId, [lineId]);
  }
  return updateCartLines(cartId, [{ id: lineId, quantity }]);
}

export async function removeLineFromCart(lineId: string): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return removeCartLines(cartId, [lineId]);
}
