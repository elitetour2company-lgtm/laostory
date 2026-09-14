import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, formatPriceUsd } from "@/lib/format";
import CoverImage from "@/components/ui/CoverImage";
import Badge from "@/components/ui/Badge";
import WishlistButton from "@/components/ui/WishlistButton";
import { getImage } from "@/data/images";

export default function ProductCard({
  product,
  hideFeaturedBadge = false,
}: {
  product: Product;
  hideFeaturedBadge?: boolean;
}) {
  const showBest = product.featured && !hideFeaturedBadge;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_-8px_rgba(18,60,50,0.18)]">
      <Link
        href={`/travel/${product.slug}`}
        aria-label={`${product.title} - ${formatPrice(product.price)}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative aspect-[4/3] overflow-hidden">
        <CoverImage
          src={getImage(product.image)}
          alt={`${product.destination} - ${product.title}`}
          sizes="(min-width: 768px) 25vw, 80vw"
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <WishlistButton
          type="travel"
          slug={product.slug}
          className="absolute right-3 top-3 z-20"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium tracking-wide text-gold">
          {product.category} · {product.destination}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <h3 className="text-[16px] font-semibold text-text">{product.title}</h3>
          {product.rating ? (
            <span className="flex items-center gap-0.5 text-[12.5px] text-text-soft">
              <Star size={12} strokeWidth={0} fill="currentColor" className="text-gold" />
              {product.rating.toFixed(1)}
              <span className="text-text-soft/70">({product.reviewCount})</span>
            </span>
          ) : null}
        </div>
        {showBest || product.badge ? (
          <div className="mt-2">
            <Badge tone={showBest ? "hot" : "forest"}>
              {showBest ? "BEST" : product.badge}
            </Badge>
          </div>
        ) : null}
        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-text-soft">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
          <span className="inline-flex items-center rounded-sm border border-border bg-white px-2 py-1 text-[12px] text-text-soft">
            {product.duration}
          </span>
          <span className="flex flex-col items-end">
            {product.originalPrice && product.originalPrice > product.price ? (
              <span className="flex items-center gap-1.5 text-[11px]">
                <span className="text-text-soft/70 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="font-semibold text-red-600">
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )}
                  %
                </span>
              </span>
            ) : null}
            <span className="text-[10px] text-text-soft/80">1인기준</span>
            <span className="text-[15px] font-semibold text-forest">
              {formatPrice(product.price)}
            </span>
            {product.priceUsd ? (
              <span className="text-[11px] text-text-soft">
                {formatPriceUsd(product.priceUsd)}
              </span>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}
