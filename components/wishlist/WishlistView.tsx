"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import { formatPrice } from "@/lib/format";
import { getImage } from "@/data/images";
import { getWishlist, toggleWishlist, WishlistItem, WishlistType } from "@/lib/wishlist";
import { supabase } from "@/lib/supabase/client";

type DisplayItem = {
  type: WishlistType;
  slug: string;
  title: string;
  subtitle: string;
  image?: string;
  price: number;
  href: string;
};

type ProductRow = { slug: string; title: string; category: string; destination: string; image: string | null; price: number };
type GolfRow = { slug: string; name: string; location: string; image: string | null; price: number };
type TourRow = { slug: string; title: string; destination: string; image: string | null; price: number };

export default function WishlistView() {
  const [items, setItems] = useState<DisplayItem[] | null>(null);
  const requestSeq = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // 빠르게 연속 삭제할 때 늦게 도착한 이전 응답이 최신 상태를 덮어쓰지 않도록 요청 순번을 확인한다.
      const seq = ++requestSeq.current;
      const saved = getWishlist();
      const bySlug = (type: WishlistItem["type"]) =>
        saved.filter((i) => i.type === type).map((i) => i.slug);

      const travelSlugs = bySlug("travel");
      const golfSlugs = bySlug("golf");
      const tourSlugs = bySlug("tour");

      const [travelRes, golfRes, tourRes] = await Promise.all([
        travelSlugs.length
          ? supabase.from("products").select("slug,title,category,destination,image,price").in("slug", travelSlugs)
          : Promise.resolve({ data: [] as ProductRow[] }),
        golfSlugs.length
          ? supabase.from("golf_courses").select("slug,name,location,image,price").in("slug", golfSlugs)
          : Promise.resolve({ data: [] as GolfRow[] }),
        tourSlugs.length
          ? supabase.from("tours").select("slug,title,destination,image,price").in("slug", tourSlugs)
          : Promise.resolve({ data: [] as TourRow[] }),
      ]);

      const result: DisplayItem[] = [
        ...((travelRes.data ?? []) as ProductRow[]).map((r) => ({
          type: "travel" as const,
          slug: r.slug,
          title: r.title,
          subtitle: `${r.category} · ${r.destination}`,
          image: r.image ?? undefined,
          price: r.price,
          href: `/travel/${r.slug}`,
        })),
        ...((golfRes.data ?? []) as GolfRow[]).map((r) => ({
          type: "golf" as const,
          slug: r.slug,
          title: r.name,
          subtitle: r.location,
          image: r.image ?? undefined,
          price: r.price,
          href: `/golf/courses/${r.slug}`,
        })),
        ...((tourRes.data ?? []) as TourRow[]).map((r) => ({
          type: "tour" as const,
          slug: r.slug,
          title: r.title,
          subtitle: r.destination,
          image: r.image ?? undefined,
          price: r.price,
          href: `/tours/${r.slug}`,
        })),
      ];

      if (!cancelled && seq === requestSeq.current) setItems(result);
    }

    load();
    window.addEventListener("wishlist-change", load);
    return () => {
      cancelled = true;
      window.removeEventListener("wishlist-change", load);
    };
  }, []);

  function remove(type: WishlistType, slug: string) {
    toggleWishlist(type, slug);
    setItems((prev) => prev?.filter((i) => !(i.type === type && i.slug === slug)) ?? null);
  }

  return (
    <Container className="py-10 md:py-14">
      {items === null ? (
        <p className="text-center text-[14.5px] text-text-soft">불러오는 중...</p>
      ) : items.length === 0 ? (
        <div className="py-14 text-center">
          <Heart size={32} strokeWidth={1.5} className="mx-auto text-text-soft/40" />
          <p className="mt-4 text-[14.5px] text-text-soft">
            아직 찜한 상품이 없어요. 마음에 드는 상품의 하트 아이콘을 눌러보세요.
          </p>
          <Link
            href="/travel"
            className="mt-5 inline-block text-[14px] font-medium text-forest underline underline-offset-2"
          >
            여행상품 둘러보기
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-col items-start gap-2.5 rounded-xl border border-forest/15 bg-forest/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13.5px] text-text-soft">
              {items.length}개 상품이 자동으로 문의 내용에 담겨요.
            </p>
            <Button
              href={`/consultation?items=${encodeURIComponent(items.map((i) => i.title).join(", "))}`}
              variant="primary"
              className="w-full sm:w-auto"
            >
              찜한 상품 한번에 상담 신청하기
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={`${item.type}-${item.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_-8px_rgba(18,60,50,0.18)]"
              >
                <button
                  type="button"
                  aria-label="찜 목록에서 삭제"
                  onClick={() => remove(item.type, item.slug)}
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
                >
                  <Trash2 size={16} strokeWidth={2} className="text-text-soft" />
                </button>
                <Link href={item.href} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <CoverImage
                      src={getImage(item.image)}
                      alt={item.title}
                      sizes="(min-width: 768px) 33vw, 90vw"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium tracking-wide text-gold">{item.subtitle}</p>
                    <h3 className="mt-1.5 text-[16px] font-semibold text-text">{item.title}</h3>
                    <p className="mt-3 text-[15px] font-semibold text-forest">
                      {item.price === 0 ? "가격 문의" : formatPrice(item.price)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
