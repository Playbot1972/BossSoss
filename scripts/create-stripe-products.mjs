import fs from "node:fs";
import path from "node:path";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("Missing STRIPE_SECRET_KEY.");
  console.error(
    "Run with: STRIPE_SECRET_KEY=sk_test_... npm run stripe:create-products"
  );
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);

const sauces = [
  {
    id: "original",
    name: "Original Pitmaster",
    description:
      "A classic tomato-based BBQ sauce with brown sugar, vinegar, and a slow pepper finish.",
    envPrefix: "STRIPE_PRICE_ORIGINAL",
    prices: [
      { sizeId: "8OZ", label: "8 oz", amount: 800 },
      { sizeId: "16OZ", label: "16 oz", amount: 1400 },
      { sizeId: "32OZ", label: "32 oz", amount: 2400 }
    ]
  },
  {
    id: "sweet-heat",
    name: "Sweet Heat",
    description:
      "Sweet, sticky, and finished with a warm chili kick for wings, pulled pork, and burgers.",
    envPrefix: "STRIPE_PRICE_SWEET_HEAT",
    prices: [
      { sizeId: "8OZ", label: "8 oz", amount: 800 },
      { sizeId: "16OZ", label: "16 oz", amount: 1400 },
      { sizeId: "32OZ", label: "32 oz", amount: 2400 }
    ]
  },
  {
    id: "smoky-gold",
    name: "Smoky Gold",
    description:
      "A golden, tangy sauce made for chicken, sausage, vegetables, and dipping.",
    envPrefix: "STRIPE_PRICE_SMOKY_GOLD",
    prices: [
      { sizeId: "8OZ", label: "8 oz", amount: 800 },
      { sizeId: "16OZ", label: "16 oz", amount: 1400 },
      { sizeId: "32OZ", label: "32 oz", amount: 2400 }
    ]
  }
];

const getOrCreateProduct = async (sauce) => {
  const existingProducts = await stripe.products.search({
    query: `metadata['boss_soss_id']:'${sauce.id}'`,
    limit: 1
  });

  const existingProduct = existingProducts.data[0];

  if (existingProduct) {
    return stripe.products.update(existingProduct.id, {
      name: sauce.name,
      description: sauce.description,
      active: true,
      metadata: {
        boss_soss_id: sauce.id
      }
    });
  }

  return stripe.products.create({
    name: sauce.name,
    description: sauce.description,
    metadata: {
      boss_soss_id: sauce.id
    }
  });
};

const getOrCreatePrice = async ({ productId, sauce, price }) => {
  const lookupKey = `boss_soss_${sauce.id}_${price.sizeId.toLowerCase()}`;
  const existingPrices = await stripe.prices.list({
    active: true,
    lookup_keys: [lookupKey],
    limit: 1
  });

  const existingPrice = existingPrices.data[0];

  if (existingPrice) {
    return existingPrice;
  }

  return stripe.prices.create({
    product: productId,
    currency: "usd",
    unit_amount: price.amount,
    lookup_key: lookupKey,
    nickname: `${sauce.name} - ${price.label}`,
    metadata: {
      boss_soss_id: sauce.id,
      bottle_size: price.label
    }
  });
};

const envLines = [
  "NEXT_PUBLIC_SITE_URL=https://bosssoss.us",
  "STRIPE_AUTOMATIC_TAX=false"
];

console.log("Creating/updating Boss Soss Stripe products and prices...\n");

for (const sauce of sauces) {
  const product = await getOrCreateProduct(sauce);
  console.log(`Product: ${sauce.name} (${product.id})`);

  for (const price of sauce.prices) {
    const stripePrice = await getOrCreatePrice({
      productId: product.id,
      sauce,
      price
    });
    const envName = `${sauce.envPrefix}_${price.sizeId}`;

    envLines.push(`${envName}=${stripePrice.id}`);
    console.log(`  ${price.label}: ${stripePrice.id}`);
  }

  console.log("");
}

const outputPath = path.join(process.cwd(), "stripe-products.env");
fs.writeFileSync(outputPath, `${envLines.join("\n")}\n`);

console.log(`Wrote price IDs to ${outputPath}`);
console.log("Copy these values into Vercel Production environment variables.");
