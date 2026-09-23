import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, MessageSquareText } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
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
        <div className="flex flex-wrap gap-2.5">
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
        ) : reviews.length === 0 ? (
          <div className="mt-14 flex flex-col items-center gap-3 text-center">
            <MessageSquareText size={28} strokeWidth={1.5} className="text-text-soft" />
            <p className="text-[15px] font-medium text-text">
              아직 등록된 후기가 없습니다
            </p>
            <p className="text-sm text-text-soft">
              라오스토리와 함께한 첫 여행 이야기의 주인공이 되어주세요.
            </p>
          </div>
        ) : (
          <p className="mt-14 text-center text-[14.5px] text-text-soft">
            해당 카테고리의 후기가 아직 없습니다.
          </p>
        )}
      </Container>
    </>
  );
}
