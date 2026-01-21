'use client';

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Beads & Charms",
    subtitle: "Premium glass, crystal, and wooden beads",
    items: "500+ Items",
    image: "/assets/beadsAndCharms.jpeg",
  },
  {
    title: "DIY Craft Kits",
    subtitle: "Complete professional-grade project kits",
    items: "150+ Kits",
    image: "/assets/DIY.jpeg",
  },
  {
    title: "Thread & Yarn",
    subtitle: "Silk, cotton, and specialty threads",
    items: "300+ Varieties",
    image: "/assets/threadAndYarn.jpeg",
  },
  {
    title: "Decorative Supplies",
    subtitle: "Artisan materials for creative projects",
    items: "400+ Products",
    image: "/assets/decorativeSupplies.jpeg",
  },
  {
    title: "Professional Tools",
    subtitle: "Precision instruments for artisans",
    items: "100+ Tools",
    image: "/assets/tools.jpeg",
  },
  {
    title: "Gift Collections",
    subtitle: "Curated bundles for professionals",
    items: "80+ Bundles",
    image: "/assets/giftCollections.jpeg",
  },
];

export default function FeaturedCollections() {
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
    <section className="relative px-8 py-28 font-serif bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div data-animate="card" className="mb-16 text-center">
          <span
            className="inline-block mb-6 px-6 py-2
                       border border-[#cbb79a]
                       rounded-full text-[#8a6a44]
                       tracking-widest uppercase text-xs"
          >
            Our Heritage
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#2b1d12]">
            Featured Collections
          </h2>

          <div className="my-6 text-[#cbb79a] tracking-widest">
            ───── ✦ ─────
          </div>

          <p className="mx-auto max-w-3xl text-[#5c4a3a] text-lg leading-relaxed">
            Curated selections of timeless materials crafted for artisans
            who value tradition, precision, and quality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((item, index) => (
            <div
              key={index}
              data-animate="card"
              className="group relative h-[280px] overflow-hidden rounded-2xl
                         border border-black/10
                         shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                         cursor-pointer bg-white"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700
                           group-hover:scale-105"
              />

              {/* Soft Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t
                           from-white/95 via-white/60 to-transparent"
              />

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <span
                  className="mb-4 inline-block rounded
                             bg-[#e6cfa7] px-4 py-1
                             text-xs font-semibold tracking-wide
                             text-[#3b2a1a]"
                >
                  {item.items}
                </span>

                <h3 className="text-2xl font-semibold text-[#2b1d12]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-[#5c4a3a]">
                  {item.subtitle}
                </p>

                <Link
                  href="#"
                  className="mt-4 inline-flex items-center gap-2
                             text-sm font-semibold
                             text-[#8a6a44]
                             hover:gap-3 transition-all duration-300"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
