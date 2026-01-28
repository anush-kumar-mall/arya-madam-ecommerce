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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div data-animate="card" className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2C5F7C] mb-4 tracking-tight">
            Featured Collections
          </h2>

          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Curated selections of professional-grade materials for every creative need
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((item, index) => (
            <div
              key={index}
              data-animate="card"
              className="group relative h-[280px] overflow-hidden rounded-lg
                         cursor-pointer bg-white border border-black/10
                         transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700
                           group-hover:scale-105"
              />

              {/* ✅ SOFT READABILITY OVERLAY */}
              <div
                className="absolute inset-0
                           bg-gradient-to-t
                           from-black/30
                           via-black/15
                           to-transparent"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="mb-3 inline-block text-xs font-semibold tracking-wide text-white/80">
                  {item.items}
                </span>

                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-white/85 text-sm mb-4">
                  {item.subtitle}
                </p>

                <Link
                  href="#"
                  className="inline-flex items-center gap-2
                             text-sm font-semibold text-[#F4A261]
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