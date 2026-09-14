import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-sm tracking-[0.4em] text-gold">404</p>
      <h1 className="font-display mt-4 text-[26px] font-semibold text-forest md:text-[34px]">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-text-soft">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.{" "}
        <br className="hidden sm:block" />
        아래에서 원하시는 여행을 다시 찾아보세요.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary">
          홈으로 가기
        </Button>
        <Button href="/travel" variant="ghost">
          여행상품 보기
        </Button>
      </div>
    </Container>
  );
}
