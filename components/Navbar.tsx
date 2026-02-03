"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [desktopRemediesOpen, setDesktopRemediesOpen] = useState(false);
  const [mobileRemediesOpen, setMobileRemediesOpen] = useState(false);

  const [query, setQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const remediesButtonRef = useRef<HTMLButtonElement>(null);

  const { items } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const pathname = usePathname();
  const router = useRouter();

  /* ---------------- DESKTOP DROPDOWN OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        remediesButtonRef.current &&
        !remediesButtonRef.current.contains(e.target as Node)
      ) {
        setDesktopRemediesOpen(false);
      }
    };

    if (desktopRemediesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [desktopRemediesOpen]);

  /* ---------------- NAV HANDLER ---------------- */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
    setMenuOpen(false);
    setMobileRemediesOpen(false);

    if (item === "Home") {
      e.preventDefault();
      pathname === "/"
        ? window.scrollTo({ top: 0, behavior: "smooth" })
        : router.push("/");
    }
  };

  /* ---------------- SEARCH LOGIC ---------------- */
  const performSearch = () => {
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") performSearch();
  };

  const handleSearchClick = () => {
    if (searchOpen && query.trim()) {
      performSearch();
    } else {
      setSearchOpen((p) => !p);
    }
  };

  const remedyCategories = [
    { label: "All Remedies", slug: "remedies" },
    { label: "Wealth", slug: "remedies/wealth" },
    { label: "Health", slug: "remedies/health" },
    { label: "Relationship", slug: "remedies/relationship" },
    { label: "Protection", slug: "remedies/protection" },
    { label: "Self-Confidence", slug: "remedies/self-confidence" },
    { label: "Education", slug: "remedies/education" },
    { label: "Crown Chakra", slug: "remedies/crown-chakra" },
    { label: "Third Eye Chakra", slug: "remedies/third-eye-chakra" },
    { label: "Throat Chakra", slug: "remedies/throat-chakra" },
    { label: "Heart Chakra", slug: "remedies/heart-chakra" },
    { label: "Solar Plexus Chakra", slug: "remedies/solar-plexus-chakra" },
    { label: "Sacral Chakra", slug: "remedies/sacral-chakra" },
    { label: "Root Chakra", slug: "remedies/root-chakra" },
  ];

  const navItems = ["Home", "Shop", "Collections"];

  return (
    <>
      <div className="sticky top-0 z-50 bg-white border-b border-[#e6cfa7]/20">
        <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
          <Link href="/">
            <Image
              src="/assets/logo6.png"
              alt="Arya Madam"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* ---------------- DESKTOP NAV ---------------- */}
          <div className="hidden md:flex gap-10 items-center">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-black hover:text-[#E76F51]"
              >
                {item}
              </Link>
            ))}

            <div className="relative">
              <button
                ref={remediesButtonRef}
                onClick={() => setDesktopRemediesOpen((p) => !p)}
                className="flex items-center gap-1 text-black hover:text-[#E76F51]"
              >
                Remedies
                <ChevronDown
                  className={`w-4 h-4 transition ${
                    desktopRemediesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <Link href="/about" className="text-black hover:text-[#E76F51]">
              About
            </Link>
            <Link href="/contact" className="text-black hover:text-[#E76F51]">
              Contact
            </Link>
          </div>

          {/* ---------------- RIGHT ICONS ---------------- */}
          <div className="flex items-center gap-4 relative">
            <Search
              className="w-6 h-6 text-black cursor-pointer"
              onClick={handleSearchClick}
            />

            {searchOpen && (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Search products..."
                className="absolute top-10 right-0 w-64 px-3 py-2 rounded border 
                bg-white shadow 
                text-black placeholder:text-gray-500 caret-black"
                autoFocus
              />
            )}

            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="w-6 h-6 text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e6cfa7] h-5 w-5 rounded-full text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden text-black"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* ---------------- MOBILE MENU ---------------- */}
        {menuOpen && (
          <div className="md:hidden px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className="block py-2 text-black"
              >
                {item}
              </Link>
            ))}

            <button
              onClick={() => setMobileRemediesOpen((p) => !p)}
              className="flex justify-between w-full py-2 text-black"
            >
              Remedies
              <ChevronDown
                className={`transition ${
                  mobileRemediesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileRemediesOpen && (
              <div className="ml-4 space-y-2 bg-[#e6cfa7]/10 p-3 rounded">
                {remedyCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileRemediesOpen(false);
                    }}
                    className="block py-2 text-sm text-black"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------------- DESKTOP REMEDIES DROPDOWN ---------------- */}
      {desktopRemediesOpen && (
        <div
          ref={dropdownRef}
          className="hidden md:block fixed top-[80px] left-1/2 -translate-x-1/2 
          bg-white border rounded shadow-xl w-56 z-50"
        >
          {remedyCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              onClick={() => setDesktopRemediesOpen(false)}
              className="block px-4 py-2 text-black hover:bg-[#e6cfa7]/20"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}