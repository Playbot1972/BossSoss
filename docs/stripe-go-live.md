# Stripe go-live checklist

Use this checklist after the Vercel domain is live.

## 1. Create Stripe products and prices

Create 3 products in Stripe:

1. Short Dog Soss
2. Kick Dog Soss
3. Smoky Gold

Each product needs 3 one-time prices:

- 8 oz
- 16 oz
- 32 oz

That creates 9 Stripe price IDs.

You can create them automatically from this repo if you have your Stripe secret
key:

```bash
STRIPE_SECRET_KEY=sk_test_replace_me npm run stripe:create-products
```

The script creates or updates:

- Short Dog Soss
- Kick Dog Soss
- Smoky Gold

It then writes the 9 generated price IDs to:

```text
stripe-products.env
```

That file is ignored by git. Copy those values into Vercel.

## 2. Add Vercel production environment variables

In Vercel, open **Project -> Settings -> Environment Variables** and add these
for **Production**:

```bash
NEXT_PUBLIC_SITE_URL=https://bosssoss.us
STRIPE_SECRET_KEY=sk_test_replace_me_or_sk_live_replace_me
STRIPE_AUTOMATIC_TAX=false

STRIPE_PRICE_ORIGINAL_8OZ=price_replace_me
STRIPE_PRICE_ORIGINAL_16OZ=price_replace_me
STRIPE_PRICE_ORIGINAL_32OZ=price_replace_me

STRIPE_PRICE_SWEET_HEAT_8OZ=price_replace_me
STRIPE_PRICE_SWEET_HEAT_16OZ=price_replace_me
STRIPE_PRICE_SWEET_HEAT_32OZ=price_replace_me

STRIPE_PRICE_SMOKY_GOLD_8OZ=price_replace_me
STRIPE_PRICE_SMOKY_GOLD_16OZ=price_replace_me
STRIPE_PRICE_SMOKY_GOLD_32OZ=price_replace_me
```

Use test keys and test price IDs first. Switch to live keys and live price IDs
only after test checkout works.

## 3. Redeploy after env changes

Vercel does not apply changed environment variables to an existing deployment.
After adding or changing env vars:

1. Open **Deployments**.
2. Redeploy the latest production deployment.

## 4. Check readiness

Open:

```text
https://bosssoss.us/api/readiness
```

It returns JSON that says whether Stripe keys and all 9 price IDs are configured.
It does not expose secret values.

## 5. Test checkout

Use Stripe test mode first:

```text
4242 4242 4242 4242
Any future expiration date
Any CVC
Any ZIP
```

Confirm:

- Checkout opens in Stripe
- Shipping appears as expected
- Cancel returns to `/cancel`
- Success returns to `/success`

## 6. Switch to live

When test mode works:

1. Replace test Stripe keys with live keys.
2. Replace test price IDs with live price IDs.
3. Redeploy Vercel.
4. Run one small real purchase test.
