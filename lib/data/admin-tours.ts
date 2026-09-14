import { adminRpc } from "@/lib/supabase/admin-rpc";

export type AdminTourRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  destination: string;
  description: string;
  duration: string;
  price: number;
  price_usd: number | null;
  image: string | null;
  gallery: string[];
  included: string[];
  excluded: string[];
  schedule: { time: string; activity: string }[];
  meeting_point: string;
};

export async function getAdminTours(): Promise<AdminTourRow[]> {
  return adminRpc<AdminTourRow[]>("admin_get_rows", { p_table: "tours" });
}

export async function getAdminTourById(id: string): Promise<AdminTourRow | null> {
  const rows = await getAdminTours();
  return rows.find((r) => r.id === id) ?? null;
}
