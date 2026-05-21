"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { SpinningOrb } from "./SpinningOrb";

type ProductImageFlipProps = {
  initials: string;
  backImageAlt: string;
  backImageSrc?: string;
  frontImageSrc?: string;
};

type ProductImageStyle = CSSProperties & {
  "--product-back-image"?: string;
  "--product-front-image"?: string;
};

export function ProductImageFlip({
  initials,
  backImageAlt,
  backImageSrc,
  frontImageSrc
}: ProductImageFlipProps) {
  const [showBack, setShowBack] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const timeouts = useRef<number[]>([]);
  const canFlip = Boolean(backImageSrc);
  const style: ProductImageStyle = {
    ...(backImageSrc
      ? { "--product-back-image": `url("${backImageSrc}")` }
      : {}),
    ...(frontImageSrc
      ? { "--product-front-image": `url("${frontImageSrc}")` }
      : {})
  };

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
      }${showBack ? " is-showing-back" : ""
      }`}
      onClick={flipProductImage}
      aria-label={
        canFlip
          ? `${showBack ? backImageAlt : initials}. Tap to flip product graphic.`
          : `${initials} sauce graphic`
      }
      aria-pressed={canFlip ? showBack : undefined}
      disabled={!canFlip}
      style={style}
    >
      <span className="product-image-flip-inner">
        <span
          className="product-image-content"
        >
          {showBack ? (
            <small>Tap to return</small>
          ) : (
            <>
              {frontImageSrc ? (
                <span className="product-front-image" aria-hidden="true" />
              ) : null}
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
