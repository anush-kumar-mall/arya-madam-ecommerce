'use client';

import { FC, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Exceptional quality and consistency. Perfect for professional projects.",
    name: "Sophia Bennett",
    role: "Creative Director",
    company: "Artisan Studios",
    image: "/assets/reviews/girl1.webp",
  },
  {
    id: 2,
    text: "Premium products and outstanding service. Highly recommended.",
    name: "Ethan Hughes",
    role: "Product Designer",
    company: "Craft Innovations",
    image: "/assets/reviews/man1.webp",
  },
  {
    id: 3,
    text: "High-quality materials that make designing a joy.",
    name: "Olivia Parker",
    role: "Lead Illustrator",
    company: "Artisan Studios",
    image: "/assets/reviews/girl2.webp",
  },
  {
    id: 4,
    text: "Reliable and professional service every time.",
    name: "Liam Thompson",
    role: "UX Designer",
    company: "Craft Innovations",
    image: "/assets/reviews/man2.webp",
  },
  {
    id: 5,
    text: "Exceptional quality and fast delivery. Love working with them!",
    name: "Amelia Wilson",
    role: "Fashion Designer",
    company: "Artisan Studios",
    image: "/assets/reviews/girl3.webp",
  },
  {
    id: 6,
    text: "Always delivers more than expected. Top-notch products.",
    name: "Noah Anderson",
    role: "Industrial Designer",
    company: "Craft Innovations",
    image: "/assets/reviews/man3.webp",
  },
];


const Testimonials: FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-28 px-6 font-serif overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#2b1d12]/90" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div data-animate="card" className="text-center mb-20">
          <span className="inline-block mb-6 px-6 py-2 rounded-full border border-[#e6cfa7]/60 text-[#e6cfa7] tracking-widest uppercase text-xs">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#fdfaf6] mb-6">
            Trusted by Professionals
          </h2>

          <div className="mb-6 text-[#e6cfa7] tracking-widest">
            ───── ✦ ─────
          </div>

          <p className="text-[#eadbc4] text-lg max-w-3xl mx-auto">
            Hear from artisans and designers who rely on our materials
            to bring timeless creations to life.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t) => (
            <div
              key={t.id}
              data-animate="card"
              className="rounded-2xl border border-[#e6cfa7]/30 bg-[#3b2a1a]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
            >
              {/* Stars */}
              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#e6cfa7] fill-[#e6cfa7]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#eadbc4] italic leading-relaxed mb-8">
                “{t.text}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#fdfaf6]">{t.name}</h4>
                  <p className="text-sm text-[#eadbc4]">{t.role}</p>
                  <p className="text-sm text-[#eadbc4]/70">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
