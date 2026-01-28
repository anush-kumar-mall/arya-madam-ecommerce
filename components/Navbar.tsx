"use client";

import React, { useEffect, useState } from "react";
import {
  Palette,
  Search,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { items } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const pathname = usePathname();
  const router = useRouter();

  /* ===== SCROLL EFFECT ===== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== CENTRAL NAV HANDLER ===== */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
    setMenuOpen(false);

    if (item === "Home") {
      e.preventDefault();
      pathname === "/"
        ? window.scrollTo({ top: 0, behavior: "smooth" })
        : router.push("/");
    }

    if (item === "Contact") {
      e.preventDefault();
      pathname === "/contact"
        ? document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        : router.push("/contact#contact");
    }

    if (item === "About") {
      e.preventDefault();
      pathname === "/about"
        ? document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        : router.push("/about#about");
    }
  };

  /* ===== SEARCH HANDLER ===== */
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.replace(`?q=${encodeURIComponent(query)}`, {
        scroll: false,
      });
      setSearchOpen(false);
    }
  };

  const navItems = [
    "Home",
    "Shop",
    "Collections",
    "Remedies",
    "Gallery",
    "About",
    "Contact",
  ];

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <div
        className={`sticky top-0 z-50 transition-all
        ${scrolled ? "bg-white backdrop-blur-md" : "bg-white"}
        border-b border-[#e6cfa7]/20`}
      >
        <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
          {/* ===== LOGO ===== */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "Home")}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-[rgb(44_95_124)] rounded-xl border border-[#e6cfa7]/40 flex items-center justify-center">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <span className="text-[rgb(44_95_124)] text-lg font-bold">
              Arya Madam Craft Supplies
            </span>
          </Link>

          {/* ===== DESKTOP LINKS ===== */}
          <div className="hidden md:flex gap-10">
            {navItems.map((item) => {
              const href =
                item === "Home"
                  ? "/"
                  : item === "Contact"
                  ? "/contact#contact"
                  : item === "About"
                  ? "/about#about"
                  : `/${item.toLowerCase()}`;

              return (
                <Link
                  key={item}
                  href={href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-black hover:text-[#E76F51] transition"
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex gap-4 items-center">
            {/* SEARCH */}
            <div className="relative">
              <Search
                className="w-6 h-6 text-black cursor-pointer"
                onClick={() => setSearchOpen((p) => !p)}
              />

              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search products..."
                  className="absolute right-0 mt-3 w-64 px-4 py-2 rounded-lg
                             bg-white border border-[#e6cfa7]/40
                             text-black placeholder:text-[#eadbc4]/60
                             shadow-xl outline-none"
                />
              )}
            </div>

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative hover:scale-105 transition"
            >
              <ShoppingCart className="w-6 h-6 text-black" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full
                             bg-[#e6cfa7] text-xs font-bold
                             flex items-center justify-center text-[#3b2a1a]"
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* ===== HAMBURGER ===== */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden"
            >
              {menuOpen ? (
                <X className="w-7 h-7 text-black" />
              ) : (
                <Menu className="w-7 h-7 text-black" />
              )}
            </button>
          </div>
        </nav>

        {/* ===== MOBILE MENU (BLUE THEME) ===== */}
        {menuOpen && (
          <div className="md:hidden bg-[rgb(44_95_124)]/95 backdrop-blur-md border-t border-white/20">
            <div className="flex flex-col px-6 py-6 gap-6">
              {navItems.map((item) => {
                const href =
                  item === "Home"
                    ? "/"
                    : item === "Contact"
                    ? "/contact#contact"
                    : item === "About"
                    ? "/about#about"
                    : `/${item.toLowerCase()}`;

                return (
                  <Link
                    key={item}
                    href={href}
                    onClick={(e) => handleNavClick(e, item)}
                    className="text-white text-lg
                               hover:text-[#eadbc4]
                               transition"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ===== CART DRAWER ===== */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}