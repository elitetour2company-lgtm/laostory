import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import CoverImage from "@/components/ui/CoverImage";
import { getAllGuideArticles } from "@/lib/data/guide";
import { getImage } from "@/data/images";

export const metadata: Metadata = {
  title: "라오스 여행정보",
  description: "라오스 여행 시기, 지역 정보, 숙소 고르는 법까지 여행 전 알아두면 좋은 정보를 모았습니다.",
};

export default async function GuidePage() {
  const guideArticles = await getAllGuideArticles();

  return (
    <>
      <PageHeader
        eyebrow="Travel Guide"
        title="여행정보"
        description="라오스 여행을 떠나기 전 알아두면 좋은 정보를 모았습니다."
      />

      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {guideArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/guide/${article.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <CoverImage
                  src={getImage(article.image)}
                  alt={article.title}
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-3.5 text-xs font-medium tracking-wide text-gold">
                {article.category}
              </p>
              <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-text">
                {article.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-text-soft">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
