import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/get-session";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "사진 파일이 없습니다." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "JPG, PNG, WEBP 사진만 올릴 수 있어요." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "사진 용량이 너무 큽니다." }, { status: 413 });
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

  try {
    const id = await adminRpc<string>("admin_add_site_image", {
      p_content_type: file.type,
      p_data: base64,
    });
    return NextResponse.json({ url: `/api/site-images/${id}` });
  } catch {
    return NextResponse.json({ error: "사진 저장 중 문제가 발생했습니다." }, { status: 500 });
  }
}
