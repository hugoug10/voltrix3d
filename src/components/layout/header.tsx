"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CartButton } from "@/components/cart/cart-button";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between sm:h-18">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[-0.01em] text-fg"
          onClick={() => setMobileOpen(false)}
        >
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm font-medium text-fg-muted transition-colors duration-150 hover:text-fg",
                  active && "text-fg"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle className="hidden sm:flex" />
          <CartButton />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg md:hidden"
          >
            {mobileOpen ? <X size={19} weight="light" /> : <List size={19} weight="light" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-[15px] font-medium text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg",
                  pathname === link.href && "bg-surface-hover text-fg"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border px-3 pt-4">
              <span className="text-sm text-fg-muted">Modo de color</span>
              <ThemeToggle />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
