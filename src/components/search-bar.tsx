import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { inr, searchProducts } from "@/data/catalog";
import { useUI } from "@/store/ui";

const rotating = ["milk", "atta", "paneer", "cold drinks", "bananas", "chips"];

export function SearchBar() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const recent = useUI((s) => s.recentSearches);
  const pushSearch = useUI((s) => s.pushSearch);
  const openProduct = useUI((s) => s.openProduct);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const suggestions = value.trim() ? searchProducts(value).slice(0, 6) : [];

  const submit = (q: string) => {
    if (!q.trim()) return;
    pushSearch(q.trim());
    setFocused(false);
    navigate({ to: "/search", search: { q: q.trim() } });
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        role="search"
      >
        <div className="flex h-11 items-center gap-2 rounded-xl border border-border bg-secondary px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="relative w-full">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              aria-label="Search products"
              className="h-11 w-full bg-transparent text-sm outline-none"
            />
            {!value && (
              <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden text-sm text-muted-foreground">
                <span className="mr-1">Search</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={idx}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    "{rotating[idx]}"
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>
          {value && (
            <button type="button" aria-label="Clear search" onClick={() => setValue("")}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {focused && (suggestions.length > 0 || recent.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-lift"
          >
            {suggestions.length === 0 && (
              <div className="p-3">
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                  Recent searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => submit(r)}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {suggestions.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setFocused(false);
                  openProduct(p.id);
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-secondary"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-lg">
                  {p.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{p.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {p.brand} · {p.unit}
                  </span>
                </span>
                <span className="text-sm font-bold">{inr(p.price)}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
