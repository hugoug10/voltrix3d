import { cn } from "@/lib/utils";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { forwardRef, type SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, id, className, children, required, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-fg">
            {label}
            {required && <span className="ml-0.5 text-danger">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            required={required}
            className={cn(
              "h-12 w-full appearance-none rounded-lg border border-border-strong bg-surface pl-3.5 pr-10 text-[15px] text-fg",
              "transition-colors duration-150 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <CaretDown
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-fg-muted"
            size={16}
            aria-hidden="true"
          />
        </div>
        {hint && (
          <p id={`${inputId}-hint`} className="text-xs text-fg-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
