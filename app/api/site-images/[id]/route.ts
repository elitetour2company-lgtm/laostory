import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!UUID.test(id)) return new Response("Not found", { status: 404 });

  const { data } = await supabaseServer
    .from("site_images")
    .select("content_type, data")
    .eq("id", id)
    .maybeSingle();

  if (!data) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(Buffer.from(data.data, "base64")), {
    headers: {
      "Content-Type": data.content_type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
