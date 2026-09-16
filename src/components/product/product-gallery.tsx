"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ShopifyImage } from "@/lib/shopify/types";

export function ProductGallery({ images, title }: { images: ShopifyImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [];

  if (gallery.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-bg-subtle text-sm text-fg-faint">
        Sin imagenes
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg-subtle">
        <Image
          key={gallery[active].url}
          src={gallery[active].url}
          alt={gallery[active].altText ?? title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="animate-fade-in object-cover"
        />
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
          {gallery.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={active === index}
              className={cn(
                "relative h-18 w-18 shrink-0 overflow-hidden rounded-lg bg-bg-subtle ring-1 ring-border transition-all duration-150",
                active === index ? "ring-2 ring-accent" : "hover:ring-border-strong"
              )}
            >
              <Image src={image.url} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
