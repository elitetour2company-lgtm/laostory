"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "recommended", label: "추천순" },
  { value: "name", label: "가나다순" },
  { value: "price_low", label: "낮은가격순" },
  { value: "price_high", label: "높은가격순" },
];

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "recommended";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <select
      aria-label="정렬"
      value={currentSort}
      onChange={handleChange}
      className="rounded-full border border-border bg-white px-4 py-2.5 text-[14px] font-medium text-text outline-none transition-colors hover:border-forest focus:border-forest"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
