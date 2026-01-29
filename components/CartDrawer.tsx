'use client';

import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/providers/CartProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { items, totalPrice, increaseQty, decreaseQty, removeItem } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  /* LOCK BODY SCROLL WHEN CART OPEN */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* DRAWER */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-screen w-[440px]
          bg-white shadow-2xl
          transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2 text-xl font-extrabold text-gray-900">
            <ShoppingCart size={22} />
            Shopping Cart
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty</p>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-xl bg-gray-50"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {item.title}
                  </h4>

                  <p className="text-lg font-bold text-[#1f4f67]">
                    ₹{item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 border rounded-md flex items-center justify-center"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-6 text-center font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 border rounded-md flex items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SUMMARY */}
        <div className="border-t px-6 py-4 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>

          {/* 👇 FIXED HERE */}
          <div className="flex justify-between text-xl font-bold pt-2">
            <span className="text-black">Total</span>
            <span className="text-black">₹{totalPrice}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-4 bg-[#E76F51] text-white py-3 rounded-xl
                       text-lg font-semibold hover:bg-[#D55A3A]"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={onClose}
            className="w-full border-2 border-[#1f4f67] text-[#1f4f67]
                       py-3 rounded-xl text-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
