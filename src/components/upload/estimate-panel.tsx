import { Info } from "@phosphor-icons/react/dist/ssr";
import { formatMoney } from "@/lib/utils";

export function EstimatePanel({
  total,
  grams,
  hasFile,
}: {
  total: number;
  grams: number;
  hasFile: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-subtle p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-fg-muted">Presupuesto estimado</span>
        <span className="text-2xl tabular-nums text-fg">
          {hasFile ? formatMoney(total, "EUR") : "—"}
        </span>
      </div>
      {hasFile && <p className="mt-1 text-xs text-fg-faint">&asymp; {grams}g de material estimados</p>}
      <div className="mt-3 flex items-start gap-2 border-t border-border pt-3">
        <Info size={14} className="mt-0.5 shrink-0 text-fg-faint" />
        <p className="text-xs leading-relaxed text-fg-faint">
          Estimacion aproximada segun el tamano del archivo. Confirmamos el precio exacto tras
          revisar tu modelo; si cambia, te avisamos antes de imprimir.
        </p>
      </div>
    </div>
  );
}
