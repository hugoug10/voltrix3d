import type { MetadataRoute } from "next";
import { getProducts, isShopifyConfigured } from "@/lib/shopify";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tienda`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/imprime-tu-diseno`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "yearly", priority: 0.3 },
  ];

  if (!isShopifyConfigured()) return staticRoutes;

  const products = await getProducts({ first: 250 });
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/tienda/${product.handle}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
