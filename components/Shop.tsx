'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

const productsData: Product[] = [
  { id: 1, name: 'Rainbow Glass Bead Set', price: 299, image: '/assets/rainbowBead.jpeg', category: 'Beads' },
  { id: 2, name: 'Embroidery Thread Collection', price: 399, image: '/assets/embroideryThread.jpeg', category: 'Thread' },
  { id: 3, name: 'Wooden Bead Assortment', price: 249, image: '/assets/woodenBeads.jpeg', category: 'Beads' },
  { id: 4, name: 'DIY Jewelry Making Kit', price: 599, image: '/assets/DIYJewelry.jpeg', category: 'DIY Kits' },
  { id: 5, name: 'Metallic Charm Collection', price: 349, image: '/assets/metallicCharm.jpeg', category: 'Beads' },
  { id: 6, name: 'Silk Thread Bundle', price: 449, image: '/assets/silkThread.jpeg', category: 'Thread' },
  { id: 7, name: 'Crystal Bead Mix', price: 499, image: '/assets/crystalBead.jpeg', category: 'Beads' },
  { id: 8, name: 'Craft Tool Essentials', price: 399, image: '/assets/craftTool.jpeg', category: 'Tools' },
  { id: 9, name: 'Pearl Bead Collection', price: 549, image: '/assets/pearlBead.jpeg', category: 'Beads' },
];

export default function ProductsPage() {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Beads', 'Thread', 'DIY Kits', 'Tools'];

  const { addToCart, increaseQty, decreaseQty, items: cartItems } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = productsData.filter((p) => {
    const matchPrice = p.price <= maxPrice;
    const matchSearch = p.name.toLowerCase().includes(query);
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchPrice && matchSearch && matchCategory;
  });

  const cartItemById = (id: number) => cartItems.find((item) => item.id === String(id));

  /* ===== ANIMATION VARIANTS ===== */
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen px-6 py-24 font-serif overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#2b1d12]/95" />

      <div className="relative z-10 max-w-7xl mx-auto text-[#eadbc4]">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fdfaf6]">Shop All Products</h1>

          {query && (
            <p className="mt-4 text-lg">
              Showing results for{' '}
              <span className="text-[#e6cfa7] font-semibold">{query}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-[#2b1d12]/85 border border-[#e6cfa7]/30 p-6 rounded-2xl space-y-10"
          >
            {/* CATEGORY FILTER */}
            <div>
              <h3 className="text-lg font-semibold text-[#fdfaf6] mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-[#e6cfa7] text-[#3b2a1a]'
                        : 'bg-[#2b1d12]/70 text-[#eadbc4] hover:bg-[#e6cfa7]/40 hover:text-[#fdfaf6]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE FILTER */}
            <div>
              <h3 className="text-lg font-semibold text-[#fdfaf6] mb-4">Price Range</h3>
              <div className="flex justify-between text-sm mb-2 text-[#fdfaf6]">
                <span>₹0</span>
                <span>₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#e6cfa7] cursor-pointer"
              />
            </div>
          </motion.aside>

          {/* PRODUCTS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredProducts.length === 0 && (
              <p className="col-span-full text-center text-lg text-[#fdfaf6]">
                No products found 😕
              </p>
            )}

            {filteredProducts.map((p) => {
              const cartItem = cartItemById(p.id);

              return (
                <motion.div
                  key={p.id}
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col bg-[#2b1d12]/85 border border-[#e6cfa7]/30 p-6 rounded-2xl"
                >
                  <div className="h-48 rounded-xl overflow-hidden mb-4 border border-[#e6cfa7]/30">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <h3 className="font-semibold text-[#fdfaf6] mb-1">{p.name}</h3>
                  <p className="text-[#e6cfa7] font-bold mb-4">₹{p.price}</p>

                  {!cartItem ? (
                    <button
                      onClick={() =>
                        addToCart({
                          id: String(p.id),
                          title: p.name,
                          price: p.price,
                          image: p.image,
                          quantity: 1,
                        })
                      }
                      className="mt-auto py-2 rounded-lg bg-[#e35b3a] text-white hover:opacity-90 hover:cursor-pointer transition"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="mt-auto flex items-center justify-between border border-[#e6cfa7]/40 rounded-lg px-4 py-2">
                      <button
                        onClick={() => decreaseQty(String(p.id))}
                        className="text-xl font-bold hover:text-white hover:cursor-pointer"
                      >
                        -
                      </button>

                      <span className="font-semibold">{cartItem.quantity}</span>

                      <button
                        onClick={() => increaseQty(String(p.id))}
                        className="text-xl font-bold hover:text-white hover:cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}