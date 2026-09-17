import { ArrowRight, UploadSimple } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const LAYERS = [
  { width: "100%", tone: "bg-bg-subtle" },
  { width: "88%", tone: "bg-bg-subtle" },
  { width: "94%", tone: "bg-accent-soft" },
  { width: "76%", tone: "bg-bg-subtle" },
  { width: "100%", tone: "bg-accent" },
  { width: "82%", tone: "bg-bg-subtle" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-7">
          <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-border-strong px-3.5 py-1.5 text-xs font-medium tracking-wide text-fg-muted">
            Estudio de impresion 3D
          </p>
          <h1
            className="animate-fade-up text-balance text-4xl font-medium leading-[1.08] text-fg sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            Del archivo digital a la pieza en tus manos.
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-lg text-lg leading-relaxed text-fg-muted"
            style={{ animationDelay: "120ms" }}
          >
            Disenamos y fabricamos piezas propias, y damos forma a tus propios modelos 3D
            con materiales de precision. Sube tu archivo, elige acabado, y recibelo impreso.
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
              Imprime tu diseno
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="animate-fade-up mx-auto flex max-w-sm flex-col gap-2.5 rounded-2xl border border-border bg-surface p-6 shadow-sm" style={{ animationDelay: "160ms" }}>
            {LAYERS.map((layer, index) => (
              <div
                key={index}
                className={`h-4 rounded-full ${layer.tone}`}
                style={{ width: layer.width }}
              />
            ))}
            <p className="mt-3 text-xs text-fg-faint">
              Impresion capa a capa &middot; 0.1&ndash;0.2mm de resolucion
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
