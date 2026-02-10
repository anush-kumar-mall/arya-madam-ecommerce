import ShippingPolicy from "@/components/ShippingPolicy"; 
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Page() {
  return (
    <>
      <Navbar />
      <ShippingPolicy />
      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
    </>
  );
}
