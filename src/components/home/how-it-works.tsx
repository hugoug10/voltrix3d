import { CloudArrowUp, Palette, Calculator, Package } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: CloudArrowUp,
    title: "Sube tu modelo",
    description: "Arrastra tu archivo .STL o .OBJ. Aceptamos disenos propios o descargados.",
  },
  {
    icon: Palette,
    title: "Elige acabado",
    description: "Selecciona material, color y densidad de relleno segun el uso de la pieza.",
  },
  {
    icon: Calculator,
    title: "Presupuesto al instante",
    description: "Calculamos un precio estimado por volumen y material antes de pagar.",
  },
  {
    icon: Package,
    title: "Imprimimos y enviamos",
    description: "Fabricamos tu pieza y la recibes en tu puerta en pocos dias.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-bg-subtle py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Sube tu diseno, nosotros lo imprimimos"
          description="Un flujo pensado para creadores, makers y estudios que necesitan piezas concretas sin invertir en una impresora."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-border">
                  <step.icon size={19} weight="light" />
                </div>
                <span className="text-xs font-medium tabular-nums text-fg-faint">
                  0{index + 1}
                </span>
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-fg">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/imprime-tu-diseno" variant="secondary">
            Empezar mi pedido
          </Button>
        </div>
      </Container>
    </section>
  );
}
