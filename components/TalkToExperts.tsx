"use client";

import React from "react";
import { MessageCircle, PhoneCall, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

/* ---------- TEXT ANIMATION ---------- */
const textContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const textChar = {
  hidden: { y: 40, opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ---------- CARD ---------- */
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ---------- FORM FIELD ---------- */
const fieldVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function ExpertsPage() {
  const title = "Talk to Our Experts";

  return (
    <div className="bg-[#fdfaf6] min-h-screen text-black">

      {/* HERO */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-[#fdfaf6] via-[#f3efe6] to-[#e6dbc8]/40">
        <motion.h1
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="text-5xl md:text-6xl font-bold mb-6 inline-flex flex-wrap justify-center"
        >
          {title.split("").map((char, i) => (
            <motion.span key={i} variants={textChar}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-xl max-w-3xl mx-auto"
        >
          Get personalized guidance for crystals, vastu, remedies, sage,
          handcrafted gifts & spiritual solutions
        </motion.p>
      </section>

      {/* CARDS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[ 
            {
              icon: <MessageCircle size={40} className="text-green-600 mx-auto mb-4" />,
              title: "WhatsApp Consultation",
              desc: "Chat directly with our spiritual experts for quick guidance",
              btn: "Chat on WhatsApp",
              link: "https://wa.me/91XXXXXXXXXX",
              color: "bg-green-600 hover:bg-green-700",
            },
            {
              icon: <PhoneCall size={40} className="text-blue-600 mx-auto mb-4" />,
              title: "Call Our Expert",
              desc: "Speak directly for in-depth spiritual & vastu consultation",
              btn: "Call Now",
              link: "tel:+91XXXXXXXXXX",
              color: "bg-blue-600 hover:bg-blue-700",
            },
            {
              icon: <Mail size={40} className="text-[#E76F51] mx-auto mb-4" />,
              title: "Email Support",
              desc: "Share your query & we’ll get back with detailed guidance",
              btn: "Send Email",
              link: "mailto:info@example.com",
              color: "bg-[#E76F51] hover:bg-[#d65a3d]",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-white p-8 rounded-3xl shadow text-center"
            >
              {item.icon}
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="mb-6 text-gray-700">{item.desc}</p>
              <a
                href={item.link}
                target="_blank"
                className={`inline-block px-6 py-3 text-white rounded-xl transition ${item.color}`}
              >
                {item.btn}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="py-24 px-6 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow"
        >
          {/* Title */}
          <motion.div
            variants={textContainer}
            className="flex items-center gap-3 mb-6"
          >
            <Sparkles className="text-[#E76F51]" />
            <motion.h2 variants={textChar} className="text-3xl font-bold">
              Request a Personal Consultation
            </motion.h2>
          </motion.div>

          {/* FORM FIELDS */}
          <motion.div variants={textContainer} className="space-y-5">
            <motion.input
              variants={fieldVariant}
              className="w-full px-4 py-3 border rounded"
              placeholder="Your Name"
            />
            <motion.input
              variants={fieldVariant}
              className="w-full px-4 py-3 border rounded"
              placeholder="Phone Number"
            />
            <motion.select
              variants={fieldVariant}
              className="w-full px-4 py-3 border rounded"
            >
              <option>Select Consultation Type</option>
              <option>Crystals & Healing</option>
              <option>Vastu & Yantra</option>
              <option>Remedies</option>
              <option>Sage & Cleansing</option>
              <option>Handcrafted / Gift Items</option>
            </motion.select>
            <motion.textarea
              variants={fieldVariant}
              rows={4}
              className="w-full px-4 py-3 border rounded"
              placeholder="Your Message"
            />
            <motion.button
              variants={fieldVariant}
              className="w-full py-4 bg-[rgb(44_95_124)] text-white rounded-xl hover:shadow-lg transition"
            >
              Submit Request
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
