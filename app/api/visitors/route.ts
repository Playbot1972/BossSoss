import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

const visitorCounterKey = "boss-soss:visitor-count";
const startingVisitorCount = 78;

const getRedis = () => {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({
    url,
    token
  });
};

export async function POST() {
  const redis = getRedis();

  if (!redis) {
    return NextResponse.json({
      count: startingVisitorCount,
      global: false,
      configured: false
    });
  }

  try {
    // Seed to 77 so the first global increment returns Visitor 78.
    await redis.set(visitorCounterKey, startingVisitorCount - 1, {
      nx: true
    });

    const count = await redis.incr(visitorCounterKey);

    return NextResponse.json({
      count,
      global: true,
      configured: true
    });
  } catch (error) {
    console.error("visitor_counter_increment_failed", error);

    return NextResponse.json(
      {
        count: startingVisitorCount,
        global: false,
        configured: true,
        error: "Visitor counter could not be updated."
      },
      { status: 500 }
    );
  }
}
