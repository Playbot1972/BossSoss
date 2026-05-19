import { getVariantById } from "./products";

export const getStripePriceIdForVariant = (variantId: string) => {
  const variant = getVariantById(variantId);

  if (!variant) {
    return null;
  }

  const priceId = process.env[variant.stripePriceEnvName];

  if (!priceId || priceId === "price_replace_me") {
    return null;
  }

  return priceId;
};
