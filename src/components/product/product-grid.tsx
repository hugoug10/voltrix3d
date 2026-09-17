import { ProductCard } from "./product-card";
import type { ProductListItem } from "@/lib/shopify";

export function ProductGrid({ products }: { products: ProductListItem[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border-strong py-24 text-center">
        <p className="text-sm font-medium text-fg">No hay productos que coincidan</p>
        <p className="text-sm text-fg-muted">Prueba a cambiar los filtros o vuelve mas tarde.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
