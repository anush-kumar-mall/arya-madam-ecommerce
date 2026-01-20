'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Palette,
  Search,
  ShoppingCart,
  Shield,
  Truck,
  Headphones,
} from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(false);
          requestAnimationFrame(() => setShow(true));
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen font-serif overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/hero-craft-supplies.jpg'), url('/assets/herobg3.jpeg')",
          backgroundBlendMode: 'multiply',
          animation: 'depthMove 50s ease-in-out infinite alternate',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b1d12]/90 via-[#4a3323]/70 to-[#6a4a34]/50" />
        <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.75)]" />
      </div>

      {show && (
        <>
          

          {/* CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
            {/* Badge */}
            <span
              className="inline-block mb-8 px-6 py-2 border border-[#e6cfa7]/50
                         rounded-full text-[#e6cfa7] uppercase text-xs tracking-widest
                         opacity-0 animate-[paperReveal_1.4s_0.2s_ease-out_forwards]"
            >
              Timeless Craftsmanship
            </span>

            {/* Heading */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl mb-8
                         opacity-0 animate-[inkSettle_1.6s_0.4s_ease-out_forwards]"
            >
              <span className="text-[#fdfaf6]">Arya Madam</span>
              <br />
              <span className="text-[#e6cfa7]">Craft Supplies</span>
            </h1>

            {/* Description */}
            <p
              className="text-[#eadbc4] text-lg max-w-2xl mb-14
                         opacity-0 animate-[paperReveal_1.4s_0.6s_ease-out_forwards]"
            >
              Professional-grade materials inspired by heritage craftsmanship.
              Carefully curated for artisans who value tradition and quality.
            </p>

            {/* CTA */}
            <div
              className="flex flex-col sm:flex-row gap-6
                         opacity-0 animate-[paperReveal_1.4s_0.8s_ease-out_forwards]"
            >
              <Link
                href="/shop"
                className="px-10 py-4 bg-[#e6cfa7] text-[#3b2a1a]
                           font-semibold rounded-lg shadow-xl
                           hover:bg-[#dcc39a] transition-colors"
              >
                Explore Collection
              </Link>

              <Link
                href="/collections"
                className="px-10 py-4 border border-[#e6cfa7]/60
                           text-[#fdfaf6] rounded-lg
                           hover:bg-[#4a3323]/40 transition-colors"
              >
                View Catalog
              </Link>
            </div>

            {/* FEATURES — slightly higher */}
            <div className="flex flex-wrap gap-12 mt-8">
              {[Shield, Truck, Headphones].map((Icon, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4
                             opacity-0
                             animate-[paperReveal_1.2s_ease-out_forwards]"
                  style={{ animationDelay: `${1 + i * 0.15}s` }}
                >
                  <div
                    className="w-12 h-12 border border-[#e6cfa7]/40
                               bg-[#4a3323]/60 rounded-lg
                               flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5 text-[#e6cfa7]" />
                  </div>

                  <span className="text-[#eadbc4]">
                    {['Quality Assured', 'Fast Delivery', 'Expert Support'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;