"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, FileText, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { UploadDropzone } from "./upload-dropzone";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ACCEPTED_REFERENCE_EXTENSIONS, MAX_REFERENCE_UPLOAD_SIZE_MB } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

export function FeasibilityForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setFileError("Sube una foto o un PDF de referencia para continuar.");
      return;
    }

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrorMessage(undefined);

    try {
      const uploadForm = new FormData();
      uploadForm.append("file", file);
      uploadForm.append("kind", "reference");

      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error ?? "No se pudo subir el archivo.");

      const res = await fetch("/api/feasibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fileUrl: uploadData.url, fileName: uploadData.name }),
      });
      if (!res.ok) throw new Error();

      setStatus("success");
      form.reset();
      setFile(null);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Algo salio mal, intentalo de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent-soft px-5 py-4">
        <CheckCircle size={20} className="mt-0.5 shrink-0 text-accent" weight="fill" />
        <div>
          <p className="text-sm font-medium text-fg">Solicitud enviada</p>
          <p className="mt-0.5 text-sm text-fg-muted">
            Revisaremos tu foto o PDF y te contestaremos por email para confirmarte si podemos
            fabricar la pieza y un presupuesto orientativo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <UploadDropzone
        file={file}
        error={fileError}
        acceptedExtensions={ACCEPTED_REFERENCE_EXTENSIONS}
        maxSizeMB={MAX_REFERENCE_UPLOAD_SIZE_MB}
        icon={FileText}
        helperText={`JPG, PNG o PDF · hasta ${MAX_REFERENCE_UPLOAD_SIZE_MB}MB`}
        onFileSelected={(selected, error) => {
          setFile(selected);
          setFileError(error);
        }}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Nombre" name="name" autoComplete="name" required />
        <Input label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Textarea
        label="Cuentanos que necesitas (opcional)"
        name="message"
        hint="Medidas aproximadas, para que se usara la pieza, referencias, etc."
        rows={3}
      />

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-danger" role="alert">
          <WarningCircle size={16} />
          {errorMessage ?? "No se pudo enviar la solicitud. Intentalo de nuevo en unos minutos."}
        </div>
      )}

      <Button type="submit" disabled={status === "submitting"} size="lg">
        {status === "submitting" ? "Enviando..." : "Enviar para revision"}
      </Button>
    </form>
  );
}
