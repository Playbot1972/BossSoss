# Deploy Boss Soss to Vercel

This app is built with Next.js, so Vercel is the simplest production host.

## 1. Import the GitHub repo

1. Go to <https://vercel.com/new>.
2. Import the GitHub repository for this app.
3. Use the default Next.js framework detection.
4. Confirm these project settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Development command: `npm run dev`

The repository includes `vercel.json` with those commands.

## 2. Add environment variables

In Vercel, open the project and go to **Settings -> Environment Variables**.
Add these values for **Production**:

```bash
NEXT_PUBLIC_SITE_URL=https://bosssoss.us
STRIPE_SECRET_KEY=sk_live_replace_me
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

Use test-mode Stripe keys and price IDs until checkout has been tested. Switch
to live-mode Stripe keys and price IDs before accepting real orders.

## 3. Add the domain

1. In Vercel, open **Settings -> Domains**.
2. Add `bosssoss.us`.
3. Add `www.bosssoss.us` if you also want the `www` version.
4. Follow the DNS instructions Vercel shows.

Typical DNS records are one of these patterns:

- Apex/root domain `bosssoss.us`: Vercel usually asks for an `A` record.
- `www.bosssoss.us`: Vercel usually asks for a `CNAME` record.

Use the exact DNS values shown in your Vercel dashboard.

## 4. Redeploy after environment changes

After adding or changing environment variables:

1. Go to **Deployments** in Vercel.
2. Open the latest deployment menu.
3. Click **Redeploy**.

## 5. Test production

After DNS and SSL are ready, test:

1. Open <https://bosssoss.us>.
2. Add one sauce size to the cart.
3. Start Stripe Checkout.
4. Confirm Stripe redirects to `https://bosssoss.us/success` after payment.
5. Confirm cancel returns to `https://bosssoss.us/cancel`.

Do not switch to live Stripe keys until a full checkout succeeds in test mode.
