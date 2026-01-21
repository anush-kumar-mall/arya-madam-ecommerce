'use client';

import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

const info = [
  {
    title: "Visit Our Store",
    icon: MapPin,
    lines: ["123 Craft Street", "Mumbai, Maharashtra", "India"],
  },
  {
    title: "Call Us",
    icon: Phone,
    lines: ["+91 98765 43210", "Mon–Sat: 9AM – 7PM"],
  },
  {
    title: "Email Us",
    icon: Mail,
    lines: ["info@aryamadamcraft.com", "Reply within 24 hours"],
  },
  {
    title: "Business Hours",
    icon: Clock,
    lines: ["Mon–Fri: 9AM – 7PM", "Sunday: Closed"],
  },
];

export default function ContactPage() {
  const [message, setMessage] = useState("");

  /* 🔥 Intersection Animation */
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="antique"]');

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry =>
          entry.target.classList.toggle("visible", entry.isIntersecting)
        ),
      { threshold: 0.3 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* 🔥 Auto scroll from #contact */
  useEffect(() => {
    if (window.location.hash === "#contact") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section id="contact" className="relative font-serif overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-white" />

      {/* ===== GET IN TOUCH ===== */}
      <div className="relative py-30 px-6 text-center">
        <div
          data-animate="antique"
          className="max-w-8xl mx-auto px-1 py-20 rounded-3xl
                     bg-[rgb(44_95_124)] border border-[rgb(44_95_124)]
                     shadow-[0_30px_90px_rgba(44,95,124,0.6)]
"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#fdfaf6] mb-6">
            Get In Touch
          </h2>

          <div className="mb-8 text-[#e6cfa7]">───── ✦ ─────</div>

          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll
            <br />
           respond as soon as possible.
          </p>
        </div>
      </div>

      {/* ===== CONTACT INFO ===== */}
      <div className="relative py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {info.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              data-animate="antique"
              className="rounded-2xl p-8 bg-white
                         border border-[rgb(44_95_124)] text-center"
            >
              <div className="mx-auto mb-5 w-14 h-14 rounded-xl
                              flex items-center justify-center
                              bg-[#e6cfa7]">
                <Icon className="w-6 h-6 text-[#3b2a1a]" />
              </div>

              <h3 className="text-[rgb(44_95_124)] font-semibold mb-3">
                {item.title}
              </h3>

              {item.lines.map((line, idx) => (
                <p key={idx} className="text-black text-sm">
                  {line}
                </p>
              ))}
            </div>
          );
        })}
      </div>

      {/* ===== FORM + MAP ===== */}
      <div className="relative py-28 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* FORM */}
        <div
          data-animate="antique"
          className="lg:col-span-2 bg-white
                     border border-[#e6cfa7]/40 rounded-2xl p-10"
        >
          <h2 className="text-3xl font-bold text-[rgb(44_95_124)] mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <input className="input" placeholder="Full Name" />
            <input className="input" placeholder="Email Address" />
            <input className="input" placeholder="Phone Number" />

            <textarea
              maxLength={500}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tell us how we can help you…"
              className="w-full h-32 px-5 py-3 rounded-lg
                         bg-white border border-[#e6cfa7]/40
                         text-black"
            />

            <p className="text-xs text-black">
              {message.length}/500 characters
            </p>

            <button className="btn-primary flex items-center gap-2">
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>

        {/* SIDE */}
        <div className="space-y-10">
          <div
            data-animate="antique"
            className="bg-[rgb(44_95_124)] border border-[#e6cfa7]/40
                       rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-[#fdfaf6] mb-4">
              Need Immediate Help?
            </h3>

            <a href="tel:+919876543210" className="btn-primary">
              <Phone size={16} /> Call Now
            </a>
          </div>

          <div data-animate="antique" className="rounded-2xl overflow-hidden">
            <iframe
              title="Mumbai Map"
              src="https://www.google.com/maps?q=Mumbai&output=embed"
              className="w-full h-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
