"use client";

import { useRef, useState, type DragEvent, type ElementType } from "react";
import { CubeTransparent, FileArrowUp, X } from "@phosphor-icons/react/dist/ssr";
import { ACCEPTED_MODEL_EXTENSIONS, MAX_UPLOAD_SIZE_MB } from "@/lib/constants";
import { cn } from "@/lib/utils";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadDropzone({
  file,
  onFileSelected,
  error,
  acceptedExtensions = ACCEPTED_MODEL_EXTENSIONS,
  maxSizeMB = MAX_UPLOAD_SIZE_MB,
  icon: Icon = CubeTransparent,
  helperText,
}: {
  file: File | null;
  onFileSelected: (file: File | null, error?: string) => void;
  error?: string;
  acceptedExtensions?: readonly string[];
  maxSizeMB?: number;
  icon?: ElementType;
  helperText?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function validateAndSet(candidate: File) {
    const extension = `.${candidate.name.split(".").pop()?.toLowerCase()}`;
    if (!acceptedExtensions.includes(extension)) {
      onFileSelected(null, `Formato no soportado. Usa ${acceptedExtensions.join(", ")}.`);
      return;
    }
    if (candidate.size > maxSizeMB * 1024 * 1024) {
      onFileSelected(null, `El archivo supera el limite de ${maxSizeMB}MB.`);
      return;
    }
    onFileSelected(candidate);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) validateAndSet(dropped);
  }

  if (file) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-border-strong bg-surface p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <Icon size={20} weight="light" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-fg">{file.name}</p>
          <p className="text-xs text-fg-muted">{formatSize(file.size)}</p>
        </div>
        <button
          type="button"
          onClick={() => onFileSelected(null)}
          aria-label="Quitar archivo"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-fg-faint transition-colors hover:bg-surface-hover hover:text-fg"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors duration-150",
          dragging ? "border-accent bg-accent-soft" : "border-border-strong hover:border-fg-muted",
          error && "border-danger"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-subtle text-fg-muted">
          <FileArrowUp size={22} weight="light" />
        </div>
        <div>
          <p className="text-sm font-medium text-fg">
            Arrastra tu archivo aquí o haz clic para buscarlo
          </p>
          <p className="mt-1 text-xs text-fg-muted">
            {helperText ?? `${acceptedExtensions.join(" / ").toUpperCase()} · hasta ${maxSizeMB}MB`}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={acceptedExtensions.join(",")}
          className="sr-only"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) validateAndSet(selected);
          }}
        />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
