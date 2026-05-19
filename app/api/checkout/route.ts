import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripePriceIdForVariant } from "@/lib/stripe-prices";

export const runtime = "nodejs";

type CheckoutItem = {
  variantId: string;
  quantity: number;
};

const isCheckoutItem = (item: unknown): item is CheckoutItem => {
  if (!item || typeof item !== "object") {
    return false;
  }

  const candidate = item as CheckoutItem;
  return (
    typeof candidate.variantId === "string" &&
    Number.isInteger(candidate.quantity) &&
    candidate.quantity > 0 &&
    candidate.quantity <= 24
  );
};

const getSiteUrl = (request: NextRequest) => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  return request.nextUrl.origin;
};

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe secret key is not configured." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    items?: unknown;
  } | null;

  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: "Add at least one sauce to your cart before checkout." },
      { status: 400 }
    );
  }

  if (!body.items.every(isCheckoutItem)) {
    return NextResponse.json(
      { error: "The cart contains an invalid item or quantity." },
      { status: 400 }
    );
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of body.items) {
    const priceId = getStripePriceIdForVariant(item.variantId);

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            "A Stripe price ID is missing for one of the selected sauce sizes."
        },
        { status: 500 }
      );
    }

    lineItems.push({
      price: priceId,
      quantity: item.quantity
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = getSiteUrl(request);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cancel`,
    allow_promotion_codes: true,
    automatic_tax: {
      enabled: process.env.STRIPE_AUTOMATIC_TAX === "true"
    },
    phone_number_collection: {
      enabled: true
    },
    shipping_address_collection: {
      allowed_countries: ["US"]
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 995,
            currency: "usd"
          },
          display_name: "Standard shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3
            },
            maximum: {
              unit: "business_day",
              value: 7
            }
          }
        }
      }
    ]
  });

  return NextResponse.json({ url: session.url });
}
