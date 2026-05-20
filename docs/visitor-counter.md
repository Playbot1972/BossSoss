# Global visitor counter

The site includes a bottom-left visitor counter that starts at `Visitor 78`.

By default, if no shared Redis/KV store is configured, the counter falls back to
browser-local counting. To make the count global across all visitors, connect a
Redis store in Vercel.

## Vercel setup

1. Open the Boss Soss project in Vercel.
2. Go to **Storage** or **Integrations**.
3. Add a Redis integration from the Vercel Marketplace, such as Upstash Redis.
4. Connect it to this project.
5. Make sure Vercel adds one of these env var pairs to Production:

```bash
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

or:

```bash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

6. Redeploy the production deployment.

## Verify

Open:

```text
https://bosssoss.us/api/readiness
```

Look for:

```json
"visitorCounterStore": true
```

Then refresh the site from multiple devices/browsers and the number should
advance globally.
