// import AboutUs from "@/components/AboutUs";  // Function name 'About' hai
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Experts  from "@/components/TalkToExperts";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function AboutPage() {
  return (
    <>
       <Navbar />
      <Experts/>
     <Footer /> 
     <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
    </>
  );
}