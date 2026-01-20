'use client';

import { useEffect } from "react";

export default function ProductDetails({ product }: any) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry =>
          entry.target.classList.toggle('visible', entry.isIntersecting)
        );
      },
      { threshold: 0.25 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative px-6 py-12 font-serif overflow-hidden text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT */}
        <div data-animate="left" className="bg-[#3b2a1a]/80 p-6 rounded-xl">
          <img
            src={product.images[0]}
            className="w-full max-h-[320px] object-contain mb-6"
            alt={product.name}
          />

          <div className="flex gap-4 justify-center">
            {product.images.map((img: string, i: number) => (
              <img key={i} src={img} className="w-24 h-24 rounded" />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div data-animate="right" className="bg-[#3b2a1a]/80 p-8 rounded-xl">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="mt-3">
            ₹{product.price}
            {product.oldPrice && (
              <span className="line-through ml-2 opacity-50">
                ₹{product.oldPrice}
              </span>
            )}
          </p>

          <p className="mt-4">{product.description}</p>

          <div className="mt-6 text-sm">
            <p><b>SKU:</b> {product.sku}</p>
            <p><b>Category:</b> {product.category}</p>
            <p><b>Stone:</b> {product.stone}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
