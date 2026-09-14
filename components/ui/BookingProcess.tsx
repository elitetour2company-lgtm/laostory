import { MessageSquare, PhoneCall, ClipboardCheck, CalendarCheck } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    title: "예약 문의",
    description: "원하시는 일정과 인원을 남겨주세요.",
  },
  {
    icon: PhoneCall,
    title: "담당자 상담",
    description: "영업일 기준 1~2일 안에 전화나 카카오톡으로 편하게 연락드립니다.",
  },
  {
    icon: ClipboardCheck,
    title: "일정·견적 확정",
    description: "원하시는 조건에 맞춰 맞춤 일정과 최종 견적을 안내해드립니다.",
  },
  {
    icon: CalendarCheck,
    title: "예약 확정",
    description: "확정된 일정으로 라오스 여행을 준비해드립니다.",
  },
];

export default function BookingProcess() {
  return (
    <div className="border-t border-border pt-10">
      <h3 className="text-[15px] font-semibold text-forest">예약은 이렇게 진행돼요</h3>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4">
        {STEPS.map((step, i) => (
          <div key={step.title} className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/8 text-forest">
              <step.icon size={18} strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-[13.5px] font-semibold text-text">
              {i + 1}. {step.title}
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-text-soft">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
