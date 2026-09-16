import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { ACCEPTED_MODEL_EXTENSIONS, MAX_UPLOAD_SIZE_MB } from "@/lib/constants";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se ha recibido ningun archivo." }, { status: 400 });
  }

  const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!ACCEPTED_MODEL_EXTENSIONS.includes(extension)) {
    return NextResponse.json(
      { error: `Formato no soportado. Usa ${ACCEPTED_MODEL_EXTENSIONS.join(" o ")}.` },
      { status: 400 }
    );
  }

  if (file.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
    return NextResponse.json(
      { error: `El archivo supera el limite de ${MAX_UPLOAD_SIZE_MB}MB.` },
      { status: 400 }
    );
  }

  const blob = await put(`disenos/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url, size: file.size, name: file.name });
}
