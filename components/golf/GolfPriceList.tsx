import type { GolfCourse } from "@/types";

type Tier = { label: string; weekday: number; weekend: number; weekdayUsd?: number; weekendUsd?: number };

function buildTiers(c: GolfCourse): Tier[] {
  const tiers: Tier[] = [
    {
      label: c.midSeasonLabel || c.peakSeasonLabel ? "그 외 기간" : "연중",
      weekday: c.price,
      weekend: c.weekendPrice ?? c.price,
      weekdayUsd: c.priceUsd,
      weekendUsd: c.weekendPriceUsd ?? c.priceUsd,
    },
  ];
  if (c.midSeasonPrice && c.midSeasonLabel) {
    tiers.push({
      label: c.midSeasonLabel,
      weekday: c.midSeasonPrice,
      weekend: c.midSeasonWeekendPrice ?? c.midSeasonPrice,
      weekdayUsd: c.midSeasonPriceUsd,
      weekendUsd: c.midSeasonWeekendPriceUsd ?? c.midSeasonPriceUsd,
    });
  }
  if (c.peakSeasonPrice && c.peakSeasonLabel) {
    tiers.push({
      label: `${c.peakSeasonLabel} 성수기`,
      weekday: c.peakSeasonPrice,
      weekend: c.peakSeasonWeekendPrice ?? c.peakSeasonPrice,
      weekdayUsd: c.peakSeasonPriceUsd,
      weekendUsd: c.peakSeasonWeekendPriceUsd ?? c.peakSeasonPriceUsd,
    });
  }
  return tiers;
}

function lowestUsd(tiers: Tier[]): number | undefined {
  const usds = tiers.map((t) => t.weekdayUsd).filter((v): v is number => v !== undefined);
  return usds.length ? Math.min(...usds) : undefined;
}

export default function GolfPriceList({ courses }: { courses: GolfCourse[] }) {
  return (
    <div className="rounded-xl border border-border bg-white">
      <div className="border-b border-border bg-ivory px-4 py-2.5 text-[12px] text-text-soft">
        골프장을 눌러 시즌별 요금을 확인하세요 · 그린피·카트·캐디 포함, 1인 기준
      </div>
      <div className="divide-y divide-border">
        {courses.map((course) => {
          const tiers = buildTiers(course);
          const from = lowestUsd(tiers);
          const splitWeekend = tiers.some((t) => t.weekend !== t.weekday);
          return (
            <details key={course.slug} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 marker:content-none">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[14.5px] font-semibold text-forest">{course.name}</span>
                    <span className="rounded-full bg-forest/8 px-2 py-0.5 text-[10.5px] font-medium text-forest">
                      {course.location}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11.5px] text-text-soft">
                    {course.holes}홀 · 파{course.par} · {course.includesCart ? "전동카트 포함" : "카트 없음(워킹)"}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <span className="text-right text-[15px] font-semibold text-gold">
                    {from !== undefined ? `$${from}~` : ""}
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 flex-shrink-0 text-text-soft transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </summary>
              <div className="px-4 pb-4">
                <div className="rounded-lg bg-ivory p-3">
                  {splitWeekend ? (
                    <div className="grid grid-cols-[1fr_4rem_4rem] gap-x-2 pb-1.5 text-[11px] font-medium text-text-soft">
                      <span>기간</span>
                      <span className="text-right">주중</span>
                      <span className="text-right">주말</span>
                    </div>
                  ) : null}
                  {tiers.map((t, i) => (
                    <div
                      key={t.label}
                      className={`grid items-center gap-x-2 py-1.5 ${
                        splitWeekend ? "grid-cols-[1fr_4rem_4rem]" : "grid-cols-[1fr_4rem]"
                      } ${i > 0 ? "border-t border-dashed border-border" : ""}`}
                    >
                      <span className="text-[13px] text-text-soft">{t.label}</span>
                      <span className="text-right text-[13.5px] font-semibold text-forest">
                        {t.weekdayUsd ? `$${t.weekdayUsd}` : `₩${t.weekday.toLocaleString("ko-KR")}`}
                      </span>
                      {splitWeekend ? (
                        <span className="text-right text-[13.5px] font-semibold text-forest">
                          {t.weekendUsd ? `$${t.weekendUsd}` : `₩${t.weekend.toLocaleString("ko-KR")}`}
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
                <a
                  href={`/golf/courses/${course.slug}`}
                  className="mt-3 inline-block text-[13px] font-medium text-forest hover:underline"
                >
                  상세·예약 계산하기 →
                </a>
              </div>
            </details>
          );
        })}
      </div>
      <p className="border-t border-border px-4 py-3 text-[11.5px] leading-relaxed text-text-soft">
        요금은 달러(USD) 기준이며 원화는 환산 참고가입니다. 홀수 인원 카트비·캐디팁·클럽 렌탈은 골프장별로 별도예요.
      </p>
    </div>
  );
}
