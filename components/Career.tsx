'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const openings = [
  {
    title: 'Product Designer',
    type: 'Full Time · Mumbai / Remote',
    desc: 'Design premium craft tools and visual experiences rooted in tradition.',
  },
  {
    title: 'Frontend Developer',
    type: 'Full Time · Remote',
    desc: 'Build elegant, performant interfaces using Next.js & Tailwind.',
  },
  {
    title: 'Operations Manager',
    type: 'Full Time · Mumbai',
    desc: 'Oversee supply chain, vendors, and day-to-day operations.',
  },
];

const CareersPage = () => {
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
      <div className="relative z-10 mx-auto max-w-5xl text-[#eadbc4]">

        {/* HERO */}
        <div className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6 px-6 py-2 border border-[#e6cfa7]/60 rounded-full text-[#e6cfa7] tracking-widest uppercase text-xs"
          >
            Careers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#fdfaf6]"
          >
            Work With Arya Madam
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="my-6 text-[#e6cfa7] tracking-widest"
          >
            ───── ✦ ─────
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed"
          >
            Join a team driven by craftsmanship, precision, and timeless values.
          </motion.p>
        </div>

        {/* OPENINGS */}
        <div className="space-y-8">
          {openings.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-2xl border border-[#e6cfa7]/30
                         bg-[#2b1d12]/80
                         shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                         p-8"
            >
              <h3 className="text-2xl font-semibold text-[#fdfaf6] mb-2">
                {job.title}
              </h3>

              <p className="text-sm uppercase tracking-widest text-[#e6cfa7] mb-4">
                {job.type}
              </p>

              <p className="leading-relaxed mb-6">
                {job.desc}
              </p>

              <Link
                href="/contact#contact"
                className="inline-block px-6 py-2
                           border border-[#e6cfa7]
                           text-[#e6cfa7]
                           rounded-full tracking-wide
                           hover:bg-[#e6cfa7]
                           hover:text-[#3b2a1a]
                           transition"
              >
                Apply Now
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#fdfaf6] mb-6">
            Don’t See the Right Role?
          </h2>

          <p className="mb-10 text-lg">
            Send us your resume — we’re always open to great talent.
          </p>

          <Link
            href="/contact#contact"
            className="inline-block px-8 py-3
                       border border-[#e6cfa7]
                       text-[#e6cfa7]
                       rounded-full tracking-wide
                       hover:bg-[#e6cfa7]
                       hover:text-[#3b2a1a]
                       transition"
          >
            Get In Touch
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CareersPage;
