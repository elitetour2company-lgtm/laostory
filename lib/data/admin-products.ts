import { adminRpc } from "@/lib/supabase/admin-rpc";

export type AdminProductRow = {
  id: string;
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
  gallery: string[];
  tags: string[];
  badge: string | null;
  included: string[];
  excluded: string[];
  itinerary: { day: number; title: string; description: string }[] | null;
  featured: boolean;
  status: string;
  min_participants: number | null;
  customization_qa: { question: string; answer: string }[] | null;
  destination_highlights: { city: string; title: string; description: string; image?: string }[] | null;
};

export async function getAdminProducts(): Promise<AdminProductRow[]> {
  return adminRpc<AdminProductRow[]>("admin_get_products");
}

export async function getAdminProductById(id: string): Promise<AdminProductRow | null> {
  const products = await getAdminProducts();
  return products.find((p) => p.id === id) ?? null;
}
