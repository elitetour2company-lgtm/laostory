import { supabaseServer } from "@/lib/supabase/server";
import { Villa } from "@/types";
import { getRatingSummaries } from "@/lib/data/reviews";

type VillaRow = {
  slug: string;
  name: string;
  location: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  has_private_pool: boolean;
  price: number;
  price_usd: number | null;
  image: string | null;
  gallery: string[] | null;
  description: string;
  facilities: string[];
  nearby: string[];
};

function mapRow(row: VillaRow): Villa {
  return {
    slug: row.slug,
    name: row.name,
    location: row.location,
    maxGuests: row.max_guests,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    hasPrivatePool: row.has_private_pool,
    price: row.price,
    priceUsd: row.price_usd ?? undefined,
    image: row.image ?? undefined,
    gallery: row.gallery ?? [],
    description: row.description,
    facilities: row.facilities,
    nearby: row.nearby,
  };
}

// `is_published` gates rows in the `villas` table so early-development
// placeholder rows never reach real visitors — only rows the owner has
// confirmed as real inventory (name/price/photos verified) are published.
export async function getAllVillas(): Promise<Villa[]> {
  const [{ data, error }, ratings] = await Promise.all([
    supabaseServer.from("villas").select("*").eq("is_published", true).order("created_at", { ascending: true }),
    getRatingSummaries("villa"),
  ]);
  if (error || !data) return [];
  return data.map((row) => {
    const summary = ratings[row.slug];
    return { ...mapRow(row), rating: summary?.rating, reviewCount: summary?.count };
  });
}

export async function getVillaBySlug(slug: string): Promise<Villa | null> {
  const { data, error } = await supabaseServer
    .from("villas")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error || !data) return null;
  return mapRow(data);
}

export async function getVillaSlugs(): Promise<string[]> {
  const { data, error } = await supabaseServer.from("villas").select("slug").eq("is_published", true);
  if (error || !data) return [];
  return data.map((r) => r.slug);
}
