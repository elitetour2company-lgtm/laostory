"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isWishlisted, toggleWishlist, WishlistType } from "@/lib/wishlist";

export default function WishlistButton({
  type,
  slug,
  className = "",
}: {
  type: WishlistType;
  slug: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isWishlisted(type, slug));
  }, [type, slug]);

  return (
    <button
      type="button"
      aria-label={active ? "찜 해제" : "찜하기"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive(toggleWishlist(type, slug));
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white ${className}`}
    >
      <Heart
        size={17}
        strokeWidth={2}
        className={active ? "fill-red-500 text-red-500" : "text-text-soft"}
      />
    </button>
  );
}
