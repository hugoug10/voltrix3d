import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
        description="Sube tu archivo, elige acabado y te damos un presupuesto estimado al momento. Revisamos cada modelo antes de imprimir."
      />

      <div className="mt-12">
        <CustomPrintForm />
      </div>
    </Container>
  );
}
