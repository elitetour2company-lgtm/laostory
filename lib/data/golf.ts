import { supabaseServer } from "@/lib/supabase/server";
import { GolfCourse, GolfExtraFee, GolfSpecialRate } from "@/types";
import { getRatingSummaries } from "@/lib/data/reviews";

const DIFFICULTY_MAP: Record<string, GolfCourse["difficulty"]> = {
  EASY: "쉬움",
  NORMAL: "보통",
  HARD: "어려움",
};

type GolfRow = {
  slug: string;
  name: string;
  location: string;
  holes: number;
  par: number;
  difficulty: string;
  description: string;
  price: number;
  original_price: number | null;
  price_usd: number | null;
  original_price_usd: number | null;
  weekend_price: number | null;
  weekend_price_usd: number | null;
  peak_season_label: string | null;
  peak_season_price: number | null;
  peak_season_price_usd: number | null;
  peak_season_weekend_price: number | null;
  peak_season_weekend_price_usd: number | null;
  mid_season_label: string | null;
  mid_season_price: number | null;
  mid_season_price_usd: number | null;
  mid_season_weekend_price: number | null;
  mid_season_weekend_price_usd: number | null;
  special_rates: GolfSpecialRate[] | null;
  extra_fees: GolfExtraFee[] | null;
  odd_headcount_cart_fee_weekend: number | null;
  odd_headcount_cart_fee_weekend_usd: number | null;
  odd_headcount_cart_fee: number | null;
  odd_headcount_cart_fee_usd: number | null;
  image: string | null;
  gallery: string[] | null;
  yardage: number | null;
  location_note: string | null;
  includes_caddie: boolean;
  includes_cart: boolean;
  facilities: string[];
};

function mapRow(row: GolfRow): GolfCourse {
  return {
    slug: row.slug,
    name: row.name,
    location: row.location,
    holes: row.holes,
    par: row.par,
    difficulty: DIFFICULTY_MAP[row.difficulty] ?? "보통",
    description: row.description,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    priceUsd: row.price_usd ?? undefined,
    originalPriceUsd: row.original_price_usd ?? undefined,
    weekendPrice: row.weekend_price ?? undefined,
    weekendPriceUsd: row.weekend_price_usd ?? undefined,
    peakSeasonLabel: row.peak_season_label ?? undefined,
    peakSeasonPrice: row.peak_season_price ?? undefined,
    peakSeasonPriceUsd: row.peak_season_price_usd ?? undefined,
    peakSeasonWeekendPrice: row.peak_season_weekend_price ?? undefined,
    peakSeasonWeekendPriceUsd: row.peak_season_weekend_price_usd ?? undefined,
    midSeasonLabel: row.mid_season_label ?? undefined,
    midSeasonPrice: row.mid_season_price ?? undefined,
    midSeasonPriceUsd: row.mid_season_price_usd ?? undefined,
    midSeasonWeekendPrice: row.mid_season_weekend_price ?? undefined,
    midSeasonWeekendPriceUsd: row.mid_season_weekend_price_usd ?? undefined,
    specialRates: row.special_rates && row.special_rates.length > 0 ? row.special_rates : undefined,
    extraFees: row.extra_fees && row.extra_fees.length > 0 ? row.extra_fees : undefined,
    oddHeadcountCartFeeWeekend: row.odd_headcount_cart_fee_weekend ?? undefined,
    oddHeadcountCartFeeWeekendUsd: row.odd_headcount_cart_fee_weekend_usd ?? undefined,
    oddHeadcountCartFee: row.odd_headcount_cart_fee ?? undefined,
    oddHeadcountCartFeeUsd: row.odd_headcount_cart_fee_usd ?? undefined,
    image: row.image ?? undefined,
    gallery: row.gallery ?? [],
    yardage: row.yardage ?? undefined,
    locationNote: row.location_note ?? undefined,
    includesCaddie: row.includes_caddie,
    includesCart: row.includes_cart,
    facilities: row.facilities,
  };
}

export async function getAllGolfCourses(): Promise<GolfCourse[]> {
  const [{ data, error }, ratings] = await Promise.all([
    supabaseServer.from("golf_courses").select("*").order("created_at", { ascending: true }),
    getRatingSummaries("golf_course"),
  ]);

  if (error || !data) return [];
  return data.map((row) => {
    const summary = ratings[row.slug];
    return { ...mapRow(row), rating: summary?.rating, reviewCount: summary?.count };
  });
}

export async function getGolfCourseBySlug(slug: string): Promise<GolfCourse | null> {
  const { data, error } = await supabaseServer
    .from("golf_courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getGolfCourseSlugs(): Promise<string[]> {
  const { data, error } = await supabaseServer.from("golf_courses").select("slug");
  if (error || !data) return [];
  return data.map((r) => r.slug);
}
