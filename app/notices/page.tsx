import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { getAllNotices } from "@/lib/data/notices";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "공지사항",
  description: "라오스토리의 새로운 소식과 안내 사항을 확인해보세요.",
};

export default async function NoticesPage() {
  const notices = await getAllNotices();

  return (
    <>
      <PageHeader
        eyebrow="Notice"
        title="공지사항"
        description="라오스토리의 새로운 소식과 안내 사항을 전해드립니다."
      />

      <Container className="py-10 md:py-14">
        {notices.length > 0 ? (
          <div className="mx-auto max-w-2xl divide-y divide-border border-y border-border">
            {notices.map((notice) => (
              <Link
                key={notice.slug}
                href={`/notices/${notice.slug}`}
                className="flex items-center justify-between gap-4 py-5 transition-colors hover:bg-ivory/60"
              >
                <span className="text-[15px] font-medium text-text">{notice.title}</span>
                <span className="flex-shrink-0 text-[12.5px] text-text-soft">
                  {formatDate(notice.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-14 text-center text-[14.5px] text-text-soft">
            등록된 공지사항이 아직 없습니다.
          </p>
        )}
      </Container>
    </>
  );
}
