import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = { name: string; phone: string };

type AuthState = {
  user: User | null;
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
  signIn: (user: User) => void;
  signOut: () => void;
};

/**
 * Mock auth for the seeded build. Phase 2 replaces this with Lovable Cloud
 * phone/email OTP auth; the component API stays the same.
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loginOpen: false,
      setLoginOpen: (loginOpen) => set({ loginOpen }),
      signIn: (user) => set({ user, loginOpen: false }),
      signOut: () => set({ user: null }),
    }),
    { name: "freshdash-auth", partialize: (s) => ({ user: s.user }) },
  ),
);
