import AboutUs from "@/components/AboutUs";  // Function name 'About' hai
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinComm  from "@/components/JoinCommunity";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutUs />
      <JoinComm/>
      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
    </>
  );
}