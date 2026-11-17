import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ToursView from "@/components/tour/ToursView";
import TourCard from "@/components/tour/TourCard";
import { getAllTours } from "@/lib/data/tours";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "라오스 투어·액티비티 | 방비엥 원데이투어·루앙프라방",
  description: "방비엥, 루앙프라방의 원데이투어, 반일투어, 짚라인·카약·열기구 액티비티를 확인하고 예약 상담을 신청하세요.",
};

export default async function ToursPage() {
  const tours = await getAllTours();

  return (
    <>
      <PageHeader
        eyebrow="Tours & Activities"
        title="투어·액티비티"
        description="자연과 문화를 경험하는 라오스 투어와 액티비티를 만나보세요."
      />

      <Container className="py-10 md:py-14">
        <Suspense
          fallback={
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          }
        >
          <ToursView tours={tours} />
        </Suspense>
      </Container>
    </>
  );
}
