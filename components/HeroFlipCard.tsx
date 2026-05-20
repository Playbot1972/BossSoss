"use client";

import { useState } from "react";
import { SpinningOrb } from "./SpinningOrb";

export function HeroFlipCard({ sauceCount }: { sauceCount: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`hero-flip-card${isFlipped ? " is-flipped" : ""}`}
      aria-label={
        isFlipped
          ? "Boss Soss logo. Tap to show sauce count."
          : "Three sauces and three bottle sizes. Tap to show Boss Soss logo."
      }
      aria-pressed={isFlipped}
      onClick={() => setIsFlipped((current) => !current)}
    >
      <span className="hero-flip-card-inner">
        <span className="hero-card hero-flip-face hero-flip-front">
          <span className="hero-card-orb">
            <SpinningOrb size="lg" />
          </span>
          <strong>{sauceCount}</strong>
          <span>sauces</span>
          <strong>3</strong>
          <span>bottle sizes</span>
          <small>Tap to flip</small>
        </span>
        <span className="hero-card hero-flip-face hero-flip-back">
          <img
            alt="Boss Soss BBQ Sauce logo"
            src="/icons/boss-soss-logo.png"
          />
        </span>
      </span>
    </button>
  );
}
