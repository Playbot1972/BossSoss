"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartLink() {
  const { totalQuantity } = useCart();

  return (
    <Link className="cart-link" href="/cart">
      Cart
      {totalQuantity > 0 ? (
        <span aria-label={`${totalQuantity} items in cart`}>
          {totalQuantity}
        </span>
      ) : null}
    </Link>
  );
}
