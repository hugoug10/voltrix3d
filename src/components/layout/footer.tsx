import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { NAV_LINKS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={17} height={24} className="h-6 w-auto" />
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-fg">{SITE_NAME}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">{SITE_DESCRIPTION}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-faint">Tienda</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-faint">Contacto</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href="mailto:hola@voltrix3d.com"
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <EnvelopeSimple size={15} />
                hola@voltrix3d.com
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <InstagramLogo size={15} />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p>Impresion 3D bajo pedido, hecha en Espana.</p>
        </Container>
      </div>
    </footer>
  );
}
