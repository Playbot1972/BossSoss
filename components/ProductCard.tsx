import { Sauce, formatCurrency } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";
import { ProductImageFlip } from "./ProductImageFlip";

const sauceBackImages: Partial<Record<Sauce["id"], string>> = {
  original: "/images/sauce-pot.jpg",
  "sweet-heat": "/images/sauce-spoon.jpg",
  "smoky-gold": "/images/pour-sauce.webp"
};

export function ProductCard({ sauce }: { sauce: Sauce }) {
  const initials = sauce.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="product-card">
      <ProductImageFlip
        initials={initials}
        backImageAlt={`${sauce.name} sauce graphic`}
        backImageSrc={sauceBackImages[sauce.id]}
      />
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
