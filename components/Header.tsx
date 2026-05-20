import Link from "next/link";
import { CartLink } from "./CartLink";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-left">
        <Link className="brand" href="/">
          Boss Soss
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/shop">Shop</Link>
          <Link href="/recipes">Recipes</Link>
          <CartLink />
        </nav>
      </div>
      <img
        className="header-pitmaster"
        src="/images/pitmaster.jpg"
        alt="Boss Soss pitmaster"
      />
    </header>
  );
}
