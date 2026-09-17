// A price of 0 means "가격 문의" (price on request), not an actual price of
// zero won — it must never be treated as the cheapest item when sorting.
function comparablePrice(price: number): number {
  return price === 0 ? Infinity : price;
}

export function sortItems<T extends { price: number }>(
  items: T[],
  sort: string | undefined,
  getName: (item: T) => string
): T[] {
  switch (sort) {
    case "name":
      return [...items].sort((a, b) => getName(a).localeCompare(getName(b), "ko"));
    case "price_low":
      // Ascending order: without this, unpriced (0 = "가격 문의") items would
      // wrongly sort to the front as if they were the cheapest.
      return [...items].sort((a, b) => comparablePrice(a.price) - comparablePrice(b.price));
    case "price_high":
      // Descending order: raw prices already put 0 ("가격 문의") last here,
      // which is what we want, so no Infinity substitution is needed.
      return [...items].sort((a, b) => b.price - a.price);
    default:
      return items;
  }
}
