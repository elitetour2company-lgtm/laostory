import { supabaseServer } from "@/lib/supabase/server";

export type Banner = {
  id: string;
  title: string;
  image: string;
  href?: string;
};

export async function getActiveBanners(): Promise<Banner[]> {
  const { data, error } = await supabaseServer
    .from("banners")
    .select("id, title, image, href")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    image: row.image,
    href: row.href || undefined,
  }));
}
