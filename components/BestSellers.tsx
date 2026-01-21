'use client';

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCart } from "@/app/providers/CartProvider";
import { products } from "@/lib/products";

export default function BestSellers() {
  const { addToCart, increaseQty, decreaseQty, items: cartItems } = useCart();

  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("visible", entry.isIntersecting)
        );
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getCartItem = (id: string) =>
    cartItems.find((item) => item.id === id);

  return (
    <section className="relative px-8 py-24 font-serif bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#2b1d12]">
              Best Sellers
            </h2>
            <p className="mt-2 text-[#5c4a3a]">
              Timeless pieces cherished by artisans
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const cartItem = getCartItem(product.id);

            return (
              <div
                key={product.id}
                data-animate="card"
                className="group relative rounded-xl bg-white p-5
                           border border-black/10
                           shadow-[0_16px_40px_rgba(0,0,0,0.08)]
                           transition hover:-translate-y-1"
              >
                {/* Wishlist */}
                <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow">
                  <Heart className="h-4 w-4 text-[#8a6a44]" />
                </button>

                {/* Badge */}
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded
                                   bg-[#e6cfa7] px-3 py-1
                                   text-xs font-semibold text-[#3b2a1a]">
                    {product.badge}
                  </span>
                )}

                <Link href={`/product/${product.id}`}>
                  {/* Image */}
                  <div className="relative h-44 w-full mb-4 rounded-lg overflow-hidden bg-[#f5f1ea]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500
                                 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-[#2b1d12]">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="mt-2 text-xs text-[#8a6a44]">
                  ★ {product.rating}{" "}
                  <span className="text-[#5c4a3a]/70">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-semibold text-[#2b1d12]">
                    ₹{product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-[#5c4a3a]/60 line-through">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Cart Actions */}
                {!cartItem ? (
                  <button
  onClick={() =>
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    })
  }
  className="mt-5 w-full rounded-lg
             bg-[#E76F51] py-2.5
             text-white font-semibold text-sm
             hover:bg-[#D55A3A] transition"
>
  Add to Cart
</button>

                ) : (
                  <div className="mt-5 flex items-center justify-between
                                  border border-black/20
                                  rounded-lg px-4 py-2">
                    <button onClick={() => decreaseQty(cartItem.id)}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => increaseQty(cartItem.id)}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
