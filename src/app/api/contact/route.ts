import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.message || !body?.name) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  // TODO: conecta aqui un proveedor de email (p.ej. Resend) para reenviar
  // este mensaje a tu buzon. Por ahora la peticion se acepta sin enviar nada.
  console.log("Nuevo mensaje de contacto:", body);

  return NextResponse.json({ ok: true });
}
