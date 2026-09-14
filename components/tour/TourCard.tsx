import Link from "next/link";
import { Clock, Star } from "lucide-react";
import { Tour } from "@/types";
import { formatPrice, formatPriceUsd } from "@/lib/format";
import CoverImage from "@/components/ui/CoverImage";
import Badge from "@/components/ui/Badge";
import WishlistButton from "@/components/ui/WishlistButton";
import { getImage } from "@/data/images";

export default function TourCard({ tour }: { tour: Tour }) {
  const priceBasis = tour.description.includes("1대기준") ? "1대기준" : "1인기준";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_-8px_rgba(18,60,50,0.18)]">
      <Link
        href={`/tours/${tour.slug}`}
        aria-label={`${tour.title} - ${formatPrice(tour.price)}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative aspect-[4/3] overflow-hidden">
        <CoverImage
          src={getImage(tour.image)}
          alt={tour.title}
          sizes="(min-width: 768px) 33vw, 90vw"
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <WishlistButton
          type="tour"
          slug={tour.slug}
          className="absolute right-3 top-3 z-20"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium tracking-wide text-gold">
          {tour.destination}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <h3 className="text-[16px] font-semibold text-text">{tour.title}</h3>
          {tour.rating ? (
            <span className="flex items-center gap-0.5 text-[12.5px] text-text-soft">
              <Star size={12} strokeWidth={0} fill="currentColor" className="text-gold" />
              {tour.rating.toFixed(1)}
              <span className="text-text-soft/70">({tour.reviewCount})</span>
            </span>
          ) : null}
        </div>
        <div className="mt-2">
          <Badge tone="forest">{tour.category}</Badge>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-text-soft">
          {tour.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
          <span className="inline-flex items-center gap-1.5 text-[13px] text-text-soft">
            <Clock size={13} strokeWidth={1.5} />
            {tour.duration}
          </span>
          <span className="flex flex-col items-end">
            <span className="text-[10px] text-text-soft/80">{priceBasis}</span>
            <span className="text-[15px] font-semibold text-forest">
              {formatPrice(tour.price)}
            </span>
            {tour.priceUsd ? (
              <span className="text-[11px] text-text-soft">
                {formatPriceUsd(tour.priceUsd)}
              </span>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}
