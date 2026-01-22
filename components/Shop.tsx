'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';

export default function ProductsPage() {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Beads',
    'Threads',
    'Kits',
    'Tools',
    'Charms',
    'Gifts Under Rs.699',
  ];

  const { addToCart, increaseQty, decreaseQty, items: cartItems } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = products.filter((p) => {
    const matchPrice = p.price <= maxPrice;
    const matchSearch = p.name.toLowerCase().includes(query);

    const matchCategory =
      selectedCategory === 'All' ||
      p.category === selectedCategory ||
      (selectedCategory === 'Gifts Under Rs.699' && p.price <= 699);

    return matchPrice && matchSearch && matchCategory;
  });

  const cartItemById = (id: string) =>
    cartItems.find((item) => item.id === id);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen px-6 py-24 font-serif bg-[rgb(44_95_124)] text-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Shop All Products
          </h1>

          {query && (
            <p className="mt-4 text-lg">
              Showing results for{' '}
              <span className="text-[#e6cfa7] font-semibold">
                {query}
              </span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-[#2b1d12] p-6 rounded-2xl space-y-10"
          >
            {/* CATEGORY */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Categories
              </h3>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-[#e6cfa7]'
                        : 'bg-[#f5f1ea] hover:bg-[#e6cfa7]/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Price Range
              </h3>

              <div className="flex justify-between text-sm mb-2">
                <span>₹0</span>
                <span>₹{maxPrice}</span>
              </div>

              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="w-full accent-[#e6cfa7]"
              />
            </div>
          </motion.aside>

          {/* PRODUCTS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredProducts.length === 0 && (
              <p className="col-span-full text-center">
                No products found 😕
              </p>
            )}

            {filteredProducts.map((p) => {
              const cartItem = cartItemById(p.id);

              return (
                <motion.div
                  key={p.id}
                  variants={itemVariants}
                  className="bg-white text-[#2b1d12] p-6 rounded-2xl flex flex-col group"
                >
                  {/* Product Link - Click pe details page khulega */}
                  <Link href={`/product/${p.id}`} className="block">
                    <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-[#f5f1ea]">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="font-semibold group-hover:text-[#E76F51] transition">
                      {p.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mt-2 text-xs text-[#8a6a44]">
                    ★ {p.rating}{" "}
                    <span className="text-[#5c4a3a]/70">
                      ({p.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center gap-2 mb-4">
                    <span className="font-bold text-[#2b1d12]">
                      ₹{p.price}
                    </span>
                    {p.oldPrice && (
                      <span className="text-sm text-[#5c4a3a]/60 line-through">
                        ₹{p.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* Cart Actions */}
                  {!cartItem ? (
                    <button
                      onClick={() =>
                        addToCart({
                          id: p.id,
                          title: p.name,
                          price: p.price,
                          image: p.images[0],
                          quantity: 1,
                        })
                      }
                      className="mt-auto bg-[#E76F51] text-white py-2 rounded-lg hover:bg-[#D55A3A] transition"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="mt-auto flex justify-between items-center border border-black/20 rounded-lg px-4 py-2">
                      <button
                        onClick={() => decreaseQty(cartItem.id)}
                        className="text-lg font-semibold"
                      >
                        -
                      </button>
                      <span className="font-semibold">{cartItem.quantity}</span>
                      <button
                        onClick={() => increaseQty(cartItem.id)}
                        className="text-lg font-semibold"
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