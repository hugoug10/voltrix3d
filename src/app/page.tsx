import Image from "next/image";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedProducts } from "@/components/home/featured-products";
import { MaterialsShowcase } from "@/components/home/materials-showcase";
import { ValueProps } from "@/components/home/value-props";
import { PrintPortal } from "@/components/home/print-portal";

const BACKGROUND_PHOTO =
  "https://images.unsplash.com/photo-1642969164999-979483e21601?q=80&w=1600&auto=format&fit=crop";

export default function Home() {
  return (
    <>
      <PrintPortal />

      <div className="dark relative">
        <div className="fixed inset-0 -z-10">
          <Image src={BACKGROUND_PHOTO} alt="" fill sizes="100vw" className="object-cover" priority={false} />
          <div className="absolute inset-0 bg-[#0b1426]/80" />
        </div>

        <Hero />
        <FeaturedProducts />
        <HowItWorks />
        <MaterialsShowcase />
        <ValueProps />
      </div>
    </>
  );
}
