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
import ThreeDCard from "@/Components/ThreeDCard";

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
export default function AboutUs() {
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

        <div className="relative z-10 h-full flex items-center bg-[rgb(44_95_124)] justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block mb-6 px-6 py-2 border border-[#e6cfa7]/60 rounded-full text-white text-xs tracking-widest">
              OUR STORY
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>

            <div className="mb-6 text-white tracking-[0.3em] text-sm md:text-base">
              ───── ✦ HANDCRAFTED • TRUSTED • TIMELESS ✦ ─────
            </div>
``
            <p className="text-white text-lg">
              Blending tradition, quality, and innovation, we deliver thoughtfully crafted materials that help creators<br />
              build lasting, beautiful, and meaningful work. <span className="text-white font-semibold">2010</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-28 px-6 bg-white max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-[rgb(44_95_124)] mb-6">Our Story</h2>
            <p className="text-black mb-6 leading-relaxed">
  Arya Madam Art and Craft Services is a purpose-driven initiative founded by
  <span className="text-black font-semibold"> Arya Madam</span>, a highly respected
  educator and master craftsperson with over
  <span className="text-black font-semibold"> 30 years of experience</span>
  in art and craft education.
</p>

<p className="text-black mb-6 leading-relaxed">
  Her journey began in <span className="font-semibold">Tumsar, Maharashtra</span>,
  where she spent 15 years nurturing creativity, discipline, and artistic excellence
  among students. She later continued her mission in
  <span className="font-semibold"> Bhiwani, Haryana</span>, serving for more than
  15 years at <span className="italic">Vaish Model Senior Secondary School</span>
  as an Art and Craft Instructor.
</p>

<p className="text-black mb-6 leading-relaxed">
  Throughout her career, Arya Madam became known not only for her technical expertise,
  but also for her commitment to holistic education—building confidence, character,
  and self-expression through creative learning.
</p>

<p className="text-black mb-6 leading-relaxed">
  After retiring from formal school teaching, she dedicated herself to
  <span className="text-black font-semibold"> community upliftment</span>.
  She initiated free education and awareness programs in
  <span className="font-semibold"> Rudra Colony near TIT School, Bhiwani</span>,
  with a strong focus on girls’ education, women empowerment, and social awareness.
</p>

<p className="text-black mb-6 leading-relaxed">
  This vision was deeply shared with her late husband,
  <span className="font-semibold"> Lt. Shri Ramakant Arya Ji</span>,
  a dedicated music teacher who believed in uplifting society through education
  and culture. After his retirement and later his untimely demise, Arya Madam
  carried forward their shared mission with even greater resolve.
</p>

<p className="text-black leading-relaxed">
  At the heart of Arya Madam Art and Craft Services lies a powerful vision—to empower
  girls, boys, and young individuals through structured degree and diploma programs
  in art and craft. By combining hands-on training, mentorship, and value-based learning,
  the initiative strives to create sustainable livelihoods, financial independence,
  and a sense of purpose—transforming creativity into dignity and long-term success.
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
              <div className="text-5xl font-bold text-[rgb(44_95_124)] mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <p className="text-black">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-10 px-6 max-w-7xl bg-white mx-auto">
  <h2 className="text-center text-4xl text-[rgb(44_95_124)] font-bold mb-4">
    Our Values
  </h2>

  <p className="text-center text-black text-lg mb-20">
    The principles that guide everything we do
  </p>

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
            <div className="p-8 bg-white rounded-2xl text-center border border-[#e6cfa7]/30">
              <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center bg-[rgb(44_95_124)] rounded-xl">
                <Icon className="text-[#e6cfa7]" />
              </div>
              <h3 className="font-semibold text-[rgb(44_95_124)] mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-black">
                {value.description}
              </p>
            </div>
          </ThreeDCard>
        </motion.div>
      );
    })}
  </motion.div>
</section>


      {/* ================= TEAM ================= */}
      <section className="py-28 px-6 max-w-7xl bg-white mx-auto">
        <h2 className="text-center text-4xl font-bold text-[rgb(44_95_124)] mb-4">Meet Our Team</h2>

        <p className="text-center text-black text-lg mb-16">
    Passionate professionals dedicated to your creative success
  </p>

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
                  <h3 className="mt-6 text-[rgb(44_95_124)] text-xl font-semibold mb-2 ">{member.name}</h3>
                  <p className="text-black text-sm mb-3">{member.role}</p>
                  <p className="text-black text-sm mt-2">{member.description}</p>
                </div>
              </ThreeDCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-18 pb-32 bg-white px-6">
        <ThreeDCard>
          <motion.div
            className="max-w-4xl mx-auto text-center bg-[rgb(44_95_124)] p-16 rounded-3xl border border-[#e6cfa7]/40"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heart className="mx-auto mb-6 text-black" />
            <h2 className="text-3xl font-bold mb-6">
              Join Our Creative Community
            </h2>
            <p className="text-black mb-10">
              Be part of a growing community of creators.
            </p>

            <div className="flex justify-center gap-6">
              <Link href="/newsletter" className="px-6 py-3 border bg-white text-[rgb(44_95_124)] rounded-lg">
                <Mail className="inline mr-2" /> Subscribe to Newsletter
              </Link>
              <Link
                href="/shop"
                className="px-6 py-3 bg-[#E76F51] text-white rounded-lg"
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
