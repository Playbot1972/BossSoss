"use client";

import { useEffect, useState } from "react";

const visitorCounterKey = "boss-soss-visitor-count";
const startingVisitorCount = 78;

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(startingVisitorCount);

  useEffect(() => {
    const storedCount = window.localStorage.getItem(visitorCounterKey);
    const nextCount = storedCount
      ? Math.max(Number(storedCount) + 1, startingVisitorCount)
      : startingVisitorCount;

    window.localStorage.setItem(visitorCounterKey, String(nextCount));
    setVisitorCount(nextCount);
  }, []);

  return (
    <div className="visitor-counter" aria-label={`Visitor ${visitorCount}`}>
      <span>Visitor</span>
      <strong>{visitorCount}</strong>
    </div>
  );
}
