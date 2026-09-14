import { supabaseServer } from "@/lib/supabase/server";
import { Villa } from "@/types";

type VillaRow = {
  slug: string;
  name: string;
  location: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  has_private_pool: boolean;
  price: number;
  image: string | null;
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
    image: row.image ?? undefined,
    description: row.description,
    facilities: row.facilities,
    nearby: row.nearby,
  };
}

// Villa/hotel products are on hold until real inventory is confirmed
// (owner is still sourcing actual properties) — the 3 rows still in the
// `villas` table are placeholder data from early development and must not
// be shown to real visitors. Short-circuiting these fetchers to empty
// keeps the existing "coming soon" empty states on /villas and related
// pages, without touching the DB rows. Remove these early returns once
// real villa listings are entered via the admin.
export async function getAllVillas(): Promise<Villa[]> {
  return [];
}

export async function getVillaBySlug(_slug: string): Promise<Villa | null> {
  return null;
}

export async function getVillaSlugs(): Promise<string[]> {
  return [];
}
