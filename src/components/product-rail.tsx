import type { Product } from "@/data/catalog";
import { ProductCard, ProductCardSkeleton } from "./product-card";

export function ProductRail({
  title,
  subtitle,
  products,
  action,
  loading,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  action?: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
        {(loading ? Array.from({ length: 6 }) : products).map((p, i) => (
          <div key={loading ? i : (p as Product).id} className="w-40 shrink-0 snap-start sm:w-48">
            {loading ? <ProductCardSkeleton /> : <ProductCard product={p as Product} index={i} />}
          </div>
        ))}
      </div>
    </section>
  );
}
