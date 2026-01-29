"use client";

import { useEffect, useState } from "react";

export default function HomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-[90vw] sm:max-w-md rounded-xl overflow-hidden shadow-2xl">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/popup-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/75" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-lg cursor-pointer hover:bg-gray-100 transition"
          aria-label="Close popup"
        >
          <span className="text-lg sm:text-xl leading-none text-black">×</span>
        </button>

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
            10% off 54 collections
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-black">
            Sign up for Special Discount Coupons
          </p>

          <form className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
            {/* ✅ Email Input with BLACK placeholder */}
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-lg border-2 border-purple-700 px-3 sm:px-4 py-2 sm:py-3 text-sm 
                         text-black placeholder:text-black focus:outline-none focus:border-purple-800"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-purple-700 py-2 sm:py-3 text-white text-sm sm:text-base font-semibold hover:bg-purple-800 transition"
            >
              Submit
            </button>
          </form>

          <p className="mt-3 sm:mt-4 text-xs text-gray-700 leading-relaxed">
            By signing up, you agree to receive marketing emails. View our{" "}
            <span className="underline cursor-pointer">privacy policy</span>{" "}
            and{" "}
            <span className="underline cursor-pointer">terms of service</span>.
          </p>
        </div>
      </div>
    </div>
  );
}