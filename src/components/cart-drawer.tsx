import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { BadgePercent, Clock, ShoppingBag, Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { inr, productById } from "@/data/catalog";
import { useBill, useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { AddButton } from "./add-button";
import { Slider } from "@/components/ui/slider";

export function CartDrawer() {
  const navigate = useNavigate();
  const { cartOpen, setCartOpen, address } = useUI();
  const bill = useBill();
  const { couponCode, applyCoupon, clearCoupon, setTip, tip } = useCart();
  const [code, setCode] = useState("");

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-label="Your cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-background shadow-lift sm:rounded-l-3xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="font-display text-lg font-extrabold">My Cart</h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-xl hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {bill.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <span className="text-6xl">🛒</span>
                <p className="font-display text-lg font-bold">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add fresh picks and get them in 10 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-primary-foreground"
                >
                  Start shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
                  {bill.savings > 0 && (
                    <div className="flex items-center gap-2 rounded-xl bg-primary-soft px-3 py-2 text-sm font-semibold text-primary">
                      <BadgePercent className="h-4 w-4" />
                      You save {inr(bill.savings)} on this order
                    </div>
                  )}
                  <div className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Delivery in 10 minutes</span>
                    <span className="ml-auto truncate text-xs text-muted-foreground">
                      {address.split(",")[0]}
                    </span>
                  </div>

                  {bill.items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-secondary text-2xl">
                        {product.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.unit}</p>
                        <p className="text-sm font-bold">{inr(product.price * qty)}</p>
                      </div>
                      <AddButton product={product} />
                    </div>
                  ))}

                  <div className="rounded-2xl border border-dashed border-border p-3">
                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Tag className="h-4 w-4 text-primary" /> Apply a coupon
                    </p>
                    {couponCode ? (
                      <div className="flex items-center justify-between rounded-xl bg-primary-soft px-3 py-2 text-sm font-semibold text-primary">
                        {couponCode} applied
                        <button type="button" onClick={clearCoupon} className="text-xs underline">
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="FRESH50"
                          aria-label="Coupon code"
                          className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm uppercase outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const r = applyCoupon(code);
                            r.ok ? toast.success(r.message) : toast.error(r.message);
                          }}
                          className="h-10 shrink-0 rounded-xl bg-secondary px-4 text-sm font-bold"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Try FRESH50, SAVE10 or BIG100.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border p-3">
                    <p className="text-sm font-semibold">Tip your delivery partner</p>
                    <p className="text-xs text-muted-foreground">
                      100% of the tip goes to the rider — currently {inr(tip)}
                    </p>
                    <Slider
                      value={[tip]}
                      onValueChange={(v) => setTip(v[0])}
                      max={100}
                      step={10}
                      className="mt-3"
                      aria-label="Tip amount"
                    />
                  </div>

                  <div className="rounded-2xl border border-border p-3 text-sm">
                    <p className="mb-2 font-semibold">Bill details</p>
                    <Row label="Item total" value={inr(bill.itemTotal)} />
                    <Row
                      label="Delivery fee"
                      value={bill.deliveryFee === 0 ? "FREE" : inr(bill.deliveryFee)}
                    />
                    <Row label="Handling fee" value={inr(bill.handlingFee)} />
                    <Row label="GST" value={inr(bill.gst)} />
                    {bill.discount > 0 && (
                      <Row label="Coupon discount" value={`-${inr(bill.discount)}`} highlight />
                    )}
                    {bill.tip > 0 && <Row label="Delivery tip" value={inr(bill.tip)} />}
                    <div className="mt-2 flex justify-between border-t border-border pt-2 font-bold">
                      <span>To pay</span>
                      <span>{inr(bill.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border p-4">
                  <button
                    type="button"
                    onClick={() => {
                      setCartOpen(false);
                      navigate({ to: "/checkout" });
                    }}
                    className="flex h-14 w-full items-center justify-between rounded-2xl bg-primary px-5 font-bold text-primary-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" /> {inr(bill.total)}
                    </span>
                    <span>Proceed to pay →</span>
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between py-0.5">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "font-semibold text-primary" : ""}>{value}</span>
    </div>
  );
}
