"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/app/providers/CartProvider";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const {
    items,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();

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
          fixed top-0 right-0 z-50 h-screen w-[380px]
          bg-[#2b1d12] border-l border-[#e6cfa7]/30
          transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6cfa7]/20">
          <h2 className="text-lg font-bold text-[#fdfaf6]">
            Your Cart
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-[#eadbc4]" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-[#eadbc4]/70 text-sm">
              Your cart is empty
            </p>
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

                  {/* QUANTITY CONTROLS */}
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
        <div className="border-t border-[#e6cfa7]/20 px-5 py-4 space-y-3">
          {/* TOTAL */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#eadbc4]">Total</span>
            <span className="text-[#fdfaf6] font-bold">
              ₹{totalPrice}
            </span>
          </div>

          <button
            className="w-full rounded-lg bg-[#e6cfa7]
                       py-3 text-sm font-bold text-[#3b2a1a]
                       hover:bg-[#dcc39a] transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
