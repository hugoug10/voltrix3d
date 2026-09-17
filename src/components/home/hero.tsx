import Image from "next/image";
import { ArrowRight, CubeFocus, Package, Ruler, UploadSimple } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const SPECS = [
  { icon: Ruler, label: "Resolución", value: "0.1 – 0.2 mm por capa" },
  { icon: CubeFocus, label: "Materiales", value: "PLA, PETG, ABS, TPU" },
  { icon: Package, label: "Entrega", value: "Fabricado bajo pedido" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ backgroundImage: "var(--gradient-brand)" }}
      />

      <Container className="relative grid gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-7">
          <h1
            className="animate-fade-up text-balance text-4xl font-medium leading-[1.08] text-fg sm:text-5xl lg:text-6xl"
          >
            Del archivo digital a la pieza en tus manos.
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-lg text-lg leading-relaxed text-fg-muted"
            style={{ animationDelay: "120ms" }}
          >
            Diseñamos y fabricamos piezas propias, y damos forma a tus propios modelos 3D
            con materiales de precisión. Sube tu archivo, elige acabado, y recíbelo impreso.
          </p>
          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <Button href="/tienda" size="lg">
              Ver la tienda
              <ArrowRight size={17} />
            </Button>
            <Button href="/imprime-tu-diseno" variant="outline" size="lg">
              <UploadSimple size={17} />
              Imprime tu diseño
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className="animate-fade-up relative mx-auto flex max-w-sm flex-col items-center gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-8 text-center shadow-md"
            style={{ animationDelay: "160ms" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 h-48 w-48 rounded-full opacity-25 blur-2xl"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            />
            <Image
              src="/logo.png"
              alt="Voltrix3D"
              width={80}
              height={112}
              priority
              className="relative h-24 w-auto drop-shadow-sm sm:h-28"
            />
            <div className="relative flex w-full flex-col gap-3 border-t border-border pt-5">
              {SPECS.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between gap-3 text-left">
                  <span className="flex items-center gap-2 text-xs text-fg-faint">
                    <spec.icon size={15} weight="light" />
                    {spec.label}
                  </span>
                  <span className="text-xs font-medium text-fg">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
