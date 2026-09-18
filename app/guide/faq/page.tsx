import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "라오스 여행 예약, 결제, 취소, 비자 등 자주 묻는 질문을 모았습니다.",
};

const FAQS = [
  {
    question: "예약은 어떻게 진행되나요?",
    answer:
      "홈페이지에서 원하시는 상품을 확인하신 뒤 1:1 여행상담을 신청해주시면, 담당자가 연락드려 일정과 견적을 확정합니다. 회원가입 없이도 상담 신청이 가능합니다.",
  },
  {
    question: "결제는 어떻게 하나요?",
    answer:
      "상담을 통해 최종 견적이 확정된 이후 계약금 입금으로 예약이 확정되며, 잔금은 출발 전 또는 현지에서 결제할 수 있습니다. 결제 수단은 담당자 안내에 따라 진행됩니다.",
  },
  {
    question: "예약 취소 및 환불은 어떻게 되나요?",
    answer:
      "취소 시점에 따라 환불 규정이 다르게 적용됩니다. 자세한 내용은 예약·취소 규정 페이지를 확인해주시거나 상담 시 담당자에게 문의해주세요.",
  },
  {
    question: "라오스 여행 시 비자가 필요한가요?",
    answer:
      "대한민국 국민은 무비자로 최대 30일간 라오스에 체류할 수 있습니다. 30일을 초과하는 일정이라면 비엔티안 이민국에서 연장 신청이 가능하며, 최대 90일까지 체류 가능합니다. 정확한 최신 정보는 출발 전 외교부 해외안전여행 홈페이지에서 다시 확인해주세요.",
  },
  {
    question: "환전은 어디서 하는 게 좋나요?",
    answer:
      "라오스 킵(LAK)은 국내에서 환전이 어려워, 미국 달러(USD)를 준비해 가신 뒤 현지에서 필요한 만큼 킵으로 환전하시는 것을 권장드립니다. 주요 호텔, 공항, 환전소에서 환전이 가능합니다.",
  },
  {
    question: "골프 여행 시 클럽을 가져가야 하나요?",
    answer:
      "대부분의 골프장에서 렌탈 클럽을 제공하지만, 개인 클럽 지참도 가능합니다. 항공사별 골프백 위탁 수하물 규정은 예약하신 항공사에 미리 확인하시길 권장드립니다.",
  },
  {
    question: "풀빌라는 몇 인부터 이용할 수 있나요?",
    answer:
      "상품별로 상이하며, 2인부터 이용 가능한 풀빌라부터 10인 이상 단체가 이용할 수 있는 풀빌라까지 다양하게 준비되어 있습니다. 인원에 맞는 숙소는 상담을 통해 안내드립니다.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />
      <PageHeader
        eyebrow="FAQ"
        title="자주 묻는 질문"
        description="라오스 여행 전 궁금하신 점을 미리 확인해보세요."
      />

      <Container className="py-10 md:py-14">
        <div className="mx-auto max-w-2xl divide-y divide-border border-y border-border">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-text">
                {faq.question}
                <ChevronDown
                  size={18}
                  strokeWidth={1.75}
                  className="flex-shrink-0 text-text-soft transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-[13.5px] leading-relaxed text-text-soft">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </>
  );
}
