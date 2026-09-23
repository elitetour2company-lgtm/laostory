import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { getNoticeBySlug, getNoticeSlugs } from "@/lib/data/notices";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const slugs = await getNoticeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const notice = await getNoticeBySlug(slug);
  if (!notice) return {};
  return {
    title: notice.title,
    description: notice.excerpt,
  };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notice = await getNoticeBySlug(slug);
  if (!notice) notFound();

  return (
    <div className="pb-16">
      <PageHeader
        eyebrow="Notice"
        title={notice.title}
        description={`작성일 ${formatDate(notice.createdAt)}`}
      />

      <Container className="mt-8 md:mt-12">
        <div className="mx-auto max-w-2xl">
          {notice.excerpt ? (
            <p className="text-[15px] leading-relaxed text-text-soft">{notice.excerpt}</p>
          ) : null}

          <div
            className={`space-y-5 ${
              notice.excerpt ? "mt-8 border-t border-border pt-8" : ""
            }`}
          >
            {notice.content.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-text">
                {paragraph}
              </p>
            ))}
          </div>

          {notice.images.length > 0 ? (
            <div className="mt-8 space-y-4">
              {notice.images.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-auto w-full rounded-xl border border-border"
                />
              ))}
            </div>
          ) : null}

          <div className="mt-12 rounded-xl border border-border bg-ivory p-6 text-center">
            <p className="text-[15px] font-semibold text-forest">
              더 궁금한 점이 있으신가요?
            </p>
            <p className="mt-1.5 text-[13.5px] text-text-soft">
              라오스 현지 전문가에게 1:1로 편하게 상담받아보세요.
            </p>
            <Button href="/consultation" variant="primary" className="mt-5">
              1:1 여행상담
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
