import { notFound } from "next/navigation";
import GuideForm from "@/components/admin/GuideForm";
import { getAdminGuideArticleById } from "@/lib/data/admin-guide";

export default async function EditGuideArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getAdminGuideArticleById(id);
  if (!article) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">여행정보 글 수정</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <GuideForm article={article} />
      </div>
    </div>
  );
}
