import TermsOfService from "@/components/TermsOfService"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Page() {
  return (
    <>
      <Navbar />
      <TermsOfService />
      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
    </>
  );
}
