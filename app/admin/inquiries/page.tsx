import { adminRpc } from "@/lib/supabase/admin-rpc";
import InquiryStatusSelect from "@/components/admin/InquiryStatusSelect";

export const dynamic = "force-dynamic";

type InquiryRow = {
  id: string;
  name: string;
  phone: string;
  travel_date: string | null;
  guests: string | null;
  region: string | null;
  style: string | null;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
};

export default async function AdminInquiriesPage() {
  const data = await adminRpc<InquiryRow[]>("admin_get_inquiries");
  const inquiries = data ?? [];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">문의 관리</h1>
      <p className="mt-1 text-[13px] text-text-soft">
        총 {inquiries.length}건의 상담 문의
      </p>

      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[800px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-ivory text-[12px] text-text-soft">
              <th className="px-4 py-3 font-medium">접수일</th>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">연락처</th>
              <th className="px-4 py-3 font-medium">희망 지역/스타일</th>
              <th className="px-4 py-3 font-medium">문의 내용</th>
              <th className="px-4 py-3 font-medium">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {new Date(inquiry.created_at).toLocaleDateString("ko-KR")}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 font-medium text-text">
                  {inquiry.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {inquiry.phone}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {inquiry.region} · {inquiry.style}
                </td>
                <td className="max-w-xs px-4 py-3.5 text-text">
                  <p className="line-clamp-2">{inquiry.message}</p>
                </td>
                <td className="px-4 py-3.5">
                  <InquiryStatusSelect id={inquiry.id} status={inquiry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            아직 접수된 문의가 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
