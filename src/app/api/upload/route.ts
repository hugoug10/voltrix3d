import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import {
  ACCEPTED_MODEL_EXTENSIONS,
  ACCEPTED_REFERENCE_EXTENSIONS,
  MAX_REFERENCE_UPLOAD_SIZE_MB,
  MAX_UPLOAD_SIZE_MB,
} from "@/lib/constants";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  const kind = form.get("kind") === "reference" ? "reference" : "model";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se ha recibido ningun archivo." }, { status: 400 });
  }

  const acceptedExtensions = kind === "reference" ? ACCEPTED_REFERENCE_EXTENSIONS : ACCEPTED_MODEL_EXTENSIONS;
  const maxSizeMB = kind === "reference" ? MAX_REFERENCE_UPLOAD_SIZE_MB : MAX_UPLOAD_SIZE_MB;
  const folder = kind === "reference" ? "referencias" : "disenos";

  const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!acceptedExtensions.includes(extension)) {
    return NextResponse.json(
      { error: `Formato no soportado. Usa ${acceptedExtensions.join(", ")}.` },
      { status: 400 }
    );
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return NextResponse.json(
      { error: `El archivo supera el limite de ${maxSizeMB}MB.` },
      { status: 400 }
    );
  }

  const blob = await put(`${folder}/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url, size: file.size, name: file.name });
}
