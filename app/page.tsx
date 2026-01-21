import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Collections from "@/components/FeaturedCollections";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import BestSellers from "@/components/BestSellers";
import CouponPopup from "@/components/CouponPopup";



export default function HomePage() {
  return (
    <main>
    
      <CouponPopup />
      <Navbar />
      <HeroSection />
      <Collections />
      <BestSellers />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <NewsletterSubscription />
      <Footer />
    </main>
  );
}
