import Hero from "@/components/home/Hero";
import PromoBanner from "@/components/home/PromoBanner";
import TripFinder from "@/components/home/TripFinder";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import VillaShowcase from "@/components/home/VillaShowcase";
import GolfShowcase from "@/components/home/GolfShowcase";
import DestinationGrid from "@/components/home/DestinationGrid";
import Editorial from "@/components/home/Editorial";
import TravelStyle from "@/components/home/TravelStyle";
import OurPicks from "@/components/home/OurPicks";
import WhyUs from "@/components/home/WhyUs";
import ReviewSection from "@/components/home/ReviewSection";
import GuideSection from "@/components/home/GuideSection";
import FinalCTA from "@/components/home/FinalCTA";
import { getActiveBanners } from "@/lib/data/banners";

export default async function Home() {
  const banners = await getActiveBanners();

  return (
    <>
      <Hero />
      <TripFinder />
      <PromoBanner banners={banners} />
      <CategoryGrid />
      <BestSellers />
      <VillaShowcase />
      <GolfShowcase />
      <DestinationGrid />
      <Editorial />
      <TravelStyle />
      <OurPicks />
      <WhyUs />
      <ReviewSection />
      <GuideSection />
      <FinalCTA />
    </>
  );
}
