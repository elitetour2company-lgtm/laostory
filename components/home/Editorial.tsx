import CoverImage from "@/components/ui/CoverImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { getImage } from "@/data/images";

export default function Editorial() {
  return (
    <section className="relative flex h-[420px] items-center overflow-hidden md:h-[540px]">
      <CoverImage
        src={getImage("editorial-vangvieng")}
        alt="방비엥, 시간이 느려지는 곳"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-forest/45" />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          eyebrow="VANG VIENG"
          title="시간이 느려지는 곳"
          description="카르스트 산맥과 강, 그리고 고요한 오후."
          align="center"
          tone="light"
        />
      </div>
    </section>
  );
}
