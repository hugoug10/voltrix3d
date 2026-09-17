import { Ruler, Leaf, Truck } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";

const VALUES = [
  {
    icon: Ruler,
    title: "Precisión de estudio",
    description: "Tolerancias ajustadas y postprocesado cuidado en cada pieza que sale del taller.",
  },
  {
    icon: Leaf,
    title: "Materiales responsables",
    description: "PLA y PETG de origen vegetal cuando es posible, con desperdicio mínimo de filamento.",
  },
  {
    icon: Truck,
    title: "Producción local",
    description: "Fabricado bajo pedido en España, sin stock innecesario ni sobreproducción.",
  },
];

export function ValueProps() {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <Container className="grid gap-10 sm:grid-cols-3">
        {VALUES.map((value) => (
          <div key={value.title} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <value.icon size={18} weight="light" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-fg">{value.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{value.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
