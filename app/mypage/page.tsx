import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "나의 상담 신청 내역과 후기를 확인하세요.",
};

export const dynamic = "force-dynamic";

type InquiryRow = {
  id: string;
  region: string | null;
  style: string | null;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
};

type ReviewRow = {
  id: string;
  product: string;
  rating: number;
  content: string;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "대기중",
  CONTACTED: "연락완료",
  CONFIRMED: "예약확정",
  CLOSED: "종료",
};

const STATUS_TONES: Record<string, "gold" | "forest" | "neutral" | "tier"> = {
  PENDING: "gold",
  CONTACTED: "neutral",
  CONFIRMED: "forest",
  CLOSED: "tier",
};

export default async function MyPage() {
  const supabase = await createAuthServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: inquiriesData }, { data: reviewsData }] = await Promise.all([
    supabase
      .from("inquiries")
      .select(
        "id, region, style, budget, message, status, created_at"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("reviews")
      .select("id, product, rating, content, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const inquiries: InquiryRow[] = inquiriesData ?? [];
  const reviews: ReviewRow[] = reviewsData ?? [];

  const displayName =
    (user.user_metadata as { name?: string } | null)?.name || user.email || "고객";

  return (
    <>
      <PageHeader
        eyebrow="My Page"
        title={`${displayName}님, 안녕하세요`}
        description="나의 상담 신청 내역과 작성한 후기를 확인할 수 있습니다."
      />

      <Container className="py-10 md:py-14">
        <section>
          <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">
            상담 신청 내역
          </h2>

          {inquiries.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="rounded-xl border border-border bg-white p-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13.5px] font-medium text-text">
                      {inquiry.region || "지역 미지정"} ·{" "}
                      {inquiry.style || "스타일 미지정"}
                    </p>
                    <Badge tone={STATUS_TONES[inquiry.status] ?? "neutral"}>
                      {STATUS_LABELS[inquiry.status] ?? inquiry.status}
                    </Badge>
                  </div>
                  {inquiry.budget ? (
                    <p className="mt-1.5 text-[12.5px] text-text-soft">
                      예산 · {inquiry.budget}
                    </p>
                  ) : null}
                  <p className="mt-3.5 line-clamp-3 text-[13.5px] leading-relaxed text-text">
                    {inquiry.message}
                  </p>
                  <div className="mt-5 border-t border-border pt-3.5">
                    <p className="text-[12px] text-text-soft">
                      {new Date(inquiry.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-border bg-white px-6 py-14 text-center">
              <p className="text-[14.5px] text-text-soft">
                아직 상담 신청 내역이 없습니다.
              </p>
              <Link
                href="/consultation"
                className="mt-4 inline-flex rounded-full bg-forest px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-forest-light"
              >
                상담 신청하러 가기
              </Link>
            </div>
          )}
        </section>

        <section className="mt-12 md:mt-16">
          <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">
            내가 작성한 후기
          </h2>

          {reviews.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-border bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[13.5px] font-medium text-text">
                      {review.product}
                    </p>
                    <div className="flex items-center gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          strokeWidth={0}
                          fill={
                            i < Math.round(review.rating)
                              ? "currentColor"
                              : "#E7E3DA"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3.5 line-clamp-3 text-[13.5px] leading-relaxed text-text">
                    {review.content}
                  </p>
                  <div className="mt-5 border-t border-border pt-3.5">
                    <p className="text-[12px] text-text-soft">
                      {new Date(review.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-border bg-white px-6 py-14 text-center text-[14.5px] text-text-soft">
              아직 작성한 후기가 없습니다.
            </p>
          )}
        </section>
      </Container>
    </>
  );
}
