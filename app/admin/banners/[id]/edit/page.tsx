import { notFound } from "next/navigation";
import BannerForm from "@/components/admin/BannerForm";
import { getAdminBannerById } from "@/lib/data/admin-banners";

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const banner = await getAdminBannerById(id);
  if (!banner) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">배너 수정</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <BannerForm banner={banner} />
      </div>
    </div>
  );
}
