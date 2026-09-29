import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { Page } from "@/components/page";
import { BannerCarousel } from "@/components/banner-carousel";
import { CategoryRow } from "@/components/category-row";
import { ProductRail } from "@/components/product-rail";
import { ProductCard } from "@/components/product-card";
import {
  categories,
  dealsOfTheDay,
  orderAgain,
  products,
  recommended,
  trending,
} from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreshDash — Groceries delivered in 10 minutes" },
      {
        name: "description",
        content:
          "Order fruits, vegetables, dairy, snacks and household essentials on FreshDash and get them delivered in 10 minutes.",
      },
      { property: "og:title", content: "FreshDash — Groceries in 10 minutes" },
      {
        property: "og:description",
        content: "Fresh groceries, daily essentials and snacks at your door in 10 minutes.",
      },
    ],
  }),
  component: Home,
});

function Countdown() {
  const [left, setLeft] = useState(3 * 3600 + 42 * 60);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(left / 3600)).padStart(2, "0");
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return (
    <span className="flex items-center gap-1.5 rounded-xl bg-highlight px-3 py-1.5 text-sm font-bold text-highlight-foreground">
      <Timer className="h-4 w-4" />
      {h}:{m}:{s}
    </span>
  );
}

function Home() {
  return (
    <Page>
      <BannerCarousel />
      <CategoryRow />

      <ProductRail title="Order again" subtitle="Your usual picks" products={orderAgain} />
      <ProductRail title="Trending near you" subtitle="Popular in Bengaluru" products={trending} />
      <ProductRail
        title="Deals of the day"
        subtitle="Prices back up tonight"
        products={dealsOfTheDay}
        action={<Countdown />}
      />
      <ProductRail
        title="Recommended for you"
        subtitle="Picked by FreshDash AI from your basket"
        products={recommended}
      />

      <section className="mt-10">
        <h2 className="font-display text-xl font-extrabold sm:text-2xl">Shop by category</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.04 }}
            >
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-card transition-transform hover:-translate-y-1"
              >
                <span className="text-4xl">{c.emoji}</span>
                <span className="text-sm font-semibold">{c.name}</span>
                <span className="text-xs text-muted-foreground">
                  {products.filter((p) => p.categorySlug === c.slug).length} items
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-extrabold sm:text-2xl">All products</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {products.slice(0, 24).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </Page>
  );
}
