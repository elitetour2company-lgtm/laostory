import { GolfCourse } from "@/types";

function topic(name: string): string {
  if (/CC$/i.test(name)) return `${name}는`;
  const code = name.charCodeAt(name.length - 1);
  const hangul = code >= 0xac00 && code <= 0xd7a3;
  return hangul && (code - 0xac00) % 28 !== 0 ? `${name}은` : `${name}는`;
}

export function golfCourseFaq(c: GolfCourse): { q: string; a: string }[] {
  const items: { q: string; a: string }[] = [];

  if (c.peakSeasonPriceUsd && c.peakSeasonLabel) {
    const weekend = c.peakSeasonWeekendPriceUsd
      ? `, 주말 ${c.peakSeasonWeekendPriceUsd}달러`
      : "";
    items.push({
      q: `${c.name} 성수기 그린피는 얼마인가요?`,
      a: `${c.peakSeasonLabel} 성수기 18홀 1인 기준으로 평일 ${c.peakSeasonPriceUsd}달러${weekend}입니다. 시즌과 요일에 따라 달라질 수 있어서 날짜가 정해지면 확인해 드립니다.`,
    });
  } else if (c.priceUsd) {
    const weekend =
      c.weekendPriceUsd && c.weekendPriceUsd !== c.priceUsd
        ? `, 주말 ${c.weekendPriceUsd}달러`
        : "";
    items.push({
      q: `${c.name} 그린피는 얼마인가요?`,
      a: `18홀 1인 기준으로 평일 ${c.priceUsd}달러${weekend}입니다. 시즌과 요일에 따라 달라질 수 있습니다.`,
    });
  }

  if (c.priceUsd || c.peakSeasonPriceUsd) {
    const cart = c.includesCart ? "전동카트" : null;
    const caddie = c.includesCaddie ? "캐디" : null;
    const inc = [caddie, cart].filter(Boolean).join("와 ");
    items.push({
      q: `${c.name} 요금에 캐디와 카트가 포함되나요?`,
      a: inc
        ? `홈페이지 요금에는 ${inc}가 포함되어 있습니다.${
            c.includesCart ? "" : " 이 골프장은 전동카트가 없어서 걸어서 라운딩합니다."
          }`
        : "캐디와 카트 포함 여부는 예약할 때 확인해 드립니다.",
    });
  }

  const fees = c.extraFees ?? [];
  const tip = fees.find((f) => f.label.includes("캐디팁"));
  const rental = fees.find((f) => f.label.includes("클럽 렌탈"));
  if (tip || rental) {
    const parts = [
      tip ? `캐디팁은 ${tip.value}` : null,
      rental ? `클럽 렌탈은 ${rental.value}` : null,
    ].filter(Boolean);
    items.push({
      q: `${c.name} 이용 시 현장에서 따로 내는 비용이 있나요?`,
      a: `${parts.join(", ")}입니다. 그린피와 별도로 현장에서 지불합니다.`,
    });
  }

  if (c.oddHeadcountCartFeeUsd) {
    const weekend =
      c.oddHeadcountCartFeeWeekendUsd &&
      c.oddHeadcountCartFeeWeekendUsd !== c.oddHeadcountCartFeeUsd
        ? ` (주말 ${c.oddHeadcountCartFeeWeekendUsd}달러)`
        : "";
    items.push({
      q: `${c.name} 이용 시 인원이 홀수이면 추가 요금이 있나요?`,
      a: `조가 홀수 인원이면 카트 1대 추가 요금 ${c.oddHeadcountCartFeeUsd}달러${weekend}가 붙습니다.`,
    });
  }

  if (c.locationNote) {
    items.push({
      q: `${topic(c.name)} 어디에 있나요?`,
      a: `${c.location}에 있으며, ${c.locationNote}입니다.`,
    });
  }

  return items;
}
