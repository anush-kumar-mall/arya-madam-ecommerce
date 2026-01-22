'use client';

import React from 'react';
import { useCart } from '@/app/providers/CartProvider';

export default function CheckoutPage() {
  const { items: cartItems, increaseQty, decreaseQty } = useCart();

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [pincode, setPincode] = React.useState('');

  const total = cartItems.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const orderOnWhatsApp = () => {
    if (!name || !phone || !street || !city || !pincode) return;

    const productText = cartItems
      .map(
        (p) =>
          `• ${p.title} × ${p.quantity} = ₹${p.price * p.quantity}`
      )
      .join('\n');

    const message = `
🛒 *New Order*

${productText}

💰 Total: ₹${total}

📦 Delivery Details:
Name: ${name}
Phone: ${phone}
Address: ${street}, ${city}, ${pincode}
    `.trim();

    const whatsappNumber = '919876543210';
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const isFormValid = name && phone && street && city && pincode;

  return (
    <section className="min-h-screen px-6 py-24 font-serif bg-white">
      <div className="max-w-7xl mx-auto text-black">
        <h1 className="text-4xl font-bold mb-14 text-[rgb(44_95_124)]">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">

            {/* DELIVERY ADDRESS */}
            <div className="card">
              <h2 className="title">Delivery Address</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Full Name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Phone Number"
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <textarea
                placeholder="Street Address"
                className="input mt-6"
                rows={3}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <input
                  placeholder="City"
                  className="input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  placeholder="Pincode"
                  className="input"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="card">
              <h2 className="title">Payment Method</h2>

              {/* ✅ SAME GREEN COLOUR AS ORIGINAL */}
              <div className="mt-4 p-4 rounded-xl border border-[#25D366]/60 bg-[#25D366]/10 text-[#25D366] font-semibold">
                ✔ Order on WhatsApp (No online payment)
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="card h-fit">
            <h2 className="title">Order Summary</h2>

            <div className="space-y-6">
              {cartItems.length === 0 && (
                <p className="text-center text-white">
                  Your cart is empty 😕
                </p>
              )}

              {cartItems.map((p) => (
                <div key={p.id} className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/30">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-white">{p.title}</p>
                    <p className="text-sm opacity-80">
                      ₹{p.price} × {p.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 border border-white/40 rounded-lg px-2 py-1">
                    <button
                      onClick={() => decreaseQty(String(p.id))}
                      className="text-xl font-bold hover:text-white"
                    >
                      -
                    </button>
                    <span className="font-semibold">{p.quantity}</span>
                    <button
                      onClick={() => increaseQty(String(p.id))}
                      className="text-xl font-bold hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-6 border-white/30" />

            <div className="flex justify-between text-lg font-bold text-white mb-8">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={orderOnWhatsApp}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-full font-semibold tracking-wide transition
                ${isFormValid
                  ? 'bg-[#25D366] text-[#1f3b2c] hover:opacity-90'
                  : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .card {
          background: rgb(44, 95, 124);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 32px;
          border-radius: 20px;
          color: white;
        }
        .title {
          font-size: 22px;
          font-weight: 600;
          color: white;
          margin-bottom: 20px;
        }
        .input {
          width: 100%;
          background: white;
          border: none;
          border-radius: 12px;
          padding: 12px 16px;
          color: black;
          outline: none;
        }
        .input::placeholder {
          color: #555;
        }
      `}</style>
    </section>
  );
}