import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className ?? "mx-auto max-w-7xl px-4 py-5"}
    >
      {children}
    </motion.main>
  );
}

export function EmptyState({
  emoji,
  title,
  body,
  action,
}: {
  emoji: string;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-border py-16 text-center">
      <span className="text-6xl" aria-hidden>
        {emoji}
      </span>
      <p className="font-display text-lg font-bold">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
      {action}
    </div>
  );
}
