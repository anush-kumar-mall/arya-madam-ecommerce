"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  Headphones,
  Lightbulb,
  Heart,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { motion, animate, useMotionValue, useInView } from "framer-motion";
import ThreeDCard from "@/components/ThreeDCard";

/* ================= Animated Counter ================= */
const AnimatedCounter = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    let controls: any;

    if (isInView) {
      controls = animate(motionValue, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest).toLocaleString());
        },
      });
    } else {
      motionValue.set(0);
      setDisplayValue("0");
    }

    return () => controls?.stop();
  }, [isInView, numericValue, motionValue]);

  return <motion.span ref={ref}>{displayValue}{suffix}</motion.span>;
};

/* ================= PAGE ================= */
export default function About() {
  useEffect(() => {
    if (window.location.hash === "#about") {
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "500+", label: "Premium Products" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const values = [
    {
      title: "Quality Assurance",
      description:
        "Every product is carefully inspected to meet our high standards of excellence.",
      icon: ShieldCheck,
    },
    {
      title: "Sustainability",
      description:
        "We prioritize eco-friendly materials and ethical sourcing practices.",
      icon: Leaf,
    },
    {
      title: "Customer First",
      description:
        "Your satisfaction is our priority with dedicated support and easy returns.",
      icon: Headphones,
    },
    {
      title: "Innovation",
      description:
        "We constantly explore new materials and creative techniques to inspire you.",
      icon: Lightbulb,
    },
  ];

  const team = [
    {
      name: "Sophia Bennett",
      role: "Founder & CEO",
      description: "Empowering artisans with premium materials",
      image: "/assets/team1.jpeg",
    },
    {
      name: "Ethan Hughes",
      role: "Head of Operations",
      description: "Ensuring seamless delivery and logistics",
      image: "/assets/team3.jpeg",
    },
    {
      name: "Olivia Parker",
      role: "Product Curator",
      description: "Handpicks the finest craft supplies",
      image: "/assets/team2.jpeg",
    },
    {
      name: "Liam Thompson",
      role: "Customer Success Manager",
      description: "Focused on customer happiness",
      image: "/assets/team4.jpeg",
    },
  ];

  return (
    <div id="about" className="font-serif bg-[#2b1d12] text-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b1d12]/95 via-[#3b2a1a]/85 to-[#2b1d12]/95" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block mb-6 px-6 py-2 border border-[#e6cfa7]/60 rounded-full text-[#e6cfa7] text-xs tracking-widest">
              OUR STORY
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>

            <div className="mb-6 text-[#e6cfa7] tracking-[0.3em] text-sm md:text-base">
              ───── ✦ HANDCRAFTED • TRUSTED • TIMELESS ✦ ─────
            </div>

            <p className="text-[#eadbc4] text-lg">
              Blending tradition, quality, and innovation, we deliver thoughtfully crafted materials that help creators<br />
              build lasting, beautiful, and meaningful work. <span className="text-[#e6cfa7] font-semibold">2010</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-[#eadbc4] mb-4">
              Founded in 2010, Arya Madam Craft Supplies began as a small shop in Mumbai.
            </p>
            <p className="text-[#eadbc4]">
              Today, we proudly serve creators across India.
            </p>
          </motion.div>

          <ThreeDCard>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="/assets/ourStory1.jpeg"
                alt="Store Interior"
                width={800}
                height={520}
                className="rounded-2xl object-cover"
              />
            </motion.div>
          </ThreeDCard>
        </div>

        {/* ================= STATS ================= */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-4xl font-bold text-[#eadbc4] mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <p className="text-[#e6cfa7]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-20">Our Values</h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ThreeDCard>
                  <div className="p-8 bg-[#3b2a1a]/80 rounded-2xl text-center border border-[#e6cfa7]/30">
                    <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center bg-[#2b1d12] rounded-xl">
                      <Icon className="text-[#e6cfa7]" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-[#eadbc4]">{value.description}</p>
                  </div>
                </ThreeDCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-20">Meet Our Team</h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ThreeDCard>
                <div className="text-center">
                  <div className="relative h-80 rounded-2xl overflow-hidden border border-[#e6cfa7]/30">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-6 font-semibold">{member.name}</h3>
                  <p className="text-[#e6cfa7] text-sm">{member.role}</p>
                  <p className="text-[#eadbc4] text-sm mt-2">{member.description}</p>
                </div>
              </ThreeDCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-6">
        <ThreeDCard>
          <motion.div
            className="max-w-4xl mx-auto text-center bg-[#3b2a1a]/80 p-16 rounded-3xl border border-[#e6cfa7]/40"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heart className="mx-auto mb-6 text-[#e6cfa7]" />
            <h2 className="text-3xl font-bold mb-6">
              Join Our Creative Community
            </h2>
            <p className="text-[#eadbc4] mb-10">
              Be part of a growing community of creators.
            </p>

            <div className="flex justify-center gap-6">
              <Link href="/newsletter" className="px-6 py-3 border rounded-lg">
                <Mail className="inline mr-2" /> Subscribe
              </Link>
              <Link
                href="/shop"
                className="px-6 py-3 bg-[#e6cfa7] text-[#3b2a1a] rounded-lg"
              >
                <ShoppingBag className="inline mr-2" /> Start Shopping
              </Link>
            </div>
          </motion.div>
        </ThreeDCard>
      </section>
    </div>
  );
}
