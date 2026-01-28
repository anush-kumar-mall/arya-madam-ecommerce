'use client';

import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';

const galleryImages: string[] = [
  '/gallery/g1.jpeg',
  '/gallery/g2.jpeg',
  '/gallery/g3.jpeg',
  '/gallery/g4.jpeg',
  '/gallery/g5.jpeg',
  '/gallery/g6.jpeg',
  '/gallery/g7.jpeg',
  '/gallery/g8.jpeg',
  '/gallery/g9.jpeg',
  '/gallery/g10.jpeg',
  '/gallery/g11.jpeg',
  '/gallery/g12.jpeg',
  '/gallery/g13.jpeg',
  '/gallery/g14.jpeg',
];

const containerVariants = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const GalleryPage: React.FC = () => {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] =
    useState<'up' | 'down'>('down');

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Detect scroll direction
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined) {
      setScrollDirection(latest > previous ? 'down' : 'up');
    }
  });

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: scrollDirection === 'down' ? -150 : 150,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;

      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight')
        setActiveIndex((prev) =>
          prev !== null ? (prev + 1) % galleryImages.length : prev
        );
      if (e.key === 'ArrowLeft')
        setActiveIndex((prev) =>
          prev !== null
            ? (prev - 1 + galleryImages.length) % galleryImages.length
            : prev
        );
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex]);

  return (
    <section className="min-h-screen px-6 py-12 bg-white font-serif">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center bg-[rgb(44_95_124)] py-20 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gallery
          </h1>
          <p className="text-white max-w-2xl mx-auto">
            Explore our curated collection of craft images.
          </p>
        </motion.div>

        {/* GALLERY GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              variants={imageVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              onClick={() => setActiveIndex(index)}
              className="relative w-full h-64 overflow-hidden rounded-xl shadow-md cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={img}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>

            {/* PREV */}
            <button
              onClick={() =>
                setActiveIndex(
                  (activeIndex - 1 + galleryImages.length) %
                    galleryImages.length
                )
              }
              className="absolute left-6 text-white text-4xl"
            >
              ‹
            </button>

            {/* IMAGE */}
            <motion.img
              key={activeIndex}
              src={galleryImages[activeIndex]}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* NEXT */}
            <button
              onClick={() =>
                setActiveIndex(
                  (activeIndex + 1) % galleryImages.length
                )
              }
              className="absolute right-6 text-white text-4xl"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryPage;