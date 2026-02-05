"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [desktopRemediesOpen, setDesktopRemediesOpen] = useState(false);
  const [desktopCreativeOpen, setDesktopCreativeOpen] = useState(false);
  const [desktopCrystalsOpen, setDesktopCrystalsOpen] = useState(false);

  const [mobileRemediesOpen, setMobileRemediesOpen] = useState(false);
  const [mobileCreativeOpen, setMobileCreativeOpen] = useState(false);
  const [mobileCrystalsOpen, setMobileCrystalsOpen] = useState(false);

  // For nested submenus (mobile)
  const [mobileCoirOpen, setMobileCoirOpen] = useState(false);
  const [mobileAnkletsOpen, setMobileAnkletsOpen] = useState(false);
  const [mobileRemediesSubOpen, setMobileRemediesSubOpen] = useState(false);
  const [mobileThakurOpen, setMobileThakurOpen] = useState(false);
  const [mobileSageOpen, setMobileSageOpen] = useState(false);

  const [query, setQuery] = useState("");

  const dropdownRemediesRef = useRef<HTMLDivElement>(null);
  const remediesButtonRef = useRef<HTMLButtonElement>(null);

  const dropdownCreativeRef = useRef<HTMLDivElement>(null);
  const creativeButtonRef = useRef<HTMLButtonElement>(null);

  const dropdownCrystalsRef = useRef<HTMLDivElement>(null);
  const crystalsButtonRef = useRef<HTMLButtonElement>(null);

  const { items } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const pathname = usePathname();
  const router = useRouter();

  /* ---------------- DESKTOP DROPDOWN OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Remedies
      if (
        dropdownRemediesRef.current &&
        !dropdownRemediesRef.current.contains(e.target as Node) &&
        remediesButtonRef.current &&
        !remediesButtonRef.current.contains(e.target as Node)
      ) {
        setDesktopRemediesOpen(false);
      }

      // Creative
      if (
        dropdownCreativeRef.current &&
        !dropdownCreativeRef.current.contains(e.target as Node) &&
        creativeButtonRef.current &&
        !creativeButtonRef.current.contains(e.target as Node)
      ) {
        setDesktopCreativeOpen(false);
      }

      // Crystals
      if (
        dropdownCrystalsRef.current &&
        !dropdownCrystalsRef.current.contains(e.target as Node) &&
        crystalsButtonRef.current &&
        !crystalsButtonRef.current.contains(e.target as Node)
      ) {
        setDesktopCrystalsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- NAV HANDLER ---------------- */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
    setMenuOpen(false);
    setMobileRemediesOpen(false);
    setMobileCreativeOpen(false);
    setMobileCrystalsOpen(false);

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

  // Creative & Handcrafted menu structure
  const creativeCategories = [
    { label: "Art & Craft", slug: "creative/art-craft" },
    { label: "Handmade Occasion-Special Items", slug: "creative/handmade-special" },
    { label: "Jutt Item", slug: "creative/jutt-item" },
    { 
      label: "Coir Products", 
      slug: "creative/coir-products",
      submenu: [
        { label: "Dry Flowers", slug: "creative/coir-products/dry-flowers" }
      ]
    },
  ];

  // Crystals & Spiritual menu structure
  const crystalsCategories = [
    { label: "Natural Crystals", slug: "crystals/natural-crystals" },
    { label: "Crystal Frames", slug: "crystals/crystal-frames" },
    { label: "Crystal Birds", slug: "crystals/crystal-birds" },
    { label: "Crystal Trees", slug: "crystals/crystal-trees" },
    { label: "Crystal Angles", slug: "crystals/crystal-angles" },
    { label: "Crystal Balls", slug: "crystals/crystal-balls" },
    { label: "Crystal Rings", slug: "crystals/crystal-rings" },
    { 
      label: "Anklets", 
      slug: "crystals/anklets",
      submenu: [
        { label: "Crystal Clocks", slug: "crystals/anklets/crystal-clocks" },
        { label: "Crystal Pyramid", slug: "crystals/anklets/crystal-pyramid" },
        { label: "Crystal Pencils", slug: "crystals/anklets/crystal-pencils" },
        { label: "Crystal Box", slug: "crystals/anklets/crystal-box" },
        { label: "Crystal Idols", slug: "crystals/anklets/crystal-idols" },
        { label: "Pyrite Dust Frames", slug: "crystals/anklets/pyrite-dust-frames" },
        { label: "Crystal Seven Chakra Healing Frames", slug: "crystals/anklets/seven-chakra-frames" },
        { label: "Crystal Strings", slug: "crystals/anklets/crystal-strings" },
        { label: "Crystal Tortoise, Birds, Animals, Owls, Snake", slug: "crystals/anklets/crystal-animals" },
      ]
    },
    { 
      label: "Remedies", 
      slug: "crystals/remedies",
      submenu: [
        { label: "Vastu", slug: "crystals/remedies/vastu" }
      ]
    },
    { label: "Yantras", slug: "crystals/yantras" },
    { 
      label: "Thakur Ji Dresses", 
      slug: "crystals/thakur-ji-dresses",
      submenu: [
        { label: "Rudraksh", slug: "crystals/thakur-ji-dresses/rudraksh" },
        { label: "Pooja Items", slug: "crystals/thakur-ji-dresses/pooja-items" }
      ]
    },
    { 
      label: "Sage", 
      slug: "crystals/sage",
      submenu: [
        { label: "God Idols", slug: "crystals/sage/god-idols" }
      ]
    },
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

            {/* Creative & Handcrafted Dropdown */}
            <div className="relative">
              <button
                ref={creativeButtonRef}
                onClick={() => setDesktopCreativeOpen((p) => !p)}
                className="flex items-center gap-1 text-black hover:text-[#E76F51]"
              >
                Creative & Handcrafted
                <ChevronDown
                  className={`w-4 h-4 transition ${
                    desktopCreativeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Crystals & Spiritual Dropdown */}
            <div className="relative">
              <button
                ref={crystalsButtonRef}
                onClick={() => setDesktopCrystalsOpen((p) => !p)}
                className="flex items-center gap-1 text-black hover:text-[#E76F51]"
              >
                Crystals & Spiritual
                <ChevronDown
                  className={`w-4 h-4 transition ${
                    desktopCrystalsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Remedies Dropdown */}
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
          <div className="md:hidden px-6 py-4 space-y-3 max-h-[70vh] overflow-y-auto">
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

            {/* Creative & Handcrafted Mobile */}
            <button
              onClick={() => setMobileCreativeOpen((p) => !p)}
              className="flex justify-between w-full py-2 text-black"
            >
              Creative & Handcrafted
              <ChevronDown
                className={`transition ${mobileCreativeOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileCreativeOpen && (
              <div className="ml-4 space-y-2 bg-[#e6cfa7]/10 p-3 rounded">
                {creativeCategories.map((cat) => (
                  <div key={cat.slug}>
                    {cat.submenu ? (
                      <>
                        <button
                          onClick={() => setMobileCoirOpen((p) => !p)}
                          className="flex justify-between w-full py-2 text-sm text-black"
                        >
                          {cat.label}
                          <ChevronRight className={`w-4 h-4 transition ${mobileCoirOpen ? "rotate-90" : ""}`} />
                        </button>
                        {mobileCoirOpen && (
                          <div className="ml-4 space-y-1">
                            {cat.submenu.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/${sub.slug}`}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setMobileCreativeOpen(false);
                                  setMobileCoirOpen(false);
                                }}
                                className="block py-1 text-xs text-black"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={`/${cat.slug}`}
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileCreativeOpen(false);
                        }}
                        className="block py-2 text-sm text-black"
                      >
                        {cat.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Crystals & Spiritual Mobile */}
            <button
              onClick={() => setMobileCrystalsOpen((p) => !p)}
              className="flex justify-between w-full py-2 text-black"
            >
              Crystals & Spiritual
              <ChevronDown
                className={`transition ${mobileCrystalsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileCrystalsOpen && (
              <div className="ml-4 space-y-2 bg-[#e6cfa7]/10 p-3 rounded">
                {crystalsCategories.map((cat) => (
                  <div key={cat.slug}>
                    {cat.submenu ? (
                      <>
                        <button
                          onClick={() => {
                            if (cat.label === "Anklets") setMobileAnkletsOpen((p) => !p);
                            if (cat.label === "Remedies") setMobileRemediesSubOpen((p) => !p);
                            if (cat.label === "Thakur Ji Dresses") setMobileThakurOpen((p) => !p);
                            if (cat.label === "Sage") setMobileSageOpen((p) => !p);
                          }}
                          className="flex justify-between w-full py-2 text-sm text-black"
                        >
                          {cat.label}
                          <ChevronRight className={`w-4 h-4 transition ${
                            (cat.label === "Anklets" && mobileAnkletsOpen) ||
                            (cat.label === "Remedies" && mobileRemediesSubOpen) ||
                            (cat.label === "Thakur Ji Dresses" && mobileThakurOpen) ||
                            (cat.label === "Sage" && mobileSageOpen)
                              ? "rotate-90" : ""
                          }`} />
                        </button>
                        {((cat.label === "Anklets" && mobileAnkletsOpen) ||
                          (cat.label === "Remedies" && mobileRemediesSubOpen) ||
                          (cat.label === "Thakur Ji Dresses" && mobileThakurOpen) ||
                          (cat.label === "Sage" && mobileSageOpen)) && (
                          <div className="ml-4 space-y-1">
                            {cat.submenu.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/${sub.slug}`}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setMobileCrystalsOpen(false);
                                  setMobileAnkletsOpen(false);
                                  setMobileRemediesSubOpen(false);
                                  setMobileThakurOpen(false);
                                  setMobileSageOpen(false);
                                }}
                                className="block py-1 text-xs text-black"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={`/${cat.slug}`}
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileCrystalsOpen(false);
                        }}
                        className="block py-2 text-sm text-black"
                      >
                        {cat.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Remedies Mobile */}
            <button
              onClick={() => setMobileRemediesOpen((p) => !p)}
              className="flex justify-between w-full py-2 text-black"
            >
              Remedies
              <ChevronDown
                className={`transition ${mobileRemediesOpen ? "rotate-180" : ""}`}
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

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-black"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-black"
            >
              Contact
            </Link>
          </div>
        )}
      </div>

      {/* ---------------- DESKTOP CREATIVE DROPDOWN ---------------- */}
      {desktopCreativeOpen && (
        <div
          ref={dropdownCreativeRef}
          className="hidden md:block fixed top-[80px] left-1/2 -translate-x-1/2 
          bg-white border rounded shadow-xl w-64 z-50"
        >
          {creativeCategories.map((cat) => (
            <div key={cat.slug} className="group relative">
              <Link
                href={`/${cat.slug}`}
                onClick={() => setDesktopCreativeOpen(false)}
                className="flex items-center justify-between px-4 py-2 text-black hover:bg-[#e6cfa7]/20"
              >
                {cat.label}
                {cat.submenu && <ChevronRight className="w-4 h-4" />}
              </Link>

              {/* Nested submenu on hover */}
              {cat.submenu && (
                <div className="hidden group-hover:block absolute left-full top-0 
                bg-white border rounded shadow-xl w-48 ml-1">
                  {cat.submenu.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/${sub.slug}`}
                      onClick={() => setDesktopCreativeOpen(false)}
                      className="block px-4 py-2 text-sm text-black hover:bg-[#e6cfa7]/20"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---------------- DESKTOP CRYSTALS DROPDOWN ---------------- */}
      {desktopCrystalsOpen && (
        <div
          ref={dropdownCrystalsRef}
          className="hidden md:block fixed top-[80px] left-1/2 -translate-x-1/2 
          bg-white border rounded shadow-xl w-64 z-50 max-h-[500px] overflow-y-auto"
        >
          {crystalsCategories.map((cat) => (
            <div key={cat.slug} className="group relative">
              <Link
                href={`/${cat.slug}`}
                onClick={() => setDesktopCrystalsOpen(false)}
                className="flex items-center justify-between px-4 py-2 text-black hover:bg-[#e6cfa7]/20"
              >
                {cat.label}
                {cat.submenu && <ChevronRight className="w-4 h-4" />}
              </Link>

              {/* Nested submenu on hover */}
              {cat.submenu && (
                <div className="hidden group-hover:block absolute left-full top-0 
                bg-white border rounded shadow-xl w-64 ml-1 max-h-[400px] overflow-y-auto">
                  {cat.submenu.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/${sub.slug}`}
                      onClick={() => setDesktopCrystalsOpen(false)}
                      className="block px-4 py-2 text-sm text-black hover:bg-[#e6cfa7]/20"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---------------- DESKTOP REMEDIES DROPDOWN ---------------- */}
      {desktopRemediesOpen && (
        <div
          ref={dropdownRemediesRef}
          className="hidden md:block fixed top-[80px] left-1/2 -translate-x-1/2 
          bg-white border rounded shadow-xl w-56 z-50 max-h-[500px] overflow-y-auto"
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