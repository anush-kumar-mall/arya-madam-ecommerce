'use client';

import { useEffect } from 'react';
import { Search, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Browse Catalog",
    description:
      "Explore our carefully curated collection of heritage craft materials.",
    icon: <Search className="w-8 h-8" strokeWidth={2} />,
  },
  {
    id: 2,
    title: "Select Products",
    description:
      "Choose materials with detailed specifications and artisan-approved quality.",
    icon: <ShoppingCart className="w-8 h-8" strokeWidth={2} />,
  },
  {
    id: 3,
    title: "Secure Checkout",
    description:
      "Complete your order through trusted, encrypted payment systems.",
    icon: <ShieldCheck className="w-8 h-8" strokeWidth={2} />,
  },
  {
    id: 4,
    title: "Fast Delivery",
    description:
      "Receive carefully packaged supplies with reliable tracking.",
    icon: <Truck className="w-8 h-8" strokeWidth={2} />,
  },
];

const StepCard: React.FC<{ step: Step }> = ({ step }) => {
  return (
    <div
      data-animate="card"
      className="flex flex-col items-center text-center font-serif"
    >
      {/* Icon + Number */}
      <div className="relative mb-8">
        <div
          className="w-24 h-24 rounded-2xl
                     bg-[#3b2a1a]/80
                     border border-[#e6cfa7]/40
                     flex items-center justify-center
                     shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        >
          <div className="text-[#e6cfa7]">
            {step.icon}
          </div>
        </div>

        <div
          className="absolute -top-4 -right-4 w-12 h-12
                     bg-[#e6cfa7]
                     rounded-lg flex items-center justify-center
                     shadow-lg"
        >
          <span className="text-[#3b2a1a] font-bold tracking-wider">
            {step.id.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-[#fdfaf6] mb-4">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-[#eadbc4] leading-relaxed max-w-sm">
        {step.description}
      </p>
    </div>
  );
};

const HowItWorks: React.FC = () => {

  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            'visible',
            entry.isIntersecting
          );
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

        {/* Header */}
        <div
          data-animate="card"
          className="text-center mb-20"
        >
          <span
            className="inline-block mb-6 px-6 py-2
                       rounded-full border border-[#e6cfa7]/60
                       text-[#e6cfa7] tracking-widest uppercase text-xs"
          >
            Our Process
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#fdfaf6] mb-6">
            How It Works
          </h2>

          <div className="mb-6 text-[#e6cfa7] tracking-widest">
            ───── ✦ ─────
          </div>

          <p className="text-[#eadbc4] text-lg md:text-xl max-w-3xl mx-auto">
            A seamless journey from selection to delivery, designed with
            precision, care, and timeless craftsmanship.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;