import Career from "@/components/Career"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Page() {
  return (
    <>
      <Navbar />
      <Career />
      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */} 
    </>
  );
}
