import ReturnsAndExchanges from "@/components/ReturnsAndExchanges"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Page() {
  return (
    <>
      <Navbar />
      <ReturnsAndExchanges />
      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
    </>
  );
}
