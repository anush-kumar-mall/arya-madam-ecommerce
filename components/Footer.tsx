'use client';

import { FC, useEffect } from "react";
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
          entry.target.classList.toggle(
            "visible",
            entry.isIntersecting
          );
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

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold tracking-widest text-[#fdfaf6] mb-6">
              ARYA MADAM
            </h2>
            <p className="leading-relaxed mb-8">
              Professional-grade craft supplies rooted in tradition,
              precision, and timeless craftsmanship.
            </p>

            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 rounded-lg
                             border border-[#e6cfa7]/40
                             bg-[#3b2a1a]/80
                             hover:bg-[#4a3323]
                             transition-colors"
                >
                  <Icon size={20} className="text-[#e6cfa7]" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#fdfaf6] tracking-wide">
              Company
            </h3>
            <ul className="space-y-4">
              {["About Us", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-[#fdfaf6] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#fdfaf6] tracking-wide">
              Support
            </h3>
            <ul className="space-y-4">
              {[
                "FAQs",
                "Shipping Policy",
                "Returns & Exchanges",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-[#fdfaf6] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#fdfaf6] tracking-wide">
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
        <div
          className="max-w-7xl mx-auto px-6 py-6
                     flex flex-col md:flex-row
                     justify-between items-center gap-4 text-sm"
        >
          <p className="text-[#eadbc4]/80">
            © 2025 Arya Madam Craft Supplies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#fdfaf6]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#fdfaf6]">
              Powered by Readdy
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;