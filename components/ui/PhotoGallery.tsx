"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const MOSAIC_CELLS: Record<number, string[]> = {
  1: ["col-span-4 row-span-2"],
  2: ["col-span-2 row-span-2", "col-span-2 row-span-2"],
  3: ["col-span-2 row-span-2", "col-span-2", "col-span-2"],
  4: ["col-span-2 row-span-2", "col-span-2", "", ""],
  5: ["col-span-2 row-span-2", "", "", "", ""],
};

export default function PhotoGallery({
  photos,
  variant = "grid",
}: {
  photos: { key: string; src: string; alt: string }[];
  variant?: "grid" | "mosaic";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, photos.length]);

  if (photos.length === 0) return null;

  const shown = Math.min(photos.length, 5);
  const cells = MOSAIC_CELLS[shown];

  return (
    <>
      {variant === "mosaic" ? (
        <>
          <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 md:hidden">
            {photos.map((photo, i) => (
              <button
                key={`m-${photo.key}-${i}`}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="relative aspect-[4/3] w-[88%] shrink-0 snap-center overflow-hidden rounded-xl bg-border"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={i === 0}
                  sizes="88vw"
                  className="object-cover contrast-[1.05] saturate-[1.12] brightness-[1.02]"
                />
                <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white">
                  {i + 1} / {photos.length}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden h-[420px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl md:grid">
            {photos.slice(0, shown).map((photo, i) => (
              <button
                key={`d-${photo.key}-${i}`}
                type="button"
                onClick={() => setOpenIndex(i)}
                className={`group relative overflow-hidden bg-border ${cells[i]}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={i === 0}
                  sizes={i === 0 ? "(min-width: 768px) 40vw, 100vw" : "20vw"}
                  className="object-cover contrast-[1.05] saturate-[1.12] brightness-[1.02] transition-transform duration-300 group-hover:scale-[1.04]"
                />
                {i === shown - 1 && photos.length > shown ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-[14px] font-medium text-white">
                    사진 {photos.length}장 모두 보기
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <button
              key={`${photo.key}-${i}`}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-border"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover contrast-[1.05] saturate-[1.12] brightness-[1.02] transition-transform duration-300 group-hover:scale-[1.05]"
              />
            </button>
          ))}
        </div>
      )}

      {openIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="닫기"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X size={22} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
            aria-label="이전 사진"
            className="absolute left-2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:left-4"
          >
            <ChevronLeft size={26} strokeWidth={2} />
          </button>

          <div
            className="relative h-full max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[openIndex].src}
              alt={photos[openIndex].alt}
              fill
              sizes="100vw"
              className="object-contain contrast-[1.05] saturate-[1.12] brightness-[1.02]"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
            }}
            aria-label="다음 사진"
            className="absolute right-2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:right-4"
          >
            <ChevronRight size={26} strokeWidth={2} />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[13px] text-white/70">
            {openIndex + 1} / {photos.length}
          </p>
        </div>
      ) : null}
    </>
  );
}
