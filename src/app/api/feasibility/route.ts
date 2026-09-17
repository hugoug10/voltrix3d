import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.name || !body?.fileUrl) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  // TODO: conecta aqui un proveedor de email (p.ej. Resend) para reenviar
  // esta solicitud de viabilidad a tu buzon. Por ahora se acepta sin enviar nada.
  console.log("Nueva solicitud de viabilidad:", body);

  return NextResponse.json({ ok: true });
}
