import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { Districts } from "@/components/home/districts";
import { Testimonials } from "@/components/home/testimonials";
import { AiTeaser } from "@/components/home/ai-teaser";
import { NewsletterCta } from "@/components/home/newsletter-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <CategoriesSection />
      <FeaturedSection />
      <HowItWorks />
      <Districts />
      <Testimonials />
      <AiTeaser />
      <NewsletterCta />
    </>
  );
}
