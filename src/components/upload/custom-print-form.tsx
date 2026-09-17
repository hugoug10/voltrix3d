"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { UploadDropzone } from "./upload-dropzone";
import { OptionCards } from "./option-cards";
import { ColorSelector } from "./color-selector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MATERIALS, INFILL_LEVELS, PRINT_COLORS } from "@/lib/constants";

type Status = "idle" | "uploading" | "success" | "error";

export function CustomPrintForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [materialId, setMaterialId] = useState<string>(MATERIALS[0].id);
  const [colorId, setColorId] = useState<string>(PRINT_COLORS[0].id);
  const [infillId, setInfillId] = useState<string>(INFILL_LEVELS[1].id);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setFileError("Sube un archivo .stl o .obj para continuar.");
      return;
    }

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("uploading");
    setErrorMessage(undefined);

    try {
      const uploadForm = new FormData();
      uploadForm.append("file", file);
      uploadForm.append("kind", "model");

      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error ?? "No se pudo subir el archivo.");

      const material = MATERIALS.find((m) => m.id === materialId)!;
      const color = PRINT_COLORS.find((c) => c.id === colorId)!;
      const infill = INFILL_LEVELS.find((i) => i.id === infillId)!;

      const res = await fetch("/api/custom-print-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          fileUrl: uploadData.url,
          fileName: uploadData.name,
          material: material.name,
          color: color.name,
          infill: infill.name,
          quantity,
        }),
      });
      if (!res.ok) throw new Error();

      setStatus("success");
      form.reset();
      setFile(null);
      setQuantity(1);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Algo salió mal, inténtalo de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent-soft px-5 py-4">
        <CheckCircle size={20} className="mt-0.5 shrink-0 text-accent" weight="fill" />
        <div>
          <p className="text-sm font-medium text-fg">Pedido recibido</p>
          <p className="mt-0.5 text-sm text-fg-muted">
            Revisaremos tu archivo y te confirmaremos el precio final y el plazo de entrega por
            email antes de imprimir nada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-[1fr_320px]" noValidate>
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
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
        <Input label="Nombre" name="name" autoComplete="name" required />
        <Input label="Email" name="email" type="email" autoComplete="email" required />
        <Textarea
          label="Notas para el estudio (opcional)"
          name="notes"
          hint="Indícanos tolerancias, uso de la pieza o cualquier detalle relevante."
          rows={4}
        />

        {status === "error" && (
          <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger" role="alert">
            <WarningCircle size={16} className="mt-0.5 shrink-0" />
            {errorMessage ?? "No se pudo enviar el pedido. Inténtalo de nuevo en unos minutos."}
          </div>
        )}

        <Button type="submit" size="lg" fullWidth disabled={status === "uploading"}>
          {status === "uploading" ? "Enviando pedido..." : "Enviar pedido"}
        </Button>
        <p className="text-center text-xs text-fg-faint">
          Sin pago todavía: te confirmamos el precio final por email antes de imprimir.
        </p>
      </div>
    </form>
  );
}
