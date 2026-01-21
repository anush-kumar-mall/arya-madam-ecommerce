'use client';

import { useState } from 'react';

export default function DiscountPopup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(true); // popup visible state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // yahan email submit API call add kar sakte ho
    setSubmitted(true);
  };

  if (!visible) return null; // agar user ne cancel kar diya, popup hide

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm mx-4 relative">
        {/* Cancel Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-lg"
        >
          ×
        </button>

        <h2 className="text-2xl text-black font-bold text-center mb-2">
          Get Your Discount!
        </h2>
        <p className="text-sm text-black text-center mb-6">
          Sign up now and get 10% off your first order
        </p>

        {submitted ? (
          <p className="text-green-600 text-center font-medium">
            Thank you! Check your inbox 📧
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-black font-semibold py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        )}

        <p className="text-xs text-gray-400 mt-4 text-center">
          By signing up, you agree to receive marketing emails.{' '}
          <span className="underline cursor-pointer">
            View our privacy policy and terms of service
          </span>.
        </p>
      </div>
    </div>
  );
}
