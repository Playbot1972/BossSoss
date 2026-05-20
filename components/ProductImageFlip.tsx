"use client";

import { useState } from "react";
import { SpinningOrb } from "./SpinningOrb";

type ProductImageFlipProps = {
  initials: string;
  backImageAlt: string;
  backImageSrc?: string;
};

export function ProductImageFlip({
  initials,
  backImageAlt,
  backImageSrc
}: ProductImageFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const canFlip = Boolean(backImageSrc);

  return (
    <button
      type="button"
      className={`product-image product-image-flip${
        isFlipped ? " is-flipped" : ""
      }`}
      onClick={() => {
        if (canFlip) {
          setIsFlipped((current) => !current);
        }
      }}
      aria-label={
        canFlip
          ? `${backImageAlt}. Tap to flip product graphic.`
          : `${initials} sauce graphic`
      }
      aria-pressed={canFlip ? isFlipped : undefined}
      disabled={!canFlip}
    >
      <span className="product-image-flip-inner">
        <span className="product-image-face product-image-front">
          <span className="sauce-initials-pill orb-orbit-target">
            <SpinningOrb size="md" />
            {initials}
          </span>
          {canFlip ? <small>Tap to flip</small> : null}
        </span>
        {backImageSrc ? (
          <span className="product-image-face product-image-back">
            <img src={backImageSrc} alt={backImageAlt} />
          </span>
        ) : null}
      </span>
    </button>
  );
}
