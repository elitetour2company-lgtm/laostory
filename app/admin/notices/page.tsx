import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminNotices } from "@/lib/data/admin-notices";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteNoticeAction } from "@/lib/admin/notice-actions";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  const notices = await getAdminNotices();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-forest">공지사항 관리</h1>
          <p className="mt-1 text-[13px] text-text-soft">총 {notices.length}개 글</p>
        </div>
        <Link
          href="/admin/notices/new"
          className="inline-flex items-center gap-1.5 rounded-sm bg-forest px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-forest-light"
        >
          <Plus size={15} strokeWidth={2} />
          새 글 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[600px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-ivory text-[12px] text-text-soft">
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">작성일</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {notices.map((notice) => (
              <tr key={notice.id}>
                <td className="px-4 py-3.5 font-medium text-text">{notice.title}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {formatDate(notice.created_at)}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/notices/${notice.id}/edit`}
                      className="text-[12.5px] font-medium text-forest hover:text-forest-light"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      id={notice.id}
                      action={deleteNoticeAction}
                      confirmMessage={`"${notice.title}" 글을 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {notices.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 공지사항이 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
