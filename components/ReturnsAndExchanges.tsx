'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/Components/TextReveal';

const ReturnsExchangePage = () => {
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
        <div className="mb-20 text-center">
          <span className="inline-block mb-6 px-6 py-2 border border-[#e6cfa7]/60 rounded-full text-[#e6cfa7] tracking-widest uppercase text-xs">
            Returns & Exchange
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#fdfaf6]">
            <TextReveal text="Returns & Exchange Policy" />
          </h1>

          <div className="my-6 text-[#e6cfa7] tracking-widest">
            ───── ✦ ─────
          </div>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed">
            <TextReveal
              delay={0.2}
              text="Our commitment is to ensure a smooth and transparent return and exchange experience for every customer."
            />
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-12">
          {[
            {
              title: 'Eligibility for Returns',
              text: 'Items are eligible for return within 7 days of delivery, provided they are unused, in original condition, and include all original packaging.',
            },
            {
              title: 'Non-Returnable Items',
              text: 'Customized products, clearance items, and items marked as non-returnable are not eligible for return or exchange.',
            },
            {
              title: 'Exchange Process',
              text: 'If you wish to exchange a product, please contact our support team with your order details. Exchanges are subject to product availability.',
            },
            {
              title: 'Refunds',
              text: 'Once the returned item is received and inspected, refunds will be processed within 5–7 business days to the original payment method.',
            },
            {
              title: 'Return Shipping',
              text: 'Customers are responsible for return shipping costs unless the return is due to a damaged or incorrect item received.',
            },
            {
              title: 'Damaged or Incorrect Items',
              text: 'If you receive a damaged or incorrect product, please notify us within 48 hours of delivery so we can resolve the issue promptly.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-[#e6cfa7]/30 bg-[#2b1d12]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <h2 className="text-2xl font-semibold text-[#fdfaf6] mb-4">
                <TextReveal text={item.title} />
              </h2>

              <p className="leading-relaxed">
                <TextReveal delay={0.1} text={item.text} />
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#fdfaf6] mb-6">
            <TextReveal text="Need Help With a Return?" />
          </h2>

          <p className="mb-10 text-lg">
            <TextReveal text="Our support team is here to assist you with returns and exchanges." />
          </p>

          <motion.button
            initial={{ letterSpacing: '0.25em', opacity: 0 }}
            whileInView={{ letterSpacing: '0em', opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="px-8 py-3 border border-[#e6cfa7] text-[#e6cfa7] rounded-full tracking-wide hover:bg-[#e6cfa7] hover:text-[#3b2a1a] transition"
          >
            Contact Support
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default ReturnsExchangePage;