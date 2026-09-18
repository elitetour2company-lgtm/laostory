import Link from "next/link";
import { AlertTriangle, Backpack, BadgeCheck, ShieldCheck } from "lucide-react";

type NoticeType = "golf" | "travel" | "tour";

const CONTENT: Record<NoticeType, { cautions: string[]; preparations: string[] }> = {
  golf: {
    cautions: [
      "여권 유효기간이 출발일 기준 6개월 이상 남아있어야 합니다.",
      "골프장 드레스코드(카라 있는 상의, 골프화 또는 소프트 스파이크)가 적용됩니다.",
      "우천 등 기상 상황에 따라 라운딩 일정이 변경되거나 취소될 수 있습니다.",
      "카트는 2인 1대 기준이며, 홀수 인원으로 조가 나뉘는 경우 골프장별로 카트 추가요금이 발생할 수 있습니다.",
      "캐디팁은 18홀 기준 15달러(또는 30만 킵) 정도로, 라운딩 후 캐디에게 현장에서 직접 전달합니다.",
      "레이크뷰CC·롱비엔CC는 카트로 페어웨이까지 진입할 수 있으며, 이용 시 별도 추가 요금이 발생합니다.",
      "갤러리(동반자) 입장은 골프장별로 사전 예약이 필요합니다.",
      "골프장 내 외부 음식물 반입은 금지됩니다.",
      "관광지 입장 시 라오스 규정상 투어신고서와 현지 가이드 동행이 필요하며, 4인 이상 단체는 필수로 적용됩니다.",
      "전자담배는 출국 시 압수될 수 있어 소지가 제한됩니다.",
      "한국-라오스는 비자 면제 협정국으로 30일간 무비자 체류가 가능합니다(미국 시민권자 등 일부 국적은 별도 확인 필요).",
    ],
    preparations: [
      "골프화 또는 소프트 스파이크 운동화",
      "골프 장갑·모자·선글라스",
      "선크림 및 개인 세면도구",
      "현지에서는 원화 사용이 불가하니 달러로 환전해 오세요.",
      "건기(11~3월)에는 아침저녁으로 선선해서 얇은 겉옷이 필요하고, 우기(5~10월)에도 장마처럼 계속 내리기보다 짧은 스콜이 지나가는 정도입니다.",
    ],
  },
  travel: {
    cautions: [
      "여권 유효기간이 출발일 기준 6개월 이상 남아있어야 합니다.",
      "현지 사정(도로 상황, 축제 일정 등)에 따라 세부 일정이 변경될 수 있습니다.",
      "성수기에는 항공권·숙박 요금 변동에 따라 최종 견적이 달라질 수 있습니다.",
      "관광지 입장 시 라오스 규정상 투어신고서와 현지 가이드 동행이 필요하며, 4인 이상 단체는 필수로 적용됩니다.",
      "일정표의 숙소는 예시이며, 현지 사정에 따라 동급의 다른 숙소로 변경될 수 있습니다.",
      "전자담배는 출국 시 압수될 수 있어 소지가 제한됩니다.",
      "한국-라오스는 비자 면제 협정국으로 30일간 무비자 체류가 가능합니다(미국 시민권자 등 일부 국적은 별도 확인 필요).",
    ],
    preparations: [
      "편한 복장과 걷기 편한 신발",
      "선크림·모자·선글라스",
      "현지에서는 원화 사용이 불가하니 달러로 환전해 오세요.",
      "건기(11~3월)에는 얇은 겉옷을, 우기(5~10월)에는 우산이나 우비를 챙기면 좋습니다 — 우기라도 장마처럼 계속 내리기보다 짧은 스콜이 한두 차례 지나가는 정도입니다.",
    ],
  },
  tour: {
    cautions: [
      "기상 악화 시 액티비티 진행 여부가 변경되거나 취소될 수 있습니다.",
      "일부 액티비티는 연령·체중 제한이 있을 수 있으니 예약 전 확인해주세요.",
      "귀중품 분실에 대한 책임은 개인에게 있습니다.",
    ],
    preparations: ["젖어도 되는 복장과 여벌 옷(수상 액티비티 시)", "선크림·모자", "휴대폰 방수팩 등 개인 소지품 보호용품"],
  },
};

export default function TravelNotices({
  type,
  extraCautions,
  extraPreparations,
}: {
  type: NoticeType;
  /** Product-specific notes appended after the shared cautions for this type (e.g. a tour's exact age/height limits). */
  extraCautions?: string[];
  extraPreparations?: string[];
}) {
  const base = CONTENT[type];
  const cautions = extraCautions?.length ? [...base.cautions, ...extraCautions] : base.cautions;
  const preparations = extraPreparations?.length
    ? [...base.preparations, ...extraPreparations]
    : base.preparations;

  return (
    <div className="mt-10">
      <div className="flex items-start gap-3 rounded-xl border border-forest/15 bg-forest/5 p-5">
        <BadgeCheck size={20} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-forest" />
        <div>
          <p className="text-[14px] font-semibold text-forest">노쇼핑·노옵션으로 진행됩니다</p>
          <p className="mt-1 text-[13px] leading-relaxed text-text-soft">
            전 일정 쇼핑센터·기념품점 방문 없이 진행되며, 현장에서 불필요한 옵션 상품을 강요하지 않습니다.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div>
        <h3 className="flex items-center gap-1.5 text-[15px] font-semibold text-forest">
          <AlertTriangle size={16} strokeWidth={2} />
          유의사항
        </h3>
        <ul className="mt-3 space-y-2">
          {cautions.map((c) => (
            <li key={c} className="flex items-start gap-2 text-[13px] leading-relaxed text-text-soft">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-text-soft/60" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="flex items-center gap-1.5 text-[15px] font-semibold text-forest">
          <Backpack size={16} strokeWidth={2} />
          준비물
        </h3>
        <ul className="mt-3 space-y-2">
          {preparations.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[13px] leading-relaxed text-text-soft">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-text-soft/60" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="sm:col-span-2">
        <h3 className="flex items-center gap-1.5 text-[15px] font-semibold text-forest">
          <ShieldCheck size={16} strokeWidth={2} />
          취소·환불 규정
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-text-soft">
          예약 확정 시 담당자가 상품별 취소·환불 기준을 안내해드립니다. 기본 규정은{" "}
          <Link
            href="/legal/refund-policy"
            className="font-medium text-forest underline underline-offset-2"
          >
            예약·취소 규정
          </Link>{" "}
          페이지에서 확인하실 수 있습니다.
        </p>
      </div>
      </div>
    </div>
  );
}
