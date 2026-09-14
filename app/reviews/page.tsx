import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import { getAllReviews } from "@/lib/data/reviews";
import { Review } from "@/types";

export const metadata: Metadata = {
  title: "라오스 여행 후기",
  description: "라오스 여행을 다녀온 고객들의 이야기를 만나보세요.",
};

const CATEGORIES: ("전체" | Review["category"])[] = [
  "전체",
  "골프",
  "풀빌라",
  "자유여행",
  "패키지",
  "투어",
];

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = CATEGORIES.includes(
    category as (typeof CATEGORIES)[number]
  )
    ? (category as (typeof CATEGORIES)[number])
    : "전체";

  const reviews = await getAllReviews();
  const filtered =
    activeCategory === "전체"
      ? reviews
      : reviews.filter((r) => r.category === activeCategory);

  return (
    <>
      <PageHeader
        eyebrow="Travel Stories"
        title="후기"
        description="라오스를 다녀온 고객들의 생생한 여행 이야기를 확인해보세요."
      />

      <Container className="py-10 md:py-14">
        {filtered.every((r) => r.isSample) && filtered.length > 0 ? (
          <p className="text-[12.5px] text-text-soft">
            * 서비스 준비 단계로, 아래 후기는 실제 고객 후기가 아닌 샘플입니다.
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const href = cat === "전체" ? "/reviews" : `/reviews?category=${cat}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors ${
                  isActive
                    ? "border-forest bg-forest text-white"
                    : "border-border text-text hover:border-forest hover:text-forest"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:grid-cols-3">
            {filtered.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-border bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        strokeWidth={0}
                        fill={
                          i < Math.round(review.rating) ? "currentColor" : "#E7E3DA"
                        }
                      />
                    ))}
                  </div>
                  {review.isSample ? <Badge tone="neutral">샘플</Badge> : null}
                </div>
                <p className="mt-3.5 text-[13.5px] leading-relaxed text-text">
                  {review.content}
                </p>
                {review.photos.length > 0 ? (
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {review.photos.map((url) => (
                      <div
                        key={url}
                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm"
                      >
                        <Image src={url} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5 border-t border-border pt-3.5">
                  <p className="text-[13px] font-medium text-text">
                    {review.customerName} · {review.destination}
                  </p>
                  <p className="mt-0.5 text-[12px] text-text-soft">
                    {review.product} · {review.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-14 text-center text-[14.5px] text-text-soft">
            조건에 맞는 결과가 아직 준비되어 있지 않습니다.
          </p>
        )}
      </Container>
    </>
  );
}
