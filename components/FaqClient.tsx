'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How can I apply for a position?',
    a: 'You can apply directly from our Careers page by selecting an open position and submitting your resume.',
  },
  {
    q: 'Do you offer remote work options?',
    a: 'Yes, selected roles offer remote or hybrid work depending on the nature of the position.',
  },
  {
    q: 'What is your hiring process timeline?',
    a: 'Our hiring process typically takes 2–3 weeks, including application review and interviews.',
  },
  {
    q: 'Can I apply if no role matches my profile?',
    a: 'Absolutely. You can send us your resume, and we’ll reach out when a suitable opportunity arises.',
  },
  {
    q: 'What kind of work culture do you promote?',
    a: 'We value craftsmanship, mutual respect, creativity, and long-term growth.',
  },
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = setTimeout(() => {
      document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(t);
  }, [searchParams]);

  return (
    <section
      id="faqs"
      className="relative min-h-screen px-6 py-32 font-serif overflow-hidden"
    >
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#2b1d12]/90" />

      {/* CONTENT */}
      <motion.div
        initial={{
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          opacity: 0,
        }}
        whileInView={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
        }}
        viewport={{ once: false }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
        className="relative z-10 mx-auto max-w-4xl text-[#eadbc4]"
      >
        {/* HERO */}
        <div className="mb-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fdfaf6]">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg">
            Answers to common questions about working with us
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.9,
                ease: [0.77, 0, 0.18, 1],
                delay: index * 0.12,
              }}
              className="rounded-2xl border border-[#e6cfa7]/30 bg-[#2b1d12]/80"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-[#fdfaf6]">
                  {item.q}
                </h3>
                <span className="text-xl text-[#e6cfa7]">
                  {openIndex === index ? '—' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden px-6 pb-6 text-sm"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <Link
            href="/contact#contact"
            className="inline-block px-8 py-3 border border-[#e6cfa7] text-[#e6cfa7] rounded-full"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
