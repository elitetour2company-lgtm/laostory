export function formatPrice(price: number): string {
  return `₩${price.toLocaleString("ko-KR")}~`;
}

export function formatPriceUsd(price: number): string {
  return `$${price.toLocaleString("en-US")}~`;
}

export function formatDate(value: string): string {
  const date = new Date(value);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}
