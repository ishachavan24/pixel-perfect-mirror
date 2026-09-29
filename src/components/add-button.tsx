import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useCart } from "@/store/cart";
import type { Product } from "@/data/catalog";
import { flyToCart } from "./fly-to-cart";
import { cn } from "@/lib/utils";

export function AddButton({
  product,
  size = "sm",
}: {
  product: Product;
  size?: "sm" | "lg";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lines = useCart((s) => s.lines);
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const qty = lines.find((l) => l.productId === product.id)?.qty ?? 0;
  const soldOut = product.stock === 0;

  const handleAdd = () => {
    if (soldOut) return;
    if (qty >= product.stock) {
      toast.error(`Only ${product.stock} left in stock`);
      return;
    }
    add(product.id);
    const r = ref.current?.getBoundingClientRect();
    if (r) flyToCart(product.emoji, { x: r.left, y: r.top });
  };

  const base = size === "lg" ? "h-12 min-w-32 text-base" : "h-9 min-w-[4.5rem] text-sm";

  if (soldOut) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-border bg-muted px-3 font-semibold text-muted-foreground",
          base,
        )}
      >
        Sold out
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {qty === 0 ? (
          <motion.button
            key="add"
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            whileTap={{ scale: 0.94 }}
            className={cn(
              "rounded-xl border-2 border-primary bg-primary-soft px-4 font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
              base,
            )}
          >
            Add
          </motion.button>
        ) : (
          <motion.div
            key="stepper"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className={cn(
              "flex items-center justify-between rounded-xl bg-primary px-1 font-bold text-primary-foreground",
              base,
            )}
          >
            <button
              type="button"
              aria-label={`Remove one ${product.name}`}
              onClick={() => remove(product.id)}
              className="grid h-full w-8 place-items-center rounded-lg"
            >
              <Minus className="h-4 w-4" />
            </button>
            <motion.span key={qty} initial={{ scale: 1.4 }} animate={{ scale: 1 }}>
              {qty}
            </motion.span>
            <button
              type="button"
              aria-label={`Add one more ${product.name}`}
              onClick={handleAdd}
              className="grid h-full w-8 place-items-center rounded-lg"
            >
              <Plus className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
