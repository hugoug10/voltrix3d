import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CustomPrintCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start gap-8 rounded-2xl border border-border bg-fg px-8 py-14 sm:px-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-bg/60">
              Impresion bajo pedido
            </p>
            <h2 className="text-balance text-3xl font-medium text-bg sm:text-4xl">
              ¿Ya tienes tu propio diseno? Imprimelo con nosotros.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bg/70">
              Prototipos, piezas de repuesto, gadgets o encargos para otros makers: sube tu
              archivo y te damos un presupuesto al instante.
            </p>
          </div>
          <Button href="/imprime-tu-diseno" size="lg" className="shrink-0">
            Subir mi diseno
            <ArrowRight size={17} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
