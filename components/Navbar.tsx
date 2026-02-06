"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [desktopCreativeOpen, setDesktopCreativeOpen] = useState(false);
  const [desktopCrystalsOpen, setDesktopCrystalsOpen] = useState(false);
  const [desktopRemediesOpen, setDesktopRemediesOpen] = useState(false);

  // Mobile submenu states
  const [mobileCreativeOpen, setMobileCreativeOpen] = useState(false);
  const [mobileCrystalsOpen, setMobileCrystalsOpen] = useState(false);
  const [mobileRemediesOpen, setMobileRemediesOpen] = useState(false);

  // Mobile nested submenu states
  const [mobileCoirOpen, setMobileCoirOpen] = useState(false);
  const [mobileAnkletsOpen, setMobileAnkletsOpen] = useState(false);
  const [mobileThakurOpen, setMobileThakurOpen] = useState(false);
  const [mobileSageOpen, setMobileSageOpen] = useState(false);

  const [query, setQuery] = useState("");

  const creativeBtnRef = useRef<HTMLButtonElement>(null);
  const crystalsBtnRef = useRef<HTMLButtonElement>(null);
  const remediesBtnRef = useRef<HTMLButtonElement>(null);

  const creativeDropRef = useRef<HTMLDivElement>(null);
  const crystalsDropRef = useRef<HTMLDivElement>(null);
  const remediesDropRef = useRef<HTMLDivElement>(null);

  const { items } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const pathname = usePathname();
  const router = useRouter();

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        creativeDropRef.current &&
        !creativeDropRef.current.contains(e.target as Node) &&
        !creativeBtnRef.current?.contains(e.target as Node)
      ) {
        setDesktopCreativeOpen(false);
      }

      if (
        crystalsDropRef.current &&
        !crystalsDropRef.current.contains(e.target as Node) &&
        !crystalsBtnRef.current?.contains(e.target as Node)
      ) {
        setDesktopCrystalsOpen(false);
      }

      if (
        remediesDropRef.current &&
        !remediesDropRef.current.contains(e.target as Node) &&
        !remediesBtnRef.current?.contains(e.target as Node)
      ) {
        setDesktopRemediesOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- NAV HANDLER ---------------- */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
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

  /* ---------------- DATA ---------------- */

  const creativeCategories = [
    { label: "Art & Craft", slug: "creative/art-craft" },
    { label: "Handmade Occasion-Special Items", slug: "creative/handmade-special" },
    { label: "Jutt Item", slug: "creative/jutt-item" },
    {
      label: "Coir Products",
      slug: "creative/coir-products",
      submenu: [
        { label: "Dry Flowers", slug: "creative/coir-products/dry-flowers" },
      ],
    },
  ];

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
        {
          label: "Crystal Seven Chakra Healing Frames",
          slug: "crystals/anklets/seven-chakra-frames",
        },
        { label: "Crystal Strings", slug: "crystals/anklets/crystal-strings" },
        { label: "Crystal Animals", slug: "crystals/anklets/crystal-animals" },
      ],
    },
    { label: "Yantras", slug: "crystals/yantras" },
    {
      label: "Thakur Ji Dresses",
      slug: "crystals/thakur-ji-dresses",
      submenu: [
        { label: "Rudraksh", slug: "crystals/thakur-ji-dresses/rudraksh" },
        { label: "Pooja Items", slug: "crystals/thakur-ji-dresses/pooja-items" },
      ],
    },
    {
      label: "Sage",
      slug: "crystals/sage",
      submenu: [{ label: "God Idols", slug: "crystals/sage/god-idols" }],
    },
    { label: "Talk to our experts", slug: "talk-to-our-experts" },
  ];

  const remediesCategories = [
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

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b isolate">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          {/* LOGO */}
          <Link href="/">
            <Image src="/assets/logo6.png" alt="Logo" width={150} height={40} />
          </Link>

          {/* ---------------- DESKTOP NAV ---------------- */}
          <div className="hidden md:flex items-center gap-7 text-black">
            <Link 
              href="/" 
              onClick={(e) => handleNavClick(e, "Home")}
            >
              Home
            </Link>
            <Link href="/shop">Shop</Link>
            <Link href="/collections">Collections</Link>

            {/* Creative */}
            <div className="relative">
              <button
                ref={creativeBtnRef}
                onClick={() => setDesktopCreativeOpen((p) => !p)}
                className="flex items-center gap-1"
              >
                Creative & Handcrafted <ChevronDown size={16} />
              </button>

              {desktopCreativeOpen && (
                <div
                  ref={creativeDropRef}
                  className="absolute top-full mt-3 left-0 bg-white border rounded shadow-xl min-w-[260px] z-50"
                >
                  {creativeCategories.map((cat) => (
                    <div key={cat.slug} className="group relative">
                      <Link
                        href={`/${cat.slug}`}
                        className="flex justify-between px-4 py-2 hover:bg-[#e6cfa7]/20"
                      >
                        {cat.label}
                        {cat.submenu && <ChevronRight size={14} />}
                      </Link>

                      {cat.submenu && (
                        <div className="hidden group-hover:block absolute left-full top-1/2 -translate-y-1/2 ml-1 bg-white border rounded shadow-xl min-w-[220px] z-50">
                          {cat.submenu.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/${sub.slug}`}
                              className="block px-4 py-2 text-sm hover:bg-[#e6cfa7]/20"
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
            </div>

            {/* Crystals */}
            <div className="relative">
              <button
                ref={crystalsBtnRef}
                onClick={() => setDesktopCrystalsOpen((p) => !p)}
                className="flex items-center gap-1"
              >
                Crystals & Spiritual <ChevronDown size={16} />
              </button>

              {desktopCrystalsOpen && (
                <div
                  ref={crystalsDropRef}
                  className="absolute top-full mt-3 left-0 bg-white border rounded shadow-xl min-w-[320px] z-50"
                >
                  {crystalsCategories.map((cat) => (
                    <div key={cat.slug} className="group relative">
                      <Link
                        href={`/${cat.slug}`}
                        className="flex justify-between px-4 py-2 hover:bg-[#e6cfa7]/20"
                      >
                        {cat.label}
                        {cat.submenu && <ChevronRight size={14} />}
                      </Link>

                      {cat.submenu && (
                        <div className="hidden group-hover:block absolute left-full top-1/2 -translate-y-1/2 ml-1 bg-white border rounded shadow-xl min-w-[240px] z-50">
                          {cat.submenu.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/${sub.slug}`}
                              className="block px-4 py-2 text-sm hover:bg-[#e6cfa7]/20"
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
            </div>

            {/* Remedies */}
            <div className="relative">
              <button
                ref={remediesBtnRef}
                onClick={() => setDesktopRemediesOpen((p) => !p)}
                className="flex items-center gap-1"
              >
                Remedies <ChevronDown size={16} />
              </button>

              {desktopRemediesOpen && (
                <div
                  ref={remediesDropRef}
                  className="absolute top-full mt-3 left-0 bg-white border rounded shadow-xl min-w-[220px] max-h-[500px] overflow-y-auto z-50"
                >
                  {remediesCategories.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className="block px-4 py-2 hover:bg-[#e6cfa7]/20"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
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
              className="md:hidden text-black"
              onClick={() => setMenuOpen((p) => !p)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* ---------------- MOBILE MENU ---------------- */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 space-y-3">
              <Link
                href="/"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Collections
              </Link>

              {/* Mobile Creative */}
              <div>
                <button
                  onClick={() => setMobileCreativeOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Creative & Handcrafted</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      mobileCreativeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileCreativeOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {creativeCategories.map((cat) => (
                      <div key={cat.slug}>
                        {cat.submenu ? (
                          <>
                            <button
                              onClick={() => setMobileCoirOpen((p) => !p)}
                              className="w-full flex items-center justify-between py-1 text-sm text-black"
                            >
                              <span>{cat.label}</span>
                              <ChevronDown
                                size={14}
                                className={`transition-transform ${
                                  mobileCoirOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {mobileCoirOpen && (
                              <div className="ml-4 mt-1 space-y-1">
                                {cat.submenu.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    href={`/${sub.slug}`}
                                    className="block py-1 text-xs text-black hover:text-[#e6cfa7]"
                                    onClick={() => setMenuOpen(false)}
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
                            className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                            onClick={() => setMenuOpen(false)}
                          >
                            {cat.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Crystals */}
              <div>
                <button
                  onClick={() => setMobileCrystalsOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Crystals & Spiritual</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      mobileCrystalsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileCrystalsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {crystalsCategories.map((cat) => (
                      <div key={cat.slug}>
                        {cat.submenu ? (
                          <>
                            <button
                              onClick={() => {
                                if (cat.label === "Anklets") setMobileAnkletsOpen((p) => !p);
                                if (cat.label === "Thakur Ji Dresses") setMobileThakurOpen((p) => !p);
                                if (cat.label === "Sage") setMobileSageOpen((p) => !p);
                              }}
                              className="w-full flex items-center justify-between py-1 text-sm text-black"
                            >
                              <span>{cat.label}</span>
                              <ChevronDown
                                size={14}
                                className={`transition-transform ${
                                  (cat.label === "Anklets" && mobileAnkletsOpen) ||
                                  (cat.label === "Thakur Ji Dresses" && mobileThakurOpen) ||
                                  (cat.label === "Sage" && mobileSageOpen)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            {((cat.label === "Anklets" && mobileAnkletsOpen) ||
                              (cat.label === "Thakur Ji Dresses" && mobileThakurOpen) ||
                              (cat.label === "Sage" && mobileSageOpen)) && (
                              <div className="ml-4 mt-1 space-y-1">
                                {cat.submenu.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    href={`/${sub.slug}`}
                                    className="block py-1 text-xs text-black hover:text-[#e6cfa7]"
                                    onClick={() => setMenuOpen(false)}
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
                            className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                            onClick={() => setMenuOpen(false)}
                          >
                            {cat.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Remedies */}
              <div>
                <button
                  onClick={() => setMobileRemediesOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Remedies</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      mobileRemediesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileRemediesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {remediesCategories.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}