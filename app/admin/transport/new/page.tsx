import TransportForm from "@/components/admin/TransportForm";

export default function NewTransportOptionPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">새 차량 상품 추가</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <TransportForm />
      </div>
    </div>
  );
}
