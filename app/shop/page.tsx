import { ProductCard } from "@/components/ProductCard";
import { sauces } from "@/lib/products";

export default function ShopPage() {
  return (
    <section className="section">
      <div className="page-heading">
        <p className="eyebrow">Shop sauces</p>
        <h1>Three sauce options, three bottle sizes.</h1>
        <p>
          Add any mix of flavors and sizes to the cart. Prices can be adjusted
          in the product data and matched to Stripe price IDs.
        </p>
      </div>
      <div className="product-grid">
        {sauces.map((sauce) => (
          <ProductCard key={sauce.id} sauce={sauce} />
        ))}
      </div>
    </section>
  );
}
