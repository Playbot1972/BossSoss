"use client";

import { useEffect, useRef, useState } from "react";
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
  const [showBack, setShowBack] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const timeouts = useRef<number[]>([]);
  const canFlip = Boolean(backImageSrc);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(window.clearTimeout);
    };
  }, []);

  const flipProductImage = () => {
    if (!canFlip || isFlipping) {
      return;
    }

    timeouts.current.forEach(window.clearTimeout);
    timeouts.current = [];

    setIsFlipping(true);

    timeouts.current.push(
      window.setTimeout(() => {
        setShowBack((current) => !current);
      }, 325)
    );

    timeouts.current.push(
      window.setTimeout(() => {
        setIsFlipping(false);
      }, 650)
    );
  };

  return (
    <button
      type="button"
      className={`product-image product-image-flip${
        isFlipping ? " is-flipping" : ""
      }`}
      onClick={flipProductImage}
      aria-label={
        canFlip
          ? `${backImageAlt}. Tap to flip product graphic.`
          : `${initials} sauce graphic`
      }
      aria-pressed={canFlip ? showBack : undefined}
      disabled={!canFlip}
    >
      <span className="product-image-flip-inner">
        <span
          className={`product-image-content${
            showBack ? " product-image-content-back" : ""
          }`}
        >
          {showBack && backImageSrc ? (
            <>
              <img src={backImageSrc} alt={backImageAlt} />
              <small>Tap to return</small>
            </>
          ) : (
            <>
              <span className="sauce-initials-pill orb-orbit-target">
                <SpinningOrb size="md" />
                {initials}
              </span>
              {canFlip ? <small>Tap to flip</small> : null}
            </>
          )}
          </span>
      </span>
    </button>
  );
}
