// Guide articles are stored as an array of plain paragraphs (strings).
// A paragraph can opt in to richer output with a tiny syntax; paragraphs without
// it render exactly as before, so older articles are unaffected.
//
//   ## 소제목            -> <h2>
//   ### 소제목           -> <h3>
//   [사진:/주소|설명]     -> one photo with caption/alt
//   Q. 질문  (다음 문단이 답) -> FAQ item (also emitted as FAQPage JSON-LD)
//   [글자](/guide/slug)  -> internal link inside a paragraph (also external https://)

export type GuideBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "photo"; src: string; alt: string }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "p"; text: string };

const PHOTO_RE = /^\[사진:([^|\]]+)(?:\|([^\]]*))?\]$/;
const SAFE_SRC_RE = /^(\/api\/site-images\/[A-Za-z0-9-]+|\/images\/[A-Za-z0-9._\-/]+)$/;

export function parseGuideBlocks(content: string[]): GuideBlock[] {
  const blocks: GuideBlock[] = [];
  let i = 0;
  while (i < content.length) {
    const raw = (content[i] ?? "").trim();
    if (!raw) {
      i++;
      continue;
    }

    if (raw.startsWith("### ")) {
      blocks.push({ type: "h3", text: raw.slice(4).trim() });
      i++;
      continue;
    }
    if (raw.startsWith("## ")) {
      blocks.push({ type: "h2", text: raw.slice(3).trim() });
      i++;
      continue;
    }

    const photo = raw.match(PHOTO_RE);
    if (photo && SAFE_SRC_RE.test(photo[1].trim())) {
      blocks.push({ type: "photo", src: photo[1].trim(), alt: (photo[2] ?? "").trim() });
      i++;
      continue;
    }

    // A run of "Q. ..." paragraphs, each followed by its answer paragraph.
    if (/^Q\.\s/.test(raw) && content[i + 1] !== undefined) {
      const items: { q: string; a: string }[] = [];
      while (i < content.length && /^Q\.\s/.test((content[i] ?? "").trim()) && content[i + 1] !== undefined) {
        const q = (content[i] ?? "").trim().replace(/^Q\.\s*/, "");
        const a = (content[i + 1] ?? "").trim().replace(/^A\.\s*/, "");
        items.push({ q, a });
        i += 2;
      }
      blocks.push({ type: "faq", items });
      continue;
    }

    blocks.push({ type: "p", text: raw });
    i++;
  }
  return blocks;
}

export function faqItemsOf(blocks: GuideBlock[]): { q: string; a: string }[] {
  return blocks.flatMap((b) => (b.type === "faq" ? b.items : []));
}

export function slugifyHeading(text: string, index: number): string {
  const ascii = text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `s${index + 1}-${ascii.slice(0, 40)}`;
}

export type InlinePart = { type: "text"; text: string } | { type: "link"; text: string; href: string };

const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g;

export function parseInline(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) parts.push({ type: "text", text: text.slice(last, idx) });
    parts.push({ type: "link", text: m[1], href: m[2] });
    last = idx + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", text: text.slice(last) });
  return parts.length ? parts : [{ type: "text", text }];
}
