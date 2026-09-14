"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

type Props = {
  style?: string;
};

export default function TravelDateFilter({ style }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") ?? "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("date", e.target.value);
    } else {
      params.delete("date");
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const consultParams = new URLSearchParams();
  if (date) consultParams.set("travelDate", date);
  if (style) consultParams.set("style", style);
  const consultHref = `/consultation?${consultParams.toString()}`;

  return (
    <div className="flex items-center gap-2.5">
      <label className="flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2.5 text-[14px] text-text-soft transition-colors hover:border-forest">
        <CalendarDays size={15} strokeWidth={1.75} />
        <span className="hidden sm:inline">여행 예정일</span>
        <input
          type="date"
          aria-label="여행 예정일"
          value={date}
          onChange={handleChange}
          className="bg-transparent text-text outline-none [color-scheme:light]"
        />
      </label>
      {date ? (
        <Link
          href={consultHref}
          className="whitespace-nowrap text-[13px] font-medium text-forest underline underline-offset-2 hover:text-forest-light"
        >
          이 날짜로 상담하기
        </Link>
      ) : null}
    </div>
  );
}
