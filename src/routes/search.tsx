import { createFileRoute } from "@tanstack/react-router";
import { Page, EmptyState } from "@/components/page";
import { ProductCard } from "@/components/product-card";
import { searchProducts } from "@/data/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: String(s.q ?? "") }),
  head: () => ({
    meta: [
      { title: "Search groceries — FreshDash" },
      {
        name: "description",
        content: "Search thousands of groceries on FreshDash and get them delivered in 10 minutes.",
      },
      { property: "og:title", content: "Search groceries — FreshDash" },
      {
        property: "og:description",
        content: "Find fresh produce, dairy, snacks and essentials in seconds.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchProducts(q);

  return (
    <Page>
      <h1 className="font-display text-2xl font-extrabold">
        Results for "{q}"
      </h1>
      <p className="text-sm text-muted-foreground">{results.length} products found</p>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            emoji="🔍"
            title="No products matched"
            body="Check the spelling or try a broader word like 'milk' or 'snacks'."
          />
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {results.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </Page>
  );
}
