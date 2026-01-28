'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Mail } from 'lucide-react';

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
    a: 'Absolutely. You can send us your resume, and we'll reach out when a suitable opportunity arises.',
  },
  {
    q: 'What kind of work culture do you promote?',
    a: 'We value craftsmanship, mutual respect, creativity, and long-term growth.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = setTimeout(() => {
      document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(t);
  }, [searchParams]);

  return (
    <div id="faqs" className="font-serif bg-white">
      {/* ================= HERO ================= */}
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(44_95_124)]/95 via-[rgb(44_95_124)]/85 to-[rgb(44_95_124)]/95" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block mb-6 px-6 py-2 border border-white/60 rounded-full text-white text-xs tracking-widest">
              HELP CENTER
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>

            <div className="mb-6 text-white tracking-[0.3em] text-sm md:text-base">
              ───── ✦ YOUR QUESTIONS • OUR ANSWERS ✦ ─────
            </div>

            <p className="text-white text-lg max-w-2xl mx-auto">
              Find answers to common questions about working with us
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FAQ LIST ================= */}
      <section className="py-28 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <HelpCircle className="mx-auto mb-4 text-[rgb(44_95_124)] w-12 h-12" />
          <h2 className="text-3xl font-bold text-[rgb(44_95_124)] mb-4">
            How Can We Help?
          </h2>
          <p className="text-black text-lg">
            Browse through our most frequently asked questions
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="rounded-2xl border-2 border-[rgb(44_95_124)]/20 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left group"
              >
                <h3 className="text-lg font-semibold text-[rgb(44_95_124)] group-hover:text-[rgb(44_95_124)]/80 transition-colors">
                  {item.q}
                </h3>
                <span className="text-2xl font-bold text-[rgb(44_95_124)] transition-transform duration-300 flex-shrink-0 ml-4">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeInOut',
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-base leading-relaxed text-black border-t border-[rgb(44_95_124)]/10 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 pb-32 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center bg-[rgb(44_95_124)] p-16 rounded-3xl border border-[rgb(44_95_124)]/40"
        >
          <Mail className="mx-auto mb-6 text-white w-12 h-12" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-white text-lg mb-10">
            We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>

          <Link
            href="/contact#contact"
            className="inline-block px-8 py-4 bg-white text-[rgb(44_95_124)] rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  );
}