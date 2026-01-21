'use client';

import { X, Minus, Plus, Trash2 } from "lucide-react";
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

  // LOCK BODY SCROLL WHEN CART OPEN
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
          className="fixed inset-0 z-40 bg-black/50 cursor-pointer"
        />
      )}

      {/* DRAWER */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-screen w-[380px]
          bg-white border-l border-[#e6cfa7]/30
          transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6cfa7]/20">
          <h2 className="text-lg font-bold text-black">Shopping Cart</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5 text-[#eadbc4]" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* TOTAL + CHECKOUT ABOVE ITEMS */}
          <div className="mb-4 border-b border-[#e6cfa7]/20 pb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-black">Total</span>
              <span className="text-black font-bold">₹{totalPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full rounded-lg bg-[#E76F51]
                         py-3 text-sm font-bold text-white
                         hover:bg-[#D55A3A]"
            >
              Proceed to Checkout
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-black text-sm">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 mb-4 border-b border-[#e6cfa7]/10 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-[#fdfaf6] font-semibold">
                    {item.title}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-7 h-7 flex items-center justify-center
                                 rounded bg-[#3b2a1a] text-[#eadbc4]
                                 hover:bg-[#4a3523]"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="text-sm text-[#fdfaf6]">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-7 h-7 flex items-center justify-center
                                 rounded bg-[#3b2a1a] text-[#eadbc4]
                                 hover:bg-[#4a3523]"
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-[#eadbc4]/70 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-sm text-[#e6cfa7] font-semibold mt-2">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
