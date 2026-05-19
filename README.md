# Dad's BBQ Sauce Store

A standalone Next.js storefront for selling three BBQ sauce flavors in three
bottle sizes with a cart-based Stripe Checkout flow.

## What is included

- Three sauce options: Original Pitmaster, Sweet Heat, and Smoky Gold
- Three sizes per sauce: 8 oz, 16 oz, and 32 oz
- Browser cart with quantity updates and local storage persistence
- Stripe Checkout API route for payment, shipping address collection, and optional Stripe Tax
- Success and cancel pages
- Public recipes page

## Local setup

Install dependencies:

```bash
npm install
```

Copy the example environment file:

```bash
cp .env.example .env.local
```

Create the products and prices in Stripe:

1. Product: Original Pitmaster
   - 8 oz price
   - 16 oz price
   - 32 oz price
2. Product: Sweet Heat
   - 8 oz price
   - 16 oz price
   - 32 oz price
3. Product: Smoky Gold
   - 8 oz price
   - 16 oz price
   - 32 oz price

Paste the nine Stripe price IDs into `.env.local`.

Run the app:

```bash
npm run dev
```

## Stripe notes

The cart posts variant IDs to `app/api/checkout/route.ts`. The server maps those
variant IDs to Stripe price IDs from environment variables, so customers cannot
submit arbitrary prices from the browser.

Checkout currently includes:

- `mode: "payment"`
- US shipping address collection
- Fixed standard shipping rate of $9.95
- Optional automatic tax with `STRIPE_AUTOMATIC_TAX=true`
- Promotion code support
- Phone number collection

Before going live, confirm:

- Stripe live mode products and prices are configured
- Shipping rate and delivery estimate are correct
- Stripe Tax is configured before enabling automatic tax
- Fulfillment process is defined for paid orders
