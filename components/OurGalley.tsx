'use client';

import React from 'react';

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

const GalleryPage: React.FC = () => {
  return (
    <section className="min-h-screen px-6 py-12 bg-white font-serif">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center bg-[rgb(44_95_124)] py-20 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gallery
          </h1>
          <p className="text-white max-w-2xl mx-auto">
            Explore our curated collection of craft images.
          </p>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-64 overflow-hidden rounded-xl shadow-md
                         hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={img}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
