"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Coins,
  Heart,
  Users,
  Shield,
  Sparkles,
  GraduationCap,
  Crown,
  Eye,
  MessageCircle,
  HeartPulse,
  Sun,
  Droplet,
  Anchor,
} from "lucide-react";

interface Remedy {
  id: number;
  title: string;
  slug: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

/* 🔹 Card animation */
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

/* 🔹 CTA animation */
const ctaVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function RemediesPage() {
  const remedies: Remedy[] = [
    {
      id: 1,
      title: "Wealth",
      slug: "wealth",
      icon: <Coins className="w-12 h-12" />,
      color: "text-yellow-700",
      bgColor: "bg-gradient-to-br from-yellow-50 to-amber-100",
      description: "Attract abundance and prosperity into your life",
    },
    {
      id: 2,
      title: "Health",
      slug: "health",
      icon: <Heart className="w-12 h-12" />,
      color: "text-green-700",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      description: "Promote physical and mental well-being",
    },
    {
      id: 3,
      title: "Relationship",
      slug: "relationship",
      icon: <Users className="w-12 h-12" />,
      color: "text-pink-700",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-100",
      description: "Strengthen bonds and attract loving connections",
    },
    {
      id: 4,
      title: "Protection",
      slug: "protection",
      icon: <Shield className="w-12 h-12" />,
      color: "text-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
      description: "Shield yourself from negative energies",
    },
    {
      id: 5,
      title: "Self-Confidence",
      slug: "self-confidence",
      icon: <Sparkles className="w-12 h-12" />,
      color: "text-purple-700",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      description: "Boost your inner strength and self-esteem",
    },
    {
      id: 6,
      title: "Education",
      slug: "education",
      icon: <GraduationCap className="w-12 h-12" />,
      color: "text-indigo-700",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-100",
      description: "Enhance learning and academic success",
    },
    {
      id: 7,
      title: "Crown Chakra",
      slug: "crown-chakra",
      icon: <Crown className="w-12 h-12" />,
      color: "text-violet-700",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-100",
      description: "Connect with higher consciousness and spirituality",
    },
    {
      id: 8,
      title: "Third Eye Chakra",
      slug: "third-eye-chakra",
      icon: <Eye className="w-12 h-12" />,
      color: "text-indigo-800",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-100",
      description: "Awaken intuition and inner wisdom",
    },
    {
      id: 9,
      title: "Throat Chakra",
      slug: "throat-chakra",
      icon: <MessageCircle className="w-12 h-12" />,
      color: "text-sky-700",
      bgColor: "bg-gradient-to-br from-sky-50 to-blue-100",
      description: "Express yourself clearly and authentically",
    },
    {
      id: 10,
      title: "Heart Chakra",
      slug: "heart-chakra",
      icon: <HeartPulse className="w-12 h-12" />,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-100",
      description: "Open your heart to love and compassion",
    },
    {
      id: 11,
      title: "Solar Plexus Chakra",
      slug: "solar-plexus-chakra",
      icon: <Sun className="w-12 h-12" />,
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-100",
      description: "Empower your personal power and confidence",
    },
    {
      id: 12,
      title: "Sacral Chakra",
      slug: "sacral-chakra",
      icon: <Droplet className="w-12 h-12" />,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-100",
      description: "Enhance creativity and emotional balance",
    },
    {
      id: 13,
      title: "Root Chakra",
      slug: "root-chakra",
      icon: <Anchor className="w-12 h-12" />,
      color: "text-red-700",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-100",
      description: "Ground yourself and feel secure",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero – unchanged */}
        <section className="relative py-20 px-6 bg-gradient-to-br from-[#fdfaf6] via-[#f5f1e8] to-[#eadbc4]/40">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[rgb(44_95_124)] mb-6">
              Spiritual Remedies
            </h1>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Discover powerful remedies for different aspects of your life and
              balance your chakras with our carefully curated spiritual solutions
            </p>
          </div>
        </section>

        {/* Cards */}
        <section className="py-16 px-6 bg-[#fdfaf6]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remedies.map((remedy) => (
              <Link key={remedy.id} href={`/remedies/${remedy.slug}`}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{
                    rotateX: 6,
                    rotateY: -6,
                    scale: 1.03,
                  }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className={`relative h-full p-8 rounded-2xl ${remedy.bgColor}
                  border-2 border-gray-200 hover:border-[rgb(44_95_124)]/40
                  transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className={`${remedy.color} mb-6`}>
                    {remedy.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {remedy.title}
                  </h3>

                  <p className="text-gray-800 leading-relaxed">
                    {remedy.description}
                  </p>

                  <div className="mt-6 font-semibold text-[rgb(44_95_124)]">
                    Explore
                  </div>

                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-900/5">
                    {remedy.id}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA – animated */}
        <section className="py-20 px-6 bg-white">
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[rgb(44_95_124)] to-[#5a7a95] rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let us guide you to the perfect remedy for your needs
            </p>

            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-[rgb(44_95_124)] font-bold rounded-xl hover:bg-[#eadbc4] transition"
              >
                Get Personalized Guidance
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </>
  );
}