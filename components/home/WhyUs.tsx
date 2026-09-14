import { MapPinned, Languages, ShieldCheck, LifeBuoy } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const POINTS = [
  {
    icon: MapPinned,
    eyebrow: "Laos Local Expert",
    title: "라오스 현지 직접 운영",
    description: "라오스에 상주하는 현지 스태프가 직접 여행을 준비합니다.",
  },
  {
    icon: Languages,
    eyebrow: "Korean Customer Service",
    title: "한국인 전담 상담",
    description: "예약부터 현지 응대까지 한국어로 편하게 소통합니다.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Verified Accommodation",
    title: "검증된 숙소와 상품",
    description: "직접 확인한 숙소와 액티비티만 소개합니다.",
  },
  {
    icon: LifeBuoy,
    eyebrow: "Local Support",
    title: "현지 즉시 지원",
    description: "여행 중 문제가 생겨도 현지에서 바로 도와드립니다.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-t border-border bg-forest py-20 text-white md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Us"
          title="라오스를 가장 잘 아는 여행 전문가"
          align="center"
          tone="light"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 md:grid-cols-4 md:gap-6">
          {POINTS.map(({ icon: Icon, eyebrow, title, description }) => (
            <div
              key={title}
              className="border-t border-white/15 pt-6 text-left first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0 md:border-t-0 md:pt-0 md:text-center"
            >
              <div className="flex items-center gap-3 md:flex-col md:gap-0">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold md:mx-auto">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-xs font-medium tracking-[0.15em] text-gold-soft md:mt-4">
                  {eyebrow}
                </p>
              </div>
              <h3 className="mt-2 text-[17px] font-semibold md:mt-2 md:text-[19px]">
                {title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/60 md:mx-auto md:max-w-[220px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
