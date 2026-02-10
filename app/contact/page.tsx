import Contact from "@/components/Contact"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinComm  from "@/components/JoinCommunity";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";


export default function Page() {
  return (
    <>
      <Navbar />
      <Contact />
      <JoinComm/>
      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
    </>
  );
}
