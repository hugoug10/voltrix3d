export const SITE_NAME = "Voltrix3D";
export const SITE_DESCRIPTION =
  "Estudio de impresión 3D: piezas y objetos de diseño propio, e impresión bajo pedido a partir de tu propio modelo.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const NAV_LINKS = [
  { href: "/tienda", label: "Tienda" },
  { href: "/imprime-tu-diseno", label: "Imprime tu diseño" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const MATERIALS = [
  {
    id: "pla",
    name: "PLA",
    description: "Rígido, gran acabado, ideal para decoración y piezas visuales.",
    priceMultiplier: 1,
  },
  {
    id: "petg",
    name: "PETG",
    description: "Resistente a impactos y humedad, buen equilibrio para uso diario.",
    priceMultiplier: 1.25,
  },
  {
    id: "abs",
    name: "ABS",
    description: "Mayor resistencia térmica, apto para piezas funcionales.",
    priceMultiplier: 1.3,
  },
  {
    id: "tpu",
    name: "TPU flexible",
    description: "Flexible y elástico, pensado para fundas y piezas con movimiento.",
    priceMultiplier: 1.6,
  },
] as const;

export const PRINT_COLORS = [
  { id: "blanco", name: "Blanco roto", hex: "#F2F1EC" },
  { id: "negro", name: "Negro grafito", hex: "#232320" },
  { id: "gris", name: "Gris piedra", hex: "#9A9A92" },
  { id: "salvia", name: "Verde salvia", hex: "#66735F" },
  { id: "terracota", name: "Terracota", hex: "#B5714A" },
  { id: "natural", name: "Natural translúcido", hex: "#E4E2DC" },
] as const;

export const INFILL_LEVELS = [
  { id: "light", name: "Ligero (15%)", description: "Decorativo, menor coste.", multiplier: 0.85 },
  { id: "standard", name: "Estándar (35%)", description: "Equilibrio resistencia/precio.", multiplier: 1 },
  { id: "strong", name: "Reforzado (60%)", description: "Piezas funcionales o de uso frecuente.", multiplier: 1.35 },
] as const;

export const CART_COOKIE = "voltrix3d_cart_id";

export const ACCEPTED_MODEL_EXTENSIONS = [".stl", ".obj"];
export const MAX_UPLOAD_SIZE_MB = 50;

export const ACCEPTED_REFERENCE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
export const MAX_REFERENCE_UPLOAD_SIZE_MB = 20;
