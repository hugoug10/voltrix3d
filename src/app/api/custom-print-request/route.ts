import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.name || !body?.fileUrl) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  // TODO: conecta aquí un proveedor de email (p.ej. Resend) para reenviar
  // este pedido a tu buzón. Por ahora se acepta sin enviar nada.
  console.log("Nuevo pedido de impresión personalizada:", body);

  return NextResponse.json({ ok: true });
}
