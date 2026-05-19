export type SauceId = "original" | "sweet-heat" | "smoky-gold";
export type SauceSizeId = "8oz" | "16oz" | "32oz";

export type SauceVariant = {
  id: string;
  sauceId: SauceId;
  sizeId: SauceSizeId;
  label: string;
  priceCents: number;
  stripePriceEnvName: string;
};

export type Sauce = {
  id: SauceId;
  name: string;
  tagline: string;
  description: string;
  sizes: SauceVariant[];
};

const sizeLabels: Record<SauceSizeId, string> = {
  "8oz": "8 oz",
  "16oz": "16 oz",
  "32oz": "32 oz"
};

const pricesBySize: Record<SauceSizeId, number> = {
  "8oz": 800,
  "16oz": 1400,
  "32oz": 2400
};

const buildVariant = (
  sauceId: SauceId,
  sizeId: SauceSizeId,
  stripePriceEnvName: string
): SauceVariant => ({
  id: `${sauceId}-${sizeId}`,
  sauceId,
  sizeId,
  label: sizeLabels[sizeId],
  priceCents: pricesBySize[sizeId],
  stripePriceEnvName
});

export const sauces: Sauce[] = [
  {
    id: "original",
    name: "Original Pitmaster",
    tagline: "Balanced, tangy, and built for ribs.",
    description:
      "A classic tomato-based BBQ sauce with brown sugar, vinegar, and a slow pepper finish.",
    sizes: [
      buildVariant("original", "8oz", "STRIPE_PRICE_ORIGINAL_8OZ"),
      buildVariant("original", "16oz", "STRIPE_PRICE_ORIGINAL_16OZ"),
      buildVariant("original", "32oz", "STRIPE_PRICE_ORIGINAL_32OZ")
    ]
  },
  {
    id: "sweet-heat",
    name: "Sweet Heat",
    tagline: "A little honey up front, a little fire after.",
    description:
      "Sweet, sticky, and finished with a warm chili kick for wings, pulled pork, and burgers.",
    sizes: [
      buildVariant("sweet-heat", "8oz", "STRIPE_PRICE_SWEET_HEAT_8OZ"),
      buildVariant("sweet-heat", "16oz", "STRIPE_PRICE_SWEET_HEAT_16OZ"),
      buildVariant("sweet-heat", "32oz", "STRIPE_PRICE_SWEET_HEAT_32OZ")
    ]
  },
  {
    id: "smoky-gold",
    name: "Smoky Gold",
    tagline: "Mustard-style sauce with a smokehouse edge.",
    description:
      "A golden, tangy sauce made for chicken, sausage, vegetables, and dipping.",
    sizes: [
      buildVariant("smoky-gold", "8oz", "STRIPE_PRICE_SMOKY_GOLD_8OZ"),
      buildVariant("smoky-gold", "16oz", "STRIPE_PRICE_SMOKY_GOLD_16OZ"),
      buildVariant("smoky-gold", "32oz", "STRIPE_PRICE_SMOKY_GOLD_32OZ")
    ]
  }
];

export const productVariants = sauces.flatMap((sauce) => sauce.sizes);

export const getVariantById = (variantId: string) =>
  productVariants.find((variant) => variant.id === variantId);

export const getSauceById = (sauceId: SauceId) =>
  sauces.find((sauce) => sauce.id === sauceId);

export const formatCurrency = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
