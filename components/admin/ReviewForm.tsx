"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Loader2, ImagePlus } from "lucide-react";
import { useActionState } from "react";
import { upsertReviewAction, ReviewFormState } from "@/lib/admin/review-actions";
import { AdminReviewRow } from "@/lib/data/admin-reviews";
import { supabase } from "@/lib/supabase/client";

const CATEGORY_OPTIONS = [
  { value: "GOLF", label: "골프" },
  { value: "POOL_VILLA", label: "풀빌라" },
  { value: "FREE_TRAVEL", label: "자유여행" },
  { value: "PACKAGE_TOUR", label: "패키지" },
  { value: "TOUR", label: "투어" },
];

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function ReviewForm({ review }: { review?: AdminReviewRow }) {
  const action = upsertReviewAction.bind(null, review?.id ?? null);
  const [state, formAction, pending] = useActionState<ReviewFormState | undefined, FormData>(
    action,
    undefined
  );
  const [photos, setPhotos] = useState<string[]>(review?.photos ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setUploading(true);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setUploadError("jpg, png, webp 형식의 이미지만 업로드할 수 있습니다.");
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        setUploadError("파일당 최대 5MB까지 업로드할 수 있습니다.");
        continue;
      }
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("review-photos").upload(path, file);
      if (error) {
        setUploadError("업로드 중 문제가 발생했습니다.");
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
      supabase.storage.from("review-photos").remove([path]);
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>작성자 *</span>
          <input
            name="customerName"
            defaultValue={review?.customer_name}
            required
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>카테고리</span>
          <select
            name="category"
            defaultValue={review?.category ?? "FREE_TRAVEL"}
            className={fieldClass}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={labelClass}>여행지</span>
          <input name="destination" defaultValue={review?.destination} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>이용 상품</span>
          <input name="product" defaultValue={review?.product} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>날짜 (예: 2026.01)</span>
          <input name="date" defaultValue={review?.date} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>평점 (1~5) *</span>
          <input
            name="rating"
            type="number"
            min={1}
            max={5}
            step={0.5}
            defaultValue={review?.rating ?? 5}
            required
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>후기 내용 *</span>
        <textarea
          name="content"
          defaultValue={review?.content}
          rows={4}
          required
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div>
        <span className={labelClass}>후기 사진 (jpg, png, webp · 파일당 최대 5MB)</span>
        <input type="hidden" name="photos" value={JSON.stringify(photos)} />

        {photos.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-3">
            {photos.map((url) => (
              <div
                key={url}
                className="group relative h-20 w-20 overflow-hidden rounded-sm border border-border"
              >
                <Image src={url} alt="" fill sizes="80px" className="object-cover" />
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

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-dashed border-border px-4 py-2.5 text-[13px] font-medium text-text-soft transition-colors hover:border-forest hover:text-forest">
          {uploading ? (
            <Loader2 size={15} strokeWidth={2} className="animate-spin" />
          ) : (
            <ImagePlus size={15} strokeWidth={2} />
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
        {uploadError ? (
          <p className="mt-2 text-[12.5px] font-medium text-red-600">{uploadError}</p>
        ) : null}
      </div>

      <label className="flex items-center gap-2.5">
        <input
          type="checkbox"
          name="isSample"
          defaultChecked={review?.is_sample ?? false}
          className="h-4 w-4 accent-forest"
        />
        <span className="text-[13.5px] text-text">
          샘플 후기 (실제 고객 후기가 아닌 예시 데이터)
        </span>
      </label>

      {state?.error ? (
        <p className="text-[13px] font-medium text-red-600">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending || uploading}
        className="rounded-sm bg-forest px-7 py-3 text-[14px] font-medium text-white hover:bg-forest-light disabled:opacity-60"
      >
        {pending ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
