import type { Metadata } from "next";
import { MapPin, Clock, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos para presupuestos a medida, colaboraciones o dudas sobre tu pedido.",
};

export default function ContactoPage() {
  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading
        eyebrow="Sobre nosotros"
        title="Un estudio pequeño, piezas hechas con cuidado"
        description="Voltrix3D nace de la idea de acercar la fabricación digital a quien tiene un diseño pero no una impresora. Cada pieza pasa por nuestras manos antes de salir del taller."
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-sm font-medium text-fg">Hablemos de tu proyecto</h2>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Responde este formulario y te contactamos en menos de 48h laborables.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <EnvelopeSimple size={18} weight="light" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-fg">Email</h3>
              <a
                href="mailto:hola@voltrix3d.com"
                className="mt-1 block text-sm text-fg-muted transition-colors hover:text-fg"
              >
                hola@voltrix3d.com
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <MapPin size={18} weight="light" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-fg">Taller</h3>
              <p className="mt-1 text-sm text-fg-muted">Valencia, España</p>
              <p className="text-sm text-fg-muted">Envíos a toda la Península y Baleares</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Clock size={18} weight="light" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-fg">Horario de respuesta</h3>
              <p className="mt-1 text-sm text-fg-muted">Lunes a viernes, 9:00&ndash;18:00</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
