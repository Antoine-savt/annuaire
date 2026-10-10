import { Fragment, ReactNode } from 'react';
import { Link } from '../router';

/*
 * Tiny Markdown subset used for editorial content:
 *   "## Title"  section heading (gets an anchor id)   "### Title"  sub-heading
 *   "- item"    list item                              "> text"     highlighted tip
 *   [text](/path) link (internal links stay client-side)   **text** bold
 * Blocks are separated by a blank line.
 */
export type Block =
  | { kind: 'h2'; text: string; id: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'tip'; text: string };

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  const usedIds = new Set<string>();

  for (const chunk of source.trim().split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const first = lines[0];

    if (first.startsWith('## ')) {
      const text = first.slice(3).trim();
      let id = slugify(text);
      while (usedIds.has(id)) id += '-2';
      usedIds.add(id);
      blocks.push({ kind: 'h2', text, id });
    } else if (first.startsWith('### ')) {
      blocks.push({ kind: 'h3', text: first.slice(4).trim() });
    } else if (lines.every((l) => l.startsWith('- '))) {
      blocks.push({ kind: 'list', items: lines.map((l) => l.slice(2).trim()) });
    } else if (first.startsWith('> ')) {
      blocks.push({ kind: 'tip', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ') });
    } else {
      blocks.push({ kind: 'p', text: lines.join(' ') });
    }
  }
  return blocks;
}

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/** Render links and bold inside a line of text. */
export function inline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    const [, label, href, bold] = match;
    if (bold) {
      out.push(<strong key={index} className="font-semibold text-ink">{bold}</strong>);
    } else if (href.startsWith('/')) {
      out.push(
        <Link key={index} href={href} className="link text-ink">
          {label}
        </Link>,
      );
    } else {
      out.push(
        <a key={index} href={href} target="_blank" rel="noopener" className="link text-ink">
          {label}
        </a>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((part, i) => <Fragment key={i}>{part}</Fragment>);
}

/** Text without Markdown, for meta descriptions and structured data. */
export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
}

export function wordCount(source: string): number {
  return plainText(source)
    .replace(/^[#>-]+\s/gm, '')
    .split(/\s+/)
    .filter((w) => /[\p{L}\d]/u.test(w)).length;
}

/** About 200 words a minute, rounded up. */
export function readingMinutes(source: string): number {
  return Math.max(1, Math.ceil(wordCount(source) / 200));
}

export function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'h2':
            return (
              <h2 key={i} id={block.id} className="mb-4 mt-12 text-3xl leading-tight text-ink first:mt-0">
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="mb-3 mt-8 font-sans text-xl font-semibold text-ink">
                {block.text}
              </h3>
            );
          case 'list':
            return (
              <ul key={i} className="mb-6 space-y-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="relative pl-6 text-[1.05rem] leading-relaxed text-ink/85">
                    <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-pine" />
                    {inline(item)}
                  </li>
                ))}
              </ul>
            );
          case 'tip':
            return (
              <p key={i} className="mb-6 rounded-xl border-l-4 border-pine bg-sage-soft px-5 py-4 text-[1.02rem] leading-relaxed text-ink">
                {inline(block.text)}
              </p>
            );
          default:
            return (
              <p key={i} className="mb-5 text-[1.075rem] leading-[1.8] text-ink/85">
                {inline(block.text)}
              </p>
            );
        }
      })}
    </>
  );
}
