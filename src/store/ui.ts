import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  productId: string | null;
  openProduct: (id: string | null) => void;
  address: string;
  setAddress: (a: string) => void;
  dark: boolean;
  toggleDark: () => void;
  recentSearches: string[];
  pushSearch: (q: string) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
};

export const useUI = create<UIState>()(
  persist(
    (set) => ({
      cartOpen: false,
      setCartOpen: (cartOpen) => set({ cartOpen }),
      productId: null,
      openProduct: (productId) => set({ productId }),
      address: "Koramangala 4th Block, Bengaluru",
      setAddress: (address) => set({ address }),
      dark: false,
      toggleDark: () =>
        set((s) => {
          const dark = !s.dark;
          if (typeof document !== "undefined")
            document.documentElement.classList.toggle("dark", dark);
          return { dark };
        }),
      recentSearches: [],
      pushSearch: (q) =>
        set((s) => ({
          recentSearches: [q, ...s.recentSearches.filter((x) => x !== q)].slice(0, 6),
        })),
      wishlist: [],
      toggleWishlist: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((x) => x !== id)
            : [...s.wishlist, id],
        })),
    }),
    {
      name: "freshdash-ui",
      partialize: (s) => ({
        address: s.address,
        dark: s.dark,
        recentSearches: s.recentSearches,
        wishlist: s.wishlist,
      }),
    },
  ),
);
