import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { categories } from "@/data/catalog";

export function CategoryRow() {
  return (
    <nav aria-label="Categories" className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 py-2">
      {categories.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          <Link
            to="/category/$slug"
            params={{ slug: c.slug }}
            className="group flex w-20 shrink-0 flex-col items-center gap-1.5 text-center"
          >
            <span className="grid h-20 w-20 place-items-center rounded-2xl bg-primary-soft text-3xl transition-transform group-hover:-translate-y-1">
              {c.emoji}
            </span>
            <span className="text-[11px] font-semibold leading-tight">{c.name}</span>
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}
