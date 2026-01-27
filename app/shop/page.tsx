import { Suspense } from "react";
import Shop from "@/Components/Shop";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

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
