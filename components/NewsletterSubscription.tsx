"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

type Message = {
  type: "success" | "error";
  text: string;
};

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("visible", entry.isIntersecting)
        );
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (joined) return;

    setLoading(true);
    setMessage(null);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      setMessage({
        type: "success",
        text: "Thank you for joining our circle. Please check your email.",
      });

      setJoined(true);
      setEmail("");
    } catch {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <section className="relative py-24 px-6 font-serif overflow-hidden
                        bg-gradient-to-b from-[#0f2f3a] to-[#1A4A5E]">

      {/* Content */}
      <div
        data-animate="card"
        className="relative max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <span
          className="inline-block mb-8 px-8 py-2 border border-[#e6cfa7]/60 rounded-full
                     text-[#e6cfa7] tracking-widest uppercase text-xs"
        >
          Handcrafted Circle
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#fdfaf6] mb-6">
          Join Our{" "}
          <span className="text-[#e6cfa7]">Antique Craft Society</span>
        </h2>

        <div className="mb-8 text-[#e6cfa7] tracking-widest">
          ───── ✦ ─────
        </div>

        <p className="text-[#eadbc4] text-lg mb-12 max-w-3xl mx-auto">
          Receive timeless inspirations, artisan insights, and early access to
          our handcrafted collections.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8"
        >
          <input
            type="email"
            required
            disabled={joined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 bg-[#3b2a1a]/70 border border-[#e6cfa7]/40
                       rounded-lg text-[#fdfaf6] placeholder:text-[#eadbc4]/60
                       focus:outline-none focus:border-[#e6cfa7]
                       disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading || joined}
            className={`px-10 py-4 font-semibold rounded-lg shadow-lg transition-all duration-500
              ${
                joined
                  ? "bg-green-600 text-white cursor-default"
                  : "bg-[#e6cfa7] text-[#3b2a1a] hover:bg-[#dcc39a] cursor-pointer"
              }
              disabled:opacity-60
            `}
          >
            {loading ? "Joining…" : joined ? "Joined ✓" : "Join Now"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            data-animate="card"
            className={`flex items-center justify-center gap-3 mb-6 p-4 rounded-lg border
                        animate-fadeIn ${
                          message.type === "success"
                            ? "bg-green-900/30 border-green-400/40 text-green-100"
                            : "bg-red-900/30 border-red-400/40 text-red-100"
                        }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Privacy */}
        <p className="text-[#eadbc4]/80 text-sm">
          By joining, you agree to our{" "}
          <a href="/privacy-policy" className="text-[#e6cfa7] underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
