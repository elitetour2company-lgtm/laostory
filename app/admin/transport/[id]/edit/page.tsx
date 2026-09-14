import { notFound } from "next/navigation";
import TransportForm from "@/components/admin/TransportForm";
import { getAdminTransportOptionById } from "@/lib/data/admin-transport";

export default async function EditTransportOptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const option = await getAdminTransportOptionById(id);
  if (!option) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">차량 상품 수정</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <TransportForm option={option} />
      </div>
    </div>
  );
}
