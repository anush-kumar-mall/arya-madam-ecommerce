'use client';

import React from 'react';
import { motion } from 'framer-motion';

const rollVariant = {
  hidden: {
    opacity: 0,
    scaleY: 0,
    filter: 'brightness(0.9)',
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    filter: 'brightness(1)',
  },
};

const RollBlock = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={rollVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, margin: '-100px' }}
    transition={{ duration: 1 }}
    style={{ transformOrigin: 'top' }}
  >
    {children}
  </motion.div>
);

const TermsPolicyPage = () => {
  return (
    <section className="relative min-h-screen px-6 py-32 font-serif overflow-hidden">

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
      <div className="relative z-10 mx-auto max-w-4xl text-[#eadbc4]">

        {/* HEADER */}
        <RollBlock>
          <div className="mb-20 text-center">
            <span className="inline-block mb-6 px-6 py-2 border border-[#e6cfa7]/60 rounded-full text-[#e6cfa7] tracking-widest uppercase text-xs">
              Terms & Policy
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-[#fdfaf6]">
              Terms & Conditions
            </h1>

            <div className="my-6 text-[#e6cfa7] tracking-widest">
              ───── ✦ ─────
            </div>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed">
              Please read these terms carefully before using our website
              and purchasing our products.
            </p>
          </div>
        </RollBlock>

        {/* CONTENT */}
        <div className="space-y-12">
          {[
            {
              title: 'Acceptance of Terms',
              text: 'By accessing or using our website, you agree to be bound by these terms and conditions.',
            },
            {
              title: 'Use of Website',
              text: 'You agree to use our website only for lawful purposes and not infringe others\' rights.',
            },
            {
              title: 'Product Information',
              text: 'Product details may slightly vary due to handcrafted nature.',
            },
            {
              title: 'Pricing & Payments',
              text: 'Prices are subject to change without notice.',
            },
            {
              title: 'Intellectual Property',
              text: 'All website content is protected and may not be reused.',
            },
            {
              title: 'Limitation of Liability',
              text: 'We are not liable for indirect or consequential damages.',
            },
            {
              title: 'Changes to Terms',
              text: 'Terms may be updated anytime without prior notice.',
            },
          ].map((item, i) => (
            <RollBlock key={i}>
              <div className="rounded-2xl border border-[#e6cfa7]/30 bg-[#2b1d12]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <h2 className="text-2xl font-semibold text-[#fdfaf6] mb-4">
                  {item.title}
                </h2>
                <p className="leading-relaxed">{item.text}</p>
              </div>
            </RollBlock>
          ))}
        </div>

        {/* CTA */}
        <RollBlock>
          <div className="mt-32 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fdfaf6] mb-6">
              Questions About Our Terms?
            </h2>

            <p className="mb-10 text-lg">
              Contact us if you need clarification.
            </p>

            <button className="px-8 py-3 border border-[#e6cfa7] text-[#e6cfa7] rounded-full tracking-wide hover:bg-[#e6cfa7] hover:text-[#3b2a1a] transition">
              Contact Support
            </button>
          </div>
        </RollBlock>

      </div>
    </section>
  );
};

export default TermsPolicyPage;