# Boss Soss BBQ Sauce Store

A standalone Next.js storefront for selling three BBQ sauce flavors in three
bottle sizes with a cart-based Stripe Checkout flow.

Production domain: `https://bosssoss.us`

Deployment guide: [docs/vercel-deploy.md](docs/vercel-deploy.md)

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

For local development, set:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set:

```bash
NEXT_PUBLIC_SITE_URL=https://bosssoss.us
```

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
- `https://bosssoss.us` is connected to your hosting provider
- Stripe Checkout success and cancel redirects use `NEXT_PUBLIC_SITE_URL=https://bosssoss.us`
- Shipping rate and delivery estimate are correct
- Stripe Tax is configured before enabling automatic tax
- Fulfillment process is defined for paid orders

## Domain setup checklist

Vercel is the recommended host for this Next.js app. See the full checklist in
[docs/vercel-deploy.md](docs/vercel-deploy.md). The short version is:

1. Import this GitHub repo into Vercel.
2. Add `bosssoss.us` as a custom domain in the Vercel dashboard.
3. Set the production environment variable `NEXT_PUBLIC_SITE_URL=https://bosssoss.us`.
4. Add the Stripe secret key and all nine Stripe price IDs in Vercel.
5. Add the DNS records Vercel provides at your domain registrar.
6. Confirm Stripe Checkout redirects back to `https://bosssoss.us/success`.
