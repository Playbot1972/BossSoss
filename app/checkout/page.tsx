import Link from "next/link";

export default function CheckoutPage() {
  return (
    <section className="empty-state">
      <p className="eyebrow">Checkout</p>
      <h1>Checkout starts from your cart.</h1>
      <p>
        Review your sauces and bottle sizes, then Stripe will securely collect
        payment, shipping address, and tax details.
      </p>
      <Link className="button" href="/cart">
        Go to cart
      </Link>
    </section>
  );
}
