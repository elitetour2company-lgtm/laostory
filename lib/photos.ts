import { getImage } from "@/data/images";

export type DetailPhoto = { key: string; src: string; alt: string };

export function buildPhotos(
  mainKey: string | undefined,
  galleryKeys: string[],
  alt: string
): DetailPhoto[] {
  const main = getImage(mainKey);
  const photos: DetailPhoto[] = main ? [{ key: "hero", src: main, alt }] : [];
  const seen = new Set<string>(main ? [main] : []);
  galleryKeys.forEach((key, i) => {
    const src = getImage(key);
    if (!src || seen.has(src)) return;
    seen.add(src);
    photos.push({ key, src, alt: `${alt} 사진 ${i + 2}` });
  });
  return photos;
}
