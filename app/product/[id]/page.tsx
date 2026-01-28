// app/product/[id]/page.tsx

'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/app/providers/CartProvider";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  title: string;
  details?: string;
  description: string;
  price: number;
  oldPrice?: number;
  exclusive?: number;
  stock: number;
  images: string[];
  video?: string;
  colour: string[];
  insideBox: string[];
  rating: number;
  reviews: number;
  badge?: string;
  sku: string;
  category: string;
  stone?: string;
  status: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart, increaseQty, decreaseQty, items: cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        
        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch related products (same category, different product)
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;

      try {
        const res = await fetch(`/api/products?category=${product.category}`);
        
        if (res.ok) {
          const data = await res.json();
          // Filter out current product and take first 4
          const related = data
            .filter((p: Product) => p.id !== product.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  const cartItem = cartItems.find(item => item.id === id);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0] || '/placeholder.jpg',
          quantity: 1,
        });
      }
      setQuantity(1); // Reset quantity after adding
    }
  };

  const handleProceedToCheckout = () => {
    if (product) {
      // Add to cart if not already added
      if (!cartItem) {
        for (let i = 0; i < quantity; i++) {
          addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0] || '/placeholder.jpg',
            quantity: 1,
          });
        }
      }
      // Navigate to checkout
      router.push('/checkout');
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent mb-4"></div>
            <p className="text-xl">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Product not found
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Product not found</h1>
            <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
            <a href="/" className="px-6 py-3 bg-[#e6cfa7] text-black rounded inline-block">
              Go Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="relative px-6 py-12 text-white min-h-screen">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-white" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT - Product Images */}
            <div className="bg-[rgb(44_95_124)] border border-[#e6cfa7]/40 p-6 rounded-xl">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={product.images[selectedImage]}
                    className="w-full max-h-[320px] object-contain mb-6 rounded-lg"
                    alt={product.title}
                  />

                  <div className="flex gap-4 justify-center">
                    {product.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() => setSelectedImage(i)}
                        className={`w-24 h-24 object-cover rounded-md border cursor-pointer hover:border-[#e6cfa7] transition ${
                          selectedImage === i ? 'border-[#e6cfa7] border-2' : 'border-[#e6cfa7]/40'
                        }`}
                        alt={`${product.title} - view ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-[320px] flex items-center justify-center bg-gray-200 rounded-lg">
                  <span className="text-gray-400">No Image Available</span>
                </div>
              )}
            </div>

            {/* RIGHT - Product Details */}
            <div className="bg-[rgb(44_95_124)] border border-[#e6cfa7]/40 p-8 rounded-xl">
              <h1 className="text-3xl font-bold mb-2 text-[#fdfaf6]">
                {product.title}
              </h1>

              {/* Subtitle */}
              {product.details && (
                <p className="text-[#e6cfa7] mb-2">{product.details}</p>
              )}

              {/* Rating */}
              <div className="mb-4 text-sm text-[#e6cfa7]">
                ★ {product.rating}{" "}
                <span className="text-[#eadbc4]/70">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-2xl font-semibold text-[#e6cfa7]">
                  ₹{product.price}
                </span>
                {product.oldPrice && (
                  <span className="line-through ml-3 text-lg opacity-50">
                    ₹{product.oldPrice}
                  </span>
                )}
                {product.exclusive && (
                  <span className="ml-3 text-sm bg-red-500 px-2 py-1 rounded">
                    Exclusive: ₹{product.exclusive}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <span className="text-green-400 text-sm">
                    ✓ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-400 text-sm">
                    ✗ Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mb-6 text-[#eadbc4] leading-relaxed">
                {product.description}
              </p>

              {/* Color Variants */}
              {product.colour && product.colour.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2 text-[#fdfaf6]">Available Colors:</p>
                  <div className="flex gap-2">
                    {product.colour.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-[#e6cfa7]/40"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Cart Section */}
              {!cartItem ? (
                <div className="space-y-4 mb-6">
                  {/* Quantity Selector */}
                  <div className="flex border border-[#e6cfa7]/40 rounded overflow-hidden w-fit">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-[#e6cfa7]/20 transition"
                      disabled={product.stock === 0}
                    >
                      −
                    </button>
                    <span className="px-6 py-2 border-x border-[#e6cfa7]/40">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 hover:bg-[#e6cfa7]/20 transition"
                      disabled={product.stock === 0}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full px-6 py-3 bg-[#e6cfa7] text-[#2b1d12] font-semibold rounded-lg 
                               hover:bg-[#d4bd95] transition flex items-center justify-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                  </button>

                  {/* Proceed to Checkout Button */}
                  <button 
                    onClick={handleProceedToCheckout}
                    disabled={product.stock === 0}
                    className="w-full px-6 py-3 bg-[#E76F51] text-white font-semibold rounded-lg 
                               hover:bg-[#D55A3A] transition flex items-center justify-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              ) : (
                <div className="mb-6 space-y-4">
                  {/* Cart Item Controls */}
                  <div className="flex items-center justify-between border border-[#e6cfa7]/40 rounded-lg px-6 py-3">
                    <button 
                      onClick={() => decreaseQty(cartItem.id)}
                      className="text-xl hover:text-[#e6cfa7] transition"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold">{cartItem.quantity} in cart</span>
                    <button 
                      onClick={() => increaseQty(cartItem.id)}
                      disabled={cartItem.quantity >= product.stock}
                      className="text-xl hover:text-[#e6cfa7] transition disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="text-center text-sm text-[#e6cfa7]">
                    ✓ Added to cart
                  </p>

                  {/* Proceed to Checkout Button (when item in cart) */}
                  <button 
                    onClick={handleProceedToCheckout}
                    className="w-full px-6 py-3 bg-[#E76F51] text-white font-semibold rounded-lg 
                               hover:bg-[#D55A3A] transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              )}

              {/* Badge */}
              {product.badge && (
                <div className="mb-6">
                  <span className="inline-block bg-[#e6cfa7] text-[#2b1d12] px-4 py-1 rounded text-sm font-semibold">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Meta */}
              <div className="text-sm text-[#eadbc4] space-y-2 border-t border-[#e6cfa7]/30 pt-6">
                <p>
                  <span className="font-semibold">SKU:</span> {product.sku}
                </p>
                <p>
                  <span className="font-semibold">Category:</span> {product.category}
                </p>
                {product.stone && (
                  <p>
                    <span className="font-semibold">Material:</span> {product.stone}
                  </p>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-[#2b1d12]/30 rounded-lg border border-[#e6cfa7]/20">
                <p className="text-sm text-[#eadbc4]">
                  ✓ Free shipping on orders above ₹500
                  <br />
                  ✓ Cash on Delivery available
                  <br />
                  ✓ Easy returns within 7 days
                </p>
              </div>
            </div>

          </div>

          {/* Additional Product Info */}
          <div className="mt-10 bg-[rgb(44_95_124)] border border-[#e6cfa7]/40 rounded-xl">
            <details open className="p-6">
              <summary className="cursor-pointer text-[#fdfaf6] font-semibold text-lg">
                PRODUCT DETAILS
              </summary>

              <div className="mt-4 text-[#eadbc4] text-sm space-y-2">
                <p>{product.description}</p>
                
                {/* What's in the box */}
                {product.insideBox && product.insideBox.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold text-[#fdfaf6] mb-2">What's in the Box:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      {product.insideBox.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="list-disc ml-6 mt-3 space-y-1">
                  <li>High quality materials</li>
                  <li>Handcrafted with care</li>
                  <li>Perfect for DIY projects</li>
                  <li>Eco-friendly and sustainable</li>
                </ul>
              </div>
            </details>

            {/* Video Section */}
            {product.video && (
              <details className="p-6 border-t border-[#e6cfa7]/30">
                <summary className="cursor-pointer text-[#fdfaf6] font-semibold text-lg">
                  PRODUCT VIDEO
                </summary>
                <div className="mt-4">
                  <video
                    src={product.video}
                    controls
                    className="w-full max-w-2xl rounded-lg"
                  />
                </div>
              </details>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-[#fdfaf6] mb-6">
                You May Also Like
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <a
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="bg-[rgb(44_95_124)] border border-[#e6cfa7]/40 rounded-lg p-4 hover:border-[#e6cfa7] transition group"
                  >
                    <div className="h-32 bg-[#2b1d12]/60 rounded mb-3 overflow-hidden">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-[#eadbc4] mb-1">
                      {relatedProduct.title}
                    </p>
                    <p className="text-[#e6cfa7] font-semibold">
                      ₹{relatedProduct.price}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}