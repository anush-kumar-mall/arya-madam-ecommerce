"use client";

import React, { useEffect, useState } from "react";
import { Palette, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import CartDrawer from "@/components/CartDrawer";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const pathname = usePathname(); // current route
  const router = useRouter();     // for navigation

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`
          sticky top-0 z-50
          transition-all duration-700
          ${scrolled ? "bg-black/80 backdrop-blur-md" : "bg-[#2b1d12]/60"}
          border-b border-[#e6cfa7]/20
        `}
      >
        <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 bg-[#4a3323]/80 rounded-xl border border-[#e6cfa7]/40 flex items-center justify-center">
              <Palette className="w-7 h-7 text-[#e6cfa7]" />
            </div>
            <span className="text-[#fdfaf6] text-xl md:text-2xl font-bold">
              Arya Madam Craft Supplies
            </span>
          </Link>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-10">
            {["Home", "Shop", "Collections", "About", "Contact"].map((item) => {
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                // Home special behavior
                if (item === "Home") {
                  e.preventDefault();
                  if (pathname === "/") {
                    // Already on home → scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    // Navigate to home page
                    router.push("/");
                  }
                }
              };

              // Normal href
              const href =
                item === "About" ? "/about" : `/${item.toLowerCase()}`;

              return (
                <Link
                  key={item}
                  href={href}
                  onClick={handleClick}
                  className="text-[#eadbc4] hover:text-[#fdfaf6] hover:scale-105 transition-transform cursor-pointer"
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 relative">
            <Search
              className="w-6 h-6 text-[#eadbc4] cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setSearchOpen((prev) => !prev)}
            />

            {searchOpen && (
              <input
                type="text"
                placeholder="Search products..."
                className="ml-2 px-3 py-1 rounded bg-[#3b2a1a] text-[#fdfaf6] placeholder-[#eadbc4] focus:outline-none transition-all duration-300"
                autoFocus
              />
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="relative cursor-pointer hover:scale-110 transition-transform"
            >
              <ShoppingCart className="w-6 h-6 text-[#eadbc4]" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#e6cfa7] text-xs font-bold text-[#3b2a1a] flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
