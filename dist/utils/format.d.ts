import type { RichText } from '../api/types.js';
/**
 * Build a Notion rich text array from a plain string.
 */
export declare function richText(content: string): RichText[];
/**
 * Extract plain text from a Notion rich text array.
 */
export declare function plainText(rt: Array<{
    plain_text: string;
}> | undefined): string;
/**
 * Extract the title from a Notion page's properties.
 */
export declare function extractPageTitle(properties: Record<string, any>): string;
/**
 * Extract plain text content from a block.
 */
export declare function extractBlockText(block: any): string;
/**
 * Build paragraph blocks from markdown-ish text.
 * Splits on double newlines for paragraphs.
 */
export declare function textToBlocks(text: string): Array<Record<string, any>>;
//# sourceMappingURL=format.d.ts.map