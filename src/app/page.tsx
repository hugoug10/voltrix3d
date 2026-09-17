import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedProducts } from "@/components/home/featured-products";
import { MaterialsShowcase } from "@/components/home/materials-showcase";
import { ValueProps } from "@/components/home/value-props";
import { PrintPortal } from "@/components/home/print-portal";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <HowItWorks />
      <MaterialsShowcase />
      <ValueProps />
      <PrintPortal />
    </>
  );
}
