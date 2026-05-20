import Link from "next/link";
import { HeroFlipCard } from "@/components/HeroFlipCard";
import { SpinningOrb } from "@/components/SpinningOrb";
import { sauces } from "@/lib/products";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Small batch. Big backyard flavor.</p>
          <h1>BBQ sauce made for family cookouts and weeknight dinners.</h1>
          <p>
            Choose from three signature sauces in three bottle sizes, then pair
            them with simple recipes from the pit.
          </p>
          <div className="hero-actions">
            <Link className="button orb-orbit-target" href="/shop">
              <SpinningOrb size="sm" />
              Shop sauces
            </Link>
            <Link className="button secondary" href="/recipes">
              View recipes
            </Link>
          </div>
        </div>
        <div className="hero-visuals">
          <HeroFlipCard sauceCount={sauces.length} />
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">How it works</p>
        <div className="steps">
          <article>
            <span>01</span>
            <h2>Pick a flavor</h2>
            <p>Original Pitmaster, Sweet Heat, or Smoky Gold.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Choose a size</h2>
            <p>Start with 8 oz, stock the fridge with 16 oz, or go big at 32 oz.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Checkout safely</h2>
            <p>Stripe handles payment, address collection, shipping, and tax settings.</p>
          </article>
        </div>
      </section>
    </>
  );
}
