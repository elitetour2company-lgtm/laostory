import { supabaseServer } from "@/lib/supabase/server";
import { Tour, ScheduleItem } from "@/types";
import { getRatingSummaries } from "@/lib/data/reviews";

const CATEGORY_MAP: Record<string, Tour["category"]> = {
  ONE_DAY: "원데이투어",
  HALF_DAY: "반일투어",
  ACTIVITY: "액티비티",
};

type TourRow = {
  slug: string;
  title: string;
  category: string;
  destination: string;
  description: string;
  duration: string;
  price: number;
  price_usd: number | null;
  image: string | null;
  gallery: string[] | null;
  included: string[];
  excluded: string[];
  schedule: ScheduleItem[];
  meeting_point: string;
  extra_cautions: string[] | null;
  extra_preparations: string[] | null;
};

function mapRow(row: TourRow): Tour {
  return {
    slug: row.slug,
    title: row.title,
    category: CATEGORY_MAP[row.category] ?? "원데이투어",
    destination: row.destination,
    description: row.description,
    duration: row.duration,
    price: row.price,
    priceUsd: row.price_usd ?? undefined,
    image: row.image ?? undefined,
    gallery: row.gallery ?? [],
    included: row.included,
    excluded: row.excluded,
    schedule: row.schedule,
    meetingPoint: row.meeting_point,
    extraCautions: row.extra_cautions ?? undefined,
    extraPreparations: row.extra_preparations ?? undefined,
  };
}

export async function getAllTours(): Promise<Tour[]> {
  const [{ data, error }, ratings] = await Promise.all([
    supabaseServer.from("tours").select("*").order("created_at", { ascending: true }),
    getRatingSummaries("tour"),
  ]);

  if (error || !data) return [];
  return data.map((row) => {
    const summary = ratings[row.slug];
    return { ...mapRow(row), rating: summary?.rating, reviewCount: summary?.count };
  });
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const { data, error } = await supabaseServer
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getTourSlugs(): Promise<string[]> {
  const { data, error } = await supabaseServer.from("tours").select("slug");
  if (error || !data) return [];
  return data.map((r) => r.slug);
}
