import { supabaseServer } from "@/lib/supabase/server";
import { Review } from "@/types";

const CATEGORY_MAP: Record<string, Review["category"]> = {
  GOLF: "골프",
  POOL_VILLA: "풀빌라",
  FREE_TRAVEL: "자유여행",
  PACKAGE_TOUR: "패키지",
  TOUR: "투어",
};

type ReviewRow = {
  id: string;
  customer_name: string;
  destination: string;
  product: string;
  category: string;
  date: string;
  rating: number;
  content: string;
  is_sample: boolean;
  photos: string[];
};

function mapRow(row: ReviewRow): Review {
  return {
    id: row.id,
    customerName: row.customer_name,
    destination: row.destination,
    product: row.product,
    category: CATEGORY_MAP[row.category] ?? "자유여행",
    date: row.date,
    rating: row.rating,
    content: row.content,
    isSample: row.is_sample,
    photos: row.photos ?? [],
  };
}

export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabaseServer
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getRatingSummaries(
  productType: "product" | "tour" | "golf_course"
): Promise<Record<string, { rating: number; count: number }>> {
  const { data, error } = await supabaseServer
    .from("reviews")
    .select("product_slug, rating")
    .eq("product_type", productType);

  if (error || !data) return {};

  const totals: Record<string, { sum: number; count: number }> = {};
  for (const row of data) {
    if (!row.product_slug) continue;
    const entry = totals[row.product_slug] ?? { sum: 0, count: 0 };
    entry.sum += row.rating;
    entry.count += 1;
    totals[row.product_slug] = entry;
  }

  const summaries: Record<string, { rating: number; count: number }> = {};
  for (const [slug, { sum, count }] of Object.entries(totals)) {
    summaries[slug] = { rating: Math.round((sum / count) * 10) / 10, count };
  }
  return summaries;
}

export async function getReviewsForProduct(
  productType: "product" | "tour" | "golf_course",
  productSlug: string
): Promise<Review[]> {
  const { data, error } = await supabaseServer
    .from("reviews")
    .select("*")
    .eq("product_type", productType)
    .eq("product_slug", productSlug)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}
