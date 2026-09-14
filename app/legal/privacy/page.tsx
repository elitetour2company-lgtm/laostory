import type { Metadata } from "next";
import LegalContent from "@/components/legal/LegalContent";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${SITE_NAME}의 개인정보 수집 및 이용에 관한 방침을 확인하세요.`,
};

export default function PrivacyPage() {
  return (
    <LegalContent
      title="개인정보처리방침"
      updatedAt="준비중"
      sections={[
        {
          heading: "1. 수집하는 개인정보 항목",
          body: [
            `${SITE_NAME}(이하 "회사")는 1:1 여행상담 및 예약 문의를 위해 이름, 연락처, 여행 예정일, 희망 지역, 문의 내용 등의 정보를 수집합니다.`,
          ],
        },
        {
          heading: "2. 개인정보의 수집 및 이용 목적",
          body: [
            "수집된 정보는 여행 상담 응대, 견적 안내, 예약 진행 확인을 위한 목적으로만 사용되며, 명시된 목적 외의 용도로는 사용되지 않습니다.",
          ],
        },
        {
          heading: "3. 개인정보의 보유 및 이용기간",
          body: [
            "회사는 상담 및 예약 처리가 완료된 이후 관련 법령에서 정한 기간 동안 정보를 보관하며, 해당 기간이 경과하면 지체 없이 파기합니다.",
          ],
        },
        {
          heading: "4. 개인정보의 제3자 제공",
          body: [
            "회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않으며, 법령에 특별한 규정이 있는 경우에 한해 예외로 합니다.",
          ],
        },
        {
          heading: "5. 개인정보 보호책임자",
          body: ["개인정보 보호책임자 지정 정보는 사업자 확정 후 본 페이지에 반영될 예정입니다."],
        },
      ]}
    />
  );
}
