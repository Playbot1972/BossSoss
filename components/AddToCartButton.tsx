"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { SpinningOrb } from "./SpinningOrb";

export function AddToCartButton({ variantId }: { variantId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

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
        <SpinningOrb size="sm" />
        {added ? "Added" : "Add to cart"}
      </button>
    </div>
  );
}
