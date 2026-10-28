/** Trim a long description to a search-result-friendly length, ending on a sentence if possible. */
export function metaDescription(text: string, max = 150): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf("다. "), cut.lastIndexOf(". "), cut.lastIndexOf("요. "));
  if (lastStop > max * 0.5) return cut.slice(0, lastStop + 1).trim();
  return cut.replace(/[\s,·]+\S*$/, "").trim() + "…";
}
