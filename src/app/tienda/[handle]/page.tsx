import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { getProductByHandle, isShopifyConfigured } from "@/lib/shopify";

type Params = Promise<{ handle: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { handle } = await params;
  const product = isShopifyConfigured() ? await getProductByHandle(handle) : null;

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: product.title,
    description: product.description || undefined,
    openGraph: product.featuredImage
      ? { images: [{ url: product.featuredImage.url }] }
      : undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params;

  if (!isShopifyConfigured()) {
    return (
      <Container className="py-24 text-center">
        <p className="text-sm font-medium text-fg">Conecta tu tienda Shopify</p>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-fg-muted">
          Configura las credenciales de la Storefront API en .env.local para ver este producto.
        </p>
      </Container>
    );
  }

  const product = await getProductByHandle(handle);
  if (!product) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} title={product.title} />

        <div className="lg:sticky lg:top-24 lg:self-start">
          {product.productType && (
            <Badge variant="neutral" className="mb-4">
              {product.productType}
            </Badge>
          )}
          <h1 className="text-3xl font-medium text-fg sm:text-4xl">{product.title}</h1>

          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>

          {product.description && (
            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-sm font-medium text-fg">Descripcion</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-fg-muted">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
