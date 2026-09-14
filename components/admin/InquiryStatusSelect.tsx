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
      className="rounded-sm border border-border bg-white px-2.5 py-1.5 text-[12.5px] text-text outline-none disabled:opacity-60"
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
