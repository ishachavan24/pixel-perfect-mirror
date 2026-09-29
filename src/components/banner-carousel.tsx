import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";

const banners = [
  { img: banner1, title: "Fresh veggies, picked today", sub: "Up to 40% off farm produce" },
  { img: banner2, title: "Snack attack o'clock", sub: "Buy 2 get 1 on party packs" },
  { img: banner3, title: "Dairy in 10 minutes", sub: "Milk, paneer & eggs, always fresh" },
];

export function BannerCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-3xl sm:aspect-[16/5]">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={banners[i].img}
            alt={banners[i].title}
            width={1600}
            height={640}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-center gap-1 p-5 sm:p-10">
        <motion.h2
          key={`t${i}`}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="max-w-[55%] font-display text-xl font-extrabold text-primary-foreground drop-shadow sm:text-4xl"
        >
          {banners[i].title}
        </motion.h2>
        <motion.p
          key={`s${i}`}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="max-w-[55%] text-xs font-medium text-primary-foreground/90 sm:text-base"
        >
          {banners[i].sub}
        </motion.p>
      </div>

      <div className="absolute bottom-3 left-5 flex gap-1.5 sm:left-10">
        {banners.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show banner ${idx + 1}`}
            onClick={() => setI(idx)}
            className={
              idx === i
                ? "h-1.5 w-6 rounded-full bg-primary-foreground"
                : "h-1.5 w-1.5 rounded-full bg-primary-foreground/60"
            }
          />
        ))}
      </div>
    </div>
  );
}
