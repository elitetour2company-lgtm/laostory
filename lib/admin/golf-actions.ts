"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type GolfFormState = { error?: string };

function parseCommaList(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function upsertGolfCourseAction(
  id: string | null,
  _prevState: GolfFormState | undefined,
  formData: FormData
): Promise<GolfFormState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (!slug || !name || !price) {
    return { error: "슬러그, 골프장명, 가격은 필수 입력 항목입니다." };
  }

  const payload = {
    slug,
    name,
    location: String(formData.get("location") ?? "").trim(),
    holes: Number(formData.get("holes")) || 18,
    par: Number(formData.get("par")) || 72,
    difficulty: String(formData.get("difficulty") ?? "NORMAL"),
    description: String(formData.get("description") ?? "").trim(),
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
    weekendPrice: (() => {
      const raw = String(formData.get("weekendPrice") ?? "").trim();
      return raw ? Number(raw) : null;
    })(),
    weekendPriceUsd: (() => {
      const raw = String(formData.get("weekendPriceUsd") ?? "").trim();
      return raw ? Number(raw) : null;
    })(),
    yardage: (() => {
      const raw = String(formData.get("yardage") ?? "").trim();
      return raw ? Number(raw) : null;
    })(),
    locationNote: String(formData.get("locationNote") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    includesCaddie: formData.get("includesCaddie") === "on",
    includesCart: formData.get("includesCart") === "on",
    facilities: parseCommaList(String(formData.get("facilities") ?? "")),
    gallery: parseCommaList(String(formData.get("gallery") ?? "")),
  };

  try {
    await adminRpc("admin_upsert_golf_course", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다. 슬러그 중복 여부를 확인해주세요." };
  }

  revalidatePath("/admin/golf");
  revalidatePath("/golf");
  redirect("/admin/golf");
}

export async function deleteGolfCourseAction(id: string) {
  await adminRpc("admin_delete_row", { p_table: "golf_courses", p_id: id });
  revalidatePath("/admin/golf");
  revalidatePath("/golf");
}
