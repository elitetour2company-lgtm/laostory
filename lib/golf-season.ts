import type { GolfCourse } from "@/types";

export type CurrentGolfPrice = {
  price: number;
  priceUsd?: number;
  /** True when a season rate (peak/mid) applies today instead of the base rate. */
  seasonal: boolean;
  /** True when the Sat/Sun rate differs from the weekday rate in the season that applies today. */
  weekendDiffers: boolean;
};

// Labels look like "12월~3월" and may wrap across the year (e.g. "10월~3월").
function parseSeasonMonths(label?: string): [number, number] | null {
  if (!label) return null;
  const match = label.match(/(\d+)월\s*~\s*(\d+)월/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2])];
}

function isMonthInSeason(month: number, [start, end]: [number, number]): boolean {
  return start <= end ? month >= start && month <= end : month >= start || month <= end;
}

// The server runs in UTC, so read the month in Korea time.
function currentMonthKst(now: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", month: "numeric" }).format(now)
  );
}

/** Weekday green fee that applies today (peak first, then mid, then the base rate). */
export function currentGolfPrice(course: GolfCourse, now: Date = new Date()): CurrentGolfPrice {
  const month = currentMonthKst(now);

  const peak = parseSeasonMonths(course.peakSeasonLabel);
  if (course.peakSeasonPrice && peak && isMonthInSeason(month, peak)) {
    return {
      price: course.peakSeasonPrice,
      priceUsd: course.peakSeasonPriceUsd,
      seasonal: true,
      weekendDiffers:
        !!course.peakSeasonWeekendPrice && course.peakSeasonWeekendPrice !== course.peakSeasonPrice,
    };
  }

  const mid = parseSeasonMonths(course.midSeasonLabel);
  if (course.midSeasonPrice && mid && isMonthInSeason(month, mid)) {
    return {
      price: course.midSeasonPrice,
      priceUsd: course.midSeasonPriceUsd,
      seasonal: true,
      weekendDiffers:
        !!course.midSeasonWeekendPrice && course.midSeasonWeekendPrice !== course.midSeasonPrice,
    };
  }

  return {
    price: course.price,
    priceUsd: course.priceUsd,
    seasonal: false,
    weekendDiffers: !!course.weekendPrice && course.weekendPrice !== course.price,
  };
}
