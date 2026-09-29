import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Page, EmptyState } from "@/components/page";
import { ProductCard } from "@/components/product-card";
import { byCategory, categories, categoryBySlug } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Category unavailable — FreshDash" }, { name: "robots", content: "noindex" }] };
    const name = loaderData.category.name;
    return {
      meta: [
        { title: `${name} — 10 minute delivery | FreshDash` },
        {
          name: "description",
          content: `Shop ${name.toLowerCase()} on FreshDash with delivery in 10 minutes. Fresh stock, everyday low prices.`,
        },
        { property: "og:title", content: `${name} | FreshDash` },
        {
          property: "og:description",
          content: `Order ${name.toLowerCase()} online and get it delivered in 10 minutes.`,
        },
      ],
    };
  },
  component: CategoryPage,
});

type SortKey = "popular" | "price-asc" | "price-desc" | "discount" | "rating";

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const all = byCategory(category.slug);
  const [sub, setSub] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("popular");
  const [brand, setBrand] = useState<string>("All");

  const brands = useMemo(() => ["All", ...new Set(all.map((p) => p.brand))], [all]);

  const list = useMemo(() => {
    let l = all.filter((p) => (sub === "All" ? true : p.subcategory === sub));
    if (brand !== "All") l = l.filter((p) => p.brand === brand);
    const sorted = [...l];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "discount")
      sorted.sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp);
    return sorted;
  }, [all, sub, brand, sort]);

  return (
    <Page>
      <nav aria-label="All categories" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`/category/${c.slug}`}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
              c.slug === category.slug ? "bg-primary text-primary-foreground" : "bg-secondary",
            )}
          >
            {c.emoji} {c.name}
          </a>
        ))}
      </nav>

      <h1 className="font-display text-2xl font-extrabold">
        {category.emoji} {category.name}
      </h1>
      <p className="text-sm text-muted-foreground">{list.length} products · delivery in 10 mins</p>

      <div className="mt-4 flex gap-4">
        <aside className="hidden w-48 shrink-0 md:block">
          <div className="sticky top-24 space-y-1 rounded-2xl border border-border bg-card p-2">
            {["All", ...category.subcategories].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSub(s)}
                className={cn(
                  "w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors",
                  sub === s ? "bg-primary-soft text-primary" : "hover:bg-secondary",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
            <div className="flex gap-2 md:hidden">
              {["All", ...category.subcategories].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSub(s)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold",
                    sub === s ? "bg-primary text-primary-foreground" : "bg-secondary",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold"
            >
              <option value="popular">Sort: Popular</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="discount">Highest discount</option>
              <option value="rating">Top rated</option>
            </select>
            <select
              aria-label="Filter by brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b === "All" ? "Brand: All" : b}
                </option>
              ))}
            </select>
          </div>

          {list.length === 0 ? (
            <EmptyState
              emoji="🧺"
              title="Nothing matches those filters"
              body="Try a different sub-category or clear the brand filter."
            />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Page>
  );
}
