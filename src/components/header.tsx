import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDown, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { inr } from "@/data/catalog";
import { useBill } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useAuth } from "@/store/auth";
import { SearchBar } from "./search-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const addresses = [
  "Koramangala 4th Block, Bengaluru",
  "HSR Layout Sector 2, Bengaluru",
  "Indiranagar 100ft Road, Bengaluru",
];

export function Header() {
  const bill = useBill();
  const { address, setAddress, setCartOpen, dark, toggleDark } = useUI();
  const { user, setLoginOpen } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-lg">
            🥬
          </span>
          <span className="hidden font-display text-lg font-extrabold tracking-tight sm:block">
            Fresh<span className="text-primary">Dash</span>
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="hidden max-w-56 shrink-0 text-left md:block">
            <span className="flex items-center gap-1 text-sm font-bold">
              Delivery in 10 mins
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="truncate">{address}</span>
              <ChevronDown className="h-3 w-3 shrink-0" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {addresses.map((a) => (
              <DropdownMenuItem key={a} onClick={() => setAddress(a)}>
                {a}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        <button
          type="button"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          className="hidden h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-secondary sm:grid"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {user ? (
          <Link
            to="/profile"
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold hover:bg-secondary sm:flex"
          >
            <User className="h-4 w-4" /> Account
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold hover:bg-secondary sm:block"
          >
            Login
          </button>
        )}

        <motion.button
          id="cart-anchor"
          type="button"
          onClick={() => setCartOpen(true)}
          key={bill.count}
          initial={{ scale: 1 }}
          animate={{ scale: bill.count ? [1, 1.12, 1] : 1 }}
          transition={{ duration: 0.3 }}
          aria-label={`Cart, ${bill.count} items`}
          className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-3 font-bold text-primary-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          {bill.count > 0 ? (
            <span className="hidden text-left text-xs leading-tight sm:block">
              <span className="block">{bill.count} items</span>
              <span className="block">{inr(bill.itemTotal)}</span>
            </span>
          ) : (
            <span className="hidden text-sm sm:block">Cart</span>
          )}
          {bill.count > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] text-accent-foreground sm:hidden">
              {bill.count}
            </span>
          )}
        </motion.button>
      </div>
    </header>
  );
}
