import type { RichText } from '../api/types.js';

/**
 * Build a Notion rich text array from a plain string.
 */
export function richText(content: string): RichText[] {
  // Notion limits each text block to 2000 chars
  const chunks: RichText[] = [];
  for (let i = 0; i < content.length; i += 2000) {
    chunks.push({
      type: 'text',
      text: { content: content.slice(i, i + 2000) },
    });
  }
  return chunks;
}

/**
 * Extract plain text from a Notion rich text array.
 */
export function plainText(rt: Array<{ plain_text: string }> | undefined): string {
  if (!rt) return '';
  return rt.map((t) => t.plain_text).join('');
}

/**
 * Extract the title from a Notion page's properties.
 */
export function extractPageTitle(properties: Record<string, any>): string {
  for (const prop of Object.values(properties)) {
    if (prop.type === 'title' && prop.title) {
      return plainText(prop.title);
    }
  }
  return '(untitled)';
}

/**
 * Extract plain text content from a block.
 */
export function extractBlockText(block: any): string {
  const type = block.type;
  const data = block[type];
  if (!data) return '';

  if (data.rich_text) return plainText(data.rich_text);
  if (data.caption) return plainText(data.caption);
  if (data.url) return data.url;
  return '';
}

/**
 * Build paragraph blocks from markdown-ish text.
 * Splits on double newlines for paragraphs.
 */
export function textToBlocks(text: string): Array<Record<string, any>> {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
  return paragraphs.map((p) => ({
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: richText(p.trim()) },
  }));
}
