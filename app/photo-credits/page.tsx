import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { PHOTO_CREDITS } from "@/lib/photo-credits";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "사진 출처",
  description: `${SITE_NAME} 사이트에 사용된 일부 사진의 작가와 라이선스 정보입니다.`,
};

export default function PhotoCreditsPage() {
  return (
    <>
      <PageHeader eyebrow="Photo Credits" title="사진 출처" />
      <Container className="py-10 md:py-14">
        <div className="mx-auto max-w-2xl">
          <p className="text-[13.5px] leading-relaxed text-text-soft">
            {SITE_NAME}의 사진 대부분은 직접 촬영하거나 사용 허락을 받은 사진입니다.
            아래는 위키미디어 커먼즈(Wikimedia Commons)에서 크리에이티브 커먼즈
            라이선스로 공개된 사진이며, 작가분들께 감사드립니다. 라이선스 전문은
            creativecommons.org에서 확인하실 수 있습니다.
          </p>

          <ul className="mt-8 divide-y divide-border border-y border-border">
            {PHOTO_CREDITS.map((credit) => (
              <li key={credit.title} className="py-3.5">
                <p className="text-[14px] font-medium text-text">{credit.title}</p>
                <p className="mt-0.5 text-[12.5px] text-text-soft">
                  {credit.author} · {credit.license}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
