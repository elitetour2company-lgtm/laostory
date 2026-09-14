import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SITE_NAME_EN } from "@/lib/config";

export default function FinalCTA() {
  return (
    <section className="bg-forest py-24 md:py-32">
      <Container className="text-center">
        <SectionHeading
          eyebrow={SITE_NAME_EN}
          title="당신에게 맞는 라오스 여행을 만들어보세요."
          description="처음 가는 라오스부터 골프, 풀빌라, 자유여행까지 현지 전문가가 곁에서 함께 만들어갑니다."
          align="center"
          tone="light"
          descriptionClassName="mx-auto max-w-md"
        />
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/consultation" variant="accent">
            1:1 여행상담
          </Button>
          <Button href="/travel" variant="secondary">
            여행상품 보기
          </Button>
        </div>
      </Container>
    </section>
  );
}
