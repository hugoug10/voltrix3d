import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { getProducts, isShopifyConfigured } from "@/lib/shopify";

export async function FeaturedProducts() {
  const configured = isShopifyConfigured();
  const products = configured ? await getProducts({ first: 8 }) : [];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Catálogo"
            title="Piezas de diseño propio"
            description="Objetos y gadgets diseñados y fabricados en el estudio, listos para pedir."
          />
          <Link
            href="/tienda"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            Ver todo <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-12">
          {!configured ? (
            <div className="rounded-xl border border-dashed border-border-strong py-20 text-center">
              <p className="text-sm font-medium text-fg">Conecta tu tienda Shopify</p>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-fg-muted">
                Configura las variables SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN en
                .env.local para sincronizar tu catálogo aquí.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border-strong py-20 text-center">
              <p className="text-sm font-medium text-fg">Todavía no hay productos publicados</p>
              <p className="mt-1.5 text-sm text-fg-muted">
                Añade productos desde tu panel de Shopify para verlos aquí.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
