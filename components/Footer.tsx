'use client';

import { FC, useEffect } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer: FC = () => {

  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative font-serif text-[#eadbc4] overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#2b1d12]/95" />

      {/* Main Footer */}
      <div
        data-animate="card"
        className="relative max-w-7xl mx-auto px-6 py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-bold tracking-widest text-[#fdfaf6] mb-6">
              ARYA MADAM
            </h2>
            <p className="leading-relaxed mb-8">
              Professional-grade craft supplies rooted in tradition,
              precision, and timeless craftsmanship.
            </p>

            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank">
                <Facebook className="text-[#e6cfa7]" />
              </a>
              <a href="https://instagram.com" target="_blank">
                <Instagram className="text-[#e6cfa7]" />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <Linkedin className="text-[#e6cfa7]" />
              </a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#fdfaf6]">
              Company
            </h3>
            <ul className="space-y-4">
              <li><Link href="/about#about">About Us</Link></li>
              <li><Link href="/career">Careers</Link></li>
              <li><Link href="/press">Press</Link></li>
              <li><Link href="/contact#contact">Contact</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#fdfaf6]">
              Support
            </h3>
            <ul className="space-y-4">
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/shippingPolicy">Shipping Policy</Link></li>
              <li><Link href="/returnsAndExchanges">Returns & Exchanges</Link></li>
              <li><Link href="/termsOfService">Terms of Service</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#fdfaf6]">
              Contact Info
            </h3>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <MapPin className="text-[#e6cfa7]" />
                Mumbai, Maharashtra 400001
              </li>
              <li className="flex gap-4">
                <Phone className="text-[#e6cfa7]" />
                +91 98765 43210
              </li>
              <li className="flex gap-4">
                <Mail className="text-[#e6cfa7]" />
                info@aryamadamcraft.com
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div
        data-animate="card"
        className="relative border-t border-[#e6cfa7]/30"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between text-sm">
          <p>© 2025 Arya Madam Craft Supplies</p>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
