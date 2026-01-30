"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
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
  const [remediesOpen, setRemediesOpen] = useState(false);
  const [query, setQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { items } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setRemediesOpen(false);
      }
    };

    if (remediesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [remediesOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
    setMenuOpen(false);
    setRemediesOpen(false);

    if (item === "Home") {
      e.preventDefault();
      pathname === "/"
        ? window.scrollTo({ top: 0, behavior: "smooth" })
        : router.push("/");
    }

    if (item === "Contact") {
      e.preventDefault();
      pathname === "/contact"
        ? document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        : router.push("/contact#contact");
    }

    if (item === "About") {
      e.preventDefault();
      pathname === "/about"
        ? document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        : router.push("/about#about");
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.replace(`?q=${encodeURIComponent(query)}`, { scroll: false });
      setSearchOpen(false);
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
      <div
        className={`sticky top-0 z-50 transition-all
        ${scrolled ? "bg-white backdrop-blur-md" : "bg-white"}
        border-b border-[#e6cfa7]/20`}
      >
        <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
  <Image
    src="/assets/logo.jpeg"
    alt="Arya Madam"
    width={140}
    height={40}
    priority
    className="object-contain"
  />
</Link>



          <div className="hidden md:flex gap-10 items-center">
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

            {/* REMEDIES DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setRemediesOpen(!remediesOpen)}
                className="flex items-center gap-1 text-black hover:text-[#E76F51] transition"
              >
                Remedies
                <ChevronDown className={`w-4 h-4 transition-transform ${remediesOpen ? 'rotate-180' : ''}`} />
              </button>

              {remediesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#e6cfa7]/40 rounded-lg shadow-xl py-2 max-h-[70vh] overflow-y-auto z-[100]">
                  {remedyCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      onClick={() => setRemediesOpen(false)}
                      className="block px-4 py-2 text-black hover:bg-[#e6cfa7]/20 hover:text-[#E76F51] transition"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about#about"
              onClick={(e) => handleNavClick(e, "About")}
              className="text-black hover:text-[#E76F51] transition"
            >
              About
            </Link>

            <Link
              href="/contact#contact"
              onClick={(e) => handleNavClick(e, "Contact")}
              className="text-black hover:text-[#E76F51] transition"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="w-6 h-6 text-black cursor-pointer"
                onClick={() => setSearchOpen((p) => !p)}
              />

              {searchOpen && (
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search products..."
                  className="absolute right-0 mt-3 w-64 px-4 py-2 rounded-lg
                  bg-white border border-[#e6cfa7]/40 text-black
                  shadow-xl outline-none z-[100]"
                />
              )}
            </div>

            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="w-6 h-6 text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full
                bg-[#e6cfa7] text-xs font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button onClick={() => setMenuOpen((p) => !p)} className="md:hidden">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-[rgb(44_95_124)]/95 px-6 py-6 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className="block text-white text-lg"
              >
                {item}
              </Link>
            ))}

            {/* MOBILE REMEDIES */}
            <div>
              <button
                onClick={() => setRemediesOpen(!remediesOpen)}
                className="flex items-center justify-between w-full text-white text-lg"
              >
                Remedies
                <ChevronDown className={`w-5 h-5 transition-transform ${remediesOpen ? 'rotate-180' : ''}`} />
              </button>

              {remediesOpen && (
                <div className="mt-4 ml-4 space-y-3">
                  {remedyCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      onClick={() => {
                        setMenuOpen(false);
                        setRemediesOpen(false);
                      }}
                      className="block text-white/90 hover:text-white"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about#about"
              onClick={(e) => handleNavClick(e, "About")}
              className="block text-white text-lg"
            >
              About
            </Link>

            <Link
              href="/contact#contact"
              onClick={(e) => handleNavClick(e, "Contact")}
              className="block text-white text-lg"
            >
              Contact
            </Link>
          </div>
        )}
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}