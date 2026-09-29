import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Fly = { id: number; emoji: string; from: { x: number; y: number } };

const EVENT = "freshdash:fly";

export function flyToCart(emoji: string, from: { x: number; y: number }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { emoji, from } }));
}

export function FlyLayer() {
  const [flights, setFlights] = useState<Fly[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { emoji: string; from: { x: number; y: number } };
      const id = Date.now() + Math.random();
      setFlights((f) => [...f, { id, ...detail }]);
      window.setTimeout(() => setFlights((f) => f.filter((x) => x.id !== id)), 750);
    };
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  const target = () => {
    if (typeof document === "undefined") return { x: 0, y: 0 };
    const el = document.getElementById("cart-anchor");
    if (!el) return { x: window.innerWidth - 60, y: 40 };
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden>
      <AnimatePresence>
        {flights.map((f) => {
          const to = target();
          return (
            <motion.span
              key={f.id}
              initial={{ x: f.from.x, y: f.from.y, scale: 1, opacity: 1 }}
              animate={{
                x: [f.from.x, (f.from.x + to.x) / 2, to.x],
                y: [f.from.y, Math.min(f.from.y, to.y) - 140, to.y],
                scale: [1, 1.15, 0.3],
                opacity: [1, 1, 0.2],
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute left-0 top-0 text-3xl"
            >
              {f.emoji}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
