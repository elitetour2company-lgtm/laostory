import { supabaseServer } from "@/lib/supabase/server";
import { Notice } from "@/types";

type NoticeRow = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  images: string[] | null;
  created_at: string;
};

function mapRow(row: NoticeRow): Notice {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    images: row.images ?? [],
    createdAt: row.created_at,
  };
}

export async function getAllNotices(): Promise<Notice[]> {
  const { data, error } = await supabaseServer
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getNoticeBySlug(slug: string): Promise<Notice | null> {
  const { data, error } = await supabaseServer
    .from("notices")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getNoticeSlugs(): Promise<string[]> {
  const { data, error } = await supabaseServer.from("notices").select("slug");
  if (error || !data) return [];
  return data.map((r) => r.slug);
}
