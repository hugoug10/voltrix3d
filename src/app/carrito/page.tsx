import type { Metadata } from "next";
import { ShoppingBag, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/product/price";
import { CartLinesList } from "./cart-lines-list";
import { getCurrentCart } from "@/lib/cart/actions";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisa tu pedido antes de pasar al checkout seguro de Shopify.",
};

export default async function CarritoPage() {
  const cart = await getCurrentCart();
  const lines = cart?.lines ?? [];

  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading title="Carrito" />

      {lines.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border-strong py-24 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-subtle text-fg-faint">
            <ShoppingBag size={22} weight="light" />
          </div>
          <p className="text-sm text-fg-muted">Tu carrito esta vacio por ahora.</p>
          <Button href="/tienda" variant="outline">
            Ver la tienda
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
          <CartLinesList />

          <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-sm font-medium text-fg">Resumen</h2>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-fg-muted">Subtotal</span>
              <Price
                amount={cart!.cost.subtotalAmount.amount}
                currencyCode={cart!.cost.subtotalAmount.currencyCode}
                className="font-medium text-fg"
              />
            </div>
            <p className="mt-2 text-xs text-fg-faint">
              Impuestos y envio se calculan en el checkout.
            </p>
            <Button href={cart!.checkoutUrl} fullWidth className="mt-6">
              Finalizar compra
              <ArrowRight size={16} />
            </Button>
          </aside>
        </div>
      )}
    </Container>
  );
}
