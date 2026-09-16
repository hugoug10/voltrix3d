"use server";

import { getProductByHandle } from "@/lib/shopify";
import { CUSTOM_PRINT_PRODUCT_HANDLE, PRICE_TIER_OPTION_NAME } from "@/lib/constants";
import { addLineToCart } from "./actions";

export type CustomPrintInput = {
  fileUrl: string;
  fileName: string;
  materialName: string;
  colorName: string;
  infillName: string;
  quantity: number;
  notes: string;
  tierOptionValue: string;
};

export async function addCustomPrintToCart(input: CustomPrintInput) {
  const product = await getProductByHandle(CUSTOM_PRINT_PRODUCT_HANDLE);

  if (!product) {
    throw new Error(
      `No se encontro el producto "${CUSTOM_PRINT_PRODUCT_HANDLE}" en Shopify. Creelo con una opcion ` +
        `"${PRICE_TIER_OPTION_NAME}" y una variante por cada tramo de precio (ver README).`
    );
  }

  const variant = product.variants.find((v) =>
    v.selectedOptions.some(
      (o) => o.name === PRICE_TIER_OPTION_NAME && o.value === input.tierOptionValue
    )
  );

  if (!variant) {
    throw new Error(
      `El producto "${CUSTOM_PRINT_PRODUCT_HANDLE}" no tiene una variante para el tramo "${input.tierOptionValue}".`
    );
  }

  const attributes = [
    { key: "Archivo 3D", value: input.fileUrl },
    { key: "Nombre de archivo", value: input.fileName },
    { key: "Material", value: input.materialName },
    { key: "Color", value: input.colorName },
    { key: "Relleno", value: input.infillName },
    ...(input.notes ? [{ key: "Notas", value: input.notes }] : []),
  ];

  return addLineToCart(variant.id, input.quantity, attributes);
}
