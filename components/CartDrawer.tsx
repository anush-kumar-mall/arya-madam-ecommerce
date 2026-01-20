"use client";

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

    // Cleanup in case component unmounts while open
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
          bg-[#2b1d12] border-l border-[#e6cfa7]/30
          transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6cfa7]/20">
          <h2 className="text-lg font-bold text-[#fdfaf6]">Your Cart</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5 text-[#eadbc4]" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-[#eadbc4]/70 text-sm">Your cart is empty</p>
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

       {/* FOOTER */}
<div
  className={`
    border-t border-[#e6cfa7]/20 px-5 py-4 space-y-3
    md:mt-auto
    ${open ? "md:mt-auto" : ""}
    flex flex-col md:flex-col
  `}
>
  {/* MOBILE ONLY: sticky top */}
  <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#2b1d12] border-t border-[#e6cfa7]/20 px-5 py-4 flex flex-col space-y-3 z-50">
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#eadbc4]">Total</span>
      <span className="text-[#fdfaf6] font-bold">₹{totalPrice}</span>
    </div>

    <button
      onClick={handleCheckout}
      className="w-full rounded-lg bg-[#e6cfa7] py-3 text-sm font-bold text-[#3b2a1a] hover:bg-[#dcc39a]"
    >
      Checkout
    </button>
  </div>

  {/* DESKTOP FOOTER (original) */}
  <div className="hidden md:flex flex-col space-y-3">
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#eadbc4]">Total</span>
      <span className="text-[#fdfaf6] font-bold">₹{totalPrice}</span>
    </div>

    <button
      onClick={handleCheckout}
      className="w-full rounded-lg bg-[#e6cfa7] py-3 text-sm font-bold text-[#3b2a1a] hover:bg-[#dcc39a]"
    >
      Checkout
    </button>
  </div>
</div>

      </div>
    </>
  );
}
