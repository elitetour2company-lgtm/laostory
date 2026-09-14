import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

export default function CoverImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) {
    return <ImagePlaceholder label={alt} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover contrast-[1.05] saturate-[1.12] brightness-[1.02] ${className}`}
    />
  );
}
