import { Suspense } from "react";
import Shop from "@/components/Shop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div className="py-24 text-center">Loading shop...</div>}>
        <Shop />
      </Suspense>

      <Footer />
    </>
  );
}
