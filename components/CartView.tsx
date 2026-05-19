"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCurrency, getSauceById, getVariantById } from "@/lib/products";
import { useCart } from "./CartProvider";

export function CartView() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cartLines = useMemo(
    () =>
      items
        .map((item) => {
          const variant = getVariantById(item.variantId);

          if (!variant) {
            return null;
          }

          const sauce = getSauceById(variant.sauceId);

          return {
            ...item,
            variant,
            sauce,
            lineTotalCents: variant.priceCents * item.quantity
          };
        })
        .filter((line) => line !== null),
    [items]
  );

  const subtotalCents = cartLines.reduce(
    (total, line) => total + line.lineTotalCents,
    0
  );

  const startCheckout = async () => {
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: cartLines.map((line) => ({
          variantId: line.variant.id,
          quantity: line.quantity
        }))
      })
    });

    const payload = (await response.json()) as {
      url?: string;
      error?: string;
    };

    if (!response.ok || !payload.url) {
      setError(payload.error ?? "Unable to start checkout.");
      setIsLoading(false);
      return;
    }

    window.location.href = payload.url;
  };

  if (cartLines.length === 0) {
    return (
      <section className="empty-state">
        <p className="eyebrow">Your cart</p>
        <h1>Your cart is empty.</h1>
        <p>Pick a sauce and bottle size to get started.</p>
        <Link className="button" href="/shop">
          Shop sauces
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div>
        <p className="eyebrow">Your cart</p>
        <h1>Review your order</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-lines">
          {cartLines.map((line) => (
            <article className="cart-line" key={line.variant.id}>
              <div>
                <h2>{line.sauce?.name}</h2>
                <p>
                  {line.variant.label} bottle -{" "}
                  {formatCurrency(line.variant.priceCents)}
                </p>
              </div>
              <label>
                Quantity
                <input
                  min="0"
                  max="24"
                  type="number"
                  value={line.quantity}
                  onChange={(event) =>
                    updateQuantity(
                      line.variant.id,
                      Number(event.currentTarget.value)
                    )
                  }
                />
              </label>
              <strong>{formatCurrency(line.lineTotalCents)}</strong>
              <button
                className="text-button"
                type="button"
                onClick={() => removeItem(line.variant.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotalCents)}</strong>
          </div>
          <p>
            Shipping address collection happens in Stripe Checkout. Tax can be
            enabled after Stripe Tax is configured.
          </p>
          {error ? <p className="form-error">{error}</p> : null}
          <button
            className="button full-width"
            type="button"
            disabled={isLoading}
            onClick={startCheckout}
          >
            {isLoading ? "Opening checkout..." : "Checkout with Stripe"}
          </button>
          <button className="text-button" type="button" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </section>
  );
}
