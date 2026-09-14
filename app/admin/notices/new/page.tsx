import NoticeForm from "@/components/admin/NoticeForm";

export default function NewNoticePage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">새 공지사항 추가</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <NoticeForm />
      </div>
    </div>
  );
}
