import { motion } from "framer-motion";
import { Clock, Heart, Star } from "lucide-react";
import { discountPct, inr, type Product } from "@/data/catalog";
import { useUI } from "@/store/ui";
import { AddButton } from "./add-button";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const openProduct = useUI((s) => s.openProduct);
  const wishlist = useUI((s) => s.wishlist);
  const toggleWishlist = useUI((s) => s.toggleWishlist);
  const off = discountPct(product);
  const wished = wishlist.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full w-full flex-col rounded-2xl border border-border bg-card p-3 shadow-card transition-shadow hover:shadow-lift"
    >
      {off > 0 && (
        <span className="absolute left-0 top-3 z-10 rounded-r-lg bg-highlight px-2 py-0.5 text-[11px] font-bold text-highlight-foreground">
          {off}% OFF
        </span>
      )}
      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-highlight"
      >
        <Heart className={cn("h-4 w-4", wished && "fill-highlight text-highlight")} />
      </button>

      <button
        type="button"
        onClick={() => openProduct(product.id)}
        className="grid aspect-square w-full place-items-center rounded-xl bg-secondary text-6xl transition-transform group-hover:scale-[1.03]"
        aria-label={`View ${product.name}`}
      >
        <span aria-hidden>{product.emoji}</span>
      </button>

      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
        <Clock className="h-3 w-3" />
        {product.eta} MINS
      </div>

      <button
        type="button"
        onClick={() => openProduct(product.id)}
        className="mt-1 line-clamp-2 text-left text-sm font-semibold leading-snug text-foreground"
      >
        {product.name}
      </button>
      <p className="mt-0.5 text-xs text-muted-foreground">{product.unit}</p>

      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <Star className="h-3 w-3 fill-accent text-accent" />
        {product.rating}
      </div>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground">{inr(product.price)}</p>
          {off > 0 && (
            <p className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</p>
          )}
        </div>
        <AddButton product={product} />
      </div>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-3">
      <div className="aspect-square w-full animate-pulse rounded-xl bg-muted" />
      <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-9 w-full animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
