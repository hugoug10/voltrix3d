const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2025-01";

export class ShopifyConfigError extends Error {}

function endpoint() {
  if (!domain || !token) {
    throw new ShopifyConfigError(
      "Faltan SHOPIFY_STORE_DOMAIN o SHOPIFY_STOREFRONT_ACCESS_TOKEN. Copia .env.example a .env.local y rellena las credenciales de tu tienda Shopify."
    );
  }
  return `https://${domain}/api/${apiVersion}/graphql.json`;
}

type ShopifyFetchOptions<TVariables> = {
  query: string;
  variables?: TVariables;
  tags?: string[];
  revalidate?: number | false;
  cache?: RequestCache;
};

export async function shopifyFetch<TResponse, TVariables = Record<string, unknown>>({
  query,
  variables,
  tags,
  revalidate,
  cache,
}: ShopifyFetchOptions<TVariables>): Promise<TResponse> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next:
      cache === undefined
        ? {
            tags,
            revalidate: revalidate ?? 60,
          }
        : undefined,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shopify Storefront API error (${res.status}): ${body}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Shopify Storefront API error: ${JSON.stringify(json.errors)}`);
  }

  return json.data as TResponse;
}

export function isShopifyConfigured() {
  return Boolean(domain && token);
}
