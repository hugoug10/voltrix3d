import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CubeTransparent } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-32 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-subtle text-fg-faint">
        <CubeTransparent size={22} weight="light" />
      </div>
      <h1 className="text-2xl font-medium text-fg">Página no encontrada</h1>
      <p className="max-w-sm text-sm text-fg-muted">
        Puede que el enlace esté roto o la página se haya movido.
      </p>
      <Button href="/" variant="outline" className="mt-2">
        Volver al inicio
      </Button>
    </Container>
  );
}
