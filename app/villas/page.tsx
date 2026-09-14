import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import VillaCard from "@/components/villa/VillaCard";
import TravelDateFilter from "@/components/ui/TravelDateFilter";
import { getAllVillas } from "@/lib/data/villas";

export const metadata: Metadata = {
  title: "라오스 풀빌라·호텔",
  description: "라오스 방비엥, 비엔티안, 루앙프라방의 프라이빗 풀빌라를 비교하고 예약 상담을 신청하세요.",
};

const LOCATIONS = ["전체", "방비엥", "비엔티안", "루앙프라방"] as const;

export default async function VillasPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  const activeLocation = LOCATIONS.includes(location as (typeof LOCATIONS)[number])
    ? (location as (typeof LOCATIONS)[number])
    : "전체";

  const featuredVillas = await getAllVillas();
  const villas =
    activeLocation === "전체"
      ? featuredVillas
      : featuredVillas.filter((v) => v.location === activeLocation);

  return (
    <>
      <PageHeader
        eyebrow="Private Villas"
        title="풀빌라·호텔"
        description="라오스에서 만나는 나만의 프라이빗 공간, 지역별로 골라보세요."
      />

      <Container className="py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2.5">
            {LOCATIONS.map((loc) => {
              const isActive = loc === activeLocation;
              const href = loc === "전체" ? "/villas" : `/villas?location=${loc}`;
              return (
                <Link
                  key={loc}
                  href={href}
                  className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors ${
                    isActive
                      ? "border-forest bg-forest text-white"
                      : "border-border text-text hover:border-forest hover:text-forest"
                  }`}
                >
                  {loc}
                </Link>
              );
            })}
          </div>
          <TravelDateFilter style="휴양" />
        </div>

        {villas.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:grid-cols-3">
            {villas.map((villa) => (
              <VillaCard key={villa.slug} villa={villa} />
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
