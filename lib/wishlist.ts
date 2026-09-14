const KEY = "laostory_wishlist";

export type WishlistType = "travel" | "golf" | "tour";
export type WishlistItem = { type: WishlistType; slug: string };

function readAll(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(items: WishlistItem[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("wishlist-change"));
}

export function getWishlist(): WishlistItem[] {
  return readAll();
}

export function isWishlisted(type: WishlistType, slug: string): boolean {
  return readAll().some((item) => item.type === type && item.slug === slug);
}

export function toggleWishlist(type: WishlistType, slug: string): boolean {
  const items = readAll();
  const index = items.findIndex((item) => item.type === type && item.slug === slug);
  if (index >= 0) {
    items.splice(index, 1);
    writeAll(items);
    return false;
  }
  items.push({ type, slug });
  writeAll(items);
  return true;
}
