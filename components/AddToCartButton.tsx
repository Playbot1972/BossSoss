"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { SpinningOrb } from "./SpinningOrb";

const getStableOrbSpeed = (variantId: string) => {
  const hash = Array.from(variantId).reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );

  return 3.2 + (hash % 9) * 0.3;
};

export function AddToCartButton({ variantId }: { variantId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const orbSpeed = getStableOrbSpeed(variantId);

  return (
    <div className="add-to-cart">
      <label>
        <span className="sr-only">Quantity</span>
        <select
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        >
          {[1, 2, 3, 4, 5, 6].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <button
        className="orb-orbit-target"
        type="button"
        onClick={() => {
          addItem(variantId, quantity);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1800);
        }}
      >
        <SpinningOrb size="sm" speedSeconds={orbSpeed} />
        {added ? "Added" : "Add to cart"}
      </button>
    </div>
  );
}
