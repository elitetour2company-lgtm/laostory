import Link from "next/link";
import {
  GuideBlock,
  parseInline,
  slugifyHeading,
} from "@/lib/guide/blocks";

function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((part, i) =>
        part.type === "text" ? (
          <span key={i}>{part.text}</span>
        ) : part.href.startsWith("/") ? (
          <Link
            key={i}
            href={part.href}
            className="font-medium text-forest underline underline-offset-2 hover:text-forest-light"
          >
            {part.text}
          </Link>
        ) : (
          <a
            key={i}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forest underline underline-offset-2 hover:text-forest-light"
          >
            {part.text}
          </a>
        )
      )}
    </>
  );
}

export default function GuideBody({ blocks }: { blocks: GuideBlock[] }) {
  const headings = blocks
    .map((b, i) => ({ b, i }))
    .filter(({ b }) => b.type === "h2") as { b: Extract<GuideBlock, { type: "h2" }>; i: number }[];
  const idOf = (blockIndex: number) => {
    const n = headings.findIndex((h) => h.i === blockIndex);
    return n >= 0 ? slugifyHeading(headings[n].b.text, n) : undefined;
  };

  return (
    <div className="mt-8 space-y-5 border-t border-border pt-8">
      {headings.length >= 3 ? (
        <nav aria-label="목차" className="rounded-xl border border-border bg-ivory p-5">
          <p className="text-[13px] font-semibold text-forest">이 글의 목차</p>
          <ol className="mt-3 space-y-1.5 text-[14px] text-text-soft">
            {headings.map((h, n) => (
              <li key={h.i}>
                <a href={`#${slugifyHeading(h.b.text, n)}`} className="hover:text-forest">
                  {n + 1}. {h.b.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={idOf(i)}
                className="scroll-mt-24 border-t border-border pt-8 text-[20px] font-semibold leading-snug text-forest md:text-[22px]"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-2 text-[16.5px] font-semibold leading-snug text-forest">
                {block.text}
              </h3>
            );
          case "photo":
            return (
              <figure key={i} className="my-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  className="h-auto w-full rounded-xl border border-border"
                />
                {block.alt ? (
                  <figcaption className="mt-2 text-center text-[12.5px] text-text-soft">
                    {block.alt}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "faq":
            return (
              <div key={i} className="space-y-3">
                {block.items.map((item, n) => (
                  <details
                    key={n}
                    className="group rounded-xl border border-border bg-white px-5 py-4"
                  >
                    <summary className="cursor-pointer list-none text-[15px] font-semibold leading-snug text-text">
                      <span className="mr-2 text-gold">Q.</span>
                      {item.q}
                    </summary>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">
                      <Inline text={item.a} />
                    </p>
                  </details>
                ))}
              </div>
            );
          default:
            return (
              <p key={i} className="text-[15px] leading-relaxed text-text">
                <Inline text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
