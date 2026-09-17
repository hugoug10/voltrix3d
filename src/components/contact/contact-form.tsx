"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent-soft px-5 py-4">
        <CheckCircle size={20} className="mt-0.5 shrink-0 text-accent" weight="fill" />
        <div>
          <p className="text-sm font-medium text-fg">Mensaje enviado</p>
          <p className="mt-0.5 text-sm text-fg-muted">
            Gracias por escribirnos, te responderemos lo antes posible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <Input label="Nombre" name="name" autoComplete="name" required />
      <Input label="Email" name="email" type="email" autoComplete="email" required />
      <Textarea label="Mensaje" name="message" rows={5} required />

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-danger" role="alert">
          <WarningCircle size={16} />
          No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.
        </div>
      )}

      <Button type="submit" disabled={status === "submitting"} size="lg">
        {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
