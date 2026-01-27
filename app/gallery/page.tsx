import { Suspense } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Gallery from "@/Components/OurGalley";

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
