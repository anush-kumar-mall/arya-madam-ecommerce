import { Suspense } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SearchClient from "@/Components/SearchClient";

export default function Page() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div className="py-24 text-center">Loading search...</div>}>
        <SearchClient />
      </Suspense>

      <Footer />
    </>
  );
}
