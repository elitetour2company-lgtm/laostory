import Link from "next/link";
import { Flag, Star } from "lucide-react";
import { GolfCourse } from "@/types";
import { formatPrice, formatPriceUsd } from "@/lib/format";
import CoverImage from "@/components/ui/CoverImage";
import WishlistButton from "@/components/ui/WishlistButton";
import { getImage } from "@/data/images";

export default function GolfCard({ course }: { course: GolfCourse }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_-8px_rgba(18,60,50,0.18)]">
      <Link
        href={`/golf/courses/${course.slug}`}
        aria-label={`${course.name} - ${formatPrice(course.price)}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative aspect-[4/3] overflow-hidden">
        <CoverImage
          src={getImage(course.image)}
          alt={course.name}
          sizes="(min-width: 768px) 33vw, 90vw"
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-forest">
          <Flag size={12} strokeWidth={2} />
          {course.holes} Holes
        </div>
        <WishlistButton
          type="golf"
          slug={course.slug}
          className="absolute right-3 top-3 z-20"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium tracking-wide text-gold">
          {course.location}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <h3 className="text-[16px] font-semibold text-text">{course.name}</h3>
          {course.rating ? (
            <span className="flex items-center gap-0.5 text-[12.5px] text-text-soft">
              <Star size={12} strokeWidth={0} fill="currentColor" className="text-gold" />
              {course.rating.toFixed(1)}
              <span className="text-text-soft/70">({course.reviewCount})</span>
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-text-soft">
          {course.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
          <span className="text-[13px] text-text-soft">그린피</span>
          <span className="flex flex-col items-end">
            {course.originalPrice && course.originalPrice > course.price ? (
              <span className="flex items-center gap-1.5 text-[11px]">
                <span className="text-text-soft/70 line-through">
                  {formatPrice(course.originalPrice)}
                </span>
                <span className="font-semibold text-red-600">
                  {Math.round(
                    ((course.originalPrice - course.price) / course.originalPrice) * 100
                  )}
                  %
                </span>
              </span>
            ) : null}
            <span className="text-[10px] text-text-soft/80">1인기준</span>
            <span className="text-[15px] font-semibold text-forest">
              {formatPrice(course.price)}
            </span>
            {course.priceUsd ? (
              <span className="text-[11px] text-text-soft">
                {formatPriceUsd(course.priceUsd)}
              </span>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}
