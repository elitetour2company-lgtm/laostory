"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { Star, MessageCircle, ImagePlus, Loader2, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { createAuthClient } from "@/lib/supabase/auth-client";
import { Review } from "@/types";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type ProductType = "product" | "tour" | "golf_course" | "villa";

// DB `reviews.category` enum codes (see CATEGORY_MAP in lib/data/reviews.ts).
type CategoryCode = "GOLF" | "POOL_VILLA" | "HOTEL" | "FREE_TRAVEL" | "PACKAGE_TOUR" | "TOUR";

const CATEGORY_LABEL: Record<CategoryCode, Review["category"]> = {
  GOLF: "골프",
  POOL_VILLA: "풀빌라",
  HOTEL: "호텔",
  FREE_TRAVEL: "자유여행",
  PACKAGE_TOUR: "패키지",
  TOUR: "투어",
};

// Fallback when the page doesn't pass an explicit categoryCode. Villa pages
// always pass an explicit categoryCode (POOL_VILLA vs HOTEL depends on the
// specific listing), so this default is never actually relied on for "villa".
const DEFAULT_CATEGORY: Record<ProductType, CategoryCode> = {
  golf_course: "GOLF",
  tour: "TOUR",
  product: "FREE_TRAVEL",
  villa: "POOL_VILLA",
};

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";

