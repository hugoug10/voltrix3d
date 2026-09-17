import type { Metadata } from "next";
import { CubeTransparent, ImageSquare } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeasibilityForm } from "@/components/upload/feasibility-form";
import { CustomPrintForm } from "@/components/upload/custom-print-form";

export const metadata: Metadata = {
  title: "Imprime tu diseno",
  description: "Sube tu modelo 3D en STL u OBJ, elige material y color, y recibe un presupuesto al instante.",
};

export default function ImprimeTuDisenoPage() {
  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading
        eyebrow="Impresion bajo pedido"
        title="Imprime tu diseno"
        description="Ya tengas un archivo listo para imprimir o solo una idea, tenemos un camino para ti."
      />

      <div className="mt-14 flex flex-col gap-6 rounded-2xl border border-border bg-bg-subtle p-6 sm:p-8">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <ImageSquare size={19} weight="light" />
          </div>
          <div>
            <h2 className="text-base font-medium text-fg">¿No tienes un modelo 3D todavia?</h2>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">
              Sube una foto o un PDF de referencia de lo que quieres, y te decimos si podemos
              fabricarlo y un presupuesto orientativo antes de modelarlo.
            </p>
          </div>
        </div>

        <FeasibilityForm />
      </div>

      <div className="my-12 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.14em] text-fg-faint">
        <span className="h-px flex-1 bg-border" />
        o
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CubeTransparent size={19} weight="light" />
        </div>
        <div>
          <h2 className="text-base font-medium text-fg">¿Ya tienes tu archivo .stl u .obj?</h2>
          <p className="mt-1 text-sm leading-relaxed text-fg-muted">
            Adjuntalo aqui abajo para ahorrar tiempo: elige acabado y te damos un presupuesto
            al instante, sin esperar revision.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <CustomPrintForm />
      </div>
    </Container>
  );
}
