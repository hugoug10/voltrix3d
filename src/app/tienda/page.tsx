import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { StoreFilters } from "@/components/product/store-filters";
import { getProducts, getProductTypes, isShopifyConfigured, type ProductSortKey } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Piezas de diseno propio impresas en 3D: decoracion, gadgets y objetos funcionales.",
};

const SORT_MAP: Record<string, { sortKey: ProductSortKey; reverse: boolean }> = {
  featured: { sortKey: "RELEVANCE", reverse: false },
  "price-asc": { sortKey: "PRICE", reverse: false },
  "price-desc": { sortKey: "PRICE", reverse: true },
  newest: { sortKey: "CREATED_AT", reverse: true },
};

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; orden?: string }>;
}) {
  const params = await searchParams;
  const configured = isShopifyConfigured();
  const sort = SORT_MAP[params.orden ?? "featured"] ?? SORT_MAP.featured;

  const [products, productTypes] = configured
    ? await Promise.all([
        getProducts({
          query: params.categoria ? `product_type:${JSON.stringify(params.categoria)}` : undefined,
          sortKey: sort.sortKey,
          reverse: sort.reverse,
        }),
        getProductTypes(),
      ])
    : [[], []];

  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading
        eyebrow="Catalogo"
        title="Tienda"
        description="Piezas listas para pedir, disenadas y fabricadas en el estudio."
      />

      <div className="mt-10 flex flex-col gap-8">
        <StoreFilters productTypes={productTypes} />

        {!configured ? (
          <div className="rounded-xl border border-dashed border-border-strong py-24 text-center">
            <p className="text-sm font-medium text-fg">Conecta tu tienda Shopify</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-fg-muted">
              Configura SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN en .env.local para
              sincronizar el catalogo real de tu tienda.
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </Container>
  );
}
