import Link from "next/link";

export default function SuccessPage() {
  return (
    <section className="empty-state">
      <p className="eyebrow">Order received</p>
      <h1>Thanks for your order.</h1>
      <p>
        Stripe has processed the payment. The next production step is adding a
        webhook so order fulfillment can be tracked automatically.
      </p>
      <div className="hero-actions centered">
        <Link className="button" href="/recipes">
          Browse recipes
        </Link>
        <Link className="button secondary" href="/shop">
          Keep shopping
        </Link>
      </div>
    </section>
  );
}
