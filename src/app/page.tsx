import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedProducts } from "@/components/home/featured-products";
import { MaterialsShowcase } from "@/components/home/materials-showcase";
import { ValueProps } from "@/components/home/value-props";
import { PrintPortal, photoLayer } from "@/components/home/print-portal";

export default function Home() {
  return (
    <>
      <PrintPortal />

      <div className="dark relative">
        <div
          className="fixed inset-0 -z-10"
          style={{ background: photoLayer(0.8) }}
        />

        <Hero />
        <FeaturedProducts />
        <HowItWorks />
        <MaterialsShowcase />
        <ValueProps />
      </div>
    </>
  );
}
