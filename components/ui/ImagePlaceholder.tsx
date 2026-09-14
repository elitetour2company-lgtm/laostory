import { Image as ImageIcon } from "lucide-react";

export default function ImagePlaceholder({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest/[0.14] via-ivory to-gold/[0.18] ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-text-soft/80">
        <ImageIcon size={24} strokeWidth={1.25} />
        {label ? (
          <span className="text-xs font-medium tracking-wide">{label}</span>
        ) : null}
        <span className="text-[10.5px] tracking-wide text-text-soft/60">사진 준비중</span>
      </div>
    </div>
  );
}
