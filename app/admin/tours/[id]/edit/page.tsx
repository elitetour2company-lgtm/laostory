import { notFound } from "next/navigation";
import TourForm from "@/components/admin/TourForm";
import { getAdminTourById } from "@/lib/data/admin-tours";

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = await getAdminTourById(id);
  if (!tour) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">투어 수정</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <TourForm tour={tour} />
      </div>
    </div>
  );
}
