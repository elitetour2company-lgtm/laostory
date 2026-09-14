import { adminRpc } from "@/lib/supabase/admin-rpc";

export type AdminBannerRow = {
  id: string;
  title: string;
  image: string;
  href: string | null;
  is_active: boolean;
  sort_order: number;
};

export async function getAdminBanners(): Promise<AdminBannerRow[]> {
  return adminRpc<AdminBannerRow[]>("admin_get_rows", { p_table: "banners" });
}

export async function getAdminBannerById(id: string): Promise<AdminBannerRow | null> {
  const rows = await getAdminBanners();
  return rows.find((r) => r.id === id) ?? null;
}
