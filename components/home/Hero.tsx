import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CoverImage from "@/components/ui/CoverImage";
import { getImage } from "@/data/images";

export default function Hero() {
  return (
    <section className="relative flex h-[650px] items-end overflow-hidden bg-forest sm:h-[720px] lg:h-[850px]">
      <CoverImage
        src={getImage("hero")}
        alt="Vang Vieng, Laos"
        priority
        sizes="100vw"
        className="absolute inset-0 object-[50%_15%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-forest/25" />

      <Container className="relative z-10 pb-16 pt-32 md:pb-20">
        <p className="text-sm font-medium tracking-[0.25em] text-white/85">
          LAOS
        </p>
        <h1 className="font-display mt-5 max-w-2xl break-keep text-[38px] font-semibold leading-[1.2] text-white md:text-[58px]">
          당신의 다음 여행, 라오스
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">
          라오스에 상주하는 현지 전문가가 처음부터 끝까지 함께 준비하는 여행
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/travel" variant="primary">
            여행 둘러보기
          </Button>
          <Button href="/consultation" variant="secondary">
            1:1 여행상담
          </Button>
        </div>
      </Container>
    </section>
  );
}
