"use client";

import { cn } from "@/lib/utils";

type Option = {
  id: string;
  name: string;
  description: string;
};

export function OptionCards({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly Option[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-medium text-fg">{label}</legend>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={selected}
              className={cn(
                "flex flex-col items-start gap-0.5 rounded-lg border px-4 py-3 text-left transition-colors duration-150",
                selected
                  ? "border-fg bg-fg text-bg"
                  : "border-border-strong text-fg hover:border-fg-muted"
              )}
            >
              <span className="text-sm font-medium">{option.name}</span>
              <span className={cn("text-xs", selected ? "text-bg/70" : "text-fg-muted")}>
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
