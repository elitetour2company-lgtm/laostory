"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

async function compress(file: File, maxSide: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("compress failed"))),
      "image/jpeg",
      0.85
    );
  });
}

export default function ImageUploader({
  value,
  onChange,
  multiple = true,
  maxSide = 1600,
  hint,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  maxSide?: number;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);

    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const blob = await compress(file, maxSide);
        const form = new FormData();
        form.append("file", blob, "photo.jpg");
        const res = await fetch("/api/admin/images", { method: "POST", body: form });
        const json = await res.json();
        if (!res.ok || !json.url) throw new Error(json.error ?? "업로드 실패");
        uploaded.push(json.url as string);
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(0, 1));
    } catch (e) {
      setError(e instanceof Error ? e.message : "사진을 올리지 못했습니다.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {value.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-3">
          {value.map((url) => (
            <div
              key={url}
              className="relative h-24 w-24 overflow-hidden rounded-sm border border-border bg-ivory"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="사진 삭제"
                onClick={() => onChange(value.filter((u) => u !== url))}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-4 py-2.5 text-[13.5px] font-medium text-text hover:border-forest hover:text-forest disabled:opacity-60"
      >
        <ImagePlus size={16} strokeWidth={1.75} />
        {busy ? "올리는 중..." : multiple ? "사진 추가" : "사진 선택"}
      </button>
      {hint ? <p className="mt-2 text-[12px] text-text-soft">{hint}</p> : null}
      {error ? <p className="mt-2 text-[12.5px] font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
