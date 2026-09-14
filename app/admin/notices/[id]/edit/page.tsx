import { notFound } from "next/navigation";
import NoticeForm from "@/components/admin/NoticeForm";
import { getAdminNoticeById } from "@/lib/data/admin-notices";

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getAdminNoticeById(id);
  if (!notice) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">공지사항 수정</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <NoticeForm notice={notice} />
      </div>
    </div>
  );
}
