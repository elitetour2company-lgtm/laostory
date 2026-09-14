import { adminRpc } from "@/lib/supabase/admin-rpc";

export type AdminGuideArticleRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string | null;
  content: string[];
};

export async function getAdminGuideArticles(): Promise<AdminGuideArticleRow[]> {
  return adminRpc<AdminGuideArticleRow[]>("admin_get_rows", { p_table: "guide_articles" });
}

export async function getAdminGuideArticleById(id: string): Promise<AdminGuideArticleRow | null> {
  const rows = await getAdminGuideArticles();
  return rows.find((r) => r.id === id) ?? null;
}
