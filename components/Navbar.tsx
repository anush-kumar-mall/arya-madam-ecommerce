"use client";

import React, { useEffect, useState } from "react";
import {
  Palette,
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import { useSession, signOut } from "next-auth/react";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { items } = useCart();
  const { data: session, status } = useSession();
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

  /* ===== LOGOUT HANDLER ===== */
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  /* ===== GET USER INITIALS ===== */
  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return 'U';
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

            {/* ===== USER PROFILE / LOGIN ===== */}
            {status === "loading" ? (
              // Loading state
              <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              // Logged in - show profile dropdown
              <div className="relative hidden md:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <div className="w-9 h-9 rounded-full bg-[rgb(44_95_124)] flex items-center justify-center text-white font-semibold">
                    {getUserInitials()}
                  </div>
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-[#e6cfa7]/40 overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 bg-[rgb(44_95_124)]/5 border-b border-[#e6cfa7]/40">
                      <p className="text-sm font-semibold text-[rgb(44_95_124)]">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-[rgb(44_95_124)]/10 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-[rgb(44_95_124)]/10 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        My Orders
                      </Link>
                      
                      {/* Show Admin Panel link if user is admin */}
                      {session.user?.role === 'ADMIN' && (
                        <Link
                          href="/admin/products"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition"
                          onClick={() => setProfileOpen(false)}
                        >
                          <Palette className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}

                      <hr className="my-2 border-[#e6cfa7]/40" />
                      
                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in - show login button
              <Link
                href="/auth/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(44_95_124)] text-white hover:bg-[rgb(44_95_124)]/90 transition"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}

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
              {/* User Info in Mobile Menu */}
              {session ? (
                <div className="pb-4 border-b border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-white/70 text-xs">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="text-white/90 text-sm hover:text-white transition"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setMenuOpen(false)}
                      className="text-white/90 text-sm hover:text-white transition"
                    >
                      My Orders
                    </Link>
                    {session.user?.role === 'ADMIN' && (
                      <Link
                        href="/admin/products"
                        onClick={() => setMenuOpen(false)}
                        className="text-yellow-300 text-sm hover:text-yellow-200 transition"
                      >
                        Admin Panel
                      </Link>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Nav Items */}
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
                    className="text-white text-lg hover:text-[#eadbc4] transition"
                  >
                    {item}
                  </Link>
                );
              })}

              {/* Login/Logout in Mobile Menu */}
              {session ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-300 text-lg hover:text-red-200 transition mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-white text-lg hover:text-[#eadbc4] transition mt-2"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===== CART DRAWER ===== */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}