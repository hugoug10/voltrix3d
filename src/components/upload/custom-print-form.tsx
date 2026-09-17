"use client";

import { useMemo, useState } from "react";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { UploadDropzone } from "./upload-dropzone";
import { OptionCards } from "./option-cards";
import { ColorSelector } from "./color-selector";
import { EstimatePanel } from "./estimate-panel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { estimatePrice } from "@/lib/estimate";
import { addCustomPrintToCart } from "@/lib/cart/custom-print";
import { MATERIALS, INFILL_LEVELS, PRINT_COLORS } from "@/lib/constants";

type Status = "idle" | "uploading" | "error";

export function CustomPrintForm() {
  const { openCart } = useCart();

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [materialId, setMaterialId] = useState<string>(MATERIALS[0].id);
  const [colorId, setColorId] = useState<string>(PRINT_COLORS[0].id);
  const [infillId, setInfillId] = useState<string>(INFILL_LEVELS[1].id);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();

  const estimate = useMemo(
    () =>
      estimatePrice({
        fileSizeBytes: file?.size ?? 0,
        materialId,
        infillId,
        quantity,
      }),
    [file, materialId, infillId, quantity]
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file) {
      setFileError("Sube un archivo .stl o .obj para continuar.");
      return;
    }

    setStatus("uploading");
    setErrorMessage(undefined);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error ?? "No se pudo subir el archivo.");

      const material = MATERIALS.find((m) => m.id === materialId)!;
      const color = PRINT_COLORS.find((c) => c.id === colorId)!;
      const infill = INFILL_LEVELS.find((i) => i.id === infillId)!;

      await addCustomPrintToCart({
        fileUrl: uploadData.url,
        fileName: uploadData.name,
        materialName: material.name,
        colorName: color.name,
        infillName: infill.name,
        quantity,
        notes,
        tierOptionValue: estimate.tier.optionValue,
      });

      openCart();
      setStatus("idle");
      setFile(null);
      setNotes("");
      setQuantity(1);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Algo salio mal, intentalo de nuevo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="mb-2.5 text-sm font-medium text-fg">Tu modelo 3D</h2>
          <UploadDropzone
            file={file}
            error={fileError}
            onFileSelected={(selected, error) => {
              setFile(selected);
              setFileError(error);
            }}
          />
        </div>

        <OptionCards label="Material" options={MATERIALS} value={materialId} onChange={setMaterialId} />
        <ColorSelector value={colorId} onChange={setColorId} />
        <OptionCards
          label="Densidad de relleno"
          options={INFILL_LEVELS}
          value={infillId}
          onChange={setInfillId}
        />

        <div className="max-w-32">
          <label htmlFor="quantity" className="mb-1.5 block text-sm font-medium text-fg">
            Cantidad
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
            className="h-12 w-full rounded-lg border border-border-strong bg-surface px-3.5 text-[15px] text-fg outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <Textarea
          label="Notas para el estudio (opcional)"
          hint="Indicanos tolerancias, uso de la pieza o cualquier detalle relevante."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
        <EstimatePanel total={estimate.total} grams={estimate.grams} hasFile={Boolean(file)} />

        {status === "error" && errorMessage && (
          <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger" role="alert">
            <WarningCircle size={16} className="mt-0.5 shrink-0" />
            {errorMessage}
          </div>
        )}

        <Button type="submit" size="lg" fullWidth disabled={status === "uploading"}>
          {status === "uploading" ? "Subiendo diseno..." : "Anadir al carrito"}
        </Button>
        <p className="text-center text-xs text-fg-faint">
          Pagaras el importe estimado en el checkout de Shopify.
        </p>
      </div>
    </form>
  );
}
