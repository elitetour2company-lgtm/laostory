import type { GolfExtraFee, GolfSpecialRate } from "@/types";

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

export function formatDays(days?: number[]): string {
  return days && days.length > 0 ? days.map((d) => DAY_NAMES[d]).join(",") : "";
}

// One rule per line: "이름 | 달러 | 원 | 월 구간 | 요일 | 옵션"
// e.g. "스포츠데이(월·목) | 66 | 92000 | 4월~9월 | 월,목 |"
// Options (comma separated): 오후 = only for afternoon tee times, 표시만 = show but never auto-apply.
export function serializeSpecialRates(rates: GolfSpecialRate[] | undefined): string {
  return (rates ?? [])
    .map((r) =>
      [
        r.label,
        r.priceUsd ?? "",
        r.price,
        r.months ?? "",
        formatDays(r.days),
        [r.afternoon ? "오후" : "", r.showOnly ? "표시만" : ""].filter(Boolean).join(","),
      ].join(" | ")
    )
    .join("\n");
}

export function parseSpecialRates(text: string): GolfSpecialRate[] {
  const rates: GolfSpecialRate[] = [];
  for (const line of text.split("\n")) {
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 3 || !parts[0]) continue;

    const price = Number(parts[2].replace(/[^\d]/g, ""));
    if (!price) continue;

    const priceUsd = Number(parts[1].replace(/[^\d]/g, ""));
    const days = (parts[4] ?? "")
      .split(/[,\s]+/)
      .map((d) => DAY_NAMES.indexOf(d))
      .filter((d) => d >= 0);
    const flags = (parts[5] ?? "").split(/[,\s]+/);

    rates.push({
      label: parts[0],
      price,
      ...(priceUsd ? { priceUsd } : {}),
      ...(parts[3] ? { months: parts[3] } : {}),
      ...(days.length > 0 ? { days } : {}),
      ...(flags.includes("오후") ? { afternoon: true } : {}),
      ...(flags.includes("표시만") ? { showOnly: true } : {}),
    });
  }
  return rates;
}

// One item per line: "항목 | 내용", e.g. "캐디팁 | 18홀 기준 최소 30만낍(약 15달러)".
export function serializeExtraFees(fees: GolfExtraFee[] | undefined): string {
  return (fees ?? []).map((f) => `${f.label} | ${f.value}`).join("\n");
}

export function parseExtraFees(text: string): GolfExtraFee[] {
  const fees: GolfExtraFee[] = [];
  for (const line of text.split("\n")) {
    const idx = line.indexOf("|");
    if (idx < 0) continue;
    const label = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (label && value) fees.push({ label, value });
  }
  return fees;
}
