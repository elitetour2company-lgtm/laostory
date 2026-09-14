"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type TourFormState = { error?: string };

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

export async function upsertTourAction(
  id: string | null,
  _prevState: TourFormState | undefined,
  formData: FormData
): Promise<TourFormState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const price = Number(formData.get("price"));

  if (!slug || !title || !price) {
    return { error: "슬러그, 투어명, 가격은 필수 입력 항목입니다." };
  }

  const scheduleRaw = String(formData.get("schedule") ?? "").trim();
  let schedule: unknown = [];
  if (scheduleRaw) {
    try {
      schedule = JSON.parse(scheduleRaw);
    } catch {
      return { error: "일정(JSON) 형식이 올바르지 않습니다." };
    }
  }

  const payload = {
    slug,
    title,
    category: String(formData.get("category") ?? "ONE_DAY"),
    destination: String(formData.get("destination") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    duration: String(formData.get("duration") ?? "").trim(),
    price,
    priceUsd: (() => {
      const raw = String(formData.get("priceUsd") ?? "").trim();
      return raw ? Number(raw) : null;
    })(),
    image: String(formData.get("image") ?? "").trim(),
    gallery: parseCommaList(String(formData.get("gallery") ?? "")),
    included: parseLines(String(formData.get("included") ?? "")),
    excluded: parseLines(String(formData.get("excluded") ?? "")),
    schedule,
    meetingPoint: String(formData.get("meetingPoint") ?? "").trim(),
  };

  try {
    await adminRpc("admin_upsert_tour", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다. 슬러그 중복 여부를 확인해주세요." };
  }

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  redirect("/admin/tours");
}

export async function deleteTourAction(id: string) {
  await adminRpc("admin_delete_row", { p_table: "tours", p_id: id });
  revalidatePath("/admin/tours");
  revalidatePath("/tours");
}
