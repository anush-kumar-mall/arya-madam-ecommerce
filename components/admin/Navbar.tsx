"use client";

import React, { useEffect, useState } from "react";
import { Palette, Search, ShoppingCart, Menu, X, User, LogOut, LogIn } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    setMenuOpen(false);

    if (item === "Home") {
      e.preventDefault();
      pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/");
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

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'U';
  };

  const navItems = ["Home", "Shop", "Collections", "Remedies", "Gallery", "About", "Contact"];

  return (
    <>
      <div className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-white backdrop-blur-md" : "bg-white"} border-b border-[#e6cfa7]/20`}>
        <nav className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 max-w-7xl mx-auto">
          {/* Logo - Improved Mobile */}
          <Link href="/" onClick={(e) => handleNavClick(e, "Home")} className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[rgb(44_95_124)] rounded-xl border border-[#e6cfa7]/40 flex items-center justify-center flex-shrink-0">
              <Palette className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <span className="text-[rgb(44_95_124)] text-sm sm:text-base lg:text-lg font-bold truncate max-w-[140px] sm:max-w-[180px] lg:max-w-none">
              Arya Madam Craft Supplies
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-6 xl:gap-10">
            {navItems.map((item) => {
              const href = item === "Home" ? "/" : item === "Contact" ? "/contact#contact" : item === "About" ? "/about#about" : `/${item.toLowerCase()}`;
              return (
                <Link key={item} href={href} onClick={(e) => handleNavClick(e, item)} className="text-black hover:text-[#E76F51] transition whitespace-nowrap">
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-2 sm:gap-3 lg:gap-4 items-center flex-shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-black cursor-pointer" onClick={() => setSearchOpen((p) => !p)} />
              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search..."
                  className="absolute right-0 mt-2 sm:mt-3 w-48 sm:w-56 lg:w-64 px-3 sm:px-4 py-2 rounded-lg bg-white border border-[#e6cfa7]/40 text-black placeholder:text-[#eadbc4]/60 shadow-xl outline-none text-sm"
                />
              )}
            </div>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} className="relative hover:scale-105 transition">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#e6cfa7] text-xs font-bold flex items-center justify-center text-[#3b2a1a]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            {status === "loading" ? (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <div className="relative hidden sm:block">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 hover:opacity-80 transition">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[rgb(44_95_124)] flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 sm:w-56 bg-white rounded-lg shadow-xl border border-[#e6cfa7]/40 overflow-hidden z-50">
                    <div className="px-4 py-3 bg-[rgb(44_95_124)]/5 border-b border-[#e6cfa7]/40">
                      <p className="text-sm font-semibold text-[rgb(44_95_124)] truncate">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-[rgb(44_95_124)]/10 transition" onClick={() => setProfileOpen(false)}>
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link href="/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-[rgb(44_95_124)]/10 transition" onClick={() => setProfileOpen(false)}>
                        <ShoppingCart className="w-4 h-4" />
                        My Orders
                      </Link>
                      
                      {session.user?.role === 'ADMIN' && (
                        <Link href="/admin/products" className="flex items-center gap-3 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition" onClick={() => setProfileOpen(false)}>
                          <Palette className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}

                      <hr className="my-2 border-[#e6cfa7]/40" />
                      
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[rgb(44_95_124)] text-white hover:bg-[rgb(44_95_124)]/90 transition text-sm">
                <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}

            {/* Hamburger */}
            <button onClick={() => setMenuOpen((p) => !p)} className="lg:hidden p-1.5 sm:p-2">
              {menuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7 text-black" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-black" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[rgb(44_95_124)]/95 backdrop-blur-md border-t border-white/20">
            <div className="flex flex-col px-4 sm:px-6 py-4 sm:py-6 gap-4 sm:gap-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* User Info in Mobile */}
              {session ? (
                <div className="pb-3 sm:pb-4 border-b border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {getUserInitials()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-semibold text-sm sm:text-base truncate">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-white/70 text-xs sm:text-sm truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-white/90 text-sm hover:text-white transition">
                      My Profile
                    </Link>
                    <Link href="/orders" onClick={() => setMenuOpen(false)} className="text-white/90 text-sm hover:text-white transition">
                      My Orders
                    </Link>
                    {session.user?.role === 'ADMIN' && (
                      <Link href="/admin/products" onClick={() => setMenuOpen(false)} className="text-yellow-300 text-sm hover:text-yellow-200 transition">
                        Admin Panel
                      </Link>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Nav Items */}
              {navItems.map((item) => {
                const href = item === "Home" ? "/" : item === "Contact" ? "/contact#contact" : item === "About" ? "/about#about" : `/${item.toLowerCase()}`;
                return (
                  <Link key={item} href={href} onClick={(e) => handleNavClick(e, item)} className="text-white text-base sm:text-lg hover:text-[#eadbc4] transition">
                    {item}
                  </Link>
                );
              })}

              {/* Login/Logout */}
              {session ? (
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-300 text-base sm:text-lg hover:text-red-200 transition mt-2">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-white text-base sm:text-lg hover:text-[#eadbc4] transition mt-2">
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}