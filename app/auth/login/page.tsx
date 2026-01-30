"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 ROLE BASED REDIRECT
  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "ADMIN") {
        router.replace("//admin/shop");
      } else {
        router.replace("/");
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(44_95_124)] via-[#2b1d12] to-[rgb(44_95_124)] px-4 font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-[#e6cfa7]/40"
      >
        <div className="text-center mb-8">
          <span className="inline-block mb-4 px-5 py-1 border border-[#e6cfa7]/60 rounded-full text-xs tracking-widest text-[rgb(44_95_124)]">
            WELCOME BACK
          </span>
          <h2 className="text-3xl font-bold text-[rgb(44_95_124)]">
            Sign in to your account
          </h2>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Email address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-[rgb(44_95_124)] outline-none
            text-black placeholder:text-black"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-[rgb(44_95_124)] outline-none
            text-black placeholder:text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[rgb(44_95_124)] text-white font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[rgb(44_95_124)] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
