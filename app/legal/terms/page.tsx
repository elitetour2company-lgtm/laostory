import type { Metadata } from "next";
import LegalContent from "@/components/legal/LegalContent";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "이용약관",
  description: `${SITE_NAME} 서비스 이용약관을 확인하세요.`,
};

export default function TermsPage() {
  return (
    <LegalContent
      title="이용약관"
      updatedAt="준비 중"
      sections={[
        {
          heading: "제1조 (목적)",
          body: [
            `이 약관은 ${SITE_NAME}(이하 "회사")가 제공하는 라오스 여행상품 소개, 상담, 예약 문의 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.`,
          ],
        },
        {
          heading: "제2조 (서비스의 제공)",
          body: [
            "회사는 라오스 자유여행, 패키지여행, 풀빌라·호텔, 골프, 투어·액티비티, 차량·픽업 등의 정보를 제공하며, 이용자는 회원가입 없이 상담 신청 및 문의가 가능합니다.",
            "실제 예약 및 결제는 회사 담당자와의 상담을 통해 별도로 진행되며, 웹사이트 상의 가격 및 일정은 안내용 정보로 실제 확정 견적과 다를 수 있습니다.",
          ],
        },
        {
          heading: "제3조 (예약 및 계약의 성립)",
          body: [
            "여행계약은 이용자의 상담 신청 이후, 회사가 제공하는 최종 견적에 이용자가 동의하고 계약금을 지급하는 시점에 성립됩니다.",
          ],
        },
        {
          heading: "제4조 (면책조항)",
          body: [
            "회사는 천재지변, 항공/교통 지연, 현지 사정 변경 등 회사의 통제 범위를 벗어난 사유로 인한 서비스 제공의 지연 또는 변경에 대해 책임을 지지 않습니다.",
          ],
        },
        {
          heading: "부칙",
          body: ["사업자 등록 정보 및 상세 약관은 준비 중이며, 확정되는 대로 본 페이지에 반영됩니다."],
        },
      ]}
    />
  );
}
