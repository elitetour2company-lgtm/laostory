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

      {/* Phone: one card per inquiry */}
      <div className="mt-6 space-y-3 md:hidden">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-md border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[15px] font-semibold text-text">{inquiry.name}</p>
                <a
                  href={`tel:${inquiry.phone}`}
                  className="mt-0.5 inline-block text-[13.5px] font-medium text-forest underline underline-offset-2"
                >
                  {inquiry.phone}
                </a>
              </div>
              <p className="whitespace-nowrap text-[12px] text-text-soft">
                {new Date(inquiry.created_at).toLocaleDateString("ko-KR")}
              </p>
            </div>
            <dl className="mt-3 grid grid-cols-[64px_1fr] gap-x-3 gap-y-1.5 text-[13px]">
              <dt className="text-text-soft">지역·스타일</dt>
              <dd className="text-text">
                {[inquiry.region, inquiry.style].filter(Boolean).join(" · ") || "-"}
              </dd>
              <dt className="text-text-soft">여행일</dt>
              <dd className="text-text">{inquiry.travel_date ?? "-"}</dd>
              <dt className="text-text-soft">인원</dt>
              <dd className="text-text">{inquiry.guests ?? "-"}</dd>
              <dt className="text-text-soft">예산</dt>
              <dd className="text-text">{inquiry.budget ?? "-"}</dd>
            </dl>
            <p className="mt-3 whitespace-pre-line break-words rounded-sm bg-ivory p-3 text-[13px] leading-relaxed text-text">
              {inquiry.message}
            </p>
            <div className="mt-3">
              <InquiryStatusSelect id={inquiry.id} status={inquiry.status} />
            </div>
          </div>
        ))}
        {inquiries.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            아직 접수된 문의가 없습니다.
          </p>
        ) : null}
      </div>

      {/* PC: table */}
      <div className="mt-6 hidden overflow-x-auto rounded-md border border-border bg-white md:block">
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
