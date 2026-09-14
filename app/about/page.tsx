import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import StatTiles from "@/components/ui/StatTiles";
import Button from "@/components/ui/Button";
import { getAllProducts } from "@/lib/data/products";
import { getAllGolfCourses } from "@/lib/data/golf";
import { getAllTours } from "@/lib/data/tours";
import { getAllDestinations } from "@/lib/data/destinations";
import { MAIN_NAV } from "@/lib/nav";
import { CONTACT } from "@/lib/config";

export const metadata: Metadata = {
  title: "회사소개",
  description: "라오스에 상주하는 현지 전문가가 만드는 라오스토리를 소개합니다.",
};

const WHY_US_POINTS = [
  {
    title: "라오스 현지 직접 운영",
    description: "라오스에 상주하는 현지 스태프가 직접 여행을 준비합니다.",
  },
  {
    title: "한국인 전담 상담",
    description: "예약부터 현지 응대까지 한국어로 편하게 소통합니다.",
  },
  {
    title: "검증된 숙소와 상품",
    description: "직접 확인한 숙소와 액티비티만 소개합니다.",
  },
  {
    title: "현지 즉시 지원",
    description: "여행 중 문제가 생겨도 현지에서 바로 도와드립니다.",
  },
  {
    title: "노쇼핑·노옵션",
    description:
      "전 일정 쇼핑센터·기념품점 방문 없이 진행되며, 현장에서 불필요한 옵션 상품을 강요하지 않습니다.",
  },
];

export default async function AboutPage() {
  const [products, golfCourses, tours, destinations] = await Promise.all([
    getAllProducts(),
    getAllGolfCourses(),
    getAllTours(),
    getAllDestinations(),
  ]);

  const stats = [
    { value: `${products.length}개`, label: "여행상품" },
    { value: `${golfCourses.length}개`, label: "골프장" },
    { value: `${tours.length}개`, label: "투어·액티비티" },
    { value: `${destinations.length}개`, label: "여행지" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="회사소개"
        description="라오스에 상주하는 현지 전문가가 처음부터 끝까지 함께 준비하는 여행"
      />

      <Container className="pt-10 md:pt-14">
        <SectionHeading eyebrow="Numbers" title="숫자로 보는 라오스토리" />
        <div className="mt-6">
          <StatTiles stats={stats} />
        </div>
      </Container>

      <Container className="border-t border-border py-10 md:py-14">
        <SectionHeading eyebrow="What We Do" title="하는 일" />
        <div className="mt-6 flex flex-wrap gap-2.5">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-border px-5 py-2.5 text-[14px] font-medium text-text transition-colors hover:border-forest hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>

      <Container className="border-t border-border py-10 md:py-14">
        <SectionHeading eyebrow="Why Us" title="라오스토리가 다른 이유" />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {WHY_US_POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-xl border border-border bg-white p-5"
            >
              <p className="text-[15.5px] font-semibold text-forest">
                {point.title}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-text-soft">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="border-t border-border py-10 md:py-14">
        <SectionHeading eyebrow="Our Story" title="라오스토리의 이야기" />
        <div className="mt-8 rounded-xl border border-dashed border-border bg-ivory p-8 text-center">
          <p className="text-[14.5px] leading-relaxed text-text-soft">
            라오스토리가 걸어온 이야기는 아직 준비 중입니다.
            <br />
            자세한 소개는 곧 이 자리에 채워질 예정입니다.
          </p>
        </div>
      </Container>

      <Container className="border-t border-border py-10 md:py-14">
        <SectionHeading eyebrow="Contact" title="문의하기" />
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-xl border border-border bg-white px-6 py-4">
            <p className="text-[12px] text-text-soft">이메일</p>
            <p className="mt-1 text-[14.5px] font-medium text-forest">
              {CONTACT.email}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white px-6 py-4">
            <p className="text-[12px] text-text-soft">전화</p>
            <p className="mt-1 text-[14.5px] font-medium text-forest">
              {CONTACT.phone}
            </p>
          </div>
        </div>
      </Container>

      <Container className="pb-14 text-center md:pb-20">
        <Button href="/consultation" variant="primary">
          1:1 여행상담 신청하기
        </Button>
      </Container>
    </>
  );
}
