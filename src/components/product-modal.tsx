import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { discountPct, inr, productById, products } from "@/data/catalog";
import { useUI } from "@/store/ui";
import { AddButton } from "./add-button";
import { ProductCard } from "./product-card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ProductModal() {
  const { productId, openProduct } = useUI();
  const product = productId ? productById(productId) : null;
  if (!product) return null;

  const off = discountPct(product);
  const alsoBought = products
    .filter((p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t)))
    .slice(0, 4);
  const similar = products
    .filter((p) => p.id !== product.id && p.subcategory === product.subcategory)
    .slice(0, 4);

  return (
    <Dialog open onOpenChange={() => openProduct(null)}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto rounded-3xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.04 }}
            className="grid aspect-square place-items-center rounded-2xl bg-secondary text-[8rem]"
          >
            <span aria-hidden>{product.emoji}</span>
          </motion.div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </p>
            <h2 className="font-display text-2xl font-extrabold">{product.name}</h2>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {product.rating} · Delivery in {product.eta} mins
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <span
                  key={v}
                  className="rounded-xl border-2 border-primary bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary"
                >
                  {v}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-extrabold">{inr(product.price)}</span>
              {off > 0 && (
                <>
                  <span className="text-muted-foreground line-through">{inr(product.mrp)}</span>
                  <span className="rounded-lg bg-highlight px-2 py-0.5 text-xs font-bold text-highlight-foreground">
                    {off}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>

            <div className="mt-4">
              <AddButton product={product} size="lg" />
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <h3 className="mt-5 font-display text-sm font-bold">Nutrition (per 100g)</h3>
            <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {product.nutrition.map((n) => (
                <div key={n.label} className="rounded-xl bg-secondary px-3 py-2">
                  <dt className="text-xs text-muted-foreground">{n.label}</dt>
                  <dd className="font-semibold">{n.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {alsoBought.length > 0 && (
          <section className="mt-6">
            <h3 className="font-display text-lg font-bold">Customers also bought</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {alsoBought.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
        {similar.length > 0 && (
          <section className="mt-6">
            <h3 className="font-display text-lg font-bold">Similar products</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {similar.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
}
