import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { MATERIALS, PRINT_COLORS } from "@/lib/constants";

export function MaterialsShowcase() {
  return (
    <section className="border-t border-white/10 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Acabados"
          title="Elige material y color para tu pieza"
          description="Los mismos acabados que usamos en el estudio, disponibles para tu diseño personalizado."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {MATERIALS.map((material) => (
              <div
                key={material.id}
                className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
              >
                <h3 className="text-sm font-medium text-fg">{material.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {material.description}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-bg-subtle p-6">
            <h3 className="text-sm font-medium text-fg">Colores disponibles</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {PRINT_COLORS.map((color) => (
                <div key={color.id} className="flex flex-col items-center gap-1.5">
                  <span
                    className="h-9 w-9 rounded-full ring-1 ring-inset ring-border-strong"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden
                  />
                  <span className="text-center text-[11px] leading-tight text-fg-faint">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
            <Button href="/imprime-tu-diseno" variant="outline" size="sm" className="mt-6" fullWidth>
              Empezar mi pedido
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
