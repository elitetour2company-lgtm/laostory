import { supabaseServer } from "@/lib/supabase/server";
import { TransportOption } from "@/types";

const CATEGORY_MAP: Record<string, TransportOption["category"]> = {
  AIRPORT_TRANSFER: "공항 픽업·샌딩",
  CHARTER_VAN: "전세밴",
  JOIN_VAN: "조인밴",
  TRAIN_TICKET: "기차표",
};

type TransportRow = {
  slug: string;
  title: string;
  category: string;
  route: string;
  vehicle_or_seat: string;
  duration: string;
  price: number;
  image: string | null;
  description: string;
};

function mapRow(row: TransportRow): TransportOption {
  return {
    slug: row.slug,
    title: row.title,
    category: CATEGORY_MAP[row.category] ?? "전세밴",
    route: row.route,
    vehicleOrSeat: row.vehicle_or_seat,
    duration: row.duration,
    price: row.price,
    image: row.image ?? undefined,
    description: row.description,
  };
}

export async function getAllTransportOptions(): Promise<TransportOption[]> {
  const { data, error } = await supabaseServer
    .from("transport_options")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data.map(mapRow);
}
