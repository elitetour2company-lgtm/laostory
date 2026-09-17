import { supabaseServer } from "@/lib/supabase/server";
import { Product, ProductType, ItineraryDay, CustomizationQA, DestinationHighlight } from "@/types";
import { getRatingSummaries } from "@/lib/data/reviews";

const TYPE_MAP: Record<string, ProductType> = {
  FREE_TRAVEL: "자유여행",
  PACKAGE_TOUR: "패키지여행",
  POOL_VILLA: "풀빌라",
  GOLF: "골프",
};

type ProductRow = {
  slug: string;
  title: string;
  type: string;
  category: string;
  destination: string;
  description: string;
  duration: string;
  price: number;
  original_price: number | null;
  price_usd: number | null;
  original_price_usd: number | null;
  image: string | null;
  gallery: string[] | null;
  tags: string[];
  badge: string | null;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[] | null;
  featured: boolean;
  min_participants: number | null;
  customization_qa: CustomizationQA[] | null;
  destination_highlights: DestinationHighlight[] | null;
};

function mapRow(row: ProductRow): Product {
  return {
    slug: row.slug,
    title: row.title,
    type: TYPE_MAP[row.type] ?? "자유여행",
    category: row.category,
    destination: row.destination,
    description: row.description,
    duration: row.duration,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    priceUsd: row.price_usd ?? undefined,
    originalPriceUsd: row.original_price_usd ?? undefined,
    image: row.image ?? undefined,
    gallery: row.gallery ?? [],
    tags: row.tags as Product["tags"],
    badge: row.badge ?? undefined,
    featured: row.featured,
    included: row.included,
    excluded: row.excluded,
    itinerary: row.itinerary ?? undefined,
    minParticipants: row.min_participants ?? undefined,
    customizationQA: row.customization_qa ?? undefined,
    destinationHighlights: row.destination_highlights ?? undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const [{ data, error }, ratings] = await Promise.all([
    supabaseServer.from("products").select("*").order("created_at", { ascending: true }),
    getRatingSummaries("product"),
  ]);

  if (error || !data) return [];
  return data.map((row) => {
    const summary = ratings[row.slug];
    return { ...mapRow(row), rating: summary?.rating, reviewCount: summary?.count };
  });
}

export async function getBestSellerProducts(): Promise<Product[]> {
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getProductSlugs(): Promise<string[]> {
  const { data, error } = await supabaseServer.from("products").select("slug");
  if (error || !data) return [];
  return data.map((r) => r.slug);
}
