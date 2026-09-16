import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ValueProps } from "@/components/home/value-props";
import { CustomPrintCta } from "@/components/home/custom-print-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <HowItWorks />
      <ValueProps />
      <CustomPrintCta />
    </>
  );
}
