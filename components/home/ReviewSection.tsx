import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, MessageSquareText } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAllReviews } from "@/lib/data/reviews";

export default async function ReviewSection() {
  const allReviews = await getAllReviews();
  const reviews = allReviews.slice(0, 4);

  return (
    <section className="border-t border-border py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Travel Stories"
            title="고객들의 라오스 여행 이야기"
          />
          {reviews.length > 0 ? (
            <Link
              href="/reviews"
              className="hidden shrink-0 items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest transition-colors hover:text-forest-light md:inline-flex"
            >
              후기 전체보기
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          ) : null}
        </div>

        {reviews.length > 0 ? (
          <>
            <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-5">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-border bg-white p-4 sm:p-6"
                >
                  <div className="flex items-center gap-0.5 text-gold">
                    <span className="sr-only">{review.rating}점 / 5점</span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        strokeWidth={0}
                        aria-hidden="true"
                        fill={i < Math.round(review.rating) ? "currentColor" : "#E7E3DA"}
                      />
                    ))}
                  </div>
                  <p className="mt-3.5 line-clamp-4 text-sm leading-relaxed text-text">
                    {review.content}
                  </p>
                  {review.photos.length > 0 ? (
                    <div className="mt-3.5 flex gap-2">
                      {review.photos.slice(0, 3).map((url) => (
                        <div
                          key={url}
                          className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm"
                        >
                          <Image
                            src={url}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover contrast-[1.05] saturate-[1.12] brightness-[1.02]"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-5 border-t border-border pt-3.5">
                    <p className="text-sm font-medium text-text">
                      {review.customerName} · {review.destination}
                    </p>
                    <p className="mt-0.5 text-xs text-text-soft">
                      {review.product} · {review.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest"
              >
                후기 전체보기
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center md:mt-12">
            <MessageSquareText size={28} strokeWidth={1.5} className="text-text-soft" />
            <p className="text-[15px] font-medium text-text">
              아직 등록된 후기가 없습니다
            </p>
            <p className="text-sm text-text-soft">
              라오스토리와 함께한 첫 여행 이야기의 주인공이 되어주세요.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
