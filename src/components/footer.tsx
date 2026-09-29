import { Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-extrabold">
            Fresh<span className="text-primary">Dash</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Groceries at your door in 10 minutes. Over 8,000 products from dark stores near you.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-xl bg-secondary px-3 py-2 text-xs font-semibold"> App Store</span>
            <span className="rounded-xl bg-secondary px-3 py-2 text-xs font-semibold">▶ Google Play</span>
          </div>
        </div>
        <div>
          <p className="font-display font-bold">Categories</p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display font-bold">Company</p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              <Link to="/profile" className="hover:text-primary">
                My account
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-primary">
                Partner dashboard
              </Link>
            </li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold">Help</p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>Delivery areas</li>
            <li>Returns & refunds</li>
            <li>Terms of service</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FreshDash. Demo storefront with seeded catalogue data.
      </p>
    </footer>
  );
}
