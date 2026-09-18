import type { Metadata } from "next";
import { ArrowRight, Clock, AlertTriangle } from "lucide-react";
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

      <Container className="border-t border-border py-10 md:py-14">
        <h3 className="flex items-center gap-1.5 text-[15px] font-semibold text-forest">
          <AlertTriangle size={16} strokeWidth={2} />
          유의사항
        </h3>
        <ul className="mt-3 space-y-2">
          {[
            "기차 수하물은 성인 20kg, 아동 10kg까지 무료입니다.",
            "기차 아동은 키 150cm 이하 50% 할인, 키 120cm 이하는 1명까지 무료이며 상담 신청 후 적용해드립니다. 신청 화면의 예상 금액은 아동도 성인 요금 기준으로 계산됩니다.",
            "기차 1등석·비즈니스석은 별도 문의로 안내해드립니다.",
            "기차 시간표는 사정에 따라 일부 편이 운행되지 않을 수 있으며, 예약 시 운행 여부를 확인해드립니다.",
            "전세밴·공항 픽업/샌딩은 15인승 차량 기준이며, 조인밴은 성수기에 더 큰 차량으로 대체될 수 있습니다.",
            "조인밴은 방비엥·비엔티안 양방향 하루 3회(09:00·12:00·14:00) 고정 출발이며, 방향에 따라 픽업 포함 여부가 다를 수 있습니다.",
            "비행기 연착 등으로 픽업 시간이 변경되는 경우 사전에 연락 주시면 추가 요금 없이 조정해드립니다.",
          ].map((c) => (
            <li key={c} className="flex items-start gap-2 text-[13px] leading-relaxed text-text-soft">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-text-soft/60" />
              {c}
            </li>
          ))}
        </ul>
      </Container>

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
