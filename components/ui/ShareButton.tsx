"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the native share sheet — no error state needed
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed — silently ignore, no destructive fallback needed
    }
  }

  return (
    <button
      type="button"
      aria-label="공유하기"
      onClick={handleShare}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white ${className}`}
    >
      {copied ? (
        <Check size={17} strokeWidth={2} className="text-forest" />
      ) : (
        <Share2 size={17} strokeWidth={2} className="text-text-soft" />
      )}
    </button>
  );
}
