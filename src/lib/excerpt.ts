// Derives a plain-text preview from Markdown post bodies.
//
// The body is Markdown (rendered with react-markdown on the article page), so a
// naive strip of a few symbols leaves image and link URLs behind — e.g.
// `![](https://…s3…/abc)` collapses to a bare `https://…` string in the blog
// listing. This walks the common Markdown constructs and keeps only the
// human-readable prose: it drops code fences, images, link targets, raw URLs,
// and inline emphasis / heading markers.

const DEFAULT_MAX = 120;

export function excerptFromMarkdown(
  markdown: string,
  maxLength = DEFAULT_MAX,
): string {
  const text = markdown
    // Fenced code blocks — drop entirely (rarely useful as a preview).
    .replace(/```[\s\S]*?```/g, " ")
    // Images ![alt](url) / ![alt][ref] — drop entirely, URL and all.
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/!\[[^\]]*\]\[[^\]]*\]/g, " ")
    // Links [text](url) / [text][ref] — keep the visible text, drop the target.
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1")
    // Inline code — keep the code text, drop the backticks.
    .replace(/`+([^`]*)`+/g, "$1")
    // Any leftover bare URLs (autolinks or pasted links).
    .replace(/<?https?:\/\/[^\s>]+>?/g, " ")
    // Line-leading markers: headings, blockquotes, list bullets.
    .replace(/^\s{0,3}(#{1,6}\s+|>\s?|[-*+]\s+|\d+[.)]\s+)/gm, "")
    // Horizontal rules (---, ***, ___).
    .replace(/^\s*([-*_])(?:\s*\1){2,}\s*$/gm, " ")
    // Emphasis / strikethrough markers.
    .replace(/(\*\*|__|\*|_|~~)/g, "")
    // Stray HTML tags.
    .replace(/<[^>]+>/g, " ")
    // Collapse all whitespace to single spaces.
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
