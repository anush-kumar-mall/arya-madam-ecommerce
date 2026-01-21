import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/OurGalley";

export default function Page() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div className="py-32 text-center">Loading FAQs...</div>}>
        <Gallery />
      </Suspense>

      <Footer />
    </>
  );
}
