'use client';

import { useEffect } from "react";
import { ShieldCheck, Leaf, Lock, Award } from "lucide-react";

const features = [
  {
    title: "Premium Quality",
    description:
      "Rigorously tested materials meeting professional standards, crafted with timeless precision.",
    icon: Award,
  },
  {
    title: "Sustainable Sourcing",
    description:
      "Ethically sourced materials honoring nature, tradition, and responsible craftsmanship.",
    icon: Leaf,
  },
  {
    title: "Secure Transactions",
    description:
      "Trusted, encrypted transactions ensuring safety, privacy, and peace of mind.",
    icon: Lock,
  },
  {
    title: "Expert Support",
    description:
      "Dedicated guidance and assistance from seasoned artisans and specialists.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen py-28 px-6 font-serif overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#2b1d12]/90" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div
          data-animate="card"
          className="mb-20 text-center"
        >
          <span
            className="inline-block mb-6 px-6 py-2 rounded-full
                       border border-[#e6cfa7]/60
                       text-[#e6cfa7] tracking-widest uppercase text-xs"
          >
            Our Promise
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#fdfaf6]">
            Why Choose Us
          </h2>

          <div className="my-6 text-[#e6cfa7] tracking-widest">
            ───── ✦ ─────
          </div>

          <p className="mx-auto max-w-3xl text-[#eadbc4] text-lg leading-relaxed">
            A heritage of excellence built on trust, craftsmanship, and
            unwavering commitment to quality.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              data-animate="card"
              className="group rounded-2xl
                         border border-[#e6cfa7]/30
                         bg-[#3b2a1a]/80
                         p-8 text-center
                         shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                         transition hover:-translate-y-1
                         hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
            >
              {/* Icon */}
              <div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center
                           rounded-xl border border-[#e6cfa7]/40
                           bg-[#2b1d12]/80
                           transition group-hover:scale-105"
              >
                <feature.icon className="h-7 w-7 text-[#e6cfa7]" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#fdfaf6] tracking-wide">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm text-[#eadbc4] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}