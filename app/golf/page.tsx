import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import GolfView, { GolfSections } from "@/components/golf/GolfView";
import { getAllProducts } from "@/lib/data/products";
import { getAllGolfCourses } from "@/lib/data/golf";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "라오스 골프 여행 | 비엔티안·루앙프라방 골프장 7곳 가격·예약",
  description:
    "라오스 골프 여행 전문 라오스토리. 비엔티안, 루앙프라방 골프장 7곳의 그린피·카트·캐디 요금과 패키지를 한 곳에서 확인하고 예약 상담을 신청하세요.",
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
        title="골프"
        description="라운딩부터 숙소까지 묶은 골프패키지, 원하는 골프장만 예약하는 골프부킹까지."
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
