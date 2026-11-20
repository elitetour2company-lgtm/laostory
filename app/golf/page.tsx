import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import GolfView, { GolfSections } from "@/components/golf/GolfView";
import { getAllProducts } from "@/lib/data/products";
import { getAllGolfCourses } from "@/lib/data/golf";
import { GOLF_GUIDE_LINKS } from "@/lib/golf-guide-links";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "라오스 골프 | 골프여행·골프투어·황제골프 패키지, 골프장 7곳 요금·예약",
  description:
    "라오스 골프여행·골프투어 전문 라오스토리. 풀빌라·전용차량·캐디가 포함된 황제골프 패키지와 비엔티안·방비엥·루앙프라방 골프장 7곳의 그린피·카트·캐디 요금을 한 곳에서 확인하고 예약 상담을 신청하세요.",
};

export default async function GolfPage() {
  const [travelProducts, golfCourses] = await Promise.all([
    getAllProducts(),
    getAllGolfCourses(),
  ]);
  const golfPackages = travelProducts.filter((p) => p.type === "골프");

  return (
    <>
      <PageHeader
        eyebrow="Laos Golf"
        title="라오스 골프"
        description="골프여행·골프투어 패키지(풀빌라·전용차량·캐디 포함)부터 원하는 골프장만 예약하는 골프부킹까지."
      />

      <div className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur-sm md:top-20">
        <Container className="flex gap-6 py-3">
          <a
            href="#packages"
            className="text-[13.5px] font-medium text-text-soft transition-colors hover:text-forest"
          >
            골프패키지
          </a>
          <a
            href="#booking"
            className="text-[13.5px] font-medium text-text-soft transition-colors hover:text-forest"
          >
            골프부킹
          </a>
        </Container>
      </div>

      <Suspense fallback={<GolfSections packages={golfPackages} courses={golfCourses} />}>
        <GolfView packages={golfPackages} courses={golfCourses} />
      </Suspense>

      <Container className="pb-10 md:pb-14">
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-ivory p-6">
          <h2 className="text-[15px] font-semibold text-forest">라오스 골프 여행 가이드</h2>
          <div className="mt-3 flex flex-col gap-2.5">
            {GOLF_GUIDE_LINKS.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="text-[14px] font-medium text-forest underline underline-offset-2"
              >
                {g.label} →
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-14 text-center md:pb-20">
        <Link
          href="/consultation"
          className="inline-flex items-center gap-1.5 border-b border-forest pb-0.5 text-[14.5px] font-medium text-forest transition-colors hover:text-forest-light"
        >
          원하는 조합으로 맞춤 상담받기
          <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </Container>
    </>
  );
}
