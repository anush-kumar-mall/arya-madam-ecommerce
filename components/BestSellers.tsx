'use client';

import { useEffect } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

const products = [
  {
    name: "Rainbow Glass Bead Set",
    image: "/assets/rainbowBead.jpeg",
    price: 299,
    oldPrice: 349,
    rating: 4.5,
    reviews: 127,
    badge: "NEW",
  },
  {
    name: "Embroidery Thread Collection",
    image: "/assets/embroideryThread.jpeg",
    price: 399,
    oldPrice: 499,
    rating: 4.7,
    reviews: 203,
    badge: "NEW",
  },
  {
    name: "Wooden Bead Assortment",
    image: "/assets/woodenBeads.jpeg",
    price: 249,
    oldPrice: 299,
    rating: 4.4,
    reviews: 154,
  },
  {
    name: "DIY Jewelry Making Kit",
    image: "/assets/DIYJewelry.jpeg",
    price: 599,
    oldPrice: 799,
    rating: 4.8,
    reviews: 198,
    badge: "NEW",
  },
  {
    name: "Metallic Charm Collection",
    image: "/assets/metallicCharm.jpeg",
    price: 349,
    oldPrice: 449,
    rating: 4.6,
    reviews: 98,
  },
  {
    name: "Silk Thread Bundle",
    image: "/assets/silkThread.jpeg",
    price: 449,
    oldPrice: 599,
    rating: 4.5,
    reviews: 142,
  },
  {
    name: "Crystal Bead Mix",
    image: "/assets/crystalBead.jpeg",
    price: 499,
    oldPrice: 649,
    rating: 4.7,
    reviews: 215,
    badge: "NEW",
  },
  {
    name: "Craft Tool Essentials",
    image: "/assets/craftTool.jpeg",
    price: 399,
    oldPrice: 499,
    rating: 4.6,
    reviews: 87,
  },
];

export default function BestSellers() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative px-8 py-24 font-serif overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#2b1d12]/90" />

      <div className="relative mx-auto max-w-7xl">

        <div
          data-animate="card"
          className="mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-[#fdfaf6]">
              Best Sellers
            </h2>
            <p className="mt-2 text-[#eadbc4]">
              Timeless pieces cherished by artisans
            </p>
          </div>

          <span className="inline-block rounded-full border border-[#e6cfa7]/60 px-5 py-2
                           text-xs tracking-widest uppercase text-[#e6cfa7]">
            ✦ Most Loved ✦
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={index}
              data-animate="card"
              className="relative rounded-xl bg-[#3b2a1a]/80 p-5
                         border border-[#e6cfa7]/30
                         shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                         hover:-translate-y-1
                         hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                         transition"
            >
              <button className="absolute right-4 top-4 rounded-full
                                 bg-[#2b1d12]/80 p-2
                                 border border-[#e6cfa7]/30">
                <Heart className="h-4 w-4 text-[#e6cfa7]" />
              </button>

              {product.badge && (
                <span className="absolute left-4 top-4 rounded
                                 bg-[#e6cfa7] px-3 py-1
                                 text-xs font-semibold text-[#3b2a1a]">
                  {product.badge}
                </span>
              )}

              <div className="relative h-44 w-full mb-4 rounded-lg bg-[#2b1d12]/60">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <h3 className="text-sm font-semibold text-[#fdfaf6]">
                {product.name}
              </h3>

              <div className="mt-2 text-xs text-[#e6cfa7]">
                ★ {product.rating}{" "}
                <span className="text-[#eadbc4]/70">
                  ({product.reviews})
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="font-semibold text-[#fdfaf6]">
                  ₹{product.price}
                </span>
                <span className="text-sm text-[#eadbc4]/60 line-through">
                  ₹{product.oldPrice}
                </span>
              </div>

              <button className="mt-5 w-full rounded-lg
                                 bg-[#e6cfa7] py-2.5
                                 text-sm font-semibold text-[#3b2a1a]
                                 hover:bg-[#dcc39a]
                                 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}