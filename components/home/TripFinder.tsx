import { Search, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";

const REGIONS = ["전체", "비엔티안", "방비엥", "루앙프라방", "팍세"];
const STYLE_GROUPS = [
  { label: "여행 형태", options: ["자유여행", "골프", "휴양"] },
  { label: "여행 스타일", options: ["커플", "가족", "친구"] },
];
const GUESTS = ["1~2명", "3~4명", "5~8명", "9명+"];

function FinderSelect({
  name,
  label,
  options,
  groups,
}: {
  name: string;
  label: string;
  options?: string[];
  groups?: { label: string; options: string[] }[];
}) {
  const defaultValue = groups ? groups[0].options[0] : options![0];
  return (
    <label className="relative flex-1">
      <span className="mb-1.5 block text-xs font-medium text-text-soft">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full appearance-none border-b border-border bg-transparent py-2 pr-6 text-[15px] font-medium text-text outline-none"
      >
        {groups
          ? groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </optgroup>
            ))
          : options!.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
      </select>
      <ChevronDown
        size={15}
        strokeWidth={2}
        className="pointer-events-none absolute bottom-2.5 right-0 text-text-soft"
      />
    </label>
  );
}

export default function TripFinder() {
  return (
    <div className="relative z-20 -mt-14 md:-mt-16">
      <Container>
        <form
          action="/travel"
          method="GET"
          className="rounded-xl border border-border bg-white px-6 py-8 shadow-[0_16px_40px_-16px_rgba(18,60,50,0.22)] md:px-10 md:py-9"
        >
          <h2 className="text-base font-semibold text-forest md:text-[19px]">
            어떤 라오스 여행을 찾으세요?
          </h2>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
            <FinderSelect name="region" label="어디로 갈까요?" options={REGIONS} />
            <FinderSelect name="style" label="어떤 여행인가요?" groups={STYLE_GROUPS} />
            <FinderSelect name="guests" label="몇 명인가요?" options={GUESTS} />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-forest px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-forest-light md:mb-[1px]"
            >
              <Search size={16} strokeWidth={2} />
              여행 찾기
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
