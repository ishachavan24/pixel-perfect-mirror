import { create } from "zustand";
import { persist } from "zustand/middleware";
import { coupons, productById, type Product } from "@/data/catalog";

export type CartLine = { productId: string; qty: number };

type CartState = {
  lines: CartLine[];
  couponCode: string | null;
  tip: number;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  clearCoupon: () => void;
  setTip: (tip: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      couponCode: null,
      tip: 0,
      add: (productId) =>
        set((s) => {
          const existing = s.lines.find((l) => l.productId === productId);
          if (existing)
            return {
              lines: s.lines.map((l) =>
                l.productId === productId ? { ...l, qty: l.qty + 1 } : l,
              ),
            };
          return { lines: [...s.lines, { productId, qty: 1 }] };
        }),
      remove: (productId) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.productId === productId ? { ...l, qty: l.qty - 1 } : l))
            .filter((l) => l.qty > 0),
        })),
      setQty: (productId, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.productId !== productId)
              : s.lines.map((l) => (l.productId === productId ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [], couponCode: null, tip: 0 }),
      applyCoupon: (code) => {
        const c = coupons.find((x) => x.code === code.trim().toUpperCase());
        if (!c) return { ok: false, message: "That coupon code isn't valid." };
        const sub = subtotalOf(get().lines);
        if (sub < c.minOrder)
          return { ok: false, message: `Add ₹${c.minOrder - sub} more to use ${c.code}.` };
        set({ couponCode: c.code });
        return { ok: true, message: `${c.code} applied!` };
      },
      clearCoupon: () => set({ couponCode: null }),
      setTip: (tip) => set({ tip }),
    }),
    { name: "freshdash-cart" },
  ),
);

export function subtotalOf(lines: CartLine[]) {
  return lines.reduce((sum, l) => {
    const p = productById(l.productId);
    return p ? sum + p.price * l.qty : sum;
  }, 0);
}

export type Bill = {
  items: { product: Product; qty: number }[];
  count: number;
  itemTotal: number;
  mrpTotal: number;
  deliveryFee: number;
  handlingFee: number;
  gst: number;
  discount: number;
  tip: number;
  total: number;
  savings: number;
};

export function useBill(): Bill {
  const { lines, couponCode, tip } = useCart();
  return computeBill(lines, couponCode, tip);
}

export function computeBill(lines: CartLine[], couponCode: string | null, tip: number): Bill {
  const items = lines
    .map((l) => ({ product: productById(l.productId)!, qty: l.qty }))
    .filter((i) => i.product);
  const itemTotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const mrpTotal = items.reduce((s, i) => s + i.product.mrp * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const deliveryFee = itemTotal === 0 || itemTotal >= 199 ? 0 : 25;
  const handlingFee = itemTotal === 0 ? 0 : 9;
  const gst = Math.round(itemTotal * 0.05 * 100) / 100;

  let discount = 0;
  const c = coupons.find((x) => x.code === couponCode);
  if (c && itemTotal >= c.minOrder)
    discount = c.type === "flat" ? c.value : Math.round((itemTotal * c.value) / 100);

  const total = Math.max(0, itemTotal + deliveryFee + handlingFee + gst - discount + tip);
  return {
    items,
    count,
    itemTotal,
    mrpTotal,
    deliveryFee,
    handlingFee,
    gst,
    discount,
    tip,
    total: Math.round(total),
    savings: mrpTotal - itemTotal + discount,
  };
}
