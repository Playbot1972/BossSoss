import { NextResponse } from "next/server";
import { productVariants } from "@/lib/products";

export const runtime = "nodejs";

const isConfigured = (value: string | undefined) =>
  Boolean(value && value !== "price_replace_me" && !value.includes("replace_me"));

const hasVisitorCounterStore = () =>
  Boolean(
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  );

const getStripeMode = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return "not_configured";
  }

  if (secretKey.startsWith("sk_live_")) {
    return "live";
  }

  if (secretKey.startsWith("rk_live_")) {
    return "restricted_live";
  }

  if (secretKey.startsWith("sk_test_")) {
    return "test";
  }

  if (secretKey.startsWith("rk_test_")) {
    return "restricted_test";
  }

  return "unknown";
};

export async function GET() {
  const priceChecks = productVariants.map((variant) => ({
    variantId: variant.id,
    envName: variant.stripePriceEnvName,
    configured: isConfigured(process.env[variant.stripePriceEnvName])
  }));

  const checks = {
    siteUrl: isConfigured(process.env.NEXT_PUBLIC_SITE_URL),
    stripeSecretKey: isConfigured(process.env.STRIPE_SECRET_KEY),
    stripeMode: getStripeMode(),
    automaticTaxEnabled: process.env.STRIPE_AUTOMATIC_TAX === "true",
    visitorCounterStore: hasVisitorCounterStore(),
    priceIds: priceChecks
  };

  const missing = [
    !checks.siteUrl ? "NEXT_PUBLIC_SITE_URL" : null,
    !checks.stripeSecretKey ? "STRIPE_SECRET_KEY" : null,
    ...priceChecks
      .filter((priceCheck) => !priceCheck.configured)
      .map((priceCheck) => priceCheck.envName)
  ].filter((item): item is string => Boolean(item));

  return NextResponse.json({
    ok: missing.length === 0,
    missing,
    checks
  });
}
