import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Bill } from "./cart";

export type OrderStatus = "placed" | "packed" | "out_for_delivery" | "delivered";

export type Order = {
  id: string;
  createdAt: number;
  status: OrderStatus;
  items: { productId: string; name: string; emoji: string; qty: number; price: number }[];
  total: number;
  savings: number;
  paymentMethod: string;
  address: string;
  etaMinutes: number;
};

type OrderState = {
  orders: Order[];
  place: (bill: Bill, paymentMethod: string, address: string) => Order;
  advance: (id: string, status: OrderStatus) => void;
};

export const useOrders = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      place: (bill, paymentMethod, address) => {
        const order: Order = {
          id: `FD${Date.now().toString().slice(-8)}`,
          createdAt: Date.now(),
          status: "placed",
          items: bill.items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            emoji: i.product.emoji,
            qty: i.qty,
            price: i.product.price,
          })),
          total: bill.total,
          savings: bill.savings,
          paymentMethod,
          address,
          etaMinutes: 10,
        };
        set((s) => ({ orders: [order, ...s.orders] }));
        return order;
      },
      advance: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
    }),
    { name: "freshdash-orders" },
  ),
);

export const statusSteps: { key: OrderStatus; label: string }[] = [
  { key: "placed", label: "Order placed" },
  { key: "packed", label: "Packed" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];
