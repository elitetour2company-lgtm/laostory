"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type GuideFormState = { error?: string };

function parseImages(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (u): u is string => typeof u === "string" && u.startsWith("/api/site-images/")
    );
  } catch {
    return [];
  }
}

function parseParagraphs(value: string): string[] {
  return value
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function upsertGuideArticleAction(
  id: string | null,
  _prevState: GuideFormState | undefined,
  formData: FormData
): Promise<GuideFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() ||
    `guide-${new Date().toISOString().replace(/\D/g, "").slice(0, 14)}`;

  if (!title) {
    return { error: "제목은 필수 입력 항목입니다." };
  }

  const payload = {
    slug,
    title,
    category: String(formData.get("category") ?? "").trim() || "여행정보",
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    content: parseParagraphs(String(formData.get("content") ?? "")),
    images: parseImages(String(formData.get("images") ?? "")),
  };

  try {
    await adminRpc("admin_upsert_guide_article", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다. 슬러그 중복 여부를 확인해주세요." };
  }

  revalidatePath("/admin/guide");
  revalidatePath("/guide");
  revalidatePath("/");
  redirect("/admin/guide");
}

export async function deleteGuideArticleAction(id: string) {
  await adminRpc("admin_delete_row", { p_table: "guide_articles", p_id: id });
  revalidatePath("/admin/guide");
  revalidatePath("/guide");
  revalidatePath("/");
}
