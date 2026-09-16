"use client";

import { Check } from "@phosphor-icons/react/dist/ssr";
import { PRINT_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ColorSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const selectedColor = PRINT_COLORS.find((c) => c.id === value);

  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-medium text-fg">
        Color
        {selectedColor && <span className="ml-2 font-normal text-fg-muted">{selectedColor.name}</span>}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {PRINT_COLORS.map((color) => {
          const selected = value === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onChange(color.id)}
              aria-pressed={selected}
              aria-label={color.name}
              title={color.name}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-border transition-shadow duration-150",
                selected && "ring-2 ring-fg ring-offset-2 ring-offset-bg"
              )}
              style={{ backgroundColor: color.hex }}
            >
              {selected && (
                <Check
                  size={15}
                  weight="bold"
                  className={color.hex === "#F2F1EC" || color.hex === "#E4E2DC" ? "text-fg" : "text-white"}
                />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
