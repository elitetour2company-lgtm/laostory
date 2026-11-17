import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import TravelView, { TravelSections } from "@/components/product/TravelView";
import { getAllProducts } from "@/lib/data/products";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "라오스 자유여행·패키지여행 상품",
  description: "라오스 자유여행, 패키지여행, 골프패키지를 일정과 포함사항까지 한눈에 비교하고 예약 상담을 신청하세요.",
};

export default async function TravelPage() {
  const travelProducts = await getAllProducts();

  return (
    <>
      <PageHeader
        eyebrow="Travel Products"
        title="여행상품"
        description="자유여행부터 패키지여행까지, 라오스 전문가가 준비한 여행상품을 만나보세요."
      />

      <Container className="py-10 md:py-14">
        <Suspense fallback={<TravelSections travelProducts={travelProducts} params={{}} />}>
          <TravelView travelProducts={travelProducts} />
        </Suspense>
      </Container>
    </>
  );
}
