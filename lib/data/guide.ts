import { supabaseServer } from "@/lib/supabase/server";
import { GuideArticle } from "@/types";

type GuideRow = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string | null;
  content: string[];
  images: string[] | null;
};

function mapRow(row: GuideRow): GuideArticle {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    excerpt: row.excerpt,
    image: row.image ?? undefined,
    content: row.content,
    images: row.images ?? [],
  };
}

export async function getAllGuideArticles(): Promise<GuideArticle[]> {
  const { data, error } = await supabaseServer
    .from("guide_articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getGuideArticleBySlug(slug: string): Promise<GuideArticle | null> {
  const { data, error } = await supabaseServer
    .from("guide_articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getGuideArticleSlugs(): Promise<string[]> {
  const { data, error } = await supabaseServer.from("guide_articles").select("slug");
  if (error || !data) return [];
  return data.map((r) => r.slug);
}
