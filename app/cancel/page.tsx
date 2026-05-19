import Link from "next/link";

export default function CancelPage() {
  return (
    <section className="empty-state">
      <p className="eyebrow">Checkout canceled</p>
      <h1>Your cart is still waiting.</h1>
      <p>
        No payment was taken. Return to the cart when you are ready to finish
        the order.
      </p>
      <Link className="button" href="/cart">
        Return to cart
      </Link>
    </section>
  );
}
