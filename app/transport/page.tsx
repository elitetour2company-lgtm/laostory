import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CoverImage from "@/components/ui/CoverImage";
import Button from "@/components/ui/Button";
import { getAllTransportOptions } from "@/lib/data/transport";
import { getImage } from "@/data/images";
import { formatPrice } from "@/lib/format";
import { TransportOption } from "@/types";
import TrainBookingWidget from "@/components/transport/TrainBookingWidget";

export const metadata: Metadata = {
  title: "라오스 차량·픽업",
  description: "공항 픽업, 전세밴, 조인밴, 기차표까지 라오스 교통편을 한 곳에서 확인하세요.",
};

const CATEGORIES: TransportOption["category"][] = [
  "공항 픽업·샌딩",
  "전세밴",
  "조인밴",
  "기차표",
];

export default async function TransportPage() {
  const transportOptions = await getAllTransportOptions();

  return (
    <>
      <PageHeader
        eyebrow="Transportation"
        title="차량·픽업"
        description="공항 픽업부터 전용차량, 기차표까지 편하게 이용하세요."
      />

      <Container className="pb-2 pt-8 md:pt-10">
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((category) => {
            const hasItems = transportOptions.some((t) => t.category === category);
            if (!hasItems) return null;
            return (
              <a
                key={category}
                href={`#${category}`}
                className="rounded-full border border-border px-5 py-2.5 text-[14px] font-medium text-text transition-colors hover:border-forest hover:text-forest"
              >
                {category}
              </a>
            );
          })}
        </div>
      </Container>

      {CATEGORIES.map((category) => {
        const items = transportOptions.filter((t) => t.category === category);
        if (items.length === 0) return null;

        return (
          <Container
            key={category}
            id={category}
            className="scroll-mt-24 border-t border-border py-10 first:border-t-0 md:py-14"
          >
            <SectionHeading eyebrow="Transport" title={category} />
            <div
              className={`mt-6 grid grid-cols-1 gap-4 md:mt-8 ${
                category === "기차표" ? "lg:grid-cols-2" : "sm:grid-cols-2"
              }`}
            >
              {items.map((item) =>
                category === "기차표" ? (
                  <TrainBookingWidget
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    route={item.route}
                    price={item.price}
                  />
                ) : (
                  <div
                    key={item.slug}
                    className="flex gap-4 rounded-xl border border-border bg-white p-4"
                  >
                    <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-sm">
                      <CoverImage
                        src={getImage(item.image)}
                        alt={item.title}
                        sizes="112px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-[15px] font-semibold text-text">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[12.5px] text-text-soft">
                          {item.vehicleOrSeat}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-text-soft">
                          <Clock size={12} strokeWidth={1.5} />
                          {item.duration}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[14.5px] font-semibold text-forest">
                          {formatPrice(item.price)}
                        </span>
                        <Button
                          href="/consultation"
                          variant="ghost"
                          className="px-4 py-2 text-[13px]"
                        >
                          문의
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </Container>
        );
      })}

      <Container className="pb-14 text-center md:pb-20">
        <a
          href="/consultation"
          className="inline-flex items-center gap-1.5 border-b border-forest pb-0.5 text-[14.5px] font-medium text-forest transition-colors hover:text-forest-light"
        >
          원하는 구간이 없다면 맞춤 상담받기
          <ArrowRight size={14} strokeWidth={2} />
        </a>
      </Container>
    </>
  );
}
