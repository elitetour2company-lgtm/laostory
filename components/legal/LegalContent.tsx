import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export default function LegalContent({
  title,
  updatedAt,
  sections,
}: {
  title: string;
  updatedAt: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} />
      <Container className="py-10 md:py-14">
        <div className="mx-auto max-w-2xl">
          <p className="text-[12.5px] text-text-soft">
            시행일: {updatedAt} (본 내용은 서비스 준비 단계의 초안이며, 실제
            사업자 확정 및 법률 검토 후 최종 반영됩니다.)
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-[16px] font-semibold text-forest">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((p, i) => (
                    <p key={i} className="text-[13.5px] leading-relaxed text-text-soft">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
