"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";
import { supabaseServer } from "@/lib/supabase/server";
import { getAdminReviewById } from "@/lib/data/admin-reviews";

function extractStoragePath(url: string): string | null {
  const marker = "/review-photos/";
  const idx = url.indexOf(marker);
  return idx === -1 ? null : url.slice(idx + marker.length);
}

export type ReviewFormState = { error?: string };

export async function upsertReviewAction(
  id: string | null,
  _prevState: ReviewFormState | undefined,
  formData: FormData
): Promise<ReviewFormState> {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const rating = Number(formData.get("rating"));

  if (!customerName || !content || !rating) {
    return { error: "작성자, 후기 내용, 평점은 필수 입력 항목입니다." };
  }

  const photosRaw = String(formData.get("photos") ?? "").trim();
  let photos: string[] = [];
  if (photosRaw) {
    try {
      photos = JSON.parse(photosRaw);
    } catch {
      photos = [];
    }
  }

  const payload = {
    customerName,
    destination: String(formData.get("destination") ?? "").trim(),
    product: String(formData.get("product") ?? "").trim(),
    category: String(formData.get("category") ?? "FREE_TRAVEL"),
    date: String(formData.get("date") ?? "").trim(),
    rating,
    content,
    isSample: formData.get("isSample") === "on",
    photos,
  };

  try {
    await adminRpc("admin_upsert_review", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다." };
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  redirect("/admin/reviews");
}

export async function deleteReviewAction(id: string) {
  const review = await getAdminReviewById(id);
  const paths = (review?.photos ?? [])
    .map(extractStoragePath)
    .filter((p): p is string => p !== null);
  if (paths.length > 0) {
    await supabaseServer.storage.from("review-photos").remove(paths);
  }

  await adminRpc("admin_delete_row", { p_table: "reviews", p_id: id });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}
