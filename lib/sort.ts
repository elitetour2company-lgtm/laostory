export function sortItems<T extends { price: number }>(
  items: T[],
  sort: string | undefined,
  getName: (item: T) => string
): T[] {
  switch (sort) {
    case "name":
      return [...items].sort((a, b) => getName(a).localeCompare(getName(b), "ko"));
    case "price_low":
      return [...items].sort((a, b) => a.price - b.price);
    case "price_high":
      return [...items].sort((a, b) => b.price - a.price);
    default:
      return items;
  }
}
