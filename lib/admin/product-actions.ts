"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type ProductFormState = { error?: string };

function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseCommaList(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function upsertProductAction(
  id: string | null,
  _prevState: ProductFormState | undefined,
  formData: FormData
): Promise<ProductFormState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const price = Number(formData.get("price"));

  if (!slug || !title || !price) {
    return { error: "슬러그, 상품명, 가격은 필수 입력 항목입니다." };
  }

  const itineraryRaw = String(formData.get("itinerary") ?? "").trim();
  let itinerary: unknown = null;
  if (itineraryRaw) {
    try {
      itinerary = JSON.parse(itineraryRaw);
    } catch {
      return { error: "일정(JSON) 형식이 올바르지 않습니다." };
    }
  }

  const payload = {
    slug,
    title,
    type: String(formData.get("type") ?? "FREE_TRAVEL"),
    category: String(formData.get("category") ?? "").trim(),
    destination: String(formData.get("destination") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    duration: String(formData.get("duration") ?? "").trim(),
    price,
    originalPrice: (() => {
      const raw = String(formData.get("originalPrice") ?? "").trim();
      return raw ? Number(raw) : null;
    })(),
    priceUsd: (() => {
      const raw = String(formData.get("priceUsd") ?? "").trim();
      return raw ? Number(raw) : null;
    })(),
    originalPriceUsd: (() => {
      const raw = String(formData.get("originalPriceUsd") ?? "").trim();
      return raw ? Number(raw) : null;
    })(),
    image: String(formData.get("image") ?? "").trim(),
    gallery: parseCommaList(String(formData.get("gallery") ?? "")),
    tags: parseCommaList(String(formData.get("tags") ?? "")),
    badge: String(formData.get("badge") ?? "").trim(),
    included: parseLines(String(formData.get("included") ?? "")),
    excluded: parseLines(String(formData.get("excluded") ?? "")),
    itinerary,
    featured: formData.get("featured") === "on",
  };

  try {
    await adminRpc("admin_upsert_product", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다. 슬러그 중복 여부를 확인해주세요." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/travel");
  redirect("/admin/products");
}

export async function deleteProductAction(id: string) {
  await adminRpc("admin_delete_product", { p_id: id });
  revalidatePath("/admin/products");
  revalidatePath("/travel");
}
