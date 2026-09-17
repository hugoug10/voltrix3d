import { shopifyFetch, isShopifyConfigured } from "./client";
import {
  cartCreateMutation,
  cartLinesAddMutation,
  cartLinesRemoveMutation,
  cartLinesUpdateMutation,
} from "./mutations";
import { getCartQuery, getProductByHandleQuery, getProductsQuery, getProductTypesQuery } from "./queries";
import type {
  Cart,
  CartLine,
  Product,
  ProductListItem,
  ProductVariant,
  ShopifyConnection,
  ShopifyImage,
} from "./types";

export { isShopifyConfigured };
export type { Cart, Product, ProductListItem, ProductVariant, CartLine } from "./types";

type RawProduct = Omit<Product, "images" | "variants"> & {
  images: ShopifyConnection<ShopifyImage>;
  variants: ShopifyConnection<ProductVariant>;
};

type RawCart = Omit<Cart, "lines"> & {
  lines: ShopifyConnection<CartLine>;
};

type UserError = { field: string[] | null; message: string };

function unwrap<T>(connection: ShopifyConnection<T> | undefined | null): T[] {
  return connection?.edges.map((edge) => edge.node) ?? [];
}

function normalizeProduct(raw: RawProduct): Product {
  return {
    ...raw,
    images: unwrap(raw.images),
    variants: unwrap(raw.variants),
  };
}

function normalizeCart(raw: RawCart): Cart {
  return {
    ...raw,
    lines: unwrap(raw.lines),
  };
}

function assertNoErrors(userErrors: UserError[]) {
  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join(", "));
  }
}

export type ProductSortKey = "RELEVANCE" | "PRICE" | "CREATED_AT" | "TITLE" | "BEST_SELLING";

export async function getProducts(opts?: {
  query?: string;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  first?: number;
}): Promise<ProductListItem[]> {
  if (!isShopifyConfigured()) return [];
  const data = await shopifyFetch<{ products: ShopifyConnection<ProductListItem> }>({
    query: getProductsQuery,
    variables: {
      first: opts?.first ?? 48,
      query: opts?.query,
      sortKey: opts?.sortKey ?? "RELEVANCE",
      reverse: opts?.reverse ?? false,
    },
    tags: ["products"],
  });
  return unwrap(data.products);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured()) return null;
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: getProductByHandleQuery,
    variables: { handle },
    tags: [`product-${handle}`],
  });
  if (!data.product) return null;
  return normalizeProduct(data.product);
}

export async function getProductTypes(): Promise<string[]> {
  if (!isShopifyConfigured()) return [];
  const data = await shopifyFetch<{ productTypes: ShopifyConnection<string> }>({
    query: getProductTypesQuery,
    tags: ["product-types"],
  });
  return unwrap(data.productTypes);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (!isShopifyConfigured()) return null;
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: getCartQuery,
    variables: { cartId },
    cache: "no-store",
  });
  if (!data.cart) return null;
  return normalizeCart(data.cart);
}

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
  attributes?: { key: string; value: string }[];
};

export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: RawCart; userErrors: UserError[] } }>({
    query: cartCreateMutation,
    variables: { lines },
    cache: "no-store",
  });
  assertNoErrors(data.cartCreate.userErrors);
  return normalizeCart(data.cartCreate.cart);
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: RawCart; userErrors: UserError[] } }>({
    query: cartLinesAddMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });
  assertNoErrors(data.cartLinesAdd.userErrors);
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: RawCart; userErrors: UserError[] } }>({
    query: cartLinesUpdateMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });
  assertNoErrors(data.cartLinesUpdate.userErrors);
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: RawCart; userErrors: UserError[] } }>({
    query: cartLinesRemoveMutation,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  assertNoErrors(data.cartLinesRemove.userErrors);
  return normalizeCart(data.cartLinesRemove.cart);
}
