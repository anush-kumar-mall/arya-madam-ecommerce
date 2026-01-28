'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const pressItems = [
  {
    title: 'Celebrating Craftsmanship in Modern Design',
    source: 'Design Heritage Magazine',
    date: 'March 2025',
    image:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'How Tradition Shapes Contemporary Creativity',
    source: 'Artisan Weekly',
    date: 'January 2025',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'A New Standard for Premium DIY Materials',
    source: 'Creative Industry Journal',
    date: 'November 2024',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
  },
];

const MagneticCard = ({ item }: { item: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 12 });
  const springY = useSpring(y, { stiffness: 120, damping: 12 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.2);
    y.set(dy * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        x: springX,
        y: springY,
        rotateX: springY,
        rotateY: springX,
        transformStyle: 'preserve-3d',
      }}
      className="relative"
    >
      <div
        className="group overflow-hidden rounded-2xl
                   border border-gray-200
                   bg-white
                   shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                   transition-shadow"
        style={{ transform: 'translateZ(40px)' }}
      >
        {/* Image */}
        <div className="relative h-64">
          <Image
            src={item.image}
            alt={item.title}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t
                          from-white/90 via-white/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">
            {item.source} · {item.date}
          </p>

          <h3 className="text-xl font-semibold text-[#2c5f7c] mb-3">
            {item.title}
          </h3>

          <span className="text-sm font-semibold text-[#2c5f7c]">
            Read Article →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const PressPage = () => {
  return (
    <section
      className="relative min-h-screen px-6 py-32 font-serif bg-white"
      style={{ perspective: '1200px' }}
    >
      {/* CONTENT */}
      <div className="mx-auto max-w-7xl text-[#3b2a1a]">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <span className="inline-block mb-6 px-6 py-2
                           border border-[#2c5f7c]/40
                           rounded-full
                           text-[#2c5f7c]
                           tracking-widest uppercase text-xs">
            Press
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#2c5f7c]">
            In the Press
          </h1>

          <div className="my-6 text-[#2c5f7c] tracking-widest">
            ───── ✦ ─────
          </div>

          <p className="text-lg leading-relaxed text-gray-600">
            Discover what leading publications are saying about our
            commitment to craftsmanship and quality.
          </p>
        </motion.div>

        {/* MAGNETIC GRID */}
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
          {pressItems.map((item, i) => (
            <MagneticCard key={i} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PressPage;