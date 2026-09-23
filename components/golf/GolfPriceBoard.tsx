import Link from "next/link";
import type { GolfCourse } from "@/types";
import { formatDays } from "@/lib/golf-special-rates";

type Row = { label: string; weekday: number; weekend: number; weekdayUsd?: number; weekendUsd?: number };

function collapseMonths(m: string): string {
  const [a, b] = m.split("~");
  return a === b ? a : m;
}

const REGION_ORDER = ["비엔티안", "루앙프라방", "방비엥"];

function buildRows(c: GolfCourse): Row[] {
  const rows: Row[] = [];
  const hasOther = Boolean((c.midSeasonPrice && c.midSeasonLabel) || (c.peakSeasonPrice && c.peakSeasonLabel));
  if (c.midSeasonPrice && c.midSeasonLabel) {
    rows.push({
      label: c.midSeasonLabel,
      weekday: c.midSeasonPrice,
      weekend: c.midSeasonWeekendPrice ?? c.midSeasonPrice,
      weekdayUsd: c.midSeasonPriceUsd,
      weekendUsd: c.midSeasonWeekendPriceUsd ?? c.midSeasonPriceUsd,
    });
  }
  if (c.peakSeasonPrice && c.peakSeasonLabel) {
    rows.push({
      label: `${c.peakSeasonLabel} 성수기`,
      weekday: c.peakSeasonPrice,
      weekend: c.peakSeasonWeekendPrice ?? c.peakSeasonPrice,
      weekdayUsd: c.peakSeasonPriceUsd,
      weekendUsd: c.peakSeasonWeekendPriceUsd ?? c.peakSeasonPriceUsd,
    });
  }
  rows.unshift({
    label: hasOther ? "그 외 기간" : "연중",
    weekday: c.price,
    weekend: c.weekendPrice ?? c.price,
    weekdayUsd: c.priceUsd,
    weekendUsd: c.weekendPriceUsd ?? c.priceUsd,
  });
  return rows;
}

function Money({ krw, usd }: { krw: number; usd?: number }) {
  return (
    <span className="block leading-tight">
      <span className="block text-[17px] font-semibold text-forest">
        {usd !== undefined ? `$${usd}` : `₩${krw.toLocaleString("ko-KR")}`}
      </span>
      {usd !== undefined ? (
        <span className="block text-[11px] text-text-soft">₩{krw.toLocaleString("ko-KR")}</span>
      ) : null}
    </span>
  );
}

function CourseCard({ course }: { course: GolfCourse }) {
  const rows = buildRows(course);
  const splitWeekend = rows.some((r) => r.weekend !== r.weekday);
  const specials = (course.specialRates ?? []).filter((r) => !r.showOnly);

  return (
    <div className="flex flex-col rounded-xl border border-border bg-white">
      <div className="border-b border-border px-4 py-3">
        <Link href={`/golf/courses/${course.slug}`} className="text-[15.5px] font-semibold text-forest hover:underline">
          {course.name}
        </Link>
        <p className="mt-1 inline-block rounded-full bg-forest/8 px-2 py-0.5 text-[11px] font-medium text-forest">
          {course.location}
        </p>
        <p className="mt-1.5 text-[12px] text-text-soft">
          {course.holes}홀 · 파{course.par} · {course.includesCart ? "전동카트 포함" : "카트 없음(워킹)"}
        </p>
      </div>

      <div className="flex-1 px-4 py-3">
        <div
          className={`grid items-end gap-x-3 pb-1.5 text-[11.5px] font-medium text-text-soft ${
            splitWeekend ? "grid-cols-[1fr_4.5rem_4.5rem]" : "grid-cols-[1fr_5rem]"
          }`}
        >
          <span>기간</span>
          {splitWeekend ? (
            <>
              <span className="text-right">주중</span>
              <span className="text-right">주말</span>
            </>
          ) : (
            <span className="text-right">매일</span>
          )}
        </div>
        {rows.map((r) => (
          <div
            key={r.label}
            className={`grid items-center gap-x-3 border-t border-dashed border-border py-2 ${
              splitWeekend ? "grid-cols-[1fr_4.5rem_4.5rem]" : "grid-cols-[1fr_5rem]"
            }`}
          >
            <span className="text-[13px] text-text">{r.label}</span>
            <span className="text-right">
              <Money krw={r.weekday} usd={r.weekdayUsd} />
            </span>
            {splitWeekend ? (
              <span className="text-right">
                <Money krw={r.weekend} usd={r.weekendUsd} />
              </span>
            ) : null}
          </div>
        ))}

        {specials.length > 0 ? (
          <div className="mt-2 rounded-lg bg-ivory px-3 py-2">
            <p className="text-[11.5px] font-medium text-gold">특별 요금</p>
            <ul className="mt-1 space-y-0.5">
              {specials.map((s) => (
                <li key={s.label + (s.months ?? "")} className="text-[12px] leading-snug text-text-soft">
                  {s.label}
                  {s.months ? ` · ${collapseMonths(s.months)}` : ""}
                  {s.days && s.days.length > 0 && !s.label.includes(formatDays(s.days).split(",")[0]) ? ` · ${formatDays(s.days)}` : ""}
                  {" — "}
                  <span className="font-semibold text-forest">
                    {s.priceUsd ? `$${s.priceUsd}` : `₩${s.price.toLocaleString("ko-KR")}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="border-t border-border px-4 py-2.5">
        <Link href={`/golf/courses/${course.slug}`} className="text-[13px] font-medium text-forest hover:underline">
          상세·예약 계산하기 →
        </Link>
      </div>
    </div>
  );
}

export default function GolfPriceBoard({ courses }: { courses: GolfCourse[] }) {
  const ordered = [...courses].sort((a, b) => {
    const ra = REGION_ORDER.findIndex((r) => a.location.includes(r));
    const rb = REGION_ORDER.findIndex((r) => b.location.includes(r));
    return (ra === -1 ? REGION_ORDER.length : ra) - (rb === -1 ? REGION_ORDER.length : rb);
  });

  return (
    <div className="rounded-2xl border border-border bg-ivory p-4 md:p-6">
      <div className="text-center">
        <p className="text-[12px] font-medium tracking-[0.25em] text-gold">LAOSTORY GOLF</p>
        <h3 className="mt-1 text-[21px] font-semibold text-forest md:text-[26px]">라오스 골프장 요금 안내</h3>
        <p className="mt-1 text-[13px] text-text-soft">그린피 · 캐디 · 쉐어카트 포함 (18홀 기준, 1인)</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ordered.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>

      <ul className="mt-6 space-y-1 text-[12px] leading-relaxed text-text-soft">
        <li>· 요금은 달러(USD) 기준이며 원화는 환산 참고가입니다. 환율·시즌에 따라 변동될 수 있어요.</li>
        <li>· 홀수 인원 카트비, 캐디팁, 클럽·신발 렌탈은 골프장별로 별도예요. 각 골프장 상세 페이지에서 확인하세요.</li>
      </ul>
    </div>
  );
}
