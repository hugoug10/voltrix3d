"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required to avoid SSR/client theme mismatch
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("h-10 w-10", className)} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors duration-150 hover:bg-surface-hover hover:text-fg",
        className
      )}
    >
      {isDark ? <Sun size={19} weight="light" /> : <Moon size={19} weight="light" />}
    </button>
  );
}
