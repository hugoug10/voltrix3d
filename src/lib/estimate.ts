import { MATERIALS, INFILL_LEVELS, PRICE_TIERS } from "@/lib/constants";

const BASE_FEE_EUR = 4;
const GRAMS_PER_KB = 0.55;
const PRICE_PER_GRAM_EUR = 0.11;

export function estimateGrams(fileSizeBytes: number) {
  return (fileSizeBytes / 1024) * GRAMS_PER_KB;
}

export function estimatePrice({
  fileSizeBytes,
  materialId,
  infillId,
  quantity,
}: {
  fileSizeBytes: number;
  materialId: string;
  infillId: string;
  quantity: number;
}) {
  const material = MATERIALS.find((m) => m.id === materialId) ?? MATERIALS[0];
  const infill = INFILL_LEVELS.find((i) => i.id === infillId) ?? INFILL_LEVELS[1];

  const grams = estimateGrams(fileSizeBytes);
  const perUnit =
    BASE_FEE_EUR + grams * PRICE_PER_GRAM_EUR * material.priceMultiplier * infill.multiplier;

  const total = perUnit * Math.max(1, quantity);
  const tier = PRICE_TIERS.find((t) => total <= t.maxEstimate) ?? PRICE_TIERS[PRICE_TIERS.length - 1];

  return { total: Math.round(total * 100) / 100, tier, grams: Math.round(grams) };
}
