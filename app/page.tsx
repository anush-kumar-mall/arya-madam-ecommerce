import Navbar from "@/Components/Navbar";
import HeroSection from "@/Components/HeroSection";
import Testimonials from "@/Components/Testimonials";
import Footer from "@/Components/Footer";
import Collections from "@/Components/FeaturedCollections";
import NewsletterSubscription from "@/Components/NewsletterSubscription";
import HowItWorks from "@/Components/HowItWorks";
import WhyChooseUs from "@/Components/WhyChooseUs";
import BestSellers from "@/Components/BestSellers";
import HomePopup from "@/Components/HomePopup";

export default function HomePage() {
  return (
    <main>
      {/* POPUP */}
      <HomePopup />

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