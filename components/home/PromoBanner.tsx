"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import { getImage } from "@/data/images";
import { Banner } from "@/lib/data/banners";

export default function PromoBanner({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <section className="py-8 md:py-10">
      <Container>
        <div className="relative aspect-[21/9] overflow-hidden rounded-xl md:aspect-[3/1]">
          {banners.map((banner, i) => {
            const content = (
              <CoverImage
                src={getImage(banner.image)}
                alt={banner.title}
                sizes="(min-width: 1280px) 1216px, 100vw"
              />
            );
            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {banner.href ? (
                  <Link href={banner.href} className="block h-full w-full">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
        {banners.length > 1 ? (
          <div className="mt-3 flex justify-center gap-1.5">
            {banners.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                aria-label={`${banner.title} 배너 보기`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-5 bg-forest" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
