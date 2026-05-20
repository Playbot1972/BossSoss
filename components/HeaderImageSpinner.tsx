"use client";

import { useEffect, useRef, useState } from "react";

const logoImage = "/icons/boss-soss-logo.png";
const pitmasterImage = "/images/pitmaster.jpg";
const surpriseImages = ["/images/jerk-rib.png", "/images/sweet.jpg"];

export function HeaderImageSpinner() {
  const [imageSrc, setImageSrc] = useState(pitmasterImage);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isSequenceRunning, setIsSequenceRunning] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(window.clearTimeout);
    };
  }, []);

  const flipToLogo = () => {
    if (isSequenceRunning) {
      return;
    }

    timeouts.current.forEach(window.clearTimeout);
    timeouts.current = [];

    const randomGraphic =
      surpriseImages[Math.floor(Math.random() * surpriseImages.length)];

    setIsSequenceRunning(true);
    setIsFlipping(true);
    setImageSrc(randomGraphic);

    timeouts.current.push(
      window.setTimeout(() => {
        setIsFlipping(false);
      }, 900)
    );

    timeouts.current.push(
      window.setTimeout(() => {
        setIsFlipping(true);
      }, 3900)
    );

    timeouts.current.push(
      window.setTimeout(() => {
        setImageSrc(logoImage);
      }, 4350)
    );

    timeouts.current.push(
      window.setTimeout(() => {
        setIsFlipping(false);
        setIsSequenceRunning(false);
      }, 4800)
    );
  };

  return (
    <button
      type="button"
      className={`header-pitmaster-button${isFlipping ? " is-flipping" : ""}`}
      onClick={flipToLogo}
      aria-label="Flip pitmaster image and reveal Boss Soss logo"
      aria-busy={isSequenceRunning}
    >
      <img className="header-pitmaster" src={imageSrc} alt="Boss Soss feature" />
    </button>
  );
}