export default function ReviewSection({
  productType,
  productSlug,
  productName,
  initialReviews,
  categoryCode,
  destination,
}: {
  productType: ProductType;
  productSlug: string;
  productName: string;
  initialReviews: Review[];
  /** Explicit `reviews.category` DB code for this product; inferred from productType if omitted. */
  categoryCode?: CategoryCode;
  /** Value to store in `reviews.destination`; falls back to productName if omitted. */
  destination?: string;
}) {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  // Tracks the initialReviews reference we last synced from, so we can
  // adjust `reviews` during render (React's recommended alternative to an
  // effect) whenever the server re-supplies a fresh array — e.g. after
  // router.refresh() following a successful submit.
  const [syncedInitialReviews, setSyncedInitialReviews] = useState(initialReviews);
  if (initialReviews !== syncedInitialReviews) {
    setSyncedInitialReviews(initialReviews);
    setReviews(initialReviews);
  }

  // undefined = auth state not yet resolved, null = logged out
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    const supabase = createAuthClient();
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("jpg, png, webp 형식의 이미지만 업로드할 수 있습니다.");
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        setError("파일당 최대 5MB까지 업로드할 수 있습니다.");
        continue;
      }
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("review-photos")
        .upload(path, file);
      if (uploadError) {
        setError("사진 업로드 중 문제가 발생했습니다.");
        continue;
      }
      const { data } = supabase.storage.from("review-photos").getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    if (uploaded.length > 0) {
      setPhotos((prev) => [...prev, ...uploaded]);
    }
    setUploading(false);
  }

  function removePhoto(url: string) {
    setPhotos((prev) => prev.filter((p) => p !== url));
    const marker = "/review-photos/";
    const idx = url.indexOf(marker);
    if (idx !== -1) {
      const path = url.slice(idx + marker.length);
      createAuthClient().storage.from("review-photos").remove([path]);
    }
  }

  useEffect(() => {
    const supabase = createAuthClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;

    const trimmed = content.trim();
    if (!trimmed) {
      setError("후기 내용을 입력해주세요.");
      return;
    }

    setError(null);
    setSuccess(false);
    setSubmitting(true);

    const supabase = createAuthClient();
    const metaName = (user.user_metadata as { name?: string } | null)?.name?.trim();
    const customerName = metaName || user.email?.split("@")[0] || "고객";
    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}`;
    const resolvedCategory = categoryCode ?? DEFAULT_CATEGORY[productType];

    const { data, error: insertError } = await supabase
      .from("reviews")
      .insert({
        customer_name: customerName,
        destination: destination || productName,
        product: productName,
        category: resolvedCategory,
        date: dateStr,
        rating,
        content: trimmed,
        is_sample: false,
        photos,
        user_id: user.id,
        product_type: productType,
        product_slug: productSlug,
      })
      .select()
      .single();

    setSubmitting(false);

    if (insertError || !data) {
      setError("후기 등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const newReview: Review = {
      id: data.id,
      customerName: data.customer_name,
      destination: data.destination,
      product: data.product,
      category: CATEGORY_LABEL[resolvedCategory],
      date: data.date,
      rating: data.rating,
      content: data.content,
      isSample: false,
      photos: data.photos ?? [],
    };

    setReviews((prev) => [newReview, ...prev]);
    setContent("");
    setRating(5);
    setPhotos([]);
    setSuccess(true);
    router.refresh();
  }

  return (
    <div className="mt-10 border-t border-border pt-8">
      <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">이용 후기</h2>

      {reviews.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-border bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-gold">
                  <span className="sr-only">{review.rating}점 / 5점</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      strokeWidth={0}
                      aria-hidden="true"
                      fill={i < Math.round(review.rating) ? "currentColor" : "#E7E3DA"}
                    />
                  ))}
                </div>
                {review.isSample ? <Badge tone="neutral">샘플</Badge> : null}
              </div>
              <p className="mt-3.5 text-[13.5px] leading-relaxed text-text">{review.content}</p>
              {review.photos.length > 0 ? (
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {review.photos.map((url) => (
                    <div
                      key={url}
                      className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm"
                    >
                      <Image src={url} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="mt-5 border-t border-border pt-3.5">
                <p className="text-[13px] font-medium text-text">
                  {review.customerName} · {review.destination}
                </p>
                <p className="mt-0.5 text-[12px] text-text-soft">
                  {review.product} · {review.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-[13.5px] text-text-soft">
          아직 등록된 후기가 없습니다. 첫 후기를 남겨주세요.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-border bg-white p-6">
        {user === undefined ? null : user === null ? (
          <p className="flex flex-wrap items-center gap-1.5 text-[13.5px] text-text-soft">
            <MessageCircle size={16} strokeWidth={2} className="text-forest/70" />
            로그인 후 리뷰를 작성할 수 있어요
            <Link
              href="/login"
              className="font-medium text-forest underline underline-offset-2"
            >
              로그인하기
            </Link>
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-[14px] font-semibold text-forest">후기 작성하기</p>
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                const filled = value <= (hoverRating || rating);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${value}점`}
                    className="text-gold"
                  >
                    <Star size={22} strokeWidth={0} fill={filled ? "currentColor" : "#E7E3DA"} />
                  </button>
                );
              })}
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              placeholder="여행은 어떠셨나요? 솔직한 후기를 남겨주세요."
              className={`${fieldClass} mt-3 resize-none`}
            />

            <div className="mt-3">
              {photos.length > 0 ? (
                <div className="mb-2.5 flex flex-wrap gap-2.5">
                  {photos.map((url) => (
                    <div
                      key={url}
                      className="group relative h-16 w-16 overflow-hidden rounded-sm border border-border"
                    >
                      <Image src={url} alt="" fill sizes="64px" className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(url)}
                        aria-label="사진 삭제"
                        className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                      >
                        <X size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-dashed border-border px-4 py-2 text-[12.5px] font-medium text-text-soft transition-colors hover:border-forest hover:text-forest">
                {uploading ? (
                  <Loader2 size={14} strokeWidth={2} className="animate-spin" />
                ) : (
                  <ImagePlus size={14} strokeWidth={2} />
                )}
                {uploading ? "업로드 중..." : "사진 추가"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  disabled={uploading}
                  className="hidden"
                  onChange={(e) => {
                    handleFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            {error ? (
              <p className="mt-2 text-[12.5px] font-medium text-red-600">{error}</p>
            ) : null}
            {success ? (
              <p className="mt-2 text-[12.5px] font-medium text-forest">
                후기가 등록되었습니다. 소중한 후기 감사합니다.
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 rounded-sm bg-forest px-6 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-forest-light disabled:opacity-60"
            >
              {submitting ? "등록 중..." : "후기 등록"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
