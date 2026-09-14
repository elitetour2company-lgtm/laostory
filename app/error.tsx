"use client";

import { useEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-sm tracking-[0.4em] text-gold">ERROR</p>
      <h1 className="font-display mt-4 text-[26px] font-semibold text-forest md:text-[34px]">
        일시적인 문제가 발생했습니다
      </h1>
      <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-text-soft">
        잠시 후 다시 시도해주시거나, 문제가 계속되면 1:1 상담으로 문의해주세요.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="primary" onClick={() => reset()}>
          다시 시도
        </Button>
        <Button href="/" variant="ghost">
          홈으로 가기
        </Button>
      </div>
    </Container>
  );
}
