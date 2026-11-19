"use client";

import { useTransition } from "react";
import { updateInquiryStatus } from "@/lib/admin/inquiry-actions";

const STATUSES = [
  { value: "PENDING", label: "대기중" },
  { value: "CONTACTED", label: "연락완료" },
  { value: "CONFIRMED", label: "예약확정" },
  { value: "CLOSED", label: "종료" },
];

export default function InquiryStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        startTransition(() => {
          updateInquiryStatus(id, next);
        });
      }}
      className="w-full rounded-sm border border-border bg-white px-3 py-2.5 text-[16px] text-text outline-none disabled:opacity-60 md:w-auto md:px-2.5 md:py-1.5 md:text-[12.5px]"
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
