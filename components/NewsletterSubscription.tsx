'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react'; // icons ke liye

type Message = {
  type: 'success' | 'error';
  text: string;
};

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            'visible',
            entry.isIntersecting
          );
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // simulate API call
      await new Promise((res) => setTimeout(res, 1000));

      setMessage({
        type: 'success',
        text: 'Thank you for joining our circle. Please check your email.',
      });
      setEmail('');
    } catch {
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);

      // auto-hide message after 5 sec
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <section className="relative py-24 px-6 font-serif overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#2b1d12]/85" />

      {/* Content */}
      <div
        data-animate="card"
        className="relative max-w-4xl mx-auto text-center"
      >

        {/* Badge */}
        <span className="inline-block mb-8 px-8 py-2 border border-[#e6cfa7]/60 rounded-full
                         text-[#e6cfa7] tracking-widest uppercase text-xs">
          Handcrafted Circle
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#fdfaf6] mb-6 leading-tight">
          Join Our <span className="text-[#e6cfa7]">Antique Craft Society</span>
        </h2>

        {/* Divider */}
        <div className="mb-8 text-[#e6cfa7] tracking-widest">
          ───── ✦ ─────
        </div>

        {/* Description */}
        <p className="text-[#eadbc4] text-lg mb-12 max-w-3xl mx-auto leading-relaxed">
          Receive timeless inspirations, artisan insights, and early access to
          our handcrafted collections. Enjoy a special welcome gift on your
          first order.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 bg-[#3b2a1a]/70 border border-[#e6cfa7]/40
                       rounded-lg text-[#fdfaf6] placeholder:text-[#eadbc4]/60
                       focus:outline-none focus:border-[#e6cfa7]"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-[#e6cfa7] text-[#3b2a1a]
                       font-semibold rounded-lg shadow-lg
                       hover:bg-[#dcc39a] transition-all duration-500
                       disabled:opacity-50"
          >
            {loading ? 'Joining…' : 'Join Now'}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            data-animate="card"
            className={`flex items-center justify-center gap-3 mb-6 p-4 rounded-lg border transition-all duration-500
                        animate-fadeIn ${
                          message.type === 'success'
                            ? 'bg-green-900/30 border-green-400/40 text-green-100'
                            : 'bg-red-900/30 border-red-400/40 text-red-100'
                        }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Privacy */}
        <p className="text-[#eadbc4]/80 text-sm">
          By joining, you agree to our{' '}
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
