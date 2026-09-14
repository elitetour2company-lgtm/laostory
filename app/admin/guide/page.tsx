import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminGuideArticles } from "@/lib/data/admin-guide";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteGuideArticleAction } from "@/lib/admin/guide-actions";

export const dynamic = "force-dynamic";

export default async function AdminGuidePage() {
  const articles = await getAdminGuideArticles();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-forest">여행정보 관리</h1>
          <p className="mt-1 text-[13px] text-text-soft">총 {articles.length}개 글</p>
        </div>
        <Link
          href="/admin/guide/new"
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
              <th className="px-4 py-3 font-medium">카테고리</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-4 py-3.5 font-medium text-text">{article.title}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {article.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/guide/${article.id}/edit`}
                      className="text-[12.5px] font-medium text-forest hover:text-forest-light"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      id={article.id}
                      action={deleteGuideArticleAction}
                      confirmMessage={`"${article.title}" 글을 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 여행정보 글이 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
