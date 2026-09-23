import { adminRpc } from "@/lib/supabase/admin-rpc";

export type AdminNoticeRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  images: string[] | null;
  created_at: string;
};

export async function getAdminNotices(): Promise<AdminNoticeRow[]> {
  return adminRpc<AdminNoticeRow[]>("admin_get_rows", { p_table: "notices" });
}

export async function getAdminNoticeById(id: string): Promise<AdminNoticeRow | null> {
  const rows = await getAdminNotices();
  return rows.find((r) => r.id === id) ?? null;
}
