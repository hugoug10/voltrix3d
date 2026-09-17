import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";
import { Button } from "@/components/ui/button";

const portalStyle: GlyphPortalStyle = {
  "--gp-paper": "var(--color-bg-subtle)",
  "--gp-ink": "var(--color-fg)",
  "--gp-field": "#0b1426",
  "--gp-foreground": "#f6f8fb",
};

const STEPS = [
  { no: "01", title: "Sube tu archivo", copy: "Un .STL, un .OBJ, o incluso una foto de referencia si aún no tienes el modelo." },
  { no: "02", title: "Elige acabado", copy: "Material, color y densidad de relleno según el uso que le vayas a dar a la pieza." },
  { no: "03", title: "Confirmamos el precio", copy: "Revisamos tu archivo y te decimos precio y plazo por email antes de imprimir nada." },
];

export function PrintPortal() {
  return (
    <GlyphPortal
      word="VOLTRIX"
      focusChar="O"
      scrollLength={2.2}
      fontFamily='var(--font-space-grotesk), "Arial Black", sans-serif'
      fontWeight={700}
      enterLabel="Entrar"
      style={portalStyle}
      background={
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1642969164999-979483e21601?q=80&w=1600&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-[#0b1426]/55" />
        </div>
      }
      front={
        <>
          <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-4 sm:inset-x-10 sm:top-8">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="" width={17} height={24} className="h-6 w-auto" />
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">Voltrix3D</span>
            </div>
            <span className="hidden text-xs text-white/70 sm:block">Impresión bajo pedido</span>
          </div>

          <p
            className="absolute inset-x-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-white/70"
            style={{ top: "calc(var(--gp-word-top, 30%) - 2.5rem)" }}
          >
            Tu diseño, hecho pieza real
          </p>
          <p
            className="absolute inset-x-6 text-center text-sm text-white/80 sm:text-base"
            style={{ top: "calc(var(--gp-word-bottom, 60%) + 1.25rem)" }}
          >
            Sube tu archivo, elige acabado y te confirmamos el precio.
          </p>
        </>
      }
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <h2 className="max-w-2xl text-balance text-3xl font-medium leading-tight sm:text-4xl">
          De tu archivo a una pieza real, sin sorpresas.
        </h2>

        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.no} className="border-t border-white/20 pt-4">
              <span className="mb-1 block font-mono text-xs tracking-[0.08em] text-white/60">{step.no}</span>
              <h3 className="text-base font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{step.copy}</p>
            </div>
          ))}
        </div>

        <Button href="/imprime-tu-diseno" size="lg" className="self-start bg-white text-[#0b1426] hover:bg-white/90">
          Imprime tu diseño
          <ArrowRight size={17} />
        </Button>
      </div>
    </GlyphPortal>
  );
}
