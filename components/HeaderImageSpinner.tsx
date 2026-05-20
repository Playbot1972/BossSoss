"use client";

import { useEffect, useRef, useState } from "react";

const logoImage = "/icons/boss-soss-logo.png";
const pitmasterImage = "/images/pitmaster.jpg";
const surpriseImages = ["/images/jerk-rib.png", "/images/sweet.jpg"];

export function HeaderImageSpinner() {
  const [imageSrc, setImageSrc] = useState(pitmasterImage);
  const [isSpinning, setIsSpinning] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(window.clearTimeout);
    };
  }, []);

  const spinToLogo = () => {
    if (isSpinning) {
      return;
    }

    timeouts.current.forEach(window.clearTimeout);
    timeouts.current = [];

    const randomGraphic =
      surpriseImages[Math.floor(Math.random() * surpriseImages.length)];

    setIsSpinning(true);
    setImageSrc(randomGraphic);

    timeouts.current.push(
      window.setTimeout(() => {
        setIsSpinning(false);
      }, 900)
    );

    timeouts.current.push(
      window.setTimeout(() => {
        setImageSrc(logoImage);
      }, 1500)
    );
  };

  return (
    <button
      type="button"
      className={`header-pitmaster-button${isSpinning ? " is-spinning" : ""}`}
      onClick={spinToLogo}
      aria-label="Spin pitmaster image and reveal Boss Soss logo"
    >
      <img className="header-pitmaster" src={imageSrc} alt="Boss Soss feature" />
    </button>
  );
}
