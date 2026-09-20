import Link from "next/link";
import { Users, BedDouble, Waves, Star } from "lucide-react";
import { Villa } from "@/types";
import { formatPrice } from "@/lib/format";
import CoverImage from "@/components/ui/CoverImage";
import WishlistButton from "@/components/ui/WishlistButton";
import { getImage } from "@/data/images";

export default function VillaCard({ villa }: { villa: Villa }) {
  return (
    <Link
      href={`/villas/${villa.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_-8px_rgba(18,60,50,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CoverImage
          src={getImage(villa.image)}
          alt={villa.name}
          sizes="(min-width: 768px) 33vw, 90vw"
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <WishlistButton
          type="villa"
          slug={villa.slug}
          className="absolute right-3 top-3 z-20"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium tracking-wide text-gold">
          {villa.location}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <h3 className="text-[16px] font-semibold text-text">{villa.name}</h3>
          {villa.rating ? (
            <span className="flex items-center gap-0.5 text-[12.5px] text-text-soft">
              <Star size={12} strokeWidth={0} fill="currentColor" className="text-gold" />
              {villa.rating.toFixed(1)}
              <span className="text-text-soft/70">({villa.reviewCount})</span>
            </span>
          ) : null}
        </div>
        <div className="mt-3 flex items-center gap-4 text-[12.5px] text-text-soft">
          <span className="inline-flex items-center gap-1.5">
            <Users size={14} strokeWidth={1.5} /> 최대 {villa.maxGuests}명
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BedDouble size={14} strokeWidth={1.5} /> {villa.bedrooms} Bedroom{villa.bedrooms !== 1 ? "s" : ""}
          </span>
          {villa.hasPrivatePool ? (
            <span className="inline-flex items-center gap-1.5">
              <Waves size={14} strokeWidth={1.5} /> Private Pool
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex items-center justify-end border-t border-border pt-3.5">
          {villa.price === 0 ? (
            <span className="text-[15px] font-semibold text-forest">가격 문의</span>
          ) : (
            <span className="flex flex-col items-end">
              <span className="text-[10px] text-text-soft/80">1박기준</span>
              <span className="text-[15px] font-semibold text-forest">
                {formatPrice(villa.price)}
              </span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
