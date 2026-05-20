import { Sauce, formatCurrency } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";
import { SpinningOrb } from "./SpinningOrb";

export function ProductCard({ sauce }: { sauce: Sauce }) {
  return (
    <article className="product-card">
      <div className="product-image" aria-hidden="true">
        <span className="sauce-initials-pill orb-orbit-target">
          <SpinningOrb size="md" />
          {sauce.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
      <div>
        <p className="eyebrow">{sauce.tagline}</p>
        <h2>{sauce.name}</h2>
        <p>{sauce.description}</p>
      </div>
      <div className="variant-list">
        {sauce.sizes.map((variant) => (
          <div className="variant-row" key={variant.id}>
            <div>
              <strong>{variant.label}</strong>
              <span>{formatCurrency(variant.priceCents)}</span>
            </div>
            <AddToCartButton variantId={variant.id} />
          </div>
        ))}
      </div>
    </article>
  );
}
