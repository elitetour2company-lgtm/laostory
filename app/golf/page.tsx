import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import GolfCard from "@/components/golf/GolfCard";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import SortSelect from "@/components/ui/SortSelect";
import TravelDateFilter from "@/components/ui/TravelDateFilter";
import { getAllProducts } from "@/lib/data/products";
import { getAllGolfCourses } from "@/lib/data/golf";
import { sortItems } from "@/lib/sort";

export const metadata: Metadata = {
  title: "라오스 골프",
  description: "라오스 골프 패키지와 골프장 부킹을 한 곳에서 확인하고 예약 상담을 신청하세요.",
};

export default async function GolfPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const [travelProducts, golfCourses] = await Promise.all([
    getAllProducts(),
    getAllGolfCourses(),
  ]);
  const golfPackages = sortItems(
    travelProducts.filter((p) => p.type === "골프"),
    sort,
    (p) => p.title
  );
  const sortedCourses = sortItems(golfCourses, sort, (c) => c.name);
  const hasPoster = existsSync(join(process.cwd(), "public/images/golf-price-poster.png"));

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

      <Container id="packages" className="scroll-mt-28 py-10 md:scroll-mt-32 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading eyebrow="Golf Package" title="골프패키지" />
          <div className="flex flex-wrap items-center gap-3">
            <TravelDateFilter style="골프" />
            <SortSelect />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
          {golfPackages.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>

      <Container id="booking" className="scroll-mt-28 border-t border-border py-10 md:scroll-mt-32 md:py-14">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Golf Booking" title="골프부킹" />
          <p className="text-[13.5px] text-text-soft">
            원하는 골프장만 골라 그린피·카트·캐디를 예약하세요.
          </p>
        </div>

        {hasPoster ? (
          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/golf-price-poster.png"
              alt="라오스토리 라오스 골프장 요금 안내"
              width={1728}
              height={910}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="h-auto w-full"
            />
          </div>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {sortedCourses.map((course) => (
            <GolfCard key={course.slug} course={course} />
          ))}
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
