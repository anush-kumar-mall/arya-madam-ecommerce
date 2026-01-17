'use client';

import React from 'react';

const collections = [
  {
    id: 1,
    title: 'Beads & Charms',
    count: '150+ Products',
    desc: 'Glass, crystal, wooden & metal beads for jewelry making.',
    image: 'https://placehold.co/600x400/png?text=Beads+%26+Charms',
  },
  {
    id: 2,
    title: 'DIY Craft Kits',
    count: '40+ Products',
    desc: 'Complete kits to bring your creative ideas to life.',
    image: 'https://placehold.co/600x400/png?text=DIY+Craft+Kits',
  },
  {
    id: 3,
    title: 'Thread & Yarn',
    count: '80+ Products',
    desc: 'Embroidery, silk, cotton & specialty threads.',
    image: 'https://placehold.co/600x400/png?text=Thread+%26+Yarn',
  },
  {
    id: 4,
    title: 'Decorative & Art',
    count: '60+ Products',
    desc: 'Decorative elements for art & craft projects.',
    image: 'https://placehold.co/600x400/png?text=Decorative+%26+Art',
  },
  {
    id: 5,
    title: 'Tools & Accessories',
    count: '35+ Products',
    desc: 'Essential tools for precision crafting.',
    image: 'https://placehold.co/600x400/png?text=Craft+Tools',
  },
  {
    id: 6,
    title: 'Gift Packs & Bundles',
    count: '25+ Products',
    desc: 'Curated bundles perfect for gifting & beginners.',
    image: 'https://placehold.co/600x400/png?text=Bundles',
  },
];

export default function CollectionsPage() {
  return (
    <section className="relative min-h-screen px-6 py-24 font-serif overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#1c120b]/95" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto text-[#eadbc4]">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fdfaf6] mb-6">
            Our Collections
          </h1>
          <p className="max-w-3xl mx-auto text-lg opacity-90">
            Discover curated collections of premium craft supplies, carefully
            organized to help you find exactly what you need for your creative projects.
          </p>
        </div>

        {/* COLLECTION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {collections.map((c) => (
            <div
              key={c.id}
              className="group relative rounded-3xl overflow-hidden border border-[#e6cfa7]/25 bg-[#2b1d12]/70 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {/* IMAGE */}
              <div className="h-56 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c120b]/95 via-[#1c120b]/40 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 p-6">
                <span className="inline-block mb-2 px-3 py-1 text-xs rounded-full bg-[#e6cfa7]/20 text-[#e6cfa7]">
                  {c.count}
                </span>

                <h3 className="text-xl font-semibold text-[#fdfaf6] mb-2">
                  {c.title}
                </h3>

                <p className="text-sm opacity-80 mb-4">
                  {c.desc}
                </p>

                <button className="px-5 py-2 rounded-full border border-[#e6cfa7] text-[#e6cfa7] hover:bg-[#e6cfa7] hover:text-[#3b2a1a] transition text-sm">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* HELP SECTION */}
        <div className="rounded-3xl border border-[#e6cfa7]/30 bg-[#2b1d12]/80 p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="mx-auto w-12 h-12 mb-6 rounded-full flex items-center justify-center bg-[#e6cfa7]/20 text-[#e6cfa7]">
            ?
          </div>

          <h2 className="text-3xl font-bold text-[#fdfaf6] mb-4">
            Need Help Finding Something?
          </h2>

          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Our team of craft experts is here to help you find the perfect materials
            for your project. Get personalized recommendations and expert advice.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-[#e6cfa7] text-[#3b2a1a] font-semibold hover:opacity-90 transition">
              Contact Us
            </button>

            <button className="px-8 py-3 rounded-full border border-[#e6cfa7] text-[#e6cfa7] hover:bg-[#e6cfa7] hover:text-[#3b2a1a] transition">
              Browse All Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}