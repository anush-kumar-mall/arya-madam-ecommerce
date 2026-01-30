"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/app/providers/CartProvider";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  images: string[];
  rating: number;
  stock: number;
  category: string;
}

export default function RemedyProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, increaseQty, decreaseQty, items } = useCart();

  const cartItemById = (id: string) =>
    items.find((item) => item.id === id);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/remedies?category=${slug}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <>
      <Navbar />

      {/* PAGE BG SAME AS SHOP */}
      <section className="min-h-screen px-6 py-24 bg-[rgb(44_95_124)] text-white">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold capitalize">
              {slug?.toString().replace(/-/g, " ")}
            </h1>
            <p className="mt-4 text-lg text-[#e6cfa7]">
              Carefully curated spiritual products aligned with your energy
            </p>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-white border-r-transparent"></div>
              <p className="mt-4">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-300">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-white/80">
              No products available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((p) => {
                const cartItem = cartItemById(p.id);

                return (
                  <div
                    key={p.id}
                    className="bg-white text-[#2b1d12] p-6 rounded-2xl flex flex-col shadow-lg hover:shadow-2xl transition"
                  >
                    {/* IMAGE */}
                    <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      {p.images?.length > 0 ? (
                        <Image
                          src={p.images[0]}
                          alt={p.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}

                      {p.stock === 0 && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* TITLE */}
                    <h3 className="font-semibold min-h-[2.5rem]">
                      {p.title}
                    </h3>

                    {/* RATING */}
                    <div className="mt-1 text-xs text-[#8a6a44]">
                      ★ {p.rating.toFixed(1)}
                    </div>

                    {/* PRICE */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="font-bold text-lg">
                        ₹{p.price}
                      </span>
                      {p.oldPrice && (
                        <span className="text-sm line-through text-gray-500">
                          ₹{p.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* STOCK */}
                    <div className="text-xs mt-2 mb-4">
                      {p.stock > 0 ? (
                        <span className="text-green-600">
                          In Stock ({p.stock})
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* CART ACTIONS — SAME AS SHOP */}
                    {!cartItem ? (
                      <button
                        onClick={() =>
                          addToCart({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            image: p.images[0] || "/placeholder.jpg",
                            quantity: 1,
                          })
                        }
                        disabled={p.stock === 0}
                        className="mt-auto bg-[#E76F51] text-white py-2 rounded-lg hover:bg-[#D55A3A] transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                    ) : (
                      <div className="mt-auto flex justify-between items-center border-2 border-[#E76F51] rounded-lg px-4 py-2 bg-[#E76F51]/5">
                        <button
                          onClick={() => decreaseQty(cartItem.id)}
                          className="text-lg font-semibold text-[#E76F51] w-8 h-8 flex items-center justify-center hover:bg-[#E76F51]/10 rounded"
                        >
                          −
                        </button>
                        <span className="font-semibold">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(cartItem.id)}
                          disabled={cartItem.quantity >= p.stock}
                          className="text-lg font-semibold text-[#E76F51] w-8 h-8 flex items-center justify-center hover:bg-[#E76F51]/10 rounded disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
