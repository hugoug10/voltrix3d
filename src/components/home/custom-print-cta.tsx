import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CustomPrintCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div
          className="flex flex-col items-start gap-8 rounded-2xl px-8 py-14 sm:px-14 lg:flex-row lg:items-center lg:justify-between"
          style={{ backgroundImage: "var(--gradient-brand)" }}
        >
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
              Impresión bajo pedido
            </p>
            <h2 className="text-balance text-3xl font-medium text-white sm:text-4xl">
              ¿Ya tienes tu propio diseño? Imprímelo con nosotros.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Prototipos, piezas de repuesto, gadgets o encargos para otros makers: sube tu
              archivo y te confirmamos el precio antes de imprimir.
            </p>
          </div>
          <Button
            href="/imprime-tu-diseno"
            size="lg"
            className="shrink-0 bg-white text-[#0f1724] hover:bg-white/90"
          >
            Subir mi diseño
            <ArrowRight size={17} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
