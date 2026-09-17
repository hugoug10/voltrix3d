import Image from "next/image";
import Link from "next/link";
import { Price } from "./price";
import { Badge } from "@/components/ui/badge";
import type { ProductListItem } from "@/lib/shopify";

export function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Link href={`/tienda/${product.handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-bg-subtle">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-fg-faint">
            Sin imagen
          </div>
        )}
        {!product.availableForSale && (
          <Badge variant="neutral" className="absolute left-3 top-3 bg-surface/90">
            Agotado
          </Badge>
        )}
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-medium text-fg">{product.title}</h3>
          {product.productType && (
            <p className="mt-0.5 text-xs text-fg-faint">{product.productType}</p>
          )}
        </div>
        <Price
          amount={product.priceRange.minVariantPrice.amount}
          currencyCode={product.priceRange.minVariantPrice.currencyCode}
          className="shrink-0 text-sm text-fg-muted"
        />
      </div>
    </Link>
  );
}
