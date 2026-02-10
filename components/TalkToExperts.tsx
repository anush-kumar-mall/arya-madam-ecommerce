"use client";

import React from "react";
import { MessageCircle, PhoneCall, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ExpertsPage() {
  return (
    <div className="bg-[#fdfaf6] min-h-screen text-black">
      
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 text-center bg-gradient-to-br from-[#fdfaf6] via-[#f3efe6] to-[#e6dbc8]/40"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Talk to Our Experts
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Get personalized guidance for crystals, vastu, remedies, sage,
          handcrafted gifts & spiritual solutions
        </p>
      </motion.section>

      {/* CONTENT */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          
          {/* WHATSAPP */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <MessageCircle className="mx-auto mb-4 text-green-600" size={40} />
            <h3 className="text-2xl font-bold mb-3">WhatsApp Consultation</h3>
            <p className="mb-6 text-gray-700">
              Chat directly with our spiritual experts for quick guidance
            </p>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* CALL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <PhoneCall className="mx-auto mb-4 text-blue-600" size={40} />
            <h3 className="text-2xl font-bold mb-3">Call Our Expert</h3>
            <p className="mb-6 text-gray-700">
              Speak directly for in-depth spiritual & vastu consultation
            </p>
            <a
              href="tel:+91XXXXXXXXXX"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Call Now
            </a>
          </motion.div>

          {/* EMAIL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <Mail className="mx-auto mb-4 text-[#E76F51]" size={40} />
            <h3 className="text-2xl font-bold mb-3">Email Support</h3>
            <p className="mb-6 text-gray-700">
              Share your query & we’ll get back with detailed guidance
            </p>
            <a
              href="mailto:info@example.com"
              className="inline-block px-6 py-3 bg-[#E76F51] text-white rounded-xl hover:bg-[#d65a3d] transition"
            >
              Send Email
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FORM */}
      <section className="py-24 px-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-[#E76F51]" />
            <h2 className="text-3xl font-bold">
              Request a Personal Consultation
            </h2>
          </div>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded"
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border rounded"
              required
            />

            <select
              className="w-full px-4 py-3 border rounded"
              required
            >
              <option value="">Select Consultation Type</option>
              <option>Crystals & Healing</option>
              <option>Vastu & Yantra</option>
              <option>Remedies</option>
              <option>Sage & Cleansing</option>
              <option>Handcrafted / Gift Items</option>
            </select>

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 border rounded"
            />

            <button
              type="submit"
              className="w-full py-4 bg-[rgb(44_95_124)] text-white rounded-xl hover:shadow-[0_0_20px_rgba(44,95,124,0.3)] transition"
            >
              Submit Request
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
