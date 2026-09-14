import { notFound } from "next/navigation";
import ReviewForm from "@/components/admin/ReviewForm";
import { getAdminReviewById } from "@/lib/data/admin-reviews";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await getAdminReviewById(id);
  if (!review) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">후기 수정</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <ReviewForm review={review} />
      </div>
    </div>
  );
}
