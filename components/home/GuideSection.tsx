import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CoverImage from "@/components/ui/CoverImage";
import { getAllGuideArticles } from "@/lib/data/guide";
import { getImage } from "@/data/images";

export default async function GuideSection() {
  const guideArticles = await getAllGuideArticles();
  if (guideArticles.length === 0) return null;
  const [featured, ...rest] = guideArticles.slice(0, 5);

  return (
    <section className="border-t border-border bg-ivory py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Travel Guide" title="라오스 여행정보" />
          <Link
            href="/guide"
            className="hidden shrink-0 items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest transition-colors hover:text-forest-light md:inline-flex"
          >
            여행정보 더보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-5 md:mt-12 md:grid-cols-3">
          <Link href={`/guide/${featured.slug}`} className="group block md:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <CoverImage
                src={getImage(featured.image)}
                alt=""
                sizes="(min-width: 768px) 60vw, 100vw"
                className="transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-4 text-xs font-medium tracking-wide text-gold">
              {featured.category}
            </p>
            <h3 className="mt-1.5 text-[19px] font-semibold leading-snug text-text md:text-[21px]">
              {featured.title}
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-soft">
              {featured.excerpt}
            </p>
          </Link>

          <div className="flex flex-col divide-y divide-border">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/guide/${article.slug}`}
                className="group flex gap-4 py-4 first:pt-0"
              >
                <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-sm">
                  <CoverImage
                    src={getImage(article.image)}
                    alt=""
                    sizes="96px"
                    className="transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-medium tracking-wide text-gold">
                    {article.category}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-text">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
