'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Leaf,
  Headphones,
  Lightbulb,
  Heart,
  Mail,
  ShoppingBag,
} from 'lucide-react';

const AboutPage = () => {
  // Stats for Our Story Section
  const stats = [
    { value: '10,000+', label: 'Happy Customers' },
    { value: '500+', label: 'Premium Products' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  // Values for Our Values Section
  const values = [
    {
      title: 'Quality Assurance',
      description: 'Every product is carefully inspected to meet our high standards of excellence and durability.',
      icon: ShieldCheck,
    },
    {
      title: 'Sustainability',
      description: 'We prioritize eco-friendly materials and ethical sourcing practices in all our collections.',
      icon: Leaf,
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our priority with dedicated support and hassle-free returns.',
      icon: Headphones,
    },
    {
      title: 'Innovation',
      description: 'Constantly exploring new materials and techniques to inspire your creativity.',
      icon: Lightbulb,
    },
  ];

  // Team Members
  const team = [
    { name: "Sophia Bennett", role: "Founder & CEO", description: "Passionate about empowering artisans with quality materials", image: "/assets/team/priya.jpg" },
    { name: "Ethan Hughes", role: "Head of Operations", description: "Ensuring seamless delivery and customer satisfaction", image: "/assets/team/rajesh.jpg" },
    { name: "Olivia Parker", role: "Product Curator", description: "Handpicking the finest craft supplies from around the world", image: "/assets/team/anita.jpg" },
    { name: "Liam Thompson", role: "Customer Success Manager", description: "Dedicated to providing exceptional customer experiences", image: "/assets/team/vikram.jpg" },
  ];

  return (
    <div className="font-serif">

      {/* -------------------- About Hero -------------------- */}
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b1d12]/95 via-[#3b2a1a]/85 to-[#2b1d12]/95" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]" />
        <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            <span className="inline-block mb-6 px-6 py-2 border border-[#e6cfa7]/60 rounded-full text-[#e6cfa7] tracking-widest uppercase text-xs opacity-0 animate-[paperReveal_1.2s_ease-out_forwards]">Our Story</span>
            <h1 className="text-4xl md:text-6xl font-bold text-[#fdfaf6] mb-6 leading-tight opacity-0 animate-[inkSettle_1.5s_0.2s_ease-out_forwards]">About Us</h1>
            <div className="mb-6 text-[#e6cfa7] tracking-widest opacity-0 animate-[paperReveal_1.2s_0.4s_ease-out_forwards]">───── ✦ ─────</div>
            <p className="text-[#eadbc4] text-lg md:text-xl leading-relaxed opacity-0 animate-[paperReveal_1.2s_0.6s_ease-out_forwards]">
              Empowering creativity through premium craft supplies
              <br className="hidden sm:block" />
              since <span className="text-[#e6cfa7] font-semibold">2010</span>
            </p>
          </div>
        </div>
      </section>

      {/* -------------------- Our Story Section -------------------- */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-[#2b1d12]/90" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="opacity-0 animate-[paperReveal_1.3s_ease-out_forwards]">
              <h2 className="text-3xl md:text-4xl font-bold text-[#fdfaf6] mb-6">Our Story</h2>
              <p className="text-[#eadbc4] leading-relaxed mb-6">
                Founded in <span className="text-[#e6cfa7] font-semibold">2010</span>, Arya Madam Craft Supplies began with a simple mission: to provide artisans, designers, and creative professionals with access to the finest craft materials available.
              </p>
              <p className="text-[#eadbc4] leading-relaxed mb-6">
                What started as a small shop in Mumbai has grown into India's leading destination for premium craft supplies. We’ve built lasting relationships with suppliers worldwide, ensuring authentic, high-quality materials for every creative project.
              </p>
              <p className="text-[#eadbc4] leading-relaxed">
                Today, we proudly serve thousands of customers across India — from hobbyists to professional artisans — with quality, sustainability, and trust at the heart of everything we do.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] opacity-0 animate-[paperReveal_1.3s_0.2s_ease-out_forwards]">
              <Image src="/assets/storeInterior.jpg" alt="Craft Store Interior" width={800} height={520} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2b1d12]/50 to-transparent" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="opacity-0 animate-[paperReveal_1.2s_ease-out_forwards]" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                <div className="text-4xl font-bold text-[#e6cfa7] mb-2">{stat.value}</div>
                <p className="text-[#eadbc4] tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- Our Values Section -------------------- */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-[#2b1d12]/90" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20 opacity-0 animate-[paperReveal_1.2s_ease-out_forwards]">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fdfaf6] mb-4">Our Values</h2>
            <p className="text-[#eadbc4] text-lg">The principles that guide everything we do</p>
            <div className="mt-6 text-[#e6cfa7] tracking-widest">───── ✦ ─────</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="rounded-2xl p-8 text-center border border-[#e6cfa7]/30 bg-[#3b2a1a]/80 shadow-[0_20px_60px_rgba(0,0,0,0.5)] opacity-0 animate-[paperReveal_1.2s_ease-out_forwards] hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition" style={{ animationDelay: `${0.2 + index * 0.15}s` }}>
                  <div className="mx-auto mb-6 w-14 h-14 rounded-xl border border-[#e6cfa7]/40 bg-[#2b1d12]/80 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#e6cfa7]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#fdfaf6] mb-3">{value.title}</h3>
                  <p className="text-sm text-[#eadbc4] leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------- Meet Our Team Section -------------------- */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-[#2b1d12]/90" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block mb-6 px-6 py-2 rounded-full border border-[#e6cfa7]/60 text-[#e6cfa7] tracking-widest uppercase text-xs">Our People</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#fdfaf6] mb-6">Meet Our Team</h2>
            <div className="mb-6 text-[#e6cfa7] tracking-widest">───── ✦ ─────</div>
            <p className="text-[#eadbc4] text-lg max-w-3xl mx-auto">Passionate professionals dedicated to preserving craftsmanship, quality, and timeless creative excellence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative h-80 w-full rounded-2xl overflow-hidden border border-[#e6cfa7]/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-[#3b2a1a]/80 transition group-hover:-translate-y-1">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#fdfaf6] tracking-wide">{member.name}</h3>
                <p className="mt-1 text-sm text-[#e6cfa7] tracking-wide">{member.role}</p>
                <p className="mt-4 text-sm text-[#eadbc4] leading-relaxed px-2">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- Antique CTA Section -------------------- */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-[#2b1d12]/90" />
        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-3xl border border-[#e6cfa7]/40 bg-[#3b2a1a]/80 px-10 py-20 text-center shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
            <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-[#e6cfa7]/40 bg-[#2b1d12]/80">
              <Heart className="h-6 w-6 text-[#e6cfa7]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#fdfaf6] mb-6">Join Our Creative Community</h2>
            <div className="mb-6 text-[#e6cfa7] tracking-widest">───── ✦ ─────</div>
            <p className="text-[#eadbc4] text-lg max-w-3xl mx-auto leading-relaxed mb-12">
              Become part of a thriving circle of artisans and creators. Receive exclusive access to timeless collections, tutorials, and special handcrafted offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/newsletter" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-[#e6cfa7]/60 bg-transparent text-[#fdfaf6] hover:bg-[#4a3323]/50 transition-all duration-300">
                <Mail className="w-5 h-5 text-[#e6cfa7]" /> Subscribe to Newsletter
              </Link>
              <Link href="/shop" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-[#e6cfa7] text-[#3b2a1a] font-semibold hover:bg-[#dcc39a] transition-all duration-300">
                <ShoppingBag className="w-5 h-5" /> Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
