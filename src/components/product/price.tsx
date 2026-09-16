import { formatMoney } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Price({
  amount,
  currencyCode,
  compareAtAmount,
  className,
}: {
  amount: string;
  currencyCode: string;
  compareAtAmount?: string | null;
  className?: string;
}) {
  const hasDiscount = compareAtAmount && parseFloat(compareAtAmount) > parseFloat(amount);
  return (
    <span className={cn("inline-flex items-baseline gap-2 tabular-nums", className)}>
      <span>{formatMoney(amount, currencyCode)}</span>
      {hasDiscount && (
        <span className="text-sm text-fg-faint line-through">
          {formatMoney(compareAtAmount!, currencyCode)}
        </span>
      )}
    </span>
  );
}
