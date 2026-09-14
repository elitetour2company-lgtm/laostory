import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageCircle, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ConsultationForm from "@/components/consultation/ConsultationForm";
import { CONTACT } from "@/lib/config";

export const metadata: Metadata = {
  title: "1:1 여행상담",
  description: "라오스 여행 전문가에게 1:1로 맞춤 여행 상담을 신청하세요.",
};

export default function ConsultationPage() {
  return (
    <>
      <PageHeader
        eyebrow="1:1 Consultation"
        title="1:1 여행상담"
        description="원하시는 여행 스타일을 남겨주시면 라오스 현지 전문가가 맞춤 일정을 제안해드립니다."
      />

      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_280px]">
          <Suspense
            fallback={
              <div className="rounded-xl border border-border bg-white p-6 md:p-10">
                <p className="text-[14.5px] text-text-soft">불러오는 중...</p>
              </div>
            }
          >
            <ConsultationForm />
          </Suspense>

          <aside className="h-fit space-y-5">
            <div className="rounded-xl border border-border bg-ivory p-6">
              <p className="text-[14px] font-semibold text-forest">
                더 빠른 상담을 원하신다면
              </p>
              <div className="mt-4 space-y-3">
                <a
                  href={CONTACT.kakaoUrl}
                  className="flex items-center gap-2.5 text-[13.5px] text-text hover:text-forest"
                >
                  <MessageCircle size={16} strokeWidth={1.5} />
                  카카오톡 1:1 문의
                </a>
                <p className="flex items-center gap-2.5 text-[13.5px] text-text-soft">
                  <Phone size={16} strokeWidth={1.5} />
                  {CONTACT.phone}
                </p>
              </div>
            </div>
            <p className="text-[12.5px] leading-relaxed text-text-soft">
              회원가입 없이 편하게 상담 신청하실 수 있습니다. 남겨주신
              연락처로 순서대로 안내드리며, 보통 영업일 기준 1~2일 안에는
              답변드립니다.
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
