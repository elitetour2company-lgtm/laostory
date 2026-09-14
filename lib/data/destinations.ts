import { supabaseServer } from "@/lib/supabase/server";
import { Destination } from "@/types";

type DestinationRow = {
  slug: string;
  name: string;
  name_en: string;
  description: string;
  image: string | null;
  gallery: string[] | null;
  highlights: string[];
  travel_tips: string[];
};

function mapRow(row: DestinationRow): Destination {
  return {
    slug: row.slug,
    name: row.name,
    nameEn: row.name_en,
    description: row.description,
    image: row.image ?? undefined,
    gallery: row.gallery ?? [],
    highlights: row.highlights,
    travelTips: row.travel_tips,
  };
}

export async function getAllDestinations(): Promise<Destination[]> {
  const { data, error } = await supabaseServer
    .from("destinations")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const { data, error } = await supabaseServer
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getDestinationSlugs(): Promise<string[]> {
  const { data, error } = await supabaseServer.from("destinations").select("slug");
  if (error || !data) return [];
  return data.map((r) => r.slug);
}
